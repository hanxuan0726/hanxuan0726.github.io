# Replaceable public assets

- `images/portrait-placeholder.svg`: explicit avatar placeholder. Add a real portrait and update `site.portrait`, `portraitAlt`, and `portraitIsPlaceholder`.
- `images/so101-placeholder.svg`, `images/remote-control-placeholder.svg`: original schematic placeholders, not experiment evidence. Replace and set each project's `imageIsPlaceholder` to `false`.
- `files/`: add your actual CV PDF, then set `site.cv` to `/files/hanxuan-zhou-cv.pdf`.
- `images/og.png`: 1200×630 social cover, rendered locally from the editable `images/og.svg`. Update both when changing the cover.

All asset URLs begin at `/` for the username GitHub Pages repository. No fake portrait, CV, or research photo is supplied.
