# MaxDrainageMap

A single-file GIS tool for Ontario municipal drainage engineering (Drainage Act / OMAFRA work), built by
Max Cheng, Water Resources EA at R.J. Burnside. It pulls together the live provincial and municipal data,
imagery, and terrain a drainage project actually needs, and exports all of it straight into CAD.

**The entire app is one HTML file — [`data/MaxDrainageMap.html`](data/MaxDrainageMap.html).** No build step,
no framework, no server. Open it directly in a browser to run it, or use the included Electron wrapper to run
it as a desktop app.

## What it does

### Lossless exports, CAD-ready
- **Aerial imagery** — native 0.2 m/px resolution regardless of site size. Large areas are automatically split
  into merged sections instead of losing resolution.
- **LiDAR terrain (DTM)** — native 0.5 m resolution, merged into a single GeoTIFF up to ~12×12 km, replacing the
  old manual tile-download-and-merge workflow.
- **DXF export** — every toggled layer exports to its own CAD layer, with its real on-screen colour reproduced
  in AutoCAD's colour index, and point features (manholes, catch basins, etc.) drawn as circles.
- **Culverts, per-property, and parcel-list exports** — straight to Excel, formatted for the kinds of tables a
  Drainage Act report actually needs.

### One-click analysis
- **Quick Report** — draws together area, municipality/township/conservation authority, soil (HSG, capability,
  drainage class, erodibility), wetlands, tile drainage, controlled drainage, DFO drain classification,
  municipal drains, and lots/concessions for a loaded boundary — every figure cited to its real government
  source, plus a written engineering-interpretation section.
- **Parcel & roll-number lookup**, **drain search**, **culvert search** (for PCSWMM DTM "burn-in" workflows),
  and a **soil/land-use breakdown** — all boundary-scoped, all exportable.

### A live, sourced layer library
41 toggleable layers: 21 province-wide (soil, wetlands, drains, dams, tile drainage, conservation authorities,
crop inventory, and more, pulled live from Ontario's AgMaps/GeoHub services) plus 20 municipal storm/drainage
layers individually verified across Southern Ontario. Every layer's info panel states its real source, links to
both a plain-language and a technical description, and shows a live-checked last-updated date — or an honest
note that the source doesn't publish one. The full breakdown, one layer at a time, is kept in
[`docs/LAYER_SOURCES.md`](docs/LAYER_SOURCES.md).

### Built to be checked, not trusted blindly
Every data source in this app was verified against its live REST endpoint before being wired in — never assumed
from a name or a stale reference. Real errors have been caught this way, including a field mix-up in a
government soil dataset (reading slope steepness where farmland capability was expected) and an area-sampling
bug that could make a Conservation Authority silently vanish from a report for a small boundary. Coverage gaps
are documented rather than hidden: several counties were checked and confirmed to publish nothing, rather than
left unexplained.

## Getting started

**Just open the file.** `data/MaxDrainageMap.html` runs in any modern browser — double-click it, or drag it into
a browser window. Most layers are open data and need no login; a small number (assessment parcels/roll labels,
controlled drainage) need a free Ontario AgMaps token, prompted for on first use.

**Or run it as a desktop app:**
```bash
cd electron
npm install
npm start
```
This wraps the same HTML file in an Electron window, fetches and refreshes the AgMaps token automatically in
the background, and adds a native save-file dialog for exports. `npm run package` builds a standalone
`.exe` (Windows) via `electron-packager`.

## Repository layout

```
data/MaxDrainageMap.html   — the entire app (single file, no dependencies)
electron/                  — desktop wrapper (main.js, package.json)
tools/dxf-viewer.html      — a standalone viewer for inspecting this app's own DXF exports
docs/LAYER_SOURCES.md      — every layer's real data source, one at a time
```

## A note on data sources

This project is built entirely on public, government-published data — Ontario's AIA/AgMaps services, LIO Open
Data, GeoHub, and individual municipalities' own open-data GIS servers. One exception: the parcel/assessment-roll
lookup pulls from the same provincial service AgMaps itself uses, which is **not** a substitute for a proper
Teranet/municipal-GIS subscription for anything that needs to be formally relied upon. It's included here as a
fast first-look tool, not a licensed data source — treat it accordingly.

## License

Personal/internal project, not currently licensed for redistribution — several of the data sources it pulls
from carry their own usage terms. Ask before reusing.
