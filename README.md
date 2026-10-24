# Glorious Life Academy

Responsive static website for Glorious Life Academy, a school serving learners from Nursery (ABC) to 9th Grade. All content is based on the supplied academy brief.

## Pages

- `index.html` — home page with animated "ABC to 9th Grade" learning journey and interactive educational values
- `academics.html` — class levels (Nursery, K1, K2, Grades 1–9) and an interactive explorer for the four learning stages; link to a stage with `academics.html#early`, `#lower`, `#upper` or `#junior`
- `about.html`, `governance.html`, `commitment.html`, `sponsor.html`
- `leadership.html` — searchable, filterable leadership directory (Board of Directors / Administration)
- `404.html` — custom not-found page (served automatically by GitHub Pages)

## Running

Open `index.html`, or serve this directory with any static server (for example `python3 -m http.server`). There is no build step and no external runtime dependency. Enable GitHub Pages from the main branch root to publish.

When `styles.css` or `script.js` change, bump the `?v=` query string in every page so browsers fetch the new version.

## Assets

Logo, leadership portraits, and the student photograph in `assets/` were supplied by the Academy. No admissions or contact details have been supplied yet; add a contact section once they are available.

Animations are CSS/vanilla JS only and switch off automatically for visitors who prefer reduced motion.
