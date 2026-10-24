# Glorious Life Academy

Responsive static website for Glorious Life Academy, a school serving learners from Nursery (ABC) to 9th Grade. All content is based on the supplied academy brief.

## Pages

- `index.html` — home page with animated "ABC to 9th Grade" learning journey and interactive educational values
- `academics.html` — class levels (Nursery, K1, K2, Grades 1–9) and an interactive explorer for the four learning stages; link to a stage with `academics.html#early`, `#lower`, `#upper` or `#junior`
- `about.html`, `governance.html`, `commitment.html`, `sponsor.html`
- `gallery.html` — Student Life photo gallery with category filters and a keyboard/swipe-friendly lightbox
- `admissions.html` — admissions steps, classes offered, FAQ, and a WhatsApp enquiry form
- `leadership.html` — searchable, filterable leadership directory (Board of Directors / Administration)
- `404.html` — custom not-found page (served automatically by GitHub Pages)

## Running

Open `index.html`, or serve this directory with any static server (for example `python3 -m http.server`). There is no build step and no external runtime dependency. Enable GitHub Pages from the main branch root to publish.

When `styles.css` or `script.js` change, bump the `?v=` query string in every page so browsers fetch the new version.

## Assets

Logo, leadership portraits, and student photographs in `assets/` were supplied by the Academy. `assets/photos/` holds web-optimised versions of the supplied school photos: a full-size JPEG (max 1600px) and a `-sm` version (max 760px) used through `srcset` on phones. ## WhatsApp enquiries

Set `ACADEMY_WHATSAPP` at the top of `script.js` to the Academy's WhatsApp number (digits with country code, e.g. `231771234567`). This turns on the enquiry form, the WhatsApp contact card, and the "Prefer a person?" handoff from the assistant. While it is empty, WhatsApp links stay hidden and the form explains that enquiries are not available yet.

Animations are CSS/vanilla JS only and switch off automatically for visitors who prefer reduced motion.

## GLA Assistant (chatbot)

`chatbot.js` adds the school assistant to every page. It runs entirely in the browser (no server or API key), answering common questions from the website's own content: classes and stages, admissions steps, leadership, values, sponsor, uniform, P.E. and more. It tolerates typos, remembers the conversation while the visitor moves between pages, and for anything it does not know (fees, dates, documents, location, hours) it says so and offers to send the question to the office on WhatsApp.

To teach it something new, add or edit an entry in the `INTENTS` list in `chatbot.js`: `keys` are the words or phrases that trigger it, and `reply` returns the answer text plus optional follow-up `chips`. Once the Academy confirms details such as fees or its address, replace the matching "ask the office" replies with the real answer.
