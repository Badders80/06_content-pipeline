# Content Pipeline — Game Plan

**Status:** 🔴 Phase 0 — Scaffolding
**Created:** 2026-06-15
**Last Updated:** 2026-06-15

---

## Workspace Boundary

| Workspace | Purpose | What Lives Here |
|-----------|---------|-----------------|
| `06_content-pipeline/` | **Programmatic video / content generation** | Deterministic, code-driven video content using Remotion, SVG graphics, and FFmpeg |

**Rule:** This project is standalone. It does not depend on `01_evolution/` in its current phase. Future integration TBD.

---

## Goal

Build a deterministic, zero-AI-slop video content pipeline where every frame is defined by code — clean math, custom SVGs, precise audio sync.

**Scope:**
- Remotion-based composition engine
- Custom SVG asset library
- CSS and Canvas-based animations
- FFmpeg render pipeline with audio track stitching

**Non-Goals (current phase):**
- Integration with Evolution Stables backend APIs
- AI-generated imagery or video
- Stock footage or third-party video APIs

---

## Architecture Decisions (Locked)

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| Video framework | Remotion | React-based, frame-accurate, code-driven | 2026-06-15 |
| Graphics | SVG + CSS + Canvas/Three.js | Scalable, infinite resolution, full control | 2026-06-15 |
| Rendering | FFmpeg via Remotion | Industry standard, deterministic output | 2026-06-15 |

---

## Phase 1 Definition of Done

1. Remotion project initialized with Tailwind
2. First composition renders cleanly
3. FFmpeg output produces a valid MP4
4. Project structure documented

---

## Related Documents

- [`MEMORY.md`](MEMORY.md)
- [`AGENTS.md`](AGENTS.md)
- [`HANDSHAKE.md`](HANDSHAKE.md)
- [`BUILD_SUMMARY.md`](BUILD_SUMMARY.md)

- **Current status:** [`MEMORY.md`](MEMORY.md)
- **Agent rules:** [`AGENTS.md`](AGENTS.md)
- **API contract:** [`HANDSHAKE.md`](HANDSHAKE.md)
- **Build map:** [`BUILD_SUMMARY.md`](BUILD_SUMMARY.md)
- **Task hub:** [`../01_evolution/docs/PROGRESS.md`](../01_evolution/docs/PROGRESS.md)
