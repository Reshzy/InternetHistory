---
target: src/app/page.tsx
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-27T02-06-53Z
slug: src-app-page-tsx
---
Method: dual-agent (A: 94a4de28-1142-45ee-af1e-cd1ed9087c8e · B: 85283818-d07d-466d-9f1a-81f02a2fff59)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Orange active mark lags; 2026 still shows 2023 |
| 2 | Match System / Real World | 3 | 2023/2026 read as AI startup, not museum |
| 3 | User Control and Freedom | 3 | Hash jumps land at empty pin starts |
| 4 | Consistency and Standards | 3 | Chrome is consistent; that flattens era mutation |
| 5 | Error Prevention | 2 | Jumpers hit empty 2023/2026/NEXT frames |
| 6 | Recognition Rather Than Recall | 3 | Mobile rail truncates years; Future label is sr-only |
| 7 | Flexibility and Efficiency | n/a | Experience surface; rail is the exhibit timeline |
| 8 | Aesthetic and Minimalist Design | 2 | 2023/2026 empty pixels; persistent chrome vs artifact |
| 9 | Error Recovery | 2 | Empty pin has no “keep scrolling” cue; Future form silent |
| 10 | Help and Documentation | n/a | Experience surface; skip links + RM notice suffice |
| **Total** | | **21/32** | **Acceptable** |

#### Design Specificity Verdict

**LLM assessment**: BOOT–1999 is authored for this museum (CRT, gray 1995 chrome, GeoCities 1999). From 2012 the exhibit collapses into a repeating year/statement/support template. 2018 and 2023 spend most of the pin looking like the SaaS/AI products they mean to satirize. 2026 is a black void with a clipped headline, not “the website is no longer a fixed place.” Museum chrome never mutates.

**Deterministic scan**: CLI `detect.mjs` on TSX/components exited 0 with 0 findings. Live overlay injection succeeded: 61 anti-patterns, 13 rules. Dominant rules: low-contrast (31), dark-glow (9), ai-color-palette (7). Most 1995/1999/boot hits are intentional historical false positives (CRT glow, blinking caret, neon badges, marquee). Less clearly historical: Geist overuse, 2018 clipped overflow, extreme negative tracking on later h2s.

**Visual overlays**: Overlay injection succeeded in the Assessment B browser session (live-server :8400, then stopped). No overlay is claimed in the user’s current tab.

#### Overall Impression

The opening third is exhibit-quality. The museum then thins into a dark SaaS template. Biggest opportunity: make late eras and chrome obey the product rule that the interface itself evolves, and land jumpers on composed states instead of empty pins.

#### What's Working

1. 1995 and 1999 are exhibit-quality: gray 3D chrome, Times, blue underlines; then magenta GeoCities clutter with intent.
2. Copy has a voice: observant, not fake-profound.
3. Reduced-motion 1995 keeps the document network; skip links and cursor gating work.

#### Priority Issues

**[P1] Sticky MuseumNav covers the exhibit and never becomes part of history**
- Why: Permanent product bar flattens every era; mobile steals ~1/5 of the viewport; marquee/copy collide with `--museum-nav-clearance`.
- Fix: Shrink to a tighter indicator; give marquee/copy real clearance; recede in NEXT; drop leftover placeholder styling.
- Suggested command: /impeccable layout

**[P1] 2018 and 2023 look like generic SaaS / AI landings at mid-pin**
- Why: PRODUCT.md success test is “distinct from generic AI SaaS.” Jumpers and skimmers never see the satire punchline.
- Fix: Hold Normalizer until the grid is the punchline; keep one authored mobile beat; front-load 2023 outputs.
- Suggested command: /impeccable animate

**[P1] 2026 is not a place**
- Why: Clipped headline, late shards, rail still on 2023 — thesis reads as unfinished.
- Fix: Keep copy in viewport; bring shards in by ~20% progress; fix `useActiveEra` margins.
- Suggested command: /impeccable layout

**[P2] Showcase transitions fail on mobile / reduced motion**
- Why: MASTER names CRT→1995, wild→social, desk→pocket as portfolio moments. Phone sees a phone-in-a-phone; RM skips the CRT enter.
- Fix: On small screens, be the pocket (no nested bezel). Earlier 2004 feed. RM hard-cut that still reads as entering the document.
- Suggested command: /impeccable adapt

**[P2] 2012 unique/generic copy stacks; NEXT prompt is invisible**
- Why: Homogenization gag becomes a bug. Ending asks a question then hides the field.
- Fix: Crossfade without two live text nodes. Visible terminal prompt. Signature inside last pinned frame.
- Suggested command: /impeccable polish

#### Persona Red Flags

**Jordan (First-Timer)**: Mute CRT, no scroll cue, hash-jump to empty 2023/2026, webring/mode jargon.
**Casey (Accessibility)**: Keyboard chrome works; RM notice is tiny; taller RM chrome covers 1999 marquee; generated modes do nothing under RM.
**Recruiter**: 1995/1999 sell craft; 2018/2023/2026 stills look like every Series B site or a broken layout.

#### Minor Observations

- MuseumNav still encodes placeholder / “gallery closed” though all eras are built.
- 2012 Following/For You and 2004 wall tabs look interactive and are not.
- 2007 desk-chrome three dots read as Mac traffic lights.
- Cursor.tsx does not implement MASTER’s drag/inspect/type states.
- future-rest “Begin again” is easy to miss below the pin.
- Default Next.js public SVGs may still be unused.

#### Questions to Consider

- If the website is the exhibit, why does every year wear the same museum uniform?
- Should jumping an era land on the sentence, not the first frame of a 160% scrub?
- Is 2026 allowed to be sparse, or must shards be unavoidable?
