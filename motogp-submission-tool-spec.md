# Specification: Park Lands MotoGP Submission Helper

A single-page web tool that helps Adelaide residents write and lodge a personal submission opposing (or raising concerns about) the proposed MotoGP circuit redevelopment in Victoria Park / Pakapakanthi, as part of the SA Government's public consultation closing **11:59pm, Sunday 20 September 2026**.

This document is the brief for the build. It is written to be handed to Claude Code (or another implementer) with no further context required.

---

## 1. Background (research summary)

Use this section as ground truth for on-site copy. All facts below were confirmed from South Australian Government sources, MotoGP/motorsport media, and the Adelaide Park Lands Association (APLA) as at 5 September 2026. Verify the two official contact points again at build time in case anything has changed since.

### The proposal
- Officially the **"Adelaide Circuit Redevelopment"** project, run by the SA Department for Infrastructure and Transport (DIT) with the South Australian Motor Sport Board (SAMSB), under the Malinauskas Labor government.
- Rebuilds the existing Adelaide street circuit (used for the Adelaide 500 Supercars event) through the eastern Adelaide Park Lands — **Victoria Park / Pakapakanthi** — to host **MotoGP** as a permanent, world-first street circuit for motorcycle racing, alongside the continuing Supercars event.
- Circuit grows from 3.21km to **4.13km**, 15 turns, including a 900m straight along Dequetteville Terrace and revived features from the old F1-era track (Stag Corner, Rundle Road, Brewery Bend).
- **Construction cost: $96 million** of public money, plus a separate **$15 million "Nature Positive Package"** for tree planting, habitat and water-quality projects.
- **Tree removal**: widely reported as "up to/nearly 400 trees" — government figures break this down as 42 significant trees felled, ~335 classed as regulated/unregulated/invasive/dead/poor health, 88 relocated, and 22 more under investigation (15 of them significant). Government says this is under 5% of the ~8,895 trees in the precinct, and commits to planting roughly 3,770–3,800 replacement trees (about 10:1) plus understorey planting.
- **Timeline**: construction starts December 2026 (after the 2026 Adelaide 500/Grand Final events); first MotoGP race November 2027; Adelaide 500 Supercars returns January 2028; Tour Down Under returns to Victoria Park from 2028.
- **Contract**: reported as an initial six-year deal with MotoGP's promoter.
- Additional works planned in the precinct: upgraded soccer field with lighting, new running/walking loops, a 1.2km cycling criterium loop, new basketball/tennis courts, accessible toilets, a skate park, a water jump for the Adelaide Equestrian Festival, and permanent services upgrades for the Gluttony/Garden of Unearthly Delights Fringe venues.

### The consultation
- Public "share your feedback" consultation opened alongside the design release (~30 August 2026) and **closes 11:59pm, Sunday 20 September 2026**.
- Two official ways to have a say:
  1. **Government survey**: `https://dit.sa.gov.au/infrastructure/projects/circuit-redevelopment/design/share-feedback` — has some mandatory questions near the start (the rest can be skipped), and its **final question accepts a document upload**, so a prepared submission letter/PDF can be attached there instead of typing into the form.
  2. **Direct email**: `circuitredevelopment@sa.gov.au` — a submission can simply be the body of the email, or a separate attached document.
- The Adelaide Park Lands Association (a community group opposing the project, unaffiliated with government) separately asks people to **cc/forward a copy of whatever they submit to `adelparklands@outlook.com`** for their own records and to check the government's later claims about how the community responded. This is optional and not part of the official process.
- Community and commentators (including APLA's own media release) have criticised the consultation itself as rushed (three weeks for irreversible, ~$100m changes to National Heritage-listed land), with no public meetings, no phone line, and no independent Environmental Impact Assessment or published Cost-Benefit Analysis to inform submitters.

### The opposition, for context
- A "Stop the Chop" petition (organised by Adelaide City councillors Patrick Maher and Keiran Snape) collected **45,861 signatures (43,784 accepted as valid)**, well over the ~10,000 needed to trigger a parliamentary committee inquiry; it was tabled in the Legislative Council on 19 August 2026.
- Adelaide Park Lands Association is the main community group publishing detailed objections and a submission guide.
- Conservation Council SA has controversially backed the project as "net nature positive," splitting environmental opinion — APLA and some councillors call this "greenwashing."
- Adelaide City Council and the Lord Mayor have been broadly critical but were not included in the government's design announcement, and have limited formal power over Park Lands decisions made by the state government.
- The State Opposition has questioned whether the true scale of tree removal was known to voters before the last state election.

**Sources**: [ABC News – design released](https://www.abc.net.au/news/2026-08-30/sa-motogp-street-circuit-design-released/107094958) · [ABC News – what's planned beyond the track](https://www.abc.net.au/news/2026-09-02/what-motogp-means-for-the-adelaide-parklands/107097274) · [ABC News – environmental analysis](https://www.abc.net.au/news/2026-09-01/adelaide-motogp-circuit-parklands-environment-analysis/107098688) · [Speedcafe FAQ](https://speedcafe.com/motorsport-news-2026-adelaide-park-lands-faq-ultimate-guide-questions-and-answers-motogp-street-circuit-supercars/) · [InDaily – opinion on the announcement](https://www.indailysa.com.au/news/opinion/2026/08/31/govt-spin-in-over-drive-for-motogp-announcement) · [InDaily – Stop the Chop signatures](https://www.indailysa.com.au/news/just-in/2026/07/14/stop-the-chop-petition-hits-13k-signatures-triggering-parliament-inquiry) · [DIT project page](https://dit.sa.gov.au/infrastructure/projects/circuit-redevelopment) · [DIT – share your feedback](https://dit.sa.gov.au/infrastructure/projects/circuit-redevelopment/design/share-feedback) · Adelaide Park Lands Association media release (31 Aug 2026) and "Have your say" / "Detailed concerns and questions" guides supplied as source material for this brief.

---

## 2. Purpose of the tool

Lower the barrier to making a genuine, personal, well-informed submission before the 20 September deadline. The tool should help someone go from "I'm against this but don't know what to say" to a submission they're proud of, in a few minutes — without ever pretending to *be* the official government form, and without turning submissions into identical form-letter spam (which is easy to dismiss and undermines the campaign).

**This is an independent, community-built tool.** It is not affiliated with the SA Government, the Department for Infrastructure and Transport, or the Adelaide Park Lands Association, and the site must say so clearly. It only helps a person compose their own submission and hands them off to the two *official* channels above.

## 3. Non-goals

- Not a replacement for, or clone of, the government's own survey — it never collects/submits data on the user's behalf to government or anyone else.
- Not a petition tool, not a mailing list, not a fundraising page.
- No user accounts, no login.
- No backend and no data storage of any kind (see §7). Everything happens in the visitor's browser.
- Not neutral: the tool is explicitly for people who have concerns about or oppose the proposal, but it should let the user express their own position and choose their own tone rather than putting words in their mouth wholesale.

## 4. User flow

1. **Landing** — one-screen explanation: what this is, the deadline (with a live countdown), and that it's an independent community tool, with the two facts that matter most (400 trees / $96m+ / permanent change) stated up front.
2. **Step 1 – Your connection to the Park Lands** (optional, short free text + a few chips like *resident*, *parent*, *sports club member*, *regular park user*, *ratepayer*, *visitor to Adelaide*) — feeds the "why this matters to me" paragraph.
3. **Step 2 – Choose your concerns** — checklist grouped by theme (§6). Multi-select, nothing pre-ticked (so the final letter reflects genuine choices, not a default wall of text). A running live preview updates as boxes are ticked.
4. **Step 3 – Say it in your own words** — a single prompted free-text field for a specific personal reason or experience ("a place you use, a moment, what changes for you or your family"). Actively encouraged rather than labelled merely "optional", shown with concrete example sentences. Not gated — skipping it produces a letter with no empty paragraph. If three or more concerns are ticked and this is blank, a non-blocking nudge appears. Rendered verbatim as its own paragraph, positioned after the connection paragraph and before the first concern heading (§6.8).
5. **Step 4 – What do you want the Government to do?** — pick one or more closing "asks" (§6.7). At least one required before the letter is considered complete.
6. **Step 5 – Your particulars**:
   - Full name (required)
   - Suburb & postcode (required)
   - Full street address (optional, collapsed by default with a note that including it is traditional for formal submissions but not necessary)
   - Email address (optional — only used to pre-fill the "from" expectations in the email client, never transmitted anywhere by the site)
7. **Step 6 – Review & personalise** — full editable text preview of the assembled submission (see §6.8). User can freely edit the generated text before sending; edits are not synced back to the checkboxes.
8. **Step 7 – Send it**:
   - **Primary: "Open in your email app"** → launches a `mailto:` draft addressed to `circuitredevelopment@sa.gov.au` (see §7.3 for the length-limit handling).
   - **"Copy submission text"** → copies the full letter to the clipboard, for pasting into any email client or the government survey's text fields.
   - **"Download as PDF"** and **"Download as text file"** → for attaching to an email manually, or uploading at the final question of the government survey.
   - Optional checkbox, unticked by default: **"Also send a copy to the Adelaide Park Lands Association"** — adds `adelparklands@outlook.com` as a cc on the mailto link, with a one-line explanation of who they are and why (community group, keeps their own count, unaffiliated with government).
   - A clearly separate button/link: **"Go to the Government's official feedback survey"** → opens `https://dit.sa.gov.au/infrastructure/projects/circuit-redevelopment/design/share-feedback` in a new tab, with a reminder that the downloaded PDF can be attached at the survey's final question.
9. **Confirmation footer** — reminder that nothing was sent by the tool itself, a reminder of the deadline, and a link back to APLA's own resources for people who want to read more before finishing.

## 5. Tone & content guidance

- Encourage the visitor's own voice. Inline hint text throughout: *"You don't have to use every point — pick what matters to you and say it your way. Personal, specific submissions carry more weight than a form letter."*
- Default paragraph text (§6) should read as plain, first-person, respectful advocacy — factual and firm, not hostile. No abusive language, no unverified claims, no personal attacks on named officials. Cite the facts in §1 rather than inventing figures.
- Nothing on the site should suggest the submission is anonymous, official, or government-run.

## 6. Content model: concerns, structured by theme

Implement this as a data file (e.g. `concerns.json`) the UI renders from, so wording can be tuned without touching layout code. Each item needs: `id`, `category`, `label` (short checkbox text), `paragraph` (the sentence(s) inserted into the letter if selected). Suggested categories and starting copy below — refine wording but keep the facts accurate to §1.

### 6.1 Trees, heritage & permanent change
- Removal of up to 400 trees from Victoria Park/Pakapakanthi, part of the National Heritage-listed Adelaide Park Lands, for a motor racing circuit.
- Permanent, irreversible construction and infrastructure being built for an event held only a few days a year, under an initial six-year contract — with no guarantee it stops there.
- Concern that a 10:1 replanting commitment doesn't replace the shade, canopy and habitat value of mature trees for decades, and that it's being used to make permanent, irreversible destruction sound acceptable.
- Risk to Adelaide's bid for World Heritage listing of the Park Lands.
- Loss or restriction of public access to Park Lands people currently use freely.

### 6.2 Environment & wildlife
- Impact on wildlife and biodiversity, including vulnerable species such as the Chequered Copper Butterfly.
- Loss of tree canopy in a city already facing worsening summer heat.
- Concern that positive environmental spending elsewhere is being used to offset, rather than justify, damage to a protected heritage landscape.

### 6.3 Traffic, access & daily life
- Road closures adding significant time to commutes, or redirecting displaced traffic through residential streets not built for it.
- Flow-on effects for school travel, school buses and public transport when usual routes are closed.
- Disruption to access to sporting clubs and community facilities in or around the Park Lands, for weeks rather than a single weekend.
- Concern about ambulance, fire and other emergency vehicle access, and access to medical appointments, during event periods.

### 6.4 Process, transparency & consultation
- A three-week consultation window is not enough time to properly respond to a ~$96 million, permanent change to National Heritage-listed land.
- No independent Environmental Impact Assessment has been published.
- No comprehensive, independent Cost-Benefit Analysis has been published to justify the public spending involved.
- Concerns that the consultation process itself (no public meetings, limited notice) does not give the community a genuine or meaningful say.
- Adelaide City Council and community groups were not included in the government's own design announcement.

### 6.5 The economic case
- Lack of clarity about the full public cost, including any subsidies or inducements to the promoter, teams or riders.
- Flow-on costs to other budgets, such as policing, health and traffic management during events.
- Concern that other services or events may be reduced or deprioritised to help fund this project.
- Whether claimed economic benefits have been independently verified, rather than asserted by the government.

### 6.6 Alternatives
- Whether existing motorsport venues, such as The Bend Motorsport Park at Tailem Bend, were properly and transparently considered as an alternative.
- *(Soft-opposition option, useful for people who like the idea of MotoGP but not the location):* Support for bringing MotoGP to South Australia, but not at the cost of permanent construction in the Adelaide Park Lands.

### 6.7 What I'm asking the Government to do (pick one or more — feeds the letter's closing paragraph)
- Abandon the proposed Victoria Park/Pakapakanthi circuit redevelopment.
- Pause the project and properly assess alternative locations before proceeding.
- Commission and publish an independent Environmental Impact Assessment before any further approval.
- Publish a full, independent Cost-Benefit Analysis before committing further public money.
- Extend the consultation period and hold genuine public meetings, with real opportunity for community input.
- Rule out any further motorsport expansion into the Park Lands beyond what's currently proposed.

### 6.8 Letter assembly order
1. Salutation (`To the Department for Infrastructure and Transport,` — adjust automatically if only the APLA cc is used).
2. Subject line: `Submission on proposed MotoGP circuit redevelopment — Victoria Park/Pakapakanthi`.
3. Opening line stating this is a submission on the proposed MotoGP circuit redevelopment consultation, closing 20 September 2026.
4. Personal-connection paragraph (from Step 1's chips/free text, if provided).
5. The submitter's own words (Step 3), verbatim as a single paragraph, if provided.
6. One paragraph per ticked concern, grouped by category with a short heading per category (only categories with at least one ticked item appear).
7. Closing paragraph built from the ticked "asks" (§6.7).
8. Sign-off: `Yours sincerely,` then name, then suburb/postcode (and full address if supplied).
9. If the reader is unsure of a fact, avoid absolute claims not covered by §1 — better to under-claim than to overstate.

## 7. Technical requirements

### 7.1 Architecture
- Fully static site: plain HTML/CSS/JS (a lightweight framework is fine but not required — this doesn't need a build pipeline for something this small). No server, no API, no database.
- Deployable to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages) with zero configuration. Recommend whichever is simplest to stand up before 20 September.
- No analytics that collect personal data. If any usage analytics are added at all, they must be aggregate-only (e.g. page views) and never capture form contents, name, address or email.

### 7.2 Privacy (important — this is a politically sensitive tool)
- Nothing typed into the form is ever sent to a server, logged, or stored outside the visitor's own browser tab. State this explicitly on the page.
- No cookies beyond what's strictly needed for the page to function (ideally none).
- If any draft-saving is implemented for convenience (e.g. so a refresh doesn't lose progress), it must use only client-side storage the user controls, and the privacy copy must say so.

### 7.3 Email handoff and length limits
- `mailto:` links are unreliable past roughly 1,800–2,000 total characters (older Outlook/Windows in particular). A fully personalised, multi-concern letter can easily exceed this.
- Required behaviour:
  - If the assembled letter is under the safe threshold, build the full `mailto:circuitredevelopment@sa.gov.au?subject=...&body=...` (and `&cc=adelparklands@outlook.com` if opted in) with the complete text.
  - If it's over the threshold, don't silently truncate: open a short `mailto:` with a placeholder body (e.g. "I have copied my submission to the clipboard — please paste it here before sending.") and prominently show/trigger the "Copy submission text" action at the same time, so nothing is lost.
  - Always offer "Copy submission text" and the PDF/text downloads regardless of length, since some visitors will prefer to email manually or use the government survey's attachment upload instead of `mailto:`.

### 7.4 PDF export
- Generate the PDF client-side (e.g. a small JS library, or a print-stylesheet + browser print-to-PDF) — no server round-trip.
- PDF should be plain and formal: sender's name/suburb, date, subject line, the letter body, sign-off. No site branding needed on the document itself, since it's meant to look like a normal personal letter when attached to the survey or an email.

### 7.5 Accessibility & responsiveness
- Usable end-to-end on mobile (many people will do this from a phone after seeing news coverage).
- Keyboard-navigable, sensible focus order, checkboxes/labels properly associated, adequate colour contrast (WCAG AA).
- Works with JavaScript required (acceptable for this kind of tool), but should fail gracefully with a clear message if JS is blocked, rather than a blank page.

### 7.6 Countdown / urgency
- Live "X days left to have your say" counter against 11:59pm ACST/ACDT (check daylight saving — SA is on ACDT from the first Sunday in October, so the 20 September deadline falls in ACST, UTC+9:30) on Sunday 20 September 2026, computed client-side from the visitor's local clock.
- On the landing view, a small progress graphic: a horizontal "road" with a 🏍️ that travels from the consultation open date (`meta.consultationOpenISO`, ~30 Aug 2026) toward a 🌳 at the deadline, tracking elapsed fraction of the window. Exposed as `role="progressbar"` with a live `aria-valuenow`; the text counter remains the accessible source of truth. A short racing-metaphor caption changes by how far through the window we are (copy in `content.js` under `countdown`). At/after the deadline the 🌳 becomes 🪵 and the caption reads "Chequered flag — the consultation has closed." Motion respects `prefers-reduced-motion`.

## 8. Acceptance criteria

- [ ] A visitor with no prior knowledge of the issue can produce a coherent, factually accurate, first-person submission in under 5 minutes.
- [ ] No concern or ask is pre-selected; the letter is empty of substantive content until the visitor makes choices.
- [ ] The live preview always matches the current checkbox/field state until the visitor manually edits it in Step 6, after which manual edits are preserved and not overwritten.
- [ ] The "in your own words" prompt (Step 3) is encouraged rather than labelled merely "optional"; skipping it never leaves an empty paragraph or placeholder in the letter; when filled it appears verbatim as its own paragraph after the connection paragraph and before the first concern heading, in the preview and all four outputs.
- [ ] "Open in email app," "copy text," "download PDF," and "download text" all work from the same generated letter.
- [ ] The official DIT survey link and the `circuitredevelopment@sa.gov.au` address are correct and clearly presented as the two official channels, distinct from this tool.
- [ ] No personal data (name, address, email, selections) leaves the browser at any point; this is stated plainly on the page.
- [ ] The countdown correctly reflects the 20 September 2026, 11:59pm (Adelaide time) deadline.
- [ ] Page works and looks reasonable on a small mobile screen.
- [ ] Independence disclaimer (not government, not officially affiliated with APLA) is visible without scrolling on the landing view.

## 9. Open items for you to confirm before/while building

- Final site name/branding and domain (if any) — currently unspecified.
- Whether to include the optional "connection to the Park Lands" chips (§4 step 2) or keep Step 1 to free text only.
- Whether the APLA cc-option should default on or off (spec currently defaults it **off**, i.e. opt-in, since it's not part of the official process and shouldn't be assumed).
- Visual design/branding direction (colour palette, logo, imagery) — none specified here; keep it plain, credible and non-partisan-looking (i.e. not styled like a political party asset) unless you decide otherwise.
- Re-verify `circuitredevelopment@sa.gov.au` and the DIT survey URL are still live shortly before launch, since consultation pages are sometimes taken down once a window closes or content is revised.
