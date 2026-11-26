# Your supplied images

Drop these three files here with these exact names. They're picked up
automatically — no code changes needed, and the site works fine with
coded placeholders in the meantime if a file isn't here yet.

| filename | used for |
|---|---|
| `birthday-background.png` | full-screen background on desktop/tablet (Hello Kitty decorations, curtains, fairy lights, bows, hearts) |
| `birthday-background-mobile.png` | full-screen background on narrow phones — a dedicated portrait crop, auto-generated from the file above |
| `barbie-cake.png` | the cake, in both the candle scene and the cutting scene |
| `bouquet.png` | the bouquet in the Gift Reveal scene |
| `envelope.png` | the sealed envelope in the Letter scene |

Notes:
- `birthday-background.png`: shown with `background-size: contain` above
  640px width, since it's a frame-style landscape image (decorations on the
  edges, blank centre for content) — `cover` would crop the corner
  characters off on most desktop/tablet ratios. If it has a cake baked into
  the artwork, consider retouching that area out since a separate animated
  cake renders on top of it in the candle/cutting scenes.
- `birthday-background-mobile.png`: used below 640px width with
  `background-size: cover` instead. The original is landscape (1672×941);
  a plain portrait phone screen is such a different shape that neither
  `contain` (blank bars top/bottom) nor `cover` on the original (crops away
  one whole side's decorations) looks right directly, so this is a
  generated **portrait recomposition**, not a simple crop: the top band
  (garland, centre bow, hanging tag/heart) and bottom band (both Hello
  Kitty figures, gift boxes, tablecloth trim) are kept at their original
  size and position on both the left AND right edges, and only the plain
  curtain + blank-centre strip between them is extended (tiled/stretched)
  to reach a tall portrait aspect (~0.46, matching a typical phone). Net
  result: both curtains, both Hello Kitty corners, and a clean centre
  column for the cake/text are all visible with no blank bars and no
  character cropped off. If you'd rather supply your own ready-made
  portrait background instead, just replace this file at the same name —
  it's used as-is with no further processing.
- `barbie-cake.png`: transparent background, ~900px wide. The candles are
  separate animated elements layered on top of this image, centered
  horizontally above it.
- `bouquet.png`: transparent cutout, floats borderless at ~160–192px wide.
  If your source photo has an opaque background (or a design-tool
  checkerboard baked in as real pixels instead of true alpha), it needs to
  be matted to transparent first — see `src/components/decor/Bouquet.jsx`
  for the drop-shadow treatment used here.
- `envelope.png`: transparent cutout of a sealed envelope, ~256–288px wide.
  The whole image tips back/fades on open (rather than only an inner flap)
  since this is a single flat image, not separate flap/body layers.
