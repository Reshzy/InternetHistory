---
name: NET//HISTORY
description: 30+ years of the web in one scroll
colors:
  museum-void: "#050505"
  museum-paper: "#e8e4d9"
  museum-signal: "#d4782a"
  terminal-phosphor: "#6f8f62"
  document-blue: "#1a3d8f"
  wild-magenta: "#ff4d9a"
  social-steel: "#6b87b8"
  generated-ember: "#d4782a"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 3.2vw, 2.2rem)"
    fontWeight: 520
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.22em"
  title:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  sm: "3px"
  md: "6px"
  device: "28px"
spacing:
  nav-clearance-desktop: "3.15rem"
  nav-clearance-mobile: "6.1rem"
  copy-pad: "0.5rem"
  focus-offset: "3px"
components:
  museum-nav:
    backgroundColor: "{colors.museum-void}"
    textColor: "{colors.museum-paper}"
    typography: "{typography.title}"
    padding: "0.35rem 0.75rem 0.4rem"
  era-mark-active:
    backgroundColor: "{colors.museum-signal}"
    textColor: "{colors.museum-paper}"
  skip-link:
    backgroundColor: "#111111"
    textColor: "{colors.museum-paper}"
    padding: "0.5rem 0.85rem"
  generated-mode:
    backgroundColor: "transparent"
    textColor: "{colors.museum-paper}"
    padding: "0.45rem 0.9rem"
    rounded: "{rounded.none}"
  generated-mode-pressed:
    backgroundColor: "transparent"
    textColor: "{colors.museum-signal}"
  future-field:
    backgroundColor: "transparent"
    textColor: "#cfe3c0"
    typography: "{typography.body}"
    padding: "0"
---

# Design System: NET//HISTORY

## Overview

**Creative North Star: "The Interface Is the Exhibit"**

NET//HISTORY is a one-page museum whose visual language mutates with the timeline. Shared chrome (void black, paper cream, ember signal, IBM Plex Mono) is the museum building. Each era is a gallery with its own materials: 1995 gray document chrome, 1999 handmade neon, 2007 pocket bezels, 2018 homogenized Geist, 2026 unfixed shards. The product fails if those galleries collapse into one modern system.

Quiet sections earn loud ones. Boot and NEXT are near-black. 1999 is allowed to be ugly. 2018 is allowed to look like every other product — as satire, then as a grid punchline, not as the house style.

**Key Characteristics:**
- Museum chrome stays minimal and recedes; era scenes carry the identity.
- Two faces only at the museum layer: IBM Plex Mono and Geist.
- Scroll-tied GSAP pins, not page-load choreography.
- Reduced motion keeps final states, not empty stages.

## Colors

Museum chrome uses four tokens. Era palettes are local on purpose.

### Primary
- **Signal Ember** (#d4782a): Active era mark, generated-mode pressed state, 2026 shard kickers. Rare in chrome; never a gradient wash.

### Secondary
- **Terminal Phosphor** (#6f8f62): Boot CRT text, NEXT/future copy, ending cursor. The machine-waking color.

### Neutral
- **Museum Void** (#050505): Page and nav ground.
- **Museum Paper** (#e8e4d9): Chrome text and light-era ink.

### Era locals (not global tokens)
Document blue `#1a3d8f`, wild magenta `#ff4d9a`, social steel `#6b87b8`. These live on `.era-theme-*` and must not leak into nav, skip links, or NEXT.

**The Mutation Rule.** One accent for the building. A new accent for each gallery. Do not "normalize" era color into Signal Ember.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body / Label Font:** IBM Plex Mono (with ui-monospace)

Museum chrome and Boot/NEXT speak mono. 2018–2026 statements may use Geist because those eras are about sameness and generation. 1995 uses Times-like serif inside the document; 1999 uses Comic/Impact inside the homepage. Those are props, not the museum face.

### Hierarchy
- **Display** (520, clamp 1.45–2.2rem, -0.04em): Era statements from 2018 onward.
- **Headline** (mono 0.72rem, 0.22em): Era year coordinates.
- **Title** (mono 11px, 0.14em): Nav marks and brand lockup.
- **Body** (mono 0.95rem / 1.45): Support copy; measure ~36–46ch.
- **Label** (mono 0.72rem, 0.14em): Mode buttons, skip links.

**The Tracking Floor Rule.** Display tracking is -0.04em. Do not crush headings past that.

## Layout

Pinned scenes are `100dvh` grids: copy row, stage, optional controls. Copy uses `--museum-copy-pad` so statements clear the sticky rail. Desktop nav is a single row; below 1024px the rail wraps under the lockup. Breakpoints in CSS: 1023px (nav), 767px (scene choreography), 430px (type floor).

## Elevation & Depth

Chrome is flat: 92% void bar, 1px white/10 border. Depth is era-specific: 1995 inset chrome, 1999 hard offset shadows, 2007 device drop shadow, 2018 soft product shadow. CRT phosphor glow is Boot-only.

**The Flat Chrome Rule.** Museum nav does not grow glass, blur, or drop shadows.

## Shapes

Chrome is square (0). 2007 device uses 28px corners after the morph. 2018 tiles use ~8px as the satire of the "8PX ROUNDED SYSTEM." Do not round the nav, skip links, or generated-mode buttons.

## Components

### Navigation
Museum rail, not a SaaS header. Desktop: `NET//HISTORY` + year marks in one row. Mobile: lockup + current era, then a horizontal year strip (44px targets). Active mark: 6px signal disc. On NEXT the bar recedes (`data-recessed`, 42% void). Focus: 2px signal outline, 3px offset.

### Skip links
Absolute above the viewport until `:focus-within`. Void button, paper text, 0.75rem mono.

### Generated modes
Square ghost buttons, 2.75rem min height, 1px #3a3229. Pressed: signal border and type. These are the visitor's only 2026 controls.

### Future field
Transparent terminal line, phosphor caret, visible label "What should the web become next?" Placeholder "type an answer." No boxed input, no primary button.

### Device frame
Desk: 3px gray bezel. Pocket: 28px black bezel, ear, home. On small screens the scene starts already in the pocket — no nested phone-in-phone.

## Do's and Don'ts

### Do:
- **Do** let each era keep its own chrome, type, and density.
- **Do** land era jumps on the pinned scene (`ScrollTrigger.start`), not a native hash guess.
- **Do** keep reduced-motion final states readable (documents visible, shards visible, prompt visible).
- **Do** use Signal Ember only for "you are here" and 2026 agency.

### Don't:
- **Don't** restyle 1995/1999 into modern cards, glass, or a shared radius.
- **Don't** hide 2018's Normalizer/badges or 2023's outputs until the end of a long pin.
- **Don't** cover story copy with the rail; clearance tokens exist for that.
- **Don't** add a second animation library or a 3D engine unless a later phase explicitly needs it.
