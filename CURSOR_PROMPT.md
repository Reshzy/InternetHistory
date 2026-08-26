# Cursor Build Prompt — NET//HISTORY

You are the lead creative frontend engineer for **NET//HISTORY**, an animation-heavy interactive museum about the evolution of the web.

The repository contains a file named `MASTER.md`.

## Your first instruction

**Read `MASTER.md` completely before making any changes. Treat it as the project source of truth.**

Then inspect the repository, package manager, installed dependencies, existing app structure, current styles, and any Impeccable files/configuration.

Do not immediately start rewriting the project.

## Objective for this run

Implement only the **foundation + first vertical slice** of NET//HISTORY:

1. Phase 0 — project inspection/setup
2. Phase 1 — museum shell
3. Phase 2 — Boot + 1995 Document Web

Do **not** build the later eras yet.

The goal is to prove that the architecture, visual direction, GSAP system, responsiveness, and reduced-motion approach are strong before expanding the museum.

---

## Required technology

Use the repository's existing compatible versions when possible.

The intended stack is:

- Next.js
- React
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- Vercel

Use GSAP as the primary timeline animation engine.

Do not add Three.js yet.

Do not add a database.

Do not introduce unnecessary state-management libraries.

---

## Impeccable

Impeccable is available.

If this repository has not been initialized for Impeccable, use its current project initialization workflow before the design-polish stage.

Use Impeccable as a design-quality assistant, not as the product director.

`MASTER.md` outranks generic Impeccable recommendations.

Intentional historical ugliness/weirdness must not be automatically "fixed" into modern SaaS UI.

Once the vertical slice is implemented, use focused Impeccable critique/audit/polish/animation/adaptation passes where appropriate.

Do not blindly accept Impeccable output.

---

## Creative direction

This must not look like a normal startup landing page.

Avoid:

- purple/blue gradient SaaS styling,
- generic bento sections,
- endless rounded cards,
- glassmorphism everywhere,
- huge blurred background blobs,
- default shadcn appearance,
- icon tiles over every heading,
- identical fade-up animations,
- gratuitous 3D.

The first experience should feel like entering an old computer and physically entering the early web.

---

## Implement this experience

### A. Museum shell

Create the full semantic timeline structure for:

- BOOT
- 1995
- 1999
- 2004
- 2007
- 2012
- 2018
- 2023
- 2026
- NEXT

Later sections may remain elegant placeholders for this run.

They must exist so the page architecture and navigation are real.

Create typed era metadata instead of scattering labels throughout the app.

### B. Museum navigation

Create a minimal museum progress/timeline control.

It should:

- show the current era,
- let the user jump between eras,
- be keyboard accessible,
- remain subtle,
- adapt to mobile,
- avoid feeling like a SaaS navbar.

For placeholder eras, anchor navigation should still work.

### C. Boot scene

The initial viewport should be nearly black.

Create a restrained terminal/CRT-inspired boot sequence.

Suggested text:

```text
MEMORY CHECK ........ OK
NETWORK ADAPTER ..... FOUND
MODEM ............... READY

CONNECTING
```

Use a blinking terminal cursor.

Add subtle CRT treatment:
- slight scanline texture,
- controlled flicker/noise,
- restrained screen glow.

Do not use aggressive flashing.

Do not autoplay sound.

The sequence must eventually transition into the 1995 scene through scrolling.

### D. Boot → 1995 transition

This is the first showcase animation.

The CRT/terminal surface should visually expand or transform until the visitor feels as if they have entered the screen.

Use GSAP + ScrollTrigger.

The transformation should be tied to scroll rather than being an uncontrollable intro movie.

Do not scroll-jack the user.

Do not create a fake loading delay.

### E. 1995 Document Web

Build a stylized early-browser scene.

Do not pixel-perfect clone a specific commercial browser.

Use:

- system/monospace typography,
- gray chrome,
- white document surface,
- simple borders,
- blue underlined hyperlinks,
- intentionally primitive controls.

Primary copy:

**1995**

**THE WEB WAS A PLACE YOU VISITED.**

Supporting copy:

> Pages were documents. Links were doors. Getting online still felt like going somewhere.

Create several fake linked documents/pages as part of the composition.

As the user scrolls:

1. browser/document appears,
2. links become emphasized,
3. documents separate into depth,
4. visual connector lines reveal relationships,
5. the visitor begins to feel as if they are traveling through connected pages.

Do this with HTML/CSS/SVG/GSAP before considering canvas.

The scene should end in a stable state that can later transition into the 1999 Wild Web section.

---

## GSAP architecture requirements

Create a clean reusable GSAP setup.

Requirements:

- register ScrollTrigger in a safe client-side location,
- scope GSAP contexts to scene roots,
- clean up on unmount,
- avoid global document queries where local refs work,
- avoid React state updates on animation frames,
- prefer a small number of coordinated timelines,
- avoid hundreds of individual ScrollTriggers,
- ensure hot reload does not duplicate triggers.

Create reusable hooks/utilities only when they improve clarity.

Do not abstract simple code prematurely.

---

## Reduced motion

Implement reduced-motion handling now.

When `prefers-reduced-motion: reduce` is active:

- Boot content should be immediately understandable.
- Do not use large camera zooms.
- Do not use long scroll scrubs.
- The 1995 scene must show meaningful final states.
- Museum navigation must work normally.
- Do not remove content.

Design this path intentionally rather than disabling all CSS at the end.

---

## Custom cursor

Implement only a restrained v1 custom cursor for fine-pointer desktop devices.

Requirements:

- do not enable on touch/coarse-pointer devices,
- do not hide the native cursor until custom cursor is ready,
- use transform-based movement,
- cursor layer must use `pointer-events: none`,
- link/interactive state may visually react,
- no required information may depend on cursor effects.

Keep its architecture extensible because the cursor becomes more important in the 2026 scene later.

---

## Responsive implementation

Design intentionally for mobile.

Do not simply scale down desktop animation.

For mobile:

- reduce simultaneous floating documents,
- shorten the Boot → 1995 movement,
- keep copy large enough to read,
- ensure timeline navigation remains usable,
- avoid horizontal page overflow,
- disable desktop-only cursor effects,
- preserve the story.

Check representative widths around:

- 1440
- 1024
- 768
- 430
- 390
- 360

---

## Accessibility

Use semantic HTML.

Maintain logical headings and DOM order.

All navigation and interactive elements must support keyboard input.

Include visible focus states.

Respect reduced motion.

Do not use autoplay audio.

Avoid rapid flashing.

Decorative elements should not pollute accessibility output.

---

## Performance

Do not sacrifice performance for visual novelty.

Use transform/opacity for frequent animation.

Avoid unnecessary animation loops.

Do not add huge media assets.

Do not import heavy 3D libraries.

Keep layout shifts controlled.

Do not update React state continuously during GSAP motion.

---

## Code quality

Keep scene code maintainable.

Do not create one enormous `page.tsx`.

Prefer a structure similar to the one in `MASTER.md`, but adapt it to the actual repository.

Use TypeScript properly.

Avoid `any` unless there is a real justification.

No dead components.

No placeholder buttons that pretend to work.

No console spam.

---

## Validation before stopping

Run the repository-equivalent commands for:

- formatting if configured,
- linting,
- typecheck,
- production build.

Fix issues caused by your work.

Also inspect for:

- hydration errors,
- duplicate ScrollTriggers,
- obvious overflow,
- broken navigation,
- reduced-motion regressions.

If browser tooling is available, visually inspect the page at desktop and mobile widths.

---

## Impeccable quality pass

After the implementation is functional, use Impeccable on the implemented vertical slice.

Focus on:

- hierarchy,
- typography,
- spacing,
- responsive behavior,
- purposeful motion,
- accessibility,
- interaction polish.

Do not let the pass erase the historical 1995 visual language.

Do not modernize early-web UI merely because it violates contemporary aesthetic conventions.

After any Impeccable-driven edits, rerun relevant code/build checks.

---

## Final response format

When finished, report:

1. what you implemented,
2. key files created/changed,
3. animation architecture decisions,
4. responsive/reduced-motion behavior,
5. Impeccable passes used and what they changed,
6. checks that passed,
7. anything that remains incomplete,
8. the exact recommended next phase.

Do not claim the full museum is complete.

The recommended next phase should normally be:

**Phase 3 — 1999 Wild Web**, but only if the current vertical slice is stable.

Most importantly:

**Build something authored and memorable. Do not produce a generic landing page with GSAP sprinkled on top.**
