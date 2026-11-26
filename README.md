# Muskan's Birthday Surprise 🎀

A six-scene interactive birthday experience: Welcome → Cake & Candles →
Cake Cutting → Gift Reveal → Letter → Final Celebration.

## Running it

```
npm install
npm run dev
```

Then open the printed `localhost` URL.

## Editing the text

All copy (greetings, the letter, headings, button labels) lives in one
file: **`src/data/content.js`**. Edit it directly — no component changes
needed.

## Replacing placeholder art with your own images

Every illustration (stickers, cake, bouquet) is hand-coded in CSS/SVG by
default, so the site looks complete with nothing supplied. Drop a
correctly-named image into the matching `public/` folder below and it
**automatically replaces the coded placeholder on next reload — no code
edits required.** If the file is missing, the coded version just keeps
showing. The gift box is an exception — it's permanently hand-coded in CSS
(base + lid as two real, separately-animated layers), by request, with no
image asset slot.

| Folder | File(s) to add | Details |
|---|---|---|
| `public/images/` | `birthday-background.png`, `barbie-cake.png`, `bouquet.png` | see `public/images/README.md` |
| `public/stickers/` | `bow-1.png`, `bow-2.png`, `heart-1.png`, `heart-2.png`, `sparkle-1.png`, `sparkle-2.png`, `star-1.png`, `hero-bow.png` | see `public/stickers/README.md` |
| `public/audio/` | `bg-music.mp3` | background music, muted-by-default toggle top-right |

Do not use copyrighted character art (e.g. actual Sanrio/Hello Kitty
images) if you plan to share this site publicly — all coded placeholders
are original shapes, not licensed characters.

## Tech stack

React + Vite, Tailwind CSS v4, Framer Motion, Lucide icons, canvas-confetti.
No backend, no database, no deployment configured.
