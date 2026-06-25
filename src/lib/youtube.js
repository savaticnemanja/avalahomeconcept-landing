// Helpers for referencing YouTube videos as gallery items. A youtube-kind
// GalleryImage stores only the 11-char video id in its `filename` column.

const ID_RE = /^[A-Za-z0-9_-]{11}$/;

// Accepts a full YouTube URL (watch / youtu.be / embed / shorts) or a bare id
// and returns the canonical 11-char video id, or null if it can't be parsed.
export const parseYouTubeId = (input) => {
  const raw = (input ?? '').toString().trim();
  if (!raw) return null;
  if (ID_RE.test(raw)) return raw;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      return ID_RE.test(id) ? id : null;
    }
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const v = url.searchParams.get('v');
      if (v && ID_RE.test(v)) return v;
      const parts = url.pathname.split('/').filter(Boolean); // embed/<id>, shorts/<id>, v/<id>
      const id = parts[1] ?? parts[0];
      return ID_RE.test(id) ? id : null;
    }
  } catch {
    // not a URL — fall through
  }
  return null;
};

export const youtubeEmbedUrl = (id, { autoplay = false } = {}) =>
  `https://www.youtube.com/embed/${id}${autoplay ? '?autoplay=1' : ''}`;

export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
