# NET//HISTORY — MASTER.md

> **Project status:** Phases 0–8 implemented; Phase 9 (performance) next  
> **Project type:** Animation-heavy interactive frontend experience  
> **Primary deployment:** Vercel  
> **Primary source of truth:** This file  
> **Working title:** NET//HISTORY  
> **Tagline:** 30+ years of the web in one scroll.

---

## 0. RULE ZERO

This document is the product, design, motion, architecture, and implementation source of truth.

Before changing the project:

1. Read this file.
2. Inspect the existing implementation.
3. Preserve established design and motion decisions unless this file explicitly changes them.
4. Prefer extending existing systems over introducing parallel systems.
5. Never replace intentional design with generic SaaS UI.
6. Do not add visual effects simply because they are possible.
7. Every animation must support narrative, hierarchy, orientation, atmosphere, or interaction.
8. Keep the site deployable to Vercel throughout development.
9. The finished experience must still be understandable with JavaScript animation disabled or reduced.
10. Do not claim a phase is complete until its acceptance criteria pass.

If implementation and this document disagree, **this document wins** unless the document is technically impossible or internally contradictory. In that case, document the conflict before changing direction.

---

# 1. PRODUCT

## 1.1 Name

**NET//HISTORY**

Temporary alternatives if branding changes later:

- WEB//ARCHIVE
- INTERNET_ERA
- THE WEB, 1995—
- PACKET/PAST
- SCROLLBACK

Do not rename the project without an explicit decision.

## 1.2 Core concept

NET//HISTORY is an interactive digital museum that tells the visual and cultural evolution of the World Wide Web through one continuous scroll-driven experience.

The visitor should feel as though they are:

- entering an old computer,
- traveling through successive eras of internet culture,
- watching the interface itself evolve,
- and eventually arriving at a speculative version of the near future.

The website is not a conventional article with animations added to it.

**The website itself is the exhibit.**

## 1.3 Primary goal

Create a portfolio-grade frontend experience that demonstrates:

- strong creative direction,
- advanced GSAP animation,
- scroll choreography,
- responsive frontend engineering,
- typography,
- interaction design,
- performance discipline,
- accessibility awareness,
- and technical polish.

## 1.4 Secondary goals

- Be memorable enough to share.
- Be understandable without instructions.
- Be visually distinct from AI-generated SaaS landing pages.
- Be deployable as a mostly static Next.js experience on Vercel.
- Be architected so future eras or exhibits can be added without rewriting the whole project.

## 1.5 Non-goals

This is **not**:

- a Wikipedia replacement,
- a complete academic history of the internet,
- a generic portfolio,
- a dashboard,
- an e-commerce site,
- a social network,
- a CMS,
- a clone of Windows, Apple, Google, or any single brand,
- or a collection of unrelated frontend tricks.

Historical references should support the story rather than become the entire product.

---

# 2. AUDIENCE

Primary audience:

- frontend developers,
- designers,
- creative developers,
- recruiters,
- students,
- tech enthusiasts,
- and people nostalgic for earlier eras of the web.

The first visit should work even if the visitor has no technical knowledge.

The deeper details should reward technically curious users.

---

# 3. EXPERIENCE PRINCIPLES

## 3.1 Narrative before decoration

Every scene needs a reason to exist.

A visitor should be able to describe what happened:

> “I entered an old computer, watched the web become louder and more social, watched everything move onto phones, then arrived at today’s algorithmic/AI web.”

## 3.2 The interface evolves with history

Do not use one modern design system for every era.

The page itself should mutate:

- spacing,
- typography,
- window chrome,
- texture,
- color,
- density,
- motion,
- navigation,
- and interaction behavior

should change as the timeline advances.

## 3.3 Controlled chaos

Early and mid-web sections may become visually noisy, but the underlying composition must remain intentional.

Chaos is an art direction choice, not an excuse for poor layout.

## 3.4 Motion communicates state

Use animation to communicate:

- entering/leaving an era,
- time passing,
- technological acceleration,
- physical depth,
- hierarchy,
- transformation,
- causality,
- and user progress.

Avoid endless ambient motion that competes with the story.

## 3.5 Restraint creates contrast

Not every section should be maximal.

Quiet sections make major transitions stronger.

## 3.6 Desktop spectacular, mobile intentional

Desktop may contain the most ambitious sequences.

Mobile must not be a broken miniature version.

On small screens:

- simplify choreography,
- reduce simultaneous elements,
- preserve narrative order,
- avoid forced horizontal overflow,
- avoid interactions that require hover,
- maintain readable text,
- and keep scroll performance stable.

---

# 4. TECHNOLOGY

## 4.1 Required stack

Use:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **GSAP**
- **GSAP ScrollTrigger**
- **Vercel**

Use current stable versions compatible with one another unless the repository already pins versions.

## 4.2 Optional stack

Use only when it materially improves the experience:

- Lenis for smooth scrolling
- Three.js / React Three Fiber for selected 3D scenes
- Motion for small React-state-driven UI transitions where GSAP is unnecessary
- Zustand only if cross-scene client state becomes complex
- Zod only if runtime data validation becomes useful

Do **not** add libraries merely to appear sophisticated.

## 4.3 Animation ownership

Default rule:

- **GSAP owns timeline animation.**
- **ScrollTrigger owns scroll choreography.**
- CSS owns simple hover/focus/state transitions.
- React owns state.
- Do not make React re-render every animation frame.

Avoid mixing competing animation systems on the same property.

## 4.4 Styling ownership

- Tailwind handles layout, responsive rules, utilities, spacing, and common visual styling.
- CSS modules/global CSS may be used for complex visual effects, pseudo-elements, shaders, masks, clip paths, scanlines, CRT effects, and highly scene-specific styling.
- Avoid giant unreadable Tailwind class strings when a semantic CSS class communicates the effect better.

---

# 5. REPOSITORY DIRECTION

Preferred structure:

```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  └─ museum/
│     └─ page.tsx                 # optional if homepage is not the experience
│
├─ components/
│  ├─ chrome/
│  │  ├─ MuseumNav.tsx
│  │  ├─ EraIndicator.tsx
│  │  ├─ ProgressRail.tsx
│  │  └─ ReducedMotionNotice.tsx
│  │
│  ├─ scenes/
│  │  ├─ BootScene/
│  │  ├─ Web1995Scene/
│  │  ├─ WildWebScene/
│  │  ├─ SocialWebScene/
│  │  ├─ MobileWebScene/
│  │  ├─ PlatformWebScene/
│  │  ├─ ModernWebScene/
│  │  ├─ AIWebScene/
│  │  └─ FutureScene/
│  │
│  ├─ primitives/
│  │  ├─ BrowserWindow.tsx
│  │  ├─ CRTScreen.tsx
│  │  ├─ PixelButton.tsx
│  │  ├─ Cursor.tsx
│  │  ├─ Marquee.tsx
│  │  └─ SectionLabel.tsx
│  │
│  └─ effects/
│     ├─ NoiseLayer.tsx
│     ├─ Scanlines.tsx
│     ├─ GridField.tsx
│     └─ TextScramble.tsx
│
├─ hooks/
│  ├─ useGSAPScene.ts
│  ├─ usePrefersReducedMotion.ts
│  └─ usePointerCapabilities.ts
│
├─ lib/
│  ├─ gsap.ts
│  ├─ eras.ts
│  ├─ motion.ts
│  └─ utils.ts
│
├─ styles/
│  └─ museum.css
│
└─ types/
   └─ museum.ts
```

This is directional, not mandatory. Prefer a clear architecture over mechanically matching this tree.

---

# 6. STORY STRUCTURE

The experience should feel continuous, but implementation should be divided into eras/scenes.

Initial target:

1. **BOOT — Before the Web**
2. **1995 — The Document Web**
3. **1999 — The Wild Web**
4. **2004 — The Social Web**
5. **2007 — The Mobile Shift**
6. **2012 — The Platform Web**
7. **2018 — The Polished Web**
8. **2023 — The AI Web**
9. **2026 — The Generated Web**
10. **NEXT — What Comes After?**

Dates are narrative anchors rather than claims that every trend began in exactly that year.

---

# 7. SCENE SPECIFICATION

## 7.1 BOOT — Before the Web

### Emotion

Dark, quiet, mechanical, mysterious.

### Visual

A nearly black screen.

A tiny CRT-like glow appears.

Monospace boot text types in.

Example fragments:

```text
MEMORY CHECK ........ OK
NETWORK ADAPTER ..... FOUND
MODEM ............... READY

CONNECTING
```

A dial-up-inspired transition begins.

Do not autoplay actual loud dial-up audio.

### Motion

- subtle CRT flicker,
- blinking cursor,
- boot lines appearing sequentially,
- screen glow expands,
- page appears to be pulled into the monitor.

### Transition

The CRT expands until it becomes the viewport.

The visitor enters **1995**.

---

## 7.2 1995 — The Document Web

### Theme

The web is primarily documents connected by hyperlinks.

### Visual vocabulary

- gray browser chrome,
- basic system fonts,
- blue hyperlinks,
- underlined navigation,
- white documents,
- visible borders,
- small raster-style assets,
- sparse page layout.

### Hero copy

**1995**  
**THE WEB WAS A PLACE YOU VISITED.**

Supporting copy:

> Pages were documents. Links were doors. Getting online still felt like going somewhere.

### Interaction

A fake browser window becomes the central storytelling frame.

Scrolling:

1. browser appears,
2. document loads,
3. links multiply,
4. the camera begins moving through connected pages.

### Motion concept

Hyperlinks become literal connective lines between floating documents.

The visitor moves through the network.

---

## 7.3 1999 — The Wild Web

### Theme

Personal websites, portals, animated GIF culture, counters, marquees, guestbooks, bright backgrounds.

### Emotion

Chaotic, funny, handmade, alive.

### Visual vocabulary

- stars,
- tiled backgrounds,
- spinning badges,
- marquees,
- web-safe colors,
- visitor counters,
- tiny buttons,
- playful typography,
- intentionally awkward compositions.

### Hero copy

**1999**  
**EVERYONE GOT A CORNER OF THE INTERNET.**

### Motion

This scene should contrast heavily with 1995.

Possible sequence:

- one innocent page appears,
- decorative elements begin multiplying,
- stickers invade,
- GIF-like sprites orbit,
- visitor counter rapidly increments,
- browser windows overlap,
- a marquee crosses the screen,
- the composition nearly overwhelms the viewport.

### Important

Do not make it unusable.

The chaos should peak and then collapse into the next era.

---

## 7.4 2004 — The Social Web

### Theme

The internet moves from pages to identities and networks.

### Hero copy

**2004**  
**THE WEB STOPPED BEING PAGES. IT BECAME PEOPLE.**

### Visual

A profile-like layout appears.

Cards/nodes representing people begin connecting.

Avoid directly cloning a specific social network.

### Motion

- profile boxes arrive,
- avatar placeholders populate,
- connection lines spread,
- network graph expands beyond the viewport,
- notifications begin appearing,
- content shifts from authored pages to feeds.

### Transition

A vertical feed becomes the structural device that pulls the visitor into the next era.

---

## 7.5 2007 — The Mobile Shift

### Theme

The internet moves into the pocket.

### Hero copy

**2007**  
**THEN THE WEB LEFT THE DESK.**

### Signature transition

The desktop viewport compresses horizontally.

A device-shaped frame emerges from the page.

The previous website reflows inside it.

This must feel like the same web being physically transformed by a new form factor.

### Motion

- desktop window shrinks,
- navigation condenses,
- pointer becomes touch,
- content stacks,
- interaction targets expand,
- page starts moving with touch-like inertia.

### Important

Do not build a photorealistic branded phone.

Use an abstract device silhouette.

---

## 7.6 2012 — The Platform Web

### Theme

Feeds, apps, metrics, infinite content, notifications, recommendation systems.

### Hero copy

**2012**  
**THE INTERNET LEARNED TO KEEP YOU SCROLLING.**

### Visual vocabulary

The site suddenly becomes cleaner.

- white space,
- modern sans-serif,
- cards,
- avatars,
- feed structures,
- likes,
- counters,
- notification dots.

This is deliberately the beginning of visual standardization.

### Motion

The visitor scrolls through a feed.

But the feed begins scrolling itself faster than the user's physical scroll.

Items become increasingly similar.

Metrics grow.

The content becomes a stream.

### Narrative moment

The user should feel the shift from:

**“I choose where to go.”**

to:

**“The feed chooses what comes next.”**

---

## 7.7 2018 — The Polished Web

### Theme

Design systems, startups, smooth interfaces, componentization, sameness.

### Hero copy

**2018**  
**EVERYTHING GOT BETTER. EVERYTHING STARTED LOOKING THE SAME.**

### Visual vocabulary

Beautiful but intentionally familiar:

- giant sans-serif typography,
- perfect grid,
- restrained palette,
- rounded components,
- smooth easing,
- product screenshots,
- tasteful gradients used sparingly.

### Motion

Everything snaps perfectly into a grid.

Earlier chaotic elements are "normalized" into consistent components.

This can be slightly satirical.

Example:

A weird 1999 button enters a normalization machine and comes out as a clean pill button.

### Important

Do not accidentally make this section indistinguishable from a generic startup page.

The critique is part of the story.

---

## 7.8 2023 — The AI Web

### Theme

Text, image, code, and interfaces become generative.

### Hero copy

**2023**  
**THE WEB STARTED ANSWERING BACK.**

### Visual

A command field appears.

Generated elements emerge around it.

Text transforms into:

- UI,
- images represented abstractly,
- code,
- diagrams,
- content cards.

### Motion

Use procedural-feeling animation:

- tokens streaming,
- text regenerating,
- layouts forming,
- components morphing,
- one prompt branching into many outputs.

Avoid copying any real AI product interface exactly.

---

## 7.9 2026 — The Generated Web

### Theme

Interfaces themselves become temporary, personalized, adaptive, and generated.

### Hero copy

**2026**  
**WHAT IF THE WEBSITE IS NO LONGER A FIXED PLACE?**

### Interaction concept

This is where the visitor gains more control.

Possible interactions:

- cursor attracts nearby UI,
- UI rearranges around pointer position,
- labels rewrite,
- layout changes depending on interaction,
- visitors can choose one of several "future modes."

Do not claim speculative concepts as established facts.

### Mood

Clean, uncanny, elegant.

This should feel substantially different from the loud AI section.

---

## 7.10 NEXT — What Comes After?

### Goal

Finish emotionally instead of simply ending the scroll.

### Visual

Most UI disappears.

The page returns to near-black.

A blinking cursor remains.

### Copy

Large:

**THE WEB HAS NEVER STOPPED CHANGING.**

Then:

**WHAT SHOULD IT BECOME NEXT?**

Optional ending interaction:

A lightweight local text field lets the visitor type a short answer.

Their words briefly become part of the visual composition.

Do not require storage or a backend in v1.

### Final signature

```text
NET//HISTORY
1995 — 2026 — ?
```

Include discreet credits / portfolio link afterward.

---

# 8. GLOBAL NAVIGATION

Navigation should not feel like a conventional sticky SaaS navbar.

Preferred pattern:

A minimal **era indicator / progress rail**.

Desktop:

```text
NET//HISTORY               1995 ─────●──────────── 2026
```

or a vertical timeline.

Mobile:

Compact top/bottom indicator showing current era.

Requirements:

- visitor can jump to eras,
- current era is obvious,
- keyboard accessible,
- does not cover important story content,
- transitions to anchors gracefully,
- respects reduced motion.

---

# 9. MOTION SYSTEM

## 9.1 Motion philosophy

Motion should feel:

- cinematic,
- tactile,
- physical,
- deliberate,
- synchronized.

Do not make everything bounce.

Do not use one easing curve everywhere.

## 9.2 Motion tiers

### Tier A — Hero / scene transitions

Large transformations.

Examples:

- viewport enters CRT,
- desktop becomes phone,
- documents become network,
- chaotic web collapses into feed.

These may be scroll-scrubbed and pinned.

### Tier B — Narrative motion

Supports story within a scene.

Examples:

- nodes connecting,
- windows opening,
- feed populating,
- UI standardizing.

### Tier C — Microinteraction

Short interaction feedback.

Examples:

- link hover,
- nav selection,
- cursor response,
- focus states.

Tier C must never compete with Tier A.

## 9.3 GSAP standards

Register plugins centrally.

Create GSAP contexts scoped to components.

Always clean up animation/ScrollTrigger instances on unmount.

Avoid querying the entire document from scene components.

Prefer refs scoped to scene roots.

Do not create hundreds of ScrollTriggers when one timeline can coordinate the sequence.

Prefer one major timeline per scene.

Centralize common ease/duration values where useful.

## 9.4 ScrollTrigger practices

Use pinning only when storytelling benefits from a held frame.

Avoid excessive pinned sections that make scrolling feel stuck.

When scrubbing:

- keep motion understandable at different scroll velocities,
- avoid long dead scroll zones,
- provide visual progress,
- use sensible start/end distances.

Refresh ScrollTrigger after dimensions materially change.

Be careful with fonts, responsive images, and client hydration.

## 9.5 Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

and a runtime `matchMedia`/React equivalent.

Reduced-motion version should:

- remove long scrubs,
- avoid large zooms,
- avoid simulated camera motion,
- eliminate unnecessary parallax,
- preserve the complete narrative,
- show final states of important animations,
- retain functional navigation.

Reduced motion is not an afterthought.

---

# 10. CUSTOM CURSOR

Desktop fine-pointer devices may use a custom cursor.

Do not hide the system cursor until the custom cursor is initialized.

No custom cursor on touch-first devices.

Possible states:

- default dot/ring,
- link,
- drag,
- enter,
- inspect,
- type.

The cursor may become part of the 2026 scene narrative.

Requirements:

- never introduce visible lag,
- use transforms rather than top/left,
- pointer events disabled on cursor layers,
- preserve native accessibility,
- no required information revealed only through cursor hover.

---

# 11. TYPOGRAPHY

The typography should evolve by era.

Do not use one font everywhere.

Direction:

### Boot / 1995
Monospace / system-terminal feel.

### 1999
Mix of intentionally awkward web-safe/system typography.

### 2004
Dense early-social-web sans-serif direction.

### 2007+
Increasingly modern sans-serif.

### 2018
Highly polished display sans.

### 2023–2026
Technical but elegant contemporary combination.

Font loading must be performance-conscious.

Prefer variable fonts where suitable.

Do not introduce five large font files simply for novelty.

---

# 12. COLOR

No single color palette should dominate every era.

However, the museum needs a subtle persistent identity.

Possible museum-level constants:

- near-black base,
- off-white text,
- restrained signal orange or amber,
- muted technical green.

Era-specific palettes may override the base.

Avoid default AI aesthetics:

- purple-to-blue gradients everywhere,
- excessive neon glow,
- frosted glass on every surface,
- glowing rounded cards,
- random aurora backgrounds.

---

# 13. TEXTURE & VISUAL EFFECTS

Allowed when appropriate:

- film grain,
- CRT scanlines,
- dithering,
- pixelation,
- chromatic aberration,
- raster textures,
- paper/noise,
- subtle blur,
- SVG filters,
- CSS masks,
- clipping,
- blend modes.

Rules:

- effects must correspond to era or scene intent,
- effects must not destroy text readability,
- expensive effects should be reduced/disabled on weaker/mobile contexts when necessary.

---

# 14. CONTENT STYLE

Keep copy short.

This is not a long-form essay.

Most scene copy should follow:

1. year,
2. strong statement,
3. one short supporting paragraph,
4. optional small artifacts/labels.

Tone:

- observant,
- nostalgic without becoming sentimental,
- technically aware,
- occasionally witty,
- not corporate,
- not fake-profound.

Avoid:

- “In today’s fast-paced digital landscape…”
- marketing filler,
- generic AI copy,
- overly long history lessons,
- absolute claims about complex cultural changes.

---

# 15. HISTORICAL ACCURACY

The visual experience may compress history for storytelling.

When presenting dates or factual claims:

- avoid implying a trend appeared instantly in one year,
- use dates as representative eras,
- fact-check specific historical claims before publishing,
- distinguish speculation from history,
- do not fabricate statistics.

If external historical data is later introduced, store it separately from UI logic.

---

# 16. ASSET STRATEGY

Preferred order:

1. CSS/HTML recreations
2. original SVG/vector assets
3. project-created raster assets
4. properly licensed/open assets
5. third-party imagery only when necessary

Avoid building the core experience around copyrighted screenshots.

Where historical browser/UI references are important, create stylized abstractions rather than pixel-perfect commercial replicas.

Maintain an asset attribution file if third-party assets are added.

---

# 17. RESPONSIVE BEHAVIOR

Target:

- large desktop,
- laptop,
- tablet,
- mobile.

Do not merely scale down desktop scenes.

For each scene define:

- desktop choreography,
- mobile choreography,
- reduced-motion choreography.

On mobile:

- fewer simultaneous floating elements,
- shorter pin distances,
- simpler camera paths,
- touch-friendly controls,
- no hover dependencies,
- safe typography line lengths.

Test at minimum around:

- 1440px
- 1280px
- 1024px
- 768px
- 430px
- 390px
- 360px

---

# 18. ACCESSIBILITY

Minimum requirements:

- semantic HTML,
- logical heading hierarchy,
- keyboard-accessible navigation,
- visible focus indicators,
- sufficient contrast,
- reduced-motion support,
- text alternatives for meaningful images,
- decorative visuals hidden from assistive technology when appropriate,
- no mandatory hover interaction,
- no autoplay sound,
- no rapid flashing patterns.

Animation must not trap keyboard focus.

Pinned content must still preserve meaningful DOM reading order.

---

# 19. PERFORMANCE BUDGET

The experience is animation-heavy, not permission to be careless.

Targets:

- strong Lighthouse performance where realistically achievable,
- avoid huge initial JS payload,
- defer heavy optional scenes,
- lazy-load heavyweight 3D if introduced,
- compress raster assets,
- use modern image formats,
- minimize layout shifts,
- avoid continuous React renders,
- avoid oversized canvas resolutions,
- keep idle animation loops to a minimum.

Prefer transforms and opacity for frequent animation.

Profile performance rather than guessing.

---

# 20. SEO / METADATA

Even though this is an experiential site, include:

- meaningful `<title>`,
- concise description,
- canonical metadata when domain is known,
- Open Graph image,
- favicon,
- theme color where useful.

Suggested title:

**NET//HISTORY — 30 Years of the Web in One Scroll**

Suggested description:

**An interactive journey through the visual evolution of the web, from early documents and personal homepages to feeds, mobile interfaces, AI, and whatever comes next.**

---

# 21. ANALYTICS

Not required for initial implementation.

If added later:

- use privacy-conscious analytics,
- do not let analytics affect rendering,
- avoid invasive tracking.

---

# 22. VERCEL DEPLOYMENT

The project must remain Vercel-friendly.

Requirements:

- `pnpm build` or repository-standard build command succeeds,
- no dependency on a persistent server for v1,
- no local filesystem writes at runtime,
- environment variables documented if introduced,
- no secrets committed,
- static/client-driven scenes preferred,
- preview deployments should work.

Do not introduce a database for the initial museum.

---

# 23. IMPECCABLE INTEGRATION

Impeccable is available in the development workflow.

Use it as a **design-quality system**, not as a substitute for the project direction.

## Authority order

When instructions conflict:

1. `MASTER.md`
2. Explicit current user instruction
3. Existing coherent design system
4. Project `PRODUCT.md` / `DESIGN.md`
5. Impeccable recommendations
6. Generic framework conventions

Impeccable may improve:

- hierarchy,
- typography,
- spacing,
- responsive behavior,
- interaction quality,
- animation polish,
- accessibility,
- UI consistency.

Impeccable must **not** independently:

- convert the museum into a SaaS landing page,
- remove historical weirdness that is intentional,
- normalize every era into the same visual system,
- add generic cards everywhere,
- add gradients/glassmorphism without narrative justification,
- replace GSAP scene choreography with unrelated animations.

## Recommended workflow

At project initialization:

```text
/impeccable init
```

After a meaningful scene is functional, use focused passes such as:

```text
/critique
/animate
/adapt
/audit
/polish
```

Use commands on focused areas when possible instead of indiscriminately rewriting the whole project.

If automatic Impeccable hooks are enabled, treat findings as quality gates while preserving intentional era-specific design choices.

---

# 24. DESIGN ANTI-PATTERNS

Avoid:

- generic centered hero + two buttons,
- Bento grid merely because it is fashionable,
- endless rounded cards,
- purple/blue gradient backgrounds,
- giant blurred blobs,
- excessive glassmorphism,
- icon tiles above every heading,
- default shadcn-looking compositions,
- generic testimonial/logo sections,
- excessive border-radius,
- random scroll animations,
- every heading using the same reveal,
- dozens of independent parallax elements,
- smooth scrolling so heavy it feels delayed,
- hijacking scroll,
- fake loading screens that waste time,
- pointless 3D.

This project should look **authored**, not assembled from trend presets.

---

# 25. COMPONENT DESIGN RULES

## Scene components

Each major era should have:

- one root section,
- semantic text in DOM,
- scene-local animation setup,
- clear cleanup,
- responsive animation strategy,
- reduced-motion path.

Do not make a single 2,000-line `page.tsx`.

## Reusable primitives

Extract a primitive only when:

- it appears multiple times,
- or it represents a coherent visual/interaction pattern.

Do not over-componentize tiny one-use fragments.

## State

Use local state by default.

Introduce global state only when multiple distant scenes truly depend on the same state.

---

# 26. DATA MODEL

The timeline should ideally be represented by typed metadata.

Example direction:

```ts
export type Era = {
  id: string
  year: string
  title: string
  shortTitle: string
  theme: string
}

export const eras: Era[] = [
  {
    id: "document-web",
    year: "1995",
    title: "The Document Web",
    shortTitle: "Documents",
    theme: "document",
  },
]
```

Do not put complex component instances into a global content data file just to appear data-driven.

---

# 27. ERROR RESILIENCE

The core experience should degrade gracefully.

If:

- smooth-scroll initialization fails,
- optional WebGL fails,
- a heavy asset does not load,
- reduced motion is active,

the visitor should still be able to read and navigate the museum.

A failed decorative effect must not blank the page.

---

# 28. DEVELOPMENT PHASES

## PHASE 0 — Project inspection / setup

Goal:

Establish the repository and development foundation.

Tasks:

- inspect repository before changing it,
- create/verify Next.js + TypeScript,
- verify Tailwind,
- install GSAP,
- configure ScrollTrigger,
- set up lint/typecheck/build,
- verify Vercel-compatible build,
- initialize Impeccable if not already initialized,
- preserve this `MASTER.md`.

Acceptance:

- dev server runs,
- build succeeds,
- no major console errors,
- a minimal page renders.

Do not build major animation here.

---

## PHASE 1 — Museum shell

Build:

- page structure,
- era metadata,
- navigation/progress rail,
- scene placeholders,
- responsive layout foundations,
- reduced-motion detection,
- GSAP setup utilities.

Acceptance:

- all eras exist as semantic sections,
- navigation jumps to each era,
- current era can be detected,
- mobile works,
- no scene-specific spectacle yet.

---

## PHASE 2 — Boot + 1995

Build first complete vertical slice:

- boot sequence,
- CRT transition,
- 1995 document web,
- browser primitive,
- initial custom cursor behavior,
- first major ScrollTrigger timeline.

Use this phase to establish motion quality.

Acceptance:

- transition is smooth,
- text stays readable,
- no scroll trap,
- cleanup works during hot reload/navigation,
- reduced motion works.

---

## PHASE 3 — 1999 Wild Web

Build the controlled-chaos scene.

Acceptance:

- significantly different visual language from 1995,
- visual clutter never prevents story comprehension,
- mobile choreography intentionally simplifies,
- transition out of scene is clean.

---

## PHASE 4 — 2004 + 2007

Build:

- social-network transformation,
- feed transition,
- desktop-to-mobile signature transformation.

The **desktop-to-mobile morph** is a hero portfolio moment and should receive extra polish.

---

## PHASE 5 — 2012 + 2018

Build:

- algorithmic/infinite feed sequence,
- normalization/design-system sequence,
- satire without sacrificing visual quality.

---

## PHASE 6 — 2023 + 2026

Build:

- generative interface scene,
- generated/adaptive web scene,
- pointer-responsive elements,
- stronger modern motion language.

Only introduce Three.js if 2D/CSS/GSAP cannot communicate the desired scene effectively.

---

## PHASE 7 — Future ending

Build:

- quiet ending,
- optional local visitor text interaction,
- credits,
- return/replay affordance.

---

## PHASE 8 — Responsive + accessibility

Do not treat this as "make desktop smaller."

Audit every scene.

Use Impeccable `/adapt` and `/audit` where useful.

Implemented in code: skip links, custom-cursor reduced-motion and text-caret gating, Future ending accessible answer, focus/hover parity, contrast on museum chrome, webring labels, reduced-motion notice, Generated reduced-motion CSS fallback, tablet (768–1023) and 360–430 choreography, nav clearance tokens, and notched-phone safe areas. Confirm the §29 viewport list in a live browser before treating visual QA as closed.

---

## PHASE 9 — Performance

Profile:

- JS bundle,
- ScrollTrigger count,
- animation loops,
- layout/recalculate style,
- image sizes,
- font loading,
- mobile performance.

Optimize based on evidence.

---

## PHASE 10 — Final design pass

Use Impeccable intentionally.

Suggested sequence:

```text
/critique
/normalize
/animate
/adapt
/audit
/polish
```

Do not blindly accept changes that conflict with the museum concept.

---

## PHASE 11 — Production readiness

Verify:

- production build,
- responsive behavior,
- reduced motion,
- keyboard access,
- no major console errors,
- metadata,
- OG image,
- favicon,
- asset licenses/credits,
- deployment configuration.

Deploy to Vercel only after these pass.

---

# 29. TESTING CHECKLIST

Before calling the project finished:

## Functional

- [ ] All era navigation works.
- [ ] Every scene can be reached.
- [ ] Reloading at normal page start works.
- [ ] No hydration warnings.
- [ ] No broken assets.
- [ ] No critical console errors.

## Motion

- [ ] GSAP instances clean up correctly.
- [ ] No major scroll jumps.
- [ ] No long dead scroll zones.
- [ ] Pins release correctly.
- [ ] Animations remain coherent when scrolling quickly.
- [ ] Animations remain coherent when scrolling backward.
- [ ] Reduced-motion experience is complete.

## Responsive

- [ ] 1440px checked.
- [ ] 1280px checked.
- [ ] 1024px checked.
- [ ] 768px checked.
- [ ] 430px checked.
- [ ] 390px checked.
- [ ] 360px checked.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Text contrast is acceptable.
- [ ] Meaningful images have alt text.
- [ ] Decorative visuals are marked appropriately.
- [ ] No essential hover-only content.
- [ ] Reduced motion is respected.

## Performance

- [ ] Images compressed.
- [ ] Fonts optimized.
- [ ] Heavy code lazy-loaded where useful.
- [ ] No unnecessary continuous animation loops.
- [ ] No React state updates per animation frame.
- [ ] Mobile remains reasonably smooth.

## Deployment

- [ ] Production build succeeds.
- [ ] Vercel preview succeeds.
- [ ] Metadata is correct.
- [ ] No secrets are exposed.

---

# 30. DEFINITION OF DONE

NET//HISTORY v1 is done when:

1. The visitor can travel through the complete timeline.
2. Every era has a distinct but coherent visual language.
3. At least three transitions feel portfolio/showcase quality:
   - CRT → web,
   - chaotic/personal web → social/feed web,
   - desktop → mobile.
4. The modern/AI eras do not feel like generic SaaS pages.
5. The narrative remains clear without animation.
6. Desktop is impressive.
7. Mobile feels intentionally designed.
8. Reduced motion is supported.
9. Production build is stable.
10. The Vercel deployment can be confidently shared publicly.

---

# 31. FUTURE IDEAS — NOT V1

Do not implement unless requested:

- optional audio mode,
- WebGL tunnel between eras,
- multiple museum exhibits,
- user-submitted memories,
- public guestbook,
- analytics dashboard,
- CMS,
- localization,
- persistent personalized ending,
- real-time multiplayer visitors,
- interactive timeline map,
- detailed browser-history side exhibits.

Keep v1 focused.

---

# 32. FIRST IMPLEMENTATION PRIORITY

Do **not** attempt to build the full museum in one agent run.

First prove the design system and animation architecture with:

1. project foundation,
2. museum shell,
3. Boot scene,
4. 1995 scene,
5. navigation/progress,
6. responsive/reduced-motion foundations.

After that vertical slice is visually convincing and technically stable, continue era-by-era.

---

# 33. AGENT BEHAVIOR

When an AI coding agent works on this repository:

- read `MASTER.md` before planning,
- inspect existing files before editing,
- state which phase is being implemented,
- keep changes scoped to that phase,
- run relevant checks after changes,
- fix regressions before expanding scope,
- do not silently replace prior creative direction,
- do not mark untested items as complete,
- prefer working code over placeholder architecture,
- leave the repository in a buildable state.

When unsure between "more effects" and "clearer storytelling," choose clearer storytelling.

**The final site should feel like an authored digital exhibit that could only have been made for this subject.**
