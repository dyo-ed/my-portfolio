export const BLOG_PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&family=Bebas+Neue&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
  ::selection { background: #FFE600; color: #0a0a0a; }

  .sf-root {
    background: #0a0a0a;
    color: #f0f0f0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Space Mono', monospace;
    overflow: hidden;
    position: relative;
  }
  .sf-root::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.022) 2px, rgba(0,0,0,0.022) 4px
    );
  }

  .sf-header { flex-shrink: 0; padding: 40px 52px 24px; border-bottom: 1px solid #161616; position: relative; overflow: hidden; z-index: 10; }
  .sf-eyebrow { font-size: 9px; letter-spacing: 6px; color: #FFE600; display: block; margin-bottom: 10px; }
  .sf-h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(44px, 6.5vw, 80px); line-height: 0.88; letter-spacing: -1px; }
  .sf-h1 .y { color: #FFE600; }
  .sf-refresh-btn {
    position: absolute; right: 48px; bottom: 24px;
    border: 1px solid #1f1f1f; background: #0c0c0c; color: #bdbdbd;
    display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;
    font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 1.5px; padding: 8px 12px;
    transition: border-color 0.2s, color 0.2s;
  }
  .sf-refresh-btn:hover { border-color: #666; color: #eee; }
  .sf-refresh-btn.refreshing { border-color: #FFE600; color: #FFE600; opacity: 0.7; cursor: not-allowed; }
  .sf-refresh-icon { font-size: 12px; line-height: 1; display: inline-block; }
  .sf-refresh-icon.spinning { animation: sf-spin 0.7s linear infinite; }
  @keyframes sf-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .sf-username-btn {
    position: absolute; right: 48px; bottom: 80px;
    border: 1px solid #1f1f1f; background: #0c0c0c; color: #bdbdbd;
    display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
    font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 1.5px; padding: 7px 12px;
    transition: border-color 0.2s, color 0.2s;
  }
  .sf-username-btn:hover { border-color: #666; color: #eee; }
  .sf-username-btn.anon { border-color: #2a2a14; color: #8a8a6a; }
  .sf-username-btn.anon:hover { border-color: #FFE600; color: #FFE600; }
  .sf-username-avatar {
    width: 18px; height: 18px; background: #1c1c1c; color: #FFE600;
    display: flex; align-items: center; justify-content: center;
    font-size: 8px; letter-spacing: 0; font-weight: 700; flex-shrink: 0;
  }
  .sf-username-btn.anon .sf-username-avatar { background: #141410; color: #6a6a50; }
  .sf-username-label { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sf-username-edit { font-size: 11px; opacity: 0.5; flex-shrink: 0; }
  .sf-username-btn:hover .sf-username-edit { opacity: 1; }

  /* Username edit modal */
  .sf-umodal-backdrop {
    position: fixed; inset: 0; background: rgba(4,4,4,0.88);
    z-index: 200000; display: flex; align-items: center; justify-content: center;
    animation: sf-fade-in 0.12s ease;
  }
  .sf-umodal {
    width: min(400px, 92vw); background: #0c0c0c; border: 1px solid #2a2a2a;
    padding: 32px 30px 28px; display: flex; flex-direction: column; gap: 20px;
    position: relative;
  }
  .sf-umodal-close {
    position: absolute; top: 14px; right: 14px; background: none; border: 1px solid #222;
    color: #555; width: 28px; height: 28px; font-size: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.15s, color 0.15s;
  }
  .sf-umodal-close:hover { border-color: #FFE600; color: #FFE600; }
  .sf-umodal-label {
    font-size: 8.5px; letter-spacing: 4px; color: #FFE600; display: block;
    font-family: 'Space Mono', monospace;
  }
  .sf-umodal-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px;
    color: #eee; margin: 2px 0 0;
  }
  .sf-umodal-input {
    width: 100%; background: #101010; border: 1px solid #252525; color: #eee;
    font-family: 'Space Mono', monospace; font-size: 13px; letter-spacing: 1px;
    padding: 12px 14px; outline: none; transition: border-color 0.15s;
    text-transform: uppercase;
  }
  .sf-umodal-input::placeholder { color: #2e2e2e; text-transform: none; }
  .sf-umodal-input:focus { border-color: #FFE600; }
  .sf-umodal-input.error { border-color: #c0392b; }
  .sf-umodal-hint { font-size: 9px; letter-spacing: 1px; color: #c0392b; min-height: 14px; }
  .sf-umodal-actions { display: flex; gap: 10px; justify-content: flex-end; }
  .sf-umodal-cancel {
    background: none; border: 1px solid #222; color: #555;
    font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px;
    padding: 9px 18px; cursor: pointer; transition: border-color 0.15s, color 0.15s;
  }
  .sf-umodal-cancel:hover { border-color: #555; color: #aaa; }
  .sf-umodal-confirm {
    background: #FFE600; border: none; color: #0a0a0a;
    font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; font-weight: 700;
    padding: 9px 20px; cursor: pointer; transition: opacity 0.15s;
  }
  .sf-umodal-confirm:hover { opacity: 0.85; }
  .sf-umodal-confirm:disabled { opacity: 0.3; cursor: not-allowed; }

  .sf-comment-anon-notice {
    font-size: 9px; letter-spacing: 1px; color: #444; padding: 8px 0;
    font-style: italic;
  }

  .sf-body { flex: 1; display: grid; grid-template-columns: 2.2fr 1fr; min-height: 0; }

  .sf-left {
    position: relative;
    min-height: 0;
    border-right: 1px solid #161616;
    overflow: hidden;
    background: #0a0a0a;
  }
  .sf-left::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.25;
  }
  .sf-left::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
    z-index: 5;
  }
  .sf-left::after { top: 0; background: linear-gradient(to bottom, #0a0a0a, transparent); }
  .sf-left::after { bottom: 0; background: linear-gradient(to top, #0a0a0a, transparent); }
  .sf-left-vp {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scrollbar-width: none;
  }
  .sf-left-vp::-webkit-scrollbar { display: none; }

  .sf-slide {
    height: 100%;
    scroll-snap-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }
  .sf-post {
    width: min(560px, 90%);
    border: 1px solid #1a1a1a;
    background: #0c0c0c;
    padding: 20px 22px 18px;
    opacity: 0.32;
    transform: scale(0.92);
    filter: blur(1px);
    transition: opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease, border-color 0.35s;
  }
  .sf-slide.active .sf-post {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    border-color: #232323;
  }

  .sf-post-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .sf-avatar {
    width: 30px; height: 30px; flex-shrink: 0;
    background: #FFE600; color: #0a0a0a; display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 1px;
  }
  .sf-post-head-text { display: flex; flex-direction: column; flex: 1; min-width: 0; }
  .sf-post-author { font-size: 10px; letter-spacing: 2px; color: #ddd; }
  .sf-post-date { font-size: 8.5px; letter-spacing: 1.5px; color: #3a3a3a; margin-top: 2px; }
  .sf-post-tag { color: #FFE600; }
  .sf-expand-btn {
    flex-shrink: 0; background: none; border: 1px solid #1c1c1c; color: #666;
    font-family: 'Space Mono', monospace; font-size: 8.5px; letter-spacing: 1.5px; padding: 6px 10px; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .sf-expand-btn:hover { border-color: #FFE600; color: #FFE600; }

  .sf-post-caption {
    font-family: 'Bebas Neue', sans-serif; font-size: 21px; letter-spacing: 0.5px; line-height: 1.08;
    color: #eee; margin-bottom: 10px;
  }
  .sf-post-text { font-size: 11px; line-height: 1.85; color: #55555f; margin-bottom: 16px; }

  .sf-post-img-wrap {
    display: block; width: 100%; height: 200px; overflow: hidden; background: #111; margin-bottom: 14px;
    position: relative; border: none; padding: 0; cursor: pointer;
  }
  .sf-post-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(45%) contrast(1.1) brightness(0.92); transition: transform 0.3s, filter 0.3s; }
  .sf-post-img-wrap:hover .sf-post-img { transform: scale(1.04); filter: grayscale(10%) contrast(1.1) brightness(1); }
  .sf-post-img-expand {
    position: absolute; top: 8px; right: 8px; width: 22px; height: 22px;
    background: rgba(10,10,10,0.65); color: #eee; font-size: 11px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
  }
  .sf-post-img-wrap:hover .sf-post-img-expand { opacity: 1; }

  .sf-lightbox {
    position: fixed; inset: 0; background: rgba(6,6,6,0.92); z-index: 100001;
    display: flex; align-items: center; justify-content: center; padding: 40px; cursor: zoom-out;
    animation: sf-fade-in 0.15s ease;
  }
  @keyframes sf-fade-in { from { opacity: 0; } to { opacity: 1; } }
  .sf-lightbox-img {
    max-width: 100%; max-height: 100%; object-fit: contain; cursor: default;
    border: 1px solid #2a2a2a;
  }
  .sf-lightbox-close {
    position: absolute; top: 24px; right: 28px; background: none; border: 1px solid #2a2a2a;
    color: #eee; width: 34px; height: 34px; font-size: 14px; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .sf-lightbox-close:hover { border-color: #FFE600; color: #FFE600; }

  .sf-fullpage {
    position: fixed; inset: 0; background: rgba(6,6,6,0.92); z-index: 100001;
    display: flex; align-items: flex-start; justify-content: center; padding: 24px;
    overflow-y: auto; animation: sf-fade-in 0.15s ease;
    scrollbar-width: none;
  }
  .sf-fullpage::-webkit-scrollbar { display: none; }
  .sf-fullpage-card {
    width: min(680px, 100%); max-height: calc(100vh - 48px); background: #0c0c0c; border: 1px solid #232323;
    position: relative; display: flex; flex-direction: column; overflow: hidden;
  }
  .sf-fullpage-scroll { overflow-y: auto; padding: 26px 30px 30px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .sf-fullpage-scroll::-webkit-scrollbar { display: none; }
  .sf-fullpage-close {
    position: sticky; top: 0; margin-left: auto; display: block; background: #0c0c0c; border: 1px solid #2a2a2a;
    color: #999; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px;
    padding: 8px 14px; cursor: pointer; transition: border-color 0.15s, color 0.15s; z-index: 2;
  }
  .sf-fullpage-close:hover { border-color: #FFE600; color: #FFE600; }
  .sf-fullpage-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 0.5px; line-height: 1.05;
    color: #eee; margin-bottom: 16px;
  }
  .sf-fullpage-img-wrap {
    display: block; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background: #111;
    margin-bottom: 18px; position: relative;
  }
  .sf-fullpage-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(35%) contrast(1.1) brightness(0.95); }
  .sf-fullpage-text { font-size: 12px; line-height: 2; color: #7a7a85; margin-bottom: 18px; }
  .sf-fullpage-comment-count { font-size: 9px; letter-spacing: 1.5px; color: #999; }

  @media (max-width: 600px) {
    .sf-fullpage { padding: 0; }
    .sf-fullpage-card { width: 100%; max-height: 100vh; height: 100vh; border: none; }
    .sf-fullpage-title { font-size: 24px; }
  }

  .sf-post-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid #161616; }
  .sf-heart {
    display: flex; align-items: center; gap: 7px; background: none; border: none; cursor: pointer;
    color: #4a4a4a; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 1px;
    transition: color 0.15s, transform 0.1s;
  }
  .sf-heart:hover { color: #999; }
  .sf-heart.liked { color: #FFE600; }
  .sf-heart:active { transform: scale(0.9); }
  .sf-comments-toggle {
    display: flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer;
    color: #999; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 1.5px;
    transition: color 0.15s;
  }
  .sf-comments-toggle:hover { color: #FFE600; }
  .sf-comments-chev { transition: transform 0.2s; display: inline-block; }
  .sf-comments-chev.open { transform: rotate(180deg); color: #FFE600; }

  .sf-comments-panel { overflow: hidden; transition: max-height 0.3s ease; }
  .sf-comments-panel-inner { padding-top: 14px; }
  .sf-comments-empty { font-size: 9.5px; letter-spacing: 1px; color: #3a3a3a; margin-bottom: 12px; }
  .sf-comments-list { list-style: none; margin-bottom: 12px; display: flex; flex-direction: column; gap: 10px; max-height: 140px; overflow-y: auto; scrollbar-width: none; }
  .sf-comments-list::-webkit-scrollbar { display: none; }
  .sf-comment-item { display: flex; gap: 10px; align-items: flex-start; }
  .sf-comment-avatar {
    flex-shrink: 0; width: 22px; height: 22px; background: #1c1c1c; color: #FFE600;
    font-size: 7px; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center;
    font-family: 'Space Mono', monospace; font-weight: 700;
  }
  .sf-comment-username { color: #FFE600; font-weight: 700; margin-right: 6px; }
  .sf-comment-text { font-size: 10px; line-height: 1.6; color: #999; padding-top: 3px; }
  .sf-comment-more-btn {
    background: none; border: none; color: #FFE600; cursor: pointer;
    font-family: inherit; font-size: 8.5px; padding: 0 0 0 6px; letter-spacing: 0.5px;
    display: inline-block; vertical-align: baseline; font-weight: 700;
  }
  .sf-comment-more-btn:hover { text-decoration: underline; }
  .sf-comment-input-row { display: flex; gap: 8px; border-top: 1px solid #161616; padding-top: 12px; }
  .sf-comment-input {
    flex: 1; background: #101010; border: 1px solid #1c1c1c; color: #eee;
    font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.5px; padding: 9px 11px;
    outline: none; transition: border-color 0.15s;
  }
  .sf-comment-input::placeholder { color: #3a3a3a; }
  .sf-comment-input:focus { border-color: #FFE600; }
  .sf-comment-post {
    background: #FFE600; color: #0a0a0a; border: none; padding: 0 16px;
    font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; font-weight: 700; cursor: pointer;
    transition: opacity 0.15s;
  }
  .sf-comment-post:hover { opacity: 0.85; }

  .sf-right { min-height: 0; overflow-y: auto; scrollbar-width: none; padding: 28px 28px 60px; }
  .sf-right::-webkit-scrollbar { display: none; }
  .sf-right-label { font-size: 9px; letter-spacing: 4px; color: #333; display: block; margin-bottom: 16px; }
  .sf-empty-state, .sf-empty-side {
    padding: 24px;
    border: 1px dashed #1f1f1f;
    color: #666;
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 1.8;
    text-transform: uppercase;
  }
  .sf-empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: none;
    color: #444;
    font-size: 11px;
    letter-spacing: 2px;
  }
  .sf-side-card {
    display: flex; gap: 12px; border: 1px solid #161616; background: #0c0c0c;
    margin-bottom: 12px; padding: 10px; transition: border-color 0.2s, transform 0.2s;
  }
  .sf-side-card:hover { border-color: #2e2e2e; transform: translateX(2px); }
  .sf-side-img-wrap { position: relative; width: 68px; height: 68px; flex-shrink: 0; overflow: hidden; background: #111; }
  .sf-side-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(55%) contrast(1.1) brightness(0.9); }
  .sf-side-tag {
    position: absolute; bottom: 0; left: 0; right: 0; font-size: 6.5px; letter-spacing: 1px;
    background: rgba(10,10,10,0.85); color: #FFE600; text-align: center; padding: 2px 0;
  }
  .sf-side-body { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
  .sf-side-title {
    font-size: 10px; line-height: 1.4; letter-spacing: 0.3px; color: #bbb; font-weight: 700;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 6px;
  }
  .sf-side-date { font-size: 8px; letter-spacing: 1.5px; color: #3a3a3a; }

  @media (max-width: 860px) {
    .sf-body { grid-template-columns: 1fr; }
    .sf-left { border-right: none; }
    .sf-right { display: none; }
  }

  /* Markdown content styles */
  .sf-md-body { font-size: 12px; line-height: 2; color: #7a7a85; margin-bottom: 18px; }
  .sf-md-body strong { color: #d0d0d8; font-weight: 700; }
  .sf-md-body em { color: #a0a0aa; font-style: italic; }
  .sf-md-h2 {
    font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.5px;
    color: #eee; margin: 14px 0 6px; line-height: 1.1;
  }
  .sf-md-h3 {
    font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 0.5px;
    color: #ccc; margin: 10px 0 4px; line-height: 1.1;
  }
  .sf-md-quote {
    border-left: 2px solid #FFE600; margin: 8px 0; padding: 4px 12px;
    color: #9a9aaa; font-style: italic; background: rgba(255,230,0,0.03);
  }
  .sf-md-code {
    background: #141414; border: 1px solid #222; color: #FFE600;
    font-family: 'Space Mono', monospace; font-size: 10px;
    padding: 1px 5px; border-radius: 0;
  }
  .sf-md-line { display: block; }
`;
