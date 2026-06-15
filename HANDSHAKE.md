# API Handshake — Content Pipeline ↔ 01_evolution

**Version:** 1.0
**Last Updated:** 2026-06-15

---

## Status

**Standalone.** This project currently has no backend dependency. All video content is generated from local code, assets, and audio.

---

## Future Integration

When this pipeline consumes data from Evolution Stables (e.g., horse profiles, race data, investor reports), the following will be defined here:

| Aspect | Detail |
|--------|--------|
| Endpoint | `01_evolution/` SSOT API (TBD) |
| Data format | JSON via HTTP |
| Auth | TBD |
| Caching | TBD |

---

## Current Data Flow

```
Local SVG assets  →  Remotion compositions  →  FFmpeg render  →  MP4 output
Local audio tracks → Remotion compositions  →  FFmpeg render  →  MP4 output
```
```

---

## Related
- [`../01_evolution/api/README.md`](../01_evolution/api/README.md) — Backend API docs
