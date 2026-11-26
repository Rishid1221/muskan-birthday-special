# Background music

This folder is just documentation — the actual file goes in
`public/audio/bg-music.mp3` (served by the dev/build server as a plain
static URL at `/audio/bg-music.mp3`, so a missing file never breaks the
build).

Keep it short (looping, 30s–2min) and soft — it loops automatically and
starts only after the user's first tap (browsers block autoplay, and the
brief asks for no autoplay before interaction anyway).

If no file is present, the music toggle still renders but simply has
nothing to play — the rest of the site works fine without it.
