# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- Design reference: @design.md — read it before UI work.
- After edits to copy or components, run `npm run build` and `npm run check:i18n` and report failures plainly.
- Many files contain non-ASCII text (Japanese, Korean, Thai, Arabic, Russian). Prefer the Edit tool for small changes; use scripts only for mechanical changes that apply identically to all 12 languages, and re-run `npm run check:i18n` afterwards.
- Before renaming the brand, changing the domain, or changing what is stored in the browser, grep for every occurrence (`src`, `public`, `README.md`, `astro.config.mjs`) and update the Privacy policy / FAQ accordingly.
- Do not commit or push unless asked.
