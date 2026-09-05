# Stop the Chop — Victoria Park — Submission Generator

An independent, community-built tool that helps Adelaide residents write and lodge a personal
submission on the proposed MotoGP circuit redevelopment in Victoria Park/Pakapakanthi, as part of
the SA Government's public consultation closing **11:59pm, Sunday 20 September 2026**.

This is **not** affiliated with the SA Government, the Department for Infrastructure and
Transport, the Adelaide Park Lands Association, or the organisers of the "Stop the Chop"
petition. It only helps a visitor compose their own submission — it never collects, stores, or
sends anything on their behalf. See `motogp-submission-tool-spec.md` for the full build spec this
implementation follows.

## Architecture

Fully static — plain HTML/CSS/JS, no build step, no backend, no database, no analytics.

```
index.html        entry point, all wizard steps as <section> panels
styles.css         all styling
data/content.js    all copy: concerns, asks, chips, official contact details
js/state.js        central form state + step validation gates
js/letter.js       pure function: state -> assembled letter text
js/countdown.js    live deadline countdown
js/mailto.js       mailto: builder with the length-threshold fallback
js/pdf.js          client-side PDF export (jsPDF, loaded via CDN)
js/main.js         DOM wiring: rendering, navigation, send actions
```

Nothing typed into the tool ever leaves the browser tab. There's no fetch/XHR to any origin other
than the CDN script tag for jsPDF (loaded once, from `cdnjs.cloudflare.com`).

## Running locally

No build step, so any static file server works. From the project root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly via `file://` also works, since
all content is loaded from a plain `<script>` tag (`data/content.js`) rather than fetched JSON —
this avoids the CORS restrictions browsers apply to `fetch()` under `file://`.

## Deploying to Vercel

This is a zero-config static site — Vercel auto-detects "no framework" and serves the folder as-is.

**Option A — Vercel CLI:**

```sh
npm i -g vercel   # if not already installed
vercel            # first deploy, follow prompts (link to a new or existing project)
vercel --prod     # promote to production
```

**Option B — GitHub integration (recommended):** connect the
[GitHub repo](https://github.com/morebento/parklands-motogp-submission) to a Vercel project via
the Vercel dashboard ("Add New… → Project → Import Git Repository"). Every push to `main` deploys
to production; every PR gets its own preview URL — useful for reviewing content/copy changes
before they go live.

## Issue tracking

Build tasks, content corrections, and pre-launch checks are tracked as
[GitHub issues](https://github.com/morebento/parklands-motogp-submission/issues) on this repo.

## Before publicising this tool

- **Re-verify the two official channels are still live and unchanged:** the DIT survey URL
  (`https://dit.sa.gov.au/infrastructure/projects/circuit-redevelopment/design/share-feedback`)
  and `circuitredevelopment@sa.gov.au`, both set in `data/content.js` under `meta`. Consultation
  pages are sometimes taken down once a window closes or content is revised — see the tracked
  GitHub issue for this.
- Skim `data/content.js` end-to-end against `motogp-submission-tool-spec.md` §1 for factual
  accuracy (figures, dates, tree counts, cost figures) in case anything is updated closer to the
  deadline.
