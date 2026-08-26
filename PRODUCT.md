# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js App Router, React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Vercel. Chosen because MASTER.md and CURSOR_PROMPT.md lock this stack; no database, no Three.js in this vertical slice.

## Users

Primary visitors are frontend developers, designers, creative developers, recruiters, students, tech enthusiasts, and people nostalgic for earlier web eras. The first visit must work without technical knowledge; deeper details should reward technically curious users.

## Product Purpose

NET//HISTORY is an interactive digital museum that tells the visual and cultural evolution of the World Wide Web through one continuous scroll-driven experience. The website itself is the exhibit: visitors should feel as though they enter an old computer, travel through successive eras of internet culture, watch the interface evolve, and arrive at a speculative near future.

Success means a portfolio-grade frontend experience that is memorable, understandable without instructions, visually distinct from generic AI SaaS landing pages, and deployable as a mostly static Next.js app on Vercel.

## Positioning

The interface mutates with history. Spacing, typography, chrome, texture, color, density, motion, navigation, and interaction behavior change as the timeline advances. This is not an article with animations added; the page is the artifact.

## Operating Context

Source of truth is MASTER.md. CURSOR_PROMPT.md scopes the first implementation run. Development proceeds era-by-era. Primary deployment is Vercel. Impeccable is a design-quality assistant and must not outrank MASTER.md or replace intentional historical ugliness with modern SaaS UI.

## Capabilities and Constraints

Confirmed for v1:

- One-page scroll museum with era navigation
- GSAP owns timeline animation; ScrollTrigger owns scroll choreography
- Reduced-motion path must keep the full narrative
- No autoplay audio
- No database; no persistent server; no secrets
- No Three.js until later phases explicitly need it
- No clone of a specific commercial OS, browser, or social network

Current implementation scope is Phases 0–4: foundation, museum shell, Boot, 1995 Document Web, 1999 Wild Web, 2004 Social Web, and 2007 Mobile Shift. Later eras exist as navigable placeholders.

Explicitly not v1: optional audio, WebGL tunnels, CMS, localization, user-submitted memories, analytics, multiplayer, or a complete academic history of the internet.

## Brand Commitments

Name: NET//HISTORY. Tagline: 30+ years of the web in one scroll. Suggested title: NET//HISTORY — 30 Years of the Web in One Scroll. Voice: observant, nostalgic without sentimentality, technically aware, occasionally witty, not corporate, not fake-profound. Do not rename without an explicit decision.

## Evidence on Hand

Product, scene, copy, and architecture direction live in MASTER.md. Implementation prompt lives in CURSOR_PROMPT.md. There are no licensed historical screenshots, user research transcripts, or testimonials. Future work must not fabricate statistics or claim speculative 2026 concepts as established fact.

## Product Principles

- Narrative before decoration: every scene needs a reason a visitor could retell.
- The interface evolves with history; one modern design system for every era is a failure.
- Restraint creates contrast; quiet sections make major transitions stronger.
- Desktop may be spectacular; mobile must be an intentional choreography, not a scaled-down desktop.
- Prefer clearer storytelling over more effects.

## Accessibility & Inclusion

Semantic HTML, logical headings, keyboard-accessible navigation, visible focus, sufficient contrast, reduced-motion support, text alternatives for meaningful images, decorative visuals hidden from assistive tech when appropriate. No mandatory hover, no autoplay sound, no rapid flashing. Animation must not trap keyboard focus. The experience must remain understandable with animation disabled or reduced.
