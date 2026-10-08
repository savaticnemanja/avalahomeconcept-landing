export const imageUrl = (filename) => (filename ? `/uploads/${filename}` : '');

// Downscaled WebP copies of uploads, generated on first request and cached on
// disk by src/app/thumbs/[w]/[file]/route.js. Use them wherever an upload is
// shown smaller than full size (grids, cards, strips); keep imageUrl() for
// lightboxes / zoom where the original resolution matters.
export const THUMB_WIDTHS = [480, 960];

export const thumbUrl = (filename, width = THUMB_WIDTHS[0]) =>
  filename ? `/thumbs/${width}/${filename}` : '';

export const thumbSrcSet = (filename) =>
  filename ? THUMB_WIDTHS.map((w) => `${thumbUrl(filename, w)} ${w}w`).join(', ') : undefined;
