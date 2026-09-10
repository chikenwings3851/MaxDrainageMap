# Layer Sourcing Reference

Where every layer in this app actually comes from — pulled directly from the app's own source citations
(the same text shown under each layer's own info card in `data/MaxDrainageMap.html`), so this document and
the app itself never drift apart.

**41 toggleable layers, plus the aerial photo basemap itself** (a separate thing in the program — a
background image, not a toggle in the layer list, so it's called out on its own below rather than folded
into the "41"). No layer requires anything other than a free AgMaps/LIO session token, and only 2 of the 41
toggleable layers need even that — everything else, plus the aerial basemap, is open data with no login.

> **Maintenance note:** update this file in the same commit as any change to `AG_LAYERS` in
> `data/MaxDrainageMap.html` — a new layer, a re-sourced field, a corrected last-updated date, etc. See the
> "Non-negotiable rituals" section of the project's working notes.

---

## Legal boundaries & jurisdiction

### 📐 Lots & Concessions
*What it shows:* The historical survey grid that Ontario land titles and legal descriptions are still based on today.
*Source:* Land Information Ontario (LIO) Open Data — Lot Fabric Improved. No token needed.
*Last updated:* 2026-06-21 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/lio::lot-fabric-improved](https://geohub.lio.gov.on.ca/datasets/lio::lot-fabric-improved/about)

### 🗂 Geographic Townships
*What it shows:* Original survey township boundaries — predate, and don't always match, today's municipal boundaries.
*Source:* Land Information Ontario (LIO) Open Data — Geographic Township Improved. No token needed.
*Last updated:* 2026-06-19 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/lio::geographic-township-improved](https://geohub.lio.gov.on.ca/datasets/lio::geographic-township-improved/about)

### 🏛 Municipal Boundaries
*What it shows:* Current lower-tier/single-tier municipal boundaries — today's actual jurisdictions, distinct from the historical townships above.
*Source:* Land Information Ontario (LIO) Open Data — Municipal Bnd Lower And Single. No token needed.
*Last updated:* 2026-03-13 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/lio::municipal-boundary-lower-and-single-tier](https://geohub.lio.gov.on.ca/datasets/lio::municipal-boundary-lower-and-single-tier/about)

### 🌲 Conservation Authorities
*What it shows:* Watershed-based agencies responsible for natural hazard regulation, floodplain mapping, and watershed management.
*Source:* Land Information Ontario (LIO) Open Data — Conservation Authority Admin Area, verified 2026-07-19. No token needed.
*Last updated:* 2025-11-27 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/lio::conservation-authority-administrative-area](https://geohub.lio.gov.on.ca/datasets/lio::conservation-authority-administrative-area/about)

---

## Assessment parcels (the one licensed source in the whole program)

### 📋 Assessment Parcels (ARN)
*What it shows:* Individual property parcels as defined by MPAC assessment — ARN is the unique ID per taxable property.
*Source:* Ontario AIA/AgMaps — **MPAC/Teranet licensed assessment data**. Requires the AgMaps token; cannot be migrated to open data (licensing restriction).
*Last updated:* 2026-01-26 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/documents/lio::ontario-parcel](https://geohub.lio.gov.on.ca/documents/lio::ontario-parcel/about)

### 🏷️ Roll Number Labels
*What it shows:* Same licensed parcel data as above, rendered as ARN text labels on the map.
*Source:* Ontario AIA/AgMaps — MPAC/Teranet licensed assessment data. Requires token.
*Last updated:* 2026-01-26 (per GeoHub item record)
*Link:* same as above.

> **This is the one part of the program that's a genuine grey area** — same public session key AgMaps itself
> hands out, no different access than anyone gets, but it's not a substitute for a real Teranet/municipal-GIS
> lookup for anything that goes in a formal report. See the licensing note in the main [README](../README.md).

---

## Drainage-specific layers

### 💧 Municipal Drains
*What it shows:* Drains constructed/maintained under the Drainage Act — engineered channels, not natural watercourses.
*Source:* LIO Open Data — "Constructed Drain" (OMAFRA), verified 2026-07-19. No token needed. Confirmed live edits as recent as 1-2 days before verification, on top of the catalog date.
*Last updated:* 2026-06-19 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/ontarioca11::constructed-drain](https://geohub.lio.gov.on.ca/datasets/ontarioca11::constructed-drain/about)

### 🔵 Tile Drainage
*What it shows:* Areas where subsurface agricultural tile has been installed — reported by licensed drainage contractors to OMAFRA. Mapped extent only, not individual tile runs.
*Source:* LIO Open Data — "Tile Drainage Area" (OMAFRA), verified 2026-07-19. No token needed.
*Last updated:* 2026-06-19 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/maps/ontarioca11::tile-drainage-area](https://geohub.lio.gov.on.ca/maps/ontarioca11::tile-drainage-area)

### 🔶 Controlled Drainage
*What it shows:* Structures (pumps, control dams, check drains, water-level control) that regulate the water table for crop growth. Colours = the server's own condition rating.
*Source:* Ontario AIA/AgMaps (**token required — the one other layer besides parcels that needs it**). No live open-data equivalent exists, only a static zip download. Colours decoded directly from the server's own legend images.
*Last updated:* 2022-10-17 (per GeoHub item record) — **over 3 years stale**, consistent with this being an unmaintained/likely-discontinued layer.
*Link:* [ontariogeohub-lio.opendata.arcgis.com/datasets/controlled-drainage](https://ontariogeohub-lio.opendata.arcgis.com/datasets/controlled-drainage)

### 🐟 DFO Drain Classification
*What it shows:* Fisheries and Oceans Canada's fish-habitat sensitivity rating for a drain under the federal Fisheries Act — determines what review level maintenance work needs.
*Source:* LIO Open Data — "Constructed Drain" (DFO_CLASS field), verified 2026-07-19. General framework confirmed against DFO's own public Guidance Document. **Caveat:** the exact A/B vs. E1/E2 boundary wasn't independently re-verified — treat a borderline case as needing a real DFO/Conservation Authority check regardless of what this layer shows.
*Last updated:* 2026-06-19 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/ontarioca11::constructed-drain](https://geohub.lio.gov.on.ca/datasets/ontarioca11::constructed-drain/about)

### 👤 Drainage Superintendents
*What it shows:* The appointed Drainage Act superintendent (name/firm/phone) for each municipality.
*Source:* Ontario GeoHub, verified 2026-09-02 against the live service — 414 real municipal records, confirmed real for Township of Essa (Simcoe County). No token needed.
*Last updated:* 2026-05-05
*Link:* [geohub.lio.gov.on.ca/datasets/ontarioca11::drainage-superintendents](https://geohub.lio.gov.on.ca/datasets/ontarioca11::drainage-superintendents)

---

## Soils (all four from one government dataset)

All four soil layers below come from the same underlying OMAFRA **Soil Survey Complex** dataset — just
different fields off the same records — verified 2026-07-19 directly against the official LIO data
dictionary PDF (`Soil Survey Complex - Data Description.pdf`), which is itself in the app's own Sources &
References section. No token needed for any of them.

### 🌱 Soil Capability
*What it shows:* Canada Land Inventory (CLI) rating of soil suitability for common field crops.
*Field used:* `CLI1`. *Last updated:* 2025-12-11.

### 🟡 Soil Drainage Class
*What it shows:* How well the natural soil drains under normal conditions — feeds tile spacing/drain design.
*Field used:* `DRAINAGE1`. *Last updated:* 2025-12-11.

### 💧 Hydrologic Soil Group (HSG)
*What it shows:* Groups soils by infiltration rate — used to estimate runoff for stormwater/drainage design.
*Fields used:* `HYDRO1`/`HYDRO2`. Classification method per Chisholm (1981) and Chisholm, Irwin & Acton (1984). *Last updated:* 2025-12-11.
*Note:* the area-percentage math behind this layer's breakdown had a real accuracy bug (per-polygon bounding-box
sampling that under/over-counted classes for large soil polygons) found and fixed 2026-09-09 — see the git
history for `querySoilAnalysis()` around that date for the before/after.

### 🌪️ Soil Erodibility (K-factor)
*What it shows:* USLE K-factor — how easily each soil erodes under rainfall/runoff. Relevant for erosion/sediment control planning around drain work, not drain design itself.
*Field used:* `K_FACTOR1`. Real Ontario-wide range confirmed live: 0.001–0.075, average ~0.03, across ~117,500 rated polygons — the colour breaks are set against that actual measured range, not a generic textbook scale. *Last updated:* 2025-12-11.

**Shared link (data dictionary):** [publicdocs.mnr.gov.on.ca — Soil Survey Complex Data Description (PDF)](https://www.publicdocs.mnr.gov.on.ca/mirb/Soil%20Survey%20Complex%20-%20Data%20Description.pdf)
**Shared link (dataset page):** [geohub.lio.gov.on.ca/datasets/ontarioca11::soil-survey-complex](https://geohub.lio.gov.on.ca/datasets/ontarioca11::soil-survey-complex/about)

---

## Imagery, terrain & land cover

### 🛰️ Aerial Imagery (Airphoto basemap & export)
*What it shows:* the aerial photo basemap and the 🛰 Airphoto export — native 20cm (0.2m) provincial orthoimagery.
*Source:* Land Information Ontario (LIO) — `LIO_Imagery/Ontario_Imagery_Web_Map_Service`, credited "© LIO" on
the map. **This is a single pre-built, government-maintained mosaic**, not one flight — it's stitched
together from real regional aerial survey programs flown at different times (SWOOP for Southwestern Ontario,
COOP for Central Ontario, DRAPE further north, etc.), so which real program actually covered a given spot
depends entirely on where you are.
*Last updated:* no single date applies, by design — it's a rolling mosaic; the underlying build was last
touched 2023-11-16 (per the service's own metadata), but that's a mosaic-build date, not a flight date.
*Link:* [ws.lioservices.lrc.gov.on.ca — Ontario Imagery Web Map Service](https://ws.lioservices.lrc.gov.on.ca/arcgis2/rest/services/LIO_Imagery/Ontario_Imagery_Web_Map_Service/MapServer)

**The export source-citation feature (added 2026-09-09) answers this properly per export**: every time you
export the aerial photo, the program separately queries Ontario's real flight-acquisition catalog for the
exact exported area and drops a companion `Airphoto_SOURCES_....txt` naming the actual survey program, year,
resolution, and accuracy that covers it — verified for real against the West Perth/Fullarton test area:
**"SWOOP2020"** (Southwestern Ontario Orthophotography Project, flown 2020, 0.16m/pixel, ±0.45m horizontal
accuracy), with an older **"SWOOP2015"** tile also on file for the same spot. One honest caveat: because the
exported image itself is that single pre-built mosaic, there's no way to confirm *after the fact* which of two
overlapping flights actually won at a specific pixel — the citation file says so rather than guessing "newest
wins" (see `IMAGERY_OVERLAP_NOTE` in the source).

### ⛰ LiDAR DTM (bare earth)
*What it shows:* Bare-earth ground elevation from airborne LiDAR — the exact source the DTM export/contour tools pull real elevation values from.
*Source:* Ontario Digital Terrain Model (LiDAR-derived), MNRF, via LIO. No token needed.
*Last updated:* 2026-06-11 (per GeoHub item record) — though individual tiles vary, since LiDAR is flown as
separate regional projects over many years. The DTM export's own source-citation feature (added 2026-09-09)
names the real project covering any specific exported area (e.g. "OMAFRA Lidar (Lake Erie) 2016-18") rather
than relying on this one catalog-level date, and honestly notes that the export service's mosaic rule
(`Northwest`/`First`) picks by tile-centre geometry, not by which flight is newest — see `DTM_OVERLAP_NOTE`.
*Link:* [geohub.lio.gov.on.ca/maps/mnrf::ontario-digital-terrain-model-lidar-derived](https://geohub.lio.gov.on.ca/maps/mnrf::ontario-digital-terrain-model-lidar-derived/about)

### 🗺️ Ontario Land Cover V1
*What it shows:* Province-wide land cover classification (forest/wetland/cropland/grassland/urban/water) at 15m resolution from 2020 imagery.
*Source:* Ontario Land Cover Compilation V1, MNRF/LIO. No token needed. Colours decoded directly from the live service's own legend.
*Last updated:* 2025-11-27 (catalog record) — underlying imagery itself is from 2020.
*Link:* [geohub.lio.gov.on.ca/datasets/ontario-land-cover-version-1-0](https://geohub.lio.gov.on.ca/datasets/ontario-land-cover-version-1-0)

### 🌾 AAFC Crop Inventory 2024
*What it shows:* Which specific crop was growing in each field in 2024, from satellite imagery — confirms current land use vs. the static land-cover layer above.
*Source:* Annual Crop Inventory 2024, Agriculture and Agri-Food Canada. No token needed.
*Last updated:* 2025-07-31 (2024 crop-year data publish date; broader catalog record touched 2025-11-05)
*Link:* [agriculture.canada.ca/atlas/aci](https://agriculture.canada.ca/atlas/aci/)

---

## Wetlands & water-related features

### 🪷 Wetlands (PSW + Other Evaluated)
*What it shows:* Evaluated wetlands under the Provincial Policy Statement — Provincially Significant Wetlands (PSW) and other locally/regionally evaluated wetlands. May trigger extra review beyond standard Drainage Act procedure.
*Source:* LIO Open Data — "Wetland" (`WETLAND_SIGNIFICANCE` field), verified 2026-07-19. No token needed. **Only the ~90,600 evaluated wetland polygons are shown**, out of ~3.63 million total — the rest are unevaluated, not "insignificant," and were left out as too voluminous/uncertain to render meaningfully.
*Last updated:* 2026-06-19 (per GeoHub item record)
*Link:* [geohub.lio.gov.on.ca/datasets/mnrf::wetland](https://geohub.lio.gov.on.ca/datasets/mnrf::wetland/about)

### 🌊 Dam Inventory
*What it shows:* Medium and large dams province-wide — relevant wherever a project sits downstream of one. Does not include small/beaver dams, water crossings, or culverts.
*Source:* Land Information Ontario (LIO_Open04, MNRF), verified 2026-09-02 against the live service. No token needed.
*Last updated:* 2026-08-17
*Link:* [geohub.lio.gov.on.ca/datasets/mnrf::ontario-dam-inventory](https://geohub.lio.gov.on.ca/datasets/mnrf::ontario-dam-inventory)

### 📡 Water & Weather Monitoring Stations
*What it shows:* Stream/weather gauge locations used by the province's Surface Water Monitoring Centre for flood/drought assessment. Station locations only — no live readings.
*Source:* Land Information Ontario (LIO_Open08), verified 2026-09-02 against the live service. No token needed.
*Last updated:* 2026-02-23
*Link:* [geohub.lio.gov.on.ca/datasets/lio::ontario-water-and-weather-monitoring-stations](https://geohub.lio.gov.on.ca/datasets/lio::ontario-water-and-weather-monitoring-stations)

---

## County & Municipal Layers (one-off, local-server data — 20 layers)

These don't come through LIO at all — each is that specific county/city's own public GIS server, checked
and verified individually. Grouped by area:

**Simcoe County**
- 🏘 **Oro-Medonte Parcels** — County of Simcoe's own server. No token. *No published last-updated date* — checked, genuinely nothing to show. [Simcoe GIS](https://simcoe.ca/explore/geographical-information-systems-maps/)

**Wellington County (Centre Wellington)**
- 🌧️ **Storm Sewer (Centre Wellington)** — Township's own server (`AM_Storm_Sewer`). Last real edit: 2025-05-13.
- 🛰 **2023 Airphoto 7.5cm (Centre Wellington)** — Same server. 7.5cm/pixel, flown 2023. No published date beyond the flight year in the service name.

**Essex County**
- 💧 **Drains (Essex County)** — County's own server, real `DRAIN_NAME` field. *No date field exists on this service at all* — checked, confirmed absent.
- 🌧️ **Storm Sewer (Essex/Kingsville/Lakeshore)** — Same county server, shared across all 3 towns. The only date-like field found was pipe installation year, not a last-edited date — **deliberately not shown as "last updated" since that would be misleading**.

**Perth County**
- 🌧️ **Storm Sewer (West Perth)** — Perth County's shared server. Attribute queries fail server-side on this one — no way to check a real date, even live.
- 🌧️ **Storm Sewer (North Perth)** — Same server. Only 1 of 4 sublayers has any date field, and it's a per-point GPS-collection date, not a service-wide edit date — not reliable enough to badge the whole layer.

**Barrie**
- 🌧️ **Storm Sewer (Barrie)** — City's own Open Data server. Last real edit: 2026-07-09. [Dataset page](https://opendata.barrie.ca/datasets/barrie::storm-linear/about)

**Oxford County**
- 🌧️ **Storm Sewer (Oxford County)** — County-wide Cartegraph asset basemap. Map-only service (no attribute Query capability) — genuinely no way to check a live date.

**Waterloo Region**
- 🌧️ **Storm Sewer (Kitchener)** — City's Open Data (several hosted datasets combined into one toggle). Last real edit: 2026-06-23.
- 🌧️ **Storm Sewer (City of Waterloo)** — Same region hub. Last real edit: 2021-12-23 — **noticeably older**, flagged as lower-confidence.

**Guelph**
- 🌧️ **SWM Ponds (Guelph)** — 152 stormwater management ponds; Guelph doesn't publish a pipe network publicly. Checked for any date signal — genuinely none exists.

**Halton Region**
- 🌧️ **Storm Sewer (Oakville)** — Town's server. Last real edit: 2026-07-13.
- 🌧️ **Storm Sewer (Burlington)** — City's server. Last real edit: 2026-07-20.

**Peel Region**
- 🌧️ **Storm Sewer (Mississauga)** — City's Open Data. Last real edit: 2026-07-01.
- 🌧️ **Catch Basins (Brampton)** — Points only (no pipe network published). Last real edit: 2024-08-20 — older, flagged accordingly.

**Durham Region**
- 🌧️ **Storm Sewer (Durham Region)** — Region-wide server. Checked all 3 sublayers for a date field — none exists.

**Hamilton**
- 🌧️ **Storm Sewer (Hamilton)** — Filtered server-side from the city's combined sewer dataset (`SUBTYPE=STORM`, ~25,000 of ~54,000 total records — the rest is sanitary/combined/forcemain). Last real edit: 2026-07-13.

**Peterborough**
- 🌧️ **Storm Sewer (Peterborough)** — City's Open Data. Last real edit: 2026-04-22.

**Kingston**
- 🌧️ **Storm Sewer (Kingston)** — Served through ArcGIS Online utility proxies (if this one ever breaks, the proxy ID likely rotated — not that the data disappeared). Last real edit: 2023-01-20 — older, flagged accordingly.

---

## The honest pattern across all 41

- **Every layer's real source, and whether a last-updated date could even be found, was individually
  checked** — not assumed. Where a service genuinely has no date signal (checked both the easy way and the
  harder way — the full field list, not just the obvious metadata), the app says so outright instead of
  guessing or hiding it.
- **A few sources are honestly flagged as stale or lower-confidence** (Controlled Drainage, City of Waterloo
  storm, Brampton catch basins, Kingston storm) — called out here the same way the app itself calls them out,
  not smoothed over.
- **Nothing in this program invents a number.** Every figure traces back to one of these real government
  services — the program's job is pulling them together and doing the area/classification math, not
  generating the underlying data itself.
