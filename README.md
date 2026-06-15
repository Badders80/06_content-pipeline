# Content Pipeline

Programmatic, code-driven video generation engine — deterministic, zero-AI-slop content pipeline.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start Remotion dev server
npm run dev

# Render a video
npm run build
```

## Prerequisites

- Node.js (LTS)
- FFmpeg
- Git

---

## Structure

```
06_content-pipeline/
├── src/              → Remotion compositions, components, assets
├── public/           → Static assets (audio, fonts, images)
├── docs/             → Project docs (no task lists — use hub)
├── MEMORY.md         → Current state, blockers, recent decisions
├── AGENTS.md         → Agent rules
├── HANDSHAKE.md      → Future API contract with 01_evolution/
├── BUILD_SUMMARY.md  → What exists
└── GAME_PLAN.md      → Build plan
```

---

## Related

- **Task hub:** [`../01_evolution/docs/PROGRESS.md`](../01_evolution/docs/PROGRESS.md)
- **Workspace rules:** [`/home/evo/workspace/CLAUDE.md`](../../workspace/CLAUDE.md)
