import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/**
 * Converts a Postgres bytea hex string (e.g. "\xffd8ff...") returned by Supabase
 * into a Base64-encoded data URL suitable for use in <img src>.
 * Falls back to returning the original value if it is already a URL or data URL.
 */
export function byteaToBase64DataUrl(value: unknown): string {
  if (typeof value !== "string" || !value) return "";

  // Already a URL or data URL — pass through unchanged.
  if (
    value.startsWith("data:") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  ) {
    return value;
  }

  // Postgres bytea hex escape format: "\x<hex>"
  if (value.startsWith("\\x")) {
    const hex = value.slice(2);
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }

    // Detect MIME type from magic bytes.
    let mimeType = "image/jpeg";
    if (bytes.length >= 4) {
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
        mimeType = "image/png";
      } else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
        mimeType = "image/gif";
      } else if (
        bytes.length >= 12 &&
        bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
        bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
      ) {
        mimeType = "image/webp";
      }
      // 0xFF 0xD8 → JPEG (default)
    }

    // Convert Uint8Array to Base64 without exceeding call-stack limits.
    let binary = "";
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunkSize)));
    }

    return `data:${mimeType};base64,${btoa(binary)}`;
  }

  return value;
}

function toStringValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function toNumberValue(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function normalizePostId(postId: string) {
  const parsed = Number(postId);
  return Number.isFinite(parsed) ? parsed : postId;
}

export async function getBlogPosts() {
  if (!supabase) {
    return [];
  }

  const tableName = process.env.REACT_APP_SUPABASE_POSTS_TABLE || "post";
  const { data, error } = await supabase.from(tableName).select("id, date, title, text, image, tag, likes").order("date", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: toStringValue(row.id ?? ""),
    date: toStringValue(row.date ?? ""),
    title: toStringValue(row.title ?? "Untitled post"),
    text: toStringValue(row.text ?? ""),
    image: byteaToBase64DataUrl(row.image ?? ""),
    tag: toStringValue(row.tag ?? "Blog"),
    comments: 0,
    likes: toNumberValue(row.likes),
  }));
}

export async function updateBlogPostLikes(postId: string, delta: number) {
  if (!supabase) {
    return null;
  }

  const tableName = process.env.REACT_APP_SUPABASE_POSTS_TABLE || "post";
  const normalizedPostId = normalizePostId(postId);
  const { data, error: loadError } = await supabase.from(tableName).select("likes").eq("id", normalizedPostId).maybeSingle();

  if (loadError) {
    throw loadError;
  }

  const currentLikes = toNumberValue(data?.likes);
  const nextLikes = Math.max(0, currentLikes + delta);
  const { error: updateError } = await supabase.from(tableName).update({ likes: nextLikes }).eq("id", normalizedPostId);

  if (updateError) {
    throw updateError;
  }

  return nextLikes;
}

export async function getBlogComments() {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("comment")
    .select("id, post_id, name, comment")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: toStringValue(row.id ?? ""),
    postId: toStringValue(row.post_id ?? ""),
    username: toStringValue(row.name ?? "ANONYMOUS"),
    text: toStringValue(row.comment ?? ""),
  }));
}

export async function createBlogComment(postId: string, name: string, commentText: string) {
  if (!supabase) {
    return null;
  }

  const normalizedPostId = normalizePostId(postId);
  const { data, error } = await supabase
    .from("comment")
    .insert({
      post_id: normalizedPostId,
      name: name,
      comment: commentText,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
