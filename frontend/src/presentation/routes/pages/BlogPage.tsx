import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import appStrings from "../../../locales/en/appStrings.json";
import { getBlogPosts, updateBlogPostLikes, getBlogComments, createBlogComment, byteaToBase64DataUrl } from "../../../lib/supabase";
import { BLOG_PAGE_STYLES } from "../../../utils/constants/blogConstant";

const NOISE = "!@#$%^&*<>/\\|{}[]~`";

interface Post {
  id: string;
  date: string;
  title: string;
  text: string;
  image: string;
  tag: string;
  comments: number;
  likes: number;
}

interface GlitchTextProps {
  text: string;
  animateOnMount?: boolean;
  animateKey?: string;
}

function seededShuffle<T>(arr: T[], seed = 7): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Minimal markdown → React renderer.
 * Supports: ## / ### headings, **bold**, *italic*, `code`, > blockquote, newlines.
 */
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];

  const parseInline = (raw: string, keyPrefix: string): React.ReactNode[] => {
    // Process bold, italic, inline-code in one pass using a token splitter.
    const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    const parts = raw.split(pattern);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${keyPrefix}-b${i}`}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={`${keyPrefix}-i${i}`}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={`${keyPrefix}-c${i}`} className="sf-md-code">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  lines.forEach((line, lineIndex) => {
    const key = `md-${lineIndex}`;

    if (line.startsWith("### ")) {
      nodes.push(<h4 key={key} className="sf-md-h3">{parseInline(line.slice(4), key)}</h4>);
    } else if (line.startsWith("## ")) {
      nodes.push(<h3 key={key} className="sf-md-h2">{parseInline(line.slice(3), key)}</h3>);
    } else if (line.startsWith("> ")) {
      nodes.push(<blockquote key={key} className="sf-md-quote">{parseInline(line.slice(2), key)}</blockquote>);
    } else if (line.trim() === "") {
      nodes.push(<br key={key} />);
    } else {
      nodes.push(<span key={key} className="sf-md-line">{parseInline(line, key)}<br /></span>);
    }
  });

  return nodes;
}

const DEFAULT_USERNAME = "ANONYMOUS";

function getLikeStorageKey(ip: string) {
  return `blog-liked-posts:${ip || "unknown"}`;
}

function getUsernameStorageKey(ip: string) {
  return `blog-username:${ip || "unknown"}`;
}

function readStoredUsername(ip: string): string {
  if (typeof window === "undefined") return DEFAULT_USERNAME;
  return window.localStorage.getItem(getUsernameStorageKey(ip)) || DEFAULT_USERNAME;
}

function writeStoredUsername(ip: string, username: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getUsernameStorageKey(ip), username);
  window.localStorage.setItem("blog-last-username", username);
}

function getUserInitials(username: string): string {
  const trimmed = username.trim();
  if (!trimmed || trimmed === DEFAULT_USERNAME) return "AN";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return trimmed.slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function readStoredLikes(ip: string) {
  if (typeof window === "undefined") {
    return {} as Record<string, boolean>;
  }

  const raw = window.localStorage.getItem(getLikeStorageKey(ip));
  if (!raw) {
    return {} as Record<string, boolean>;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {} as Record<string, boolean>;
  }
}

function writeStoredLikes(ip: string, likes: Record<string, boolean>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getLikeStorageKey(ip), JSON.stringify(likes));
}

async function resolveClientIp() {
  if (typeof window !== "undefined") {
    const cachedIp = window.sessionStorage.getItem("blog-client-ip");
    if (cachedIp) return cachedIp;
  }
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) {
      return "unknown";
    }

    const payload = (await response.json()) as { ip?: string };
    const ip = payload.ip || "unknown";
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("blog-client-ip", ip);
    }
    return ip;
  } catch {
    return "unknown";
  }
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} - ${hour}:${minute}`;
}

function GlitchText({ text, animateOnMount = false, animateKey }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const glitching = useRef(false);

  const trigger = () => {
    if (glitching.current) return;
    glitching.current = true;
    let ticks = 0;
    const iv = setInterval(() => {
      if (ticks > 10) {
        clearInterval(iv);
        setDisplay(text);
        glitching.current = false;
        return;
      }
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < ticks
              ? c
              : Math.random() > 0.5
                ? NOISE[Math.floor(Math.random() * NOISE.length)]
                : c
          )
          .join("")
      );
      ticks++;
    }, 45);
  };

  useEffect(() => {
    if (!animateOnMount) return;
    const id = setTimeout(trigger, 120);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateKey, animateOnMount]);

  return (
    <span onMouseEnter={trigger} style={{ cursor: "crosshair" }}>
      {display}
    </span>
  );
}

function HeartButton({ liked, count, onToggle }: { liked: boolean; count: number; onToggle: () => void }) {
  return (
    <button className={`sf-heart ${liked ? "liked" : ""}`} onClick={onToggle} aria-pressed={liked}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-6.7-4.35-9.3-8.2C1 10.1 1.4 6.6 4.2 4.9c2.3-1.4 4.9-.7 6.4 1.2l1.4 1.8 1.4-1.8c1.5-1.9 4.1-2.6 6.4-1.2 2.8 1.7 3.2 5.2 1.5 7.9C18.7 16.65 12 21 12 21z" />
      </svg>
      <span>{count}</span>
    </button>
  );
}

function CommentItem({ comment }: { comment: { username: string; text: string } }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 80;
  const isLong = comment.text.length > maxLength;

  const displayText = expanded || !isLong
    ? comment.text
    : `${comment.text.slice(0, maxLength).trimEnd()}...`;

  return (
    <li className="sf-comment-item">
      <span className="sf-comment-avatar">{getUserInitials(comment.username)}</span>
      <span className="sf-comment-text">
        <strong className="sf-comment-username">{comment.username}:</strong>
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="sf-comment-more-btn"
          >
            {expanded ? "See Less..." : "See More..."}
          </button>
        )}
      </span>
    </li>
  );
}

function FeedSlide({
  post,
  liked,
  onToggleLike,
  likeCount,
  registerRef,
  content,
  username,
  comments,
  onAddComment,
}: {
  post: Post;
  liked: boolean;
  onToggleLike: () => void;
  likeCount: number;
  registerRef: (el: HTMLDivElement | null) => void;
  content: typeof appStrings.blog;
  username: string;
  comments: Array<{ username: string; text: string }>;
  onAddComment: (text: string) => void;
}) {
  const isAnon = !username || username === DEFAULT_USERNAME;
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [fullView, setFullView] = useState(false);

  useEffect(() => {
    if (!fullView) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.body.style.overflow = "";
    };
  }, [fullView]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onAddComment(text);
    setDraft("");
  };

  const commentCountLabel = `${post.comments + comments.length} ${content.commentsLabel}`;

  // Comment input — blocked for anonymous users
  const commentInput = isAnon ? (
    <p className="sf-comment-anon-notice">Set a username to leave a comment.</p>
  ) : (
    <>
      <input
        className="sf-comment-input"
        type="text"
        placeholder={content.commentPlaceholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && submit()}
      />
      <button className="sf-comment-post" onClick={submit}>
        {content.commentButton}
      </button>
    </>
  );

  const renderCommentsPanel = (showComments: boolean, openPanel: boolean) => (
    <div className="sf-comments-panel" style={{ maxHeight: openPanel ? "260px" : "0px" }}>
      <div className="sf-comments-panel-inner">
        {showComments && (
          comments.length === 0 ? (
            <p className="sf-comments-empty">{content.commentsEmpty}</p>
          ) : (
            <ul className="sf-comments-list">
              {comments.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))}
            </ul>
          )
        )}
        <div className="sf-comment-input-row">{commentInput}</div>
      </div>
    </div>
  );

  const portalRoot = typeof document === "object" ? document.body : null;

  const overlay = (
    <>
      {lightbox && (
        <div className="sf-lightbox" onClick={() => setLightbox(false)}>
          <button className="sf-lightbox-close" onClick={() => setLightbox(false)} aria-label={content.lightboxCloseLabel}>
            {content.closeGlyph}
          </button>
          <img src={post.image} alt={post.title} className="sf-lightbox-img" onClick={(event) => event.stopPropagation()} />
        </div>
      )}

      {fullView && (
        <div className="sf-fullpage" onClick={() => setFullView(false)}>
          <div className="sf-fullpage-card" onClick={(event) => event.stopPropagation()}>
            <button className="sf-fullpage-close" onClick={() => setFullView(false)} aria-label={content.fullPostCloseLabel}>
              {content.fullPostCloseLabel}
            </button>
            <div className="sf-fullpage-scroll">
              <header className="sf-post-head">
                <div className="sf-avatar">{content.avatarLabel}</div>
                <div className="sf-post-head-text">
                  <span className="sf-post-author">{content.author}</span>
                  <span className="sf-post-date">
                    {formatDate(post.date)} · <span className="sf-post-tag">{post.tag}</span>
                  </span>
                </div>
              </header>

              <h2 className="sf-fullpage-title">{post.title}</h2>

              <div className="sf-fullpage-img-wrap">
                <img src={post.image} alt={post.title} className="sf-fullpage-img" />
              </div>

              {post.text ? <div className="sf-fullpage-text sf-md-body">{renderMarkdown(post.text)}</div> : null}

              <div className="sf-post-foot">
                <HeartButton liked={liked} count={likeCount} onToggle={onToggleLike} />
                <span className="sf-fullpage-comment-count">{commentCountLabel}</span>
              </div>

              {renderCommentsPanel(true, true)}
            </div>
          </div>
        </div>
      )}
    </>
  );


  return (
    <>
      <div className="sf-slide" ref={registerRef}>
        <article className="sf-post">
          <header className="sf-post-head">
            <div className="sf-avatar">{content.avatarLabel}</div>
            <div className="sf-post-head-text">
              <span className="sf-post-author">{content.author}</span>
              <span className="sf-post-date">
                {formatDate(post.date)} · <span className="sf-post-tag">{post.tag}</span>
              </span>
            </div>
            <button className="sf-expand-btn" onClick={() => setFullView(true)}>
              {content.fullPostLabel}
            </button>
          </header>

          <h3 className="sf-post-caption">{post.title}</h3>

          {post.text ? <p className="sf-post-text">{truncateText(post.text, 120)}</p> : null}

          <button className="sf-post-img-wrap" onClick={() => setLightbox(true)} aria-label={`${content.imageAriaLabel} ${post.title}`}>
            <img src={post.image} alt={post.title} className="sf-post-img" />
            <span className="sf-post-img-expand">{content.expandGlyph}</span>
          </button>

          <div className="sf-post-foot">
            <HeartButton liked={liked} count={likeCount} onToggle={onToggleLike} />
            <button className="sf-comments-toggle" onClick={() => setOpen((value) => !value)}>
              {commentCountLabel} <span className={`sf-comments-chev ${open ? "open" : ""}`}>{content.chevronGlyph}</span>
            </button>
          </div>

          {renderCommentsPanel(false, open)}
        </article>
      </div>

      {portalRoot ? createPortal(overlay, portalRoot) : overlay}
    </>
  );
}

function SideCard({ post, content, onOpen }: { post: Post; content: typeof appStrings.blog; onOpen: (post: Post) => void }) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(post);
    }
  };

  return (
    <article
      className="sf-side-card"
      onClick={() => onOpen(post)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="sf-side-img-wrap">
        <img src={post.image} alt={post.title} className="sf-side-img" />
        <span className="sf-side-tag">{post.tag}</span>
      </div>
      <div className="sf-side-body">
        <h4 className="sf-side-title">{post.title}</h4>
        <span className="sf-side-date">{formatDate(post.date)}</span>
      </div>
    </article>
  );
}

const LOOP_COUNT = 1;

let hasRefreshedThisSession = false;

/**
 * Module-level image cache: persists across React remounts and tab switches
 * for the lifetime of the browser session. Keys are post IDs, values are
 * fully-converted Base64 data URL strings.
 */
const imageCache = new Map<string, string>();

function getCachedImage(postId: string, rawImage: string): string {
  if (imageCache.has(postId)) return imageCache.get(postId)!;
  // Fall back to sessionStorage (survives page navigation but not tab close).
  const sessionKey = `blog-img:${postId}`;
  const stored = window.sessionStorage.getItem(sessionKey);
  if (stored) {
    imageCache.set(postId, stored);
    return stored;
  }
  // Convert and cache for the rest of the session.
  const converted = byteaToBase64DataUrl(rawImage);
  imageCache.set(postId, converted);
  try {
    window.sessionStorage.setItem(sessionKey, converted);
  } catch {
    // sessionStorage quota exceeded — memory cache still works.
  }
  return converted;
}

export default function BlogPage() {
  const { blog: content } = appStrings;
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const cached = window.localStorage.getItem("blog-cached-posts");
      if (!cached) return [];
      const parsed: Post[] = JSON.parse(cached);
      // Restore images: __cached__<id> placeholders → actual data URLs from memory/session cache.
      return parsed.map((p) => {
        const imageValue = p.image.startsWith("__cached__") ? getCachedImage(p.id, "") : getCachedImage(p.id, p.image);
        return { ...p, image: imageValue };
      });
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    const cached = window.localStorage.getItem("blog-cached-posts");
    return !cached;
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pendingScrollResetRef = useRef(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [likeError, setLikeError] = useState<string | null>(null);
  const [userIp, setUserIp] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem("blog-client-ip") || "";
  });
  const [username, setUsername] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_USERNAME;
    const initialIp = window.sessionStorage.getItem("blog-client-ip");
    if (initialIp) {
      return readStoredUsername(initialIp);
    }
    return window.localStorage.getItem("blog-last-username") || DEFAULT_USERNAME;
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [commentsMap, setCommentsMap] = useState<Record<string, Array<{ username: string; text: string }>>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const cached = window.localStorage.getItem("blog-cached-comments");
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });
  const [selectedPostCommentDraft, setSelectedPostCommentDraft] = useState("");
  const vpRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const mountKey = useRef(String(Date.now())).current;

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchDataFromServer = async (showPageLoadingState: boolean) => {
    try {
      if (showPageLoadingState) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setFetchError(null);
      const [livePosts, liveComments] = await Promise.all([
        getBlogPosts(),
        getBlogComments(),
      ]);

      if (!isMountedRef.current) return;

      // Populate the image cache from fresh data, then strip large image blobs
      // before persisting posts to localStorage (avoids quota errors).
      const postsForCache = livePosts.map((p) => {
        // Warm the in-memory + sessionStorage cache for each post's image.
        imageCache.set(p.id, p.image);
        try {
          window.sessionStorage.setItem(`blog-img:${p.id}`, p.image);
        } catch {
          // sessionStorage quota exceeded — memory cache still covers it.
        }
        // Store a placeholder so we know the key exists but don't bloat localStorage.
        return { ...p, image: `__cached__${p.id}` };
      });

      setPosts(livePosts);
      try {
        window.localStorage.setItem("blog-cached-posts", JSON.stringify(postsForCache));
      } catch {
        // localStorage quota exceeded — clear stale posts cache and retry without images.
        window.localStorage.removeItem("blog-cached-posts");
      }

      const commentsByPost: Record<string, Array<{ username: string; text: string }>> = {};
      liveComments.forEach((comment) => {
        if (!commentsByPost[comment.postId]) {
          commentsByPost[comment.postId] = [];
        }
        commentsByPost[comment.postId].push({
          username: comment.username,
          text: comment.text,
        });
      });
      setCommentsMap(commentsByPost);
      window.localStorage.setItem("blog-cached-comments", JSON.stringify(commentsByPost));
    } catch (error) {
      if (!isMountedRef.current) return;
      console.error("Failed to load blog posts or comments", error);
      setFetchError("Unable to load posts right now.");
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  const handleAddComment = async (postId: string, text: string) => {
    const commentUser = username;
    setCommentsMap((prev) => {
      const updated = {
        ...prev,
        [postId]: [...(prev[postId] || []), { username: commentUser, text }],
      };
      window.localStorage.setItem("blog-cached-comments", JSON.stringify(updated));
      return updated;
    });

    try {
      await createBlogComment(postId, commentUser, text);
    } catch (error) {
      console.error("Failed to post comment to database:", error);
      setCommentsMap((prev) => {
        const postList = prev[postId] || [];
        const index = [...postList].reverse().findIndex(
          (c) => c.username === commentUser && c.text === text
        );
        if (index !== -1) {
          const actualIndex = postList.length - 1 - index;
          const updatedList = [...postList];
          updatedList.splice(actualIndex, 1);
          const updated = { ...prev, [postId]: updatedList };
          window.localStorage.setItem("blog-cached-comments", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }
  };

  const tiled = useMemo(() => {
    const out: Array<Post & { _key: string; _origIndex: number }> = [];
    if (!posts.length) return out;
    for (let block = 0; block < LOOP_COUNT; block++) {
      posts.forEach((post, index) => out.push({ ...post, _key: `${post.id}-${block}`, _origIndex: index }));
    }
    return out;
  }, [posts]);

  const sideItems = useMemo(() => (posts.length ? seededShuffle(posts, 11) : []), [posts]);

  useEffect(() => {
    // Load IP and likes/username from storage (always runs).
    const loadStoredData = async () => {
      const resolvedIp = await resolveClientIp();
      if (!isMountedRef.current) return;
      setUserIp(resolvedIp);
      const storedLikes = readStoredLikes(resolvedIp);
      if (Object.keys(storedLikes).length) {
        setLikes(storedLikes);
      }
      // Refine username now that we have the actual IP-keyed value.
      const storedUsername = readStoredUsername(resolvedIp);
      setUsername(storedUsername);
    };

    loadStoredData();

    // Fetch from server only when posts OR comments cache is absent.
    const hasCachedPosts = !!window.localStorage.getItem("blog-cached-posts");
    const hasCachedComments = !!window.localStorage.getItem("blog-cached-comments");
    if (!hasCachedPosts || !hasCachedComments) {
      hasRefreshedThisSession = true;
      fetchDataFromServer(true);
    } else if (!hasRefreshedThisSession) {
      hasRefreshedThisSession = true;
      fetchDataFromServer(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const element = vpRef.current;
    if (!element) return;
    requestAnimationFrame(() => {
      const blockHeight = element.scrollHeight / LOOP_COUNT;
      element.scrollTop = blockHeight * Math.floor(LOOP_COUNT / 2);
    });
  }, []);

  useEffect(() => {
    // After a refresh, reset scroll to top once the new posts have rendered.
    if (pendingScrollResetRef.current) {
      pendingScrollResetRef.current = false;
      requestAnimationFrame(() => {
        const element = vpRef.current;
        if (!element) return;
        const blockHeight = element.scrollHeight / LOOP_COUNT;
        element.scrollTop = blockHeight * Math.floor(LOOP_COUNT / 2);
      });
    }
  }, [tiled]);

  useEffect(() => {
    const root = vpRef.current;
    if (!root) return;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.intersectionRatio > 0.6) {
            element.classList.add("active");
          } else {
            element.classList.remove("active");
          }
        });
      },
      { root, threshold: [0, 0.6, 1] }
    );
    slideRefs.current.forEach((element) => element && intersectionObserver.observe(element));
    return () => intersectionObserver.disconnect();
  }, [tiled]);

  const toggleLike = async (postId: string) => {
    if (!postId) {
      return;
    }

    const isCurrentlyLiked = !!likes[postId];
    const nextDelta = isCurrentlyLiked ? -1 : 1;
    const nextLikedState = !isCurrentlyLiked;

    // Optimistically flip the liked state so the UI feels instant.
    setLikes((previous) => ({ ...previous, [postId]: nextLikedState }));

    try {
      setLikeError(null);
      const resolvedIp = userIp || (await resolveClientIp());
      const nextLikes = await updateBlogPostLikes(postId, nextDelta);

      // Sync localStorage with the final confirmed like state.
      const persistedLikes = readStoredLikes(resolvedIp);
      writeStoredLikes(resolvedIp, { ...persistedLikes, [postId]: nextLikedState });
      if (resolvedIp !== userIp) setUserIp(resolvedIp);

      if (typeof nextLikes === "number") {
        setPosts((previous) => {
          const updated = previous.map((post) => (post.id === postId ? { ...post, likes: nextLikes } : post));
          // Keep cached posts in sync with the confirmed like count (strip image blobs).
          try {
            const postsForCache = updated.map((p) => ({ ...p, image: `__cached__${p.id}` }));
            window.localStorage.setItem("blog-cached-posts", JSON.stringify(postsForCache));
          } catch {
            window.localStorage.removeItem("blog-cached-posts");
          }
          return updated;
        });
      }
    } catch (error) {
      // Roll back the optimistic update on failure.
      setLikes((previous) => ({ ...previous, [postId]: isCurrentlyLiked }));
      const message = error instanceof Error ? error.message : "Failed to update likes";
      console.error("Failed to update likes", error);
      setLikeError(message.includes("permission") || message.includes("policy") || message.includes("row-level")
        ? "Likes could not be saved to Supabase because the table is blocking updates. Enable an update policy for the blog table in Supabase."
        : message);
    }
  };

  const handleRefresh = async () => {
    pendingScrollResetRef.current = true;
    await fetchDataFromServer(false);
  };

  const handleEditUsername = () => {
    setUsernameInput(username === DEFAULT_USERNAME ? "" : username);
    setUsernameError("");
    setShowUsernameModal(true);
    // Focus the input after the modal renders
    setTimeout(() => usernameInputRef.current?.focus(), 30);
  };

  const handleConfirmUsername = () => {
    const trimmed = usernameInput.trim();
    if (!trimmed) {
      setUsernameError("Username cannot be empty.");
      usernameInputRef.current?.focus();
      return;
    }
    const next = trimmed.toUpperCase();
    setUsername(next);
    writeStoredUsername(userIp || "unknown", next);
    setShowUsernameModal(false);
  };

  const handleCancelUsername = () => {
    setShowUsernameModal(false);
    setUsernameError("");
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const closeSelectedPost = () => {
    setSelectedPost(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (showUsernameModal) {
      document.body.style.overflow = "hidden";
    } else if (!selectedPost) {
      document.body.style.overflow = "";
    }
  }, [showUsernameModal, selectedPost]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isAnon = !username || username === DEFAULT_USERNAME;

  return (
    <div className="sf-root">
      <style>{BLOG_PAGE_STYLES}</style>

      <header className="sf-header">
        <span className="sf-eyebrow">{content.eyebrow}</span>
        {likeError ? <p className="sf-empty-state" style={{ marginTop: 8 }}>{likeError}</p> : null}
        <h1 className="sf-h1">
          <GlitchText text={content.titleLine1} animateOnMount animateKey={mountKey} />{" "}<span className="y"><GlitchText text={content.titleLine2} animateOnMount animateKey={mountKey} /></span>
        </h1>
        <button
          className={`sf-username-btn${isAnon ? " anon" : ""}`}
          onClick={handleEditUsername}
          aria-label="Set your username"
          title="Click to set your username"
        >
          <span className="sf-username-avatar">{getUserInitials(username)}</span>
          <span className="sf-username-label">{username}</span>
          <span className="sf-username-edit">✎</span>
        </button>
        <button
          className={`sf-refresh-btn${isRefreshing ? " refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label={content.refreshAriaLabel}
        >
          <span className={`sf-refresh-icon${isRefreshing ? " spinning" : ""}`} aria-hidden="true">↻</span>
          <span>{isRefreshing ? "REFRESHING..." : content.refreshLabel}</span>
        </button>
      </header>

      {showUsernameModal && typeof document === "object" ? createPortal(
        <div
          className="sf-umodal-backdrop"
          onClick={handleCancelUsername}
          onKeyDown={(e) => e.key === "Escape" && handleCancelUsername()}
          role="dialog"
          aria-modal="true"
          aria-label="Edit username"
        >
          <div className="sf-umodal" onClick={(e) => e.stopPropagation()}>
            <button className="sf-umodal-close" onClick={handleCancelUsername} aria-label="Close">✕</button>
            <div>
              <span className="sf-umodal-label">{"// IDENTITY"}</span>
              <p className="sf-umodal-title">SET USERNAME</p>
            </div>
            <input
              ref={usernameInputRef}
              className={`sf-umodal-input${usernameError ? " error" : ""}`}
              type="text"
              placeholder="e.g. JUAN DELA CRUZ"
              value={usernameInput}
              maxLength={32}
              onChange={(e) => { setUsernameInput(e.target.value); setUsernameError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmUsername()}
              autoComplete="off"
            />
            <p className="sf-umodal-hint">{usernameError}</p>
            <div className="sf-umodal-actions">
              <button className="sf-umodal-cancel" onClick={handleCancelUsername}>CANCEL</button>
              <button
                className="sf-umodal-confirm"
                onClick={handleConfirmUsername}
                disabled={!usernameInput.trim()}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>,
        document.body
      ) : null}

      {selectedPost ? (() => {
        // Always derive the live post from `posts` so the like count stays
        // up-to-date after toggleLike updates state — the snapshot stored in
        // `selectedPost` would otherwise show a stale count.
        const livePost = posts.find((p) => p.id === selectedPost.id) ?? selectedPost;
        const postComments = commentsMap[livePost.id] || [];
        const isAnon = !username || username === DEFAULT_USERNAME;

        const handleAddSelectedPostComment = () => {
          const text = selectedPostCommentDraft.trim();
          if (!text) return;
          handleAddComment(livePost.id, text);
          setSelectedPostCommentDraft("");
        };

        return (
          <div className="sf-fullpage" onClick={closeSelectedPost}>
            <div className="sf-fullpage-card" onClick={(event) => event.stopPropagation()}>
              <button className="sf-fullpage-close" onClick={closeSelectedPost} aria-label={content.fullPostCloseLabel}>
                {content.fullPostCloseLabel}
              </button>
              <div className="sf-fullpage-scroll">
                <header className="sf-post-head">
                  <div className="sf-avatar">{content.avatarLabel}</div>
                  <div className="sf-post-head-text">
                    <span className="sf-post-author">{content.author}</span>
                    <span className="sf-post-date">
                      {formatDate(livePost.date)} · <span className="sf-post-tag">{livePost.tag}</span>
                    </span>
                  </div>
                </header>

                <h2 className="sf-fullpage-title">{livePost.title}</h2>

                <div className="sf-fullpage-img-wrap">
                  <img src={livePost.image} alt={livePost.title} className="sf-fullpage-img" />
                </div>

                {livePost.text ? <div className="sf-fullpage-text sf-md-body">{renderMarkdown(livePost.text)}</div> : null}

                <div className="sf-post-foot">
                  <HeartButton
                    liked={!!likes[livePost.id]}
                    count={livePost.likes}
                    onToggle={() => toggleLike(livePost.id)}
                  />
                  <span className="sf-fullpage-comment-count">{`${livePost.comments + postComments.length} ${content.commentsLabel}`}</span>
                </div>

                <div className="sf-comments-panel" style={{ maxHeight: "260px" }}>
                  <div className="sf-comments-panel-inner">
                    {postComments.length === 0 ? (
                      <p className="sf-comments-empty">{content.commentsEmpty}</p>
                    ) : (
                      <ul className="sf-comments-list">
                        {postComments.map((comment, index) => (
                          <CommentItem key={index} comment={comment} />
                        ))}
                      </ul>
                    )}
                    <div className="sf-comment-input-row">
                      {isAnon ? (
                        <p className="sf-comment-anon-notice">Set a username to leave a comment.</p>
                      ) : (
                        <>
                          <input
                            className="sf-comment-input"
                            type="text"
                            placeholder={content.commentPlaceholder}
                            value={selectedPostCommentDraft}
                            onChange={(e) => setSelectedPostCommentDraft(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddSelectedPostComment()}
                          />
                          <button className="sf-comment-post" onClick={handleAddSelectedPostComment}>
                            {content.commentButton}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })() : null}

      <div className="sf-body">
        <div className="sf-left">
          <div className="sf-left-vp" ref={vpRef}>
            {isLoading ? (
              <div className="sf-empty-state">
                <p>Loading blog posts…</p>
              </div>
            ) : tiled.length > 0 ? (
              tiled.map((post, index) => (
                <FeedSlide
                  key={post._key}
                  post={post}
                  liked={!!likes[post.id]}
                  likeCount={post.likes}
                  onToggleLike={() => toggleLike(post.id)}
                  registerRef={(element) => {
                    slideRefs.current[index] = element;
                  }}
                  content={content}
                  username={username}
                  comments={commentsMap[post.id] || []}
                  onAddComment={(text) => handleAddComment(post.id, text)}
                />
              ))
            ) : (
              <div className="sf-empty-state">
                <p>{fetchError ?? content.emptyState}</p>
              </div>
            )}
          </div>
        </div>

        <aside className="sf-right">
          <span className="sf-right-label">{content.archiveLabel}</span>
          {isLoading ? (
            <p className="sf-empty-side">Loading blog posts…</p>
          ) : sideItems.length > 0 ? (
            sideItems.map((post) => <SideCard key={post.id} post={post} content={content} onOpen={handleSelectPost} />)
          ) : (
            <p className="sf-empty-side">{fetchError ?? content.emptyState}</p>
          )}
        </aside>
      </div>
    </div>
  );
}
