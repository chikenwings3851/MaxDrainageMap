# Drainage Map — Lunch & Learn Script
### Live demo: Hughes Drain

---

## Intro

Hi everyone, welcome to my lunch and learn — thanks for giving up your lunch time for this, with no lunch.

Today I'll be talking about this drainage mapping tool I've been building, bit by bit. And if you're wondering — I built this with AI. I don't know how to code. at all** i wanted to build this program becaue there is a lot of things i thought could soooo be automated and with AI out i wanted to build a tool that could help me out with the tedious work. This is pure curiosity and having a bit of fun to see what I can do to make my own life easier.

We did a first run-through at last sector meeting, but I think we've got some new faces watching today, so I'll do a quick refresher on **what this tool is, how it works, and why I think it's a big time saver.**

First things first — this program runs on **HTML**. which is basically a webpage. It's saved on the Municipal Drain group SharePoint, under the **T drive → CAD → Drainage Map** *(show them)*. You'll need to download it to run it, so that's what I'll do here.

---

## A few things about this program

- **Single HTML file.** No install, no license, no server sitting somewhere.
- It runs **entirely on your own computer** — anyone with the HTML file can download and run it.
- It runs in your **browser** and pulls everything **live from the province's open data services** — parcels, imagery, terrain, and more.
- It's a tool that **stitches everything together** so you aren't chasing all these sources one at a time.

**Why I built it:** a lot of the grunt work at the start of a drainage project is the same every single time. Figure out whose roll number I'm on, get the roll numbers, write them down in short form, get parcels into CAD, pull the airphoto, pull the LiDAR, and get it all georeferenced. That's **hours of downloading, merging, and lining things up** before any real work starts. This program collapses all those mind-numbing steps into **one central place.**

So rather than keep talking about it — let me show you a live demo on a project that's already been done: the **Hughes Drain.**

---

## Step 1 — Open the app & the LIO token

Let's open it up. First thing it prompts us for is a **LIO token.**

The provincial mapping services need a little **session key** to talk to them — the same one AgMaps hands your browser when you open their public viewer. All this does is grab that key so my tool can pull the **same public data** directly, instead of me clicking through their viewer one layer at a time. **Same access anyone has, same public data — I'm just skipping the middleman.**

This unlocks the **parcel layer** so I can see it through the program and export it to CAD. Everything else is pulled through public GIS servers.

> **One thing I want to be upfront about:** this parcel export is technically a grey area. The proper channel is through **Burnside's GIS group** or a **GIS contact at the municipality or a licesne at TERANET.** But if you need a parcel quick, this does work — with a disclaimer such as:
>
> *"This information is provided for general reference and illustrative purposes only, is not the product of a field survey or legal boundary retracement, and may not reflect current registered ownership or title."*

*(Run through the UI of the program.)*

---

## Step 2 — LiDAR / DTM export

First real step in a drainage project is figuring out **who's in the watershed** for that drain — and for that I need a **LiDAR download** for watershed delineation.

I'll click **Export** (top left) → at the bottom, **DTM TIFF · lossless.** One click, and whatever's in your viewspace gets pulled.

**The old way:** open the tile index CAD file, manually check properties to find which tiles you need, pull them off the full DTM download one at a time, then use a *separate* program to merge them all — and I remember there always being coordinate/datum headaches. **None of that matters anymore.** This export grabs what you want based on your screen extent, **merges the DTM, and georeferences it to the right spot automatically.**

Don't trust it? Click **Get LiDAR Tiles** — it opens a new tab at that location and the popup tells you *exactly* which tiles to download the manual way. **I've tested both methods and they give the identical result.**

Then it's just a **MAPIMPORT** in CAD and it drops right in.

**Source & specs of this LiDAR:**
- From the **Ontario Digital Terrain Model (LiDAR-Derived)**, MNRF — via LIO GeoHub.
- **0.5 m resolution** → each pixel covers a **50 cm** patch of ground.
- **5–10 cm vertical accuracy** on open ground *(current provincial program spec — tightens on bare earth, loosens under canopy).*

*Quick clarification if anyone asks:* **0.5 m is the grid spacing; 5–10 cm is how close each elevation is to true ground.** Two different things. Half-metre spacing is tight enough to catch swales, ditch inverts, and the subtle high/low points that actually drive surface flow — which is the whole point for drainage.

---

## Step 3 — Watershed delineation *(brief)*

Once the DTM's in, you'd run a **watershed delineation** — I won't walk through that, but I've got a finished one for the Hughes Drain *(show in CAD)*.

The product is basically a **closed polyline** around my drain. I'll:
1. Save it in a folder — call it **Hughes Drain WS** — and export as a **shapefile.**
2. Make sure the object type is a **polygon.**
3. **Critical:** turn on the setting to treat it as a **closed polyline** *(turn it on right here)*.
4. Find the export, **highlight all the files, and zip them up.**

---

## Step 4 — Load the watershed & pull the aerial

With the WS loaded in, this **unlocks a whole range of features** tied to that boundary. I'll build the essential data one step at a time.

First: **Load Aerial.** This builds a **lossless airphoto** from my screen's zoom extent. For the Hughes Drain extent, that's roughly **200 MB** and **up to ~2 minutes**, depending on how big your zoom is.

**Source:** Ontario's imagery program — **native 20 cm (0.2 m)** orthoimagery. Which acquisition depends on *where* you are: down here it's the **SWOOP 2025** program; further north it might be **COOP 2026.** So the source just depends on the location of your image.

> *(Note to self / future feature: add a marker that flags which imagery program each area is from. Good idea — maybe I'll do it tonight.)*

---

## Step 5 — Parcels & the assessment sheet

Now I've got aerial + WS line. Next I want **parcels** — this is the grey-area export from earlier.

I'll click **Export DXF** — this brings parcels **and** roll numbers straight into a CAD file. I'll pull it up and **copy-base** it back into my working drawing.

Here's the part that's genuinely useful on the **assessment sheet** side. The program pulls **everything inside the watershed boundary** and grabs the parcel data within it — and it's careful **not to grab anything outside** the line.

Click **Query Drains** and I can see everyone in the watershed by roll number, each highlight is a person on the map. So I know **exactly where all 24 of my people sit** inside the watershed — with an **export to Excel** option.

That Excel gives me, for everyone in the boundary:
- **Full roll number** + **short-form roll number**
- **Google Maps address** *(to be verified)*
- **Geographic township**
- **Municipality**
- **Lot & concession**
- **Conservation authority**

---

## Wrap — the three big ones

So the three things I really want you to take away:

| | What it replaces | Time saved |
|---|---|---|
| **Aerial** | Manual tile download + merge + georeference | Minutes, not a morning |
| **Parcels** | Chasing roll numbers one at a time | ~24 parcels in one export |
| **LiDAR** | Tile-index hunt, manual merge, datum fixes | **~90% of the front-end grind** |

One HTML file, no install, all live provincial data — it takes the boring, repetitive front end of a drainage project and collapses it into a few clicks. **It doesn't replace the defensible sources** — anything that goes in a report still runs through the municipality or Teranet — it just gets you to the actual engineering a lot faster.

I'll keep building on it, so if you've got ideas on what'd make it more useful for your workflow, grab me after. **Happy to take questions.**

---

## Sources & proof — because I know someone's going to ask

Before I let you go — I know at least one person here is thinking it: **is any of this actually defensible, or is it just an AI black box spitting out numbers?**

Fair question. So a couple things are built right into the program for exactly that:

- **Every layer tells you where it actually comes from.** Click into any layer and it names the real government dataset behind it, plus **when it was last updated** — checked live, every time you open the app, not just typed in once and left to go stale.
- There's a whole **Sources & References** section *(show them)* — the actual government data-dictionary PDFs I pulled every definition from: the soil survey manual, the constructed drain and tile drainage descriptions, DFO's own drain-maintenance code of practice, the Conservation Authorities protocol, the province's Drainage Act superintendent's guide. If you ever want to double-check where a class or code came from, it's right there — not just my word for it.
- And as of last night, it goes one step further: whenever you **export the aerial photo or the LiDAR terrain**, the program now automatically drops a second little text file right alongside it, naming the **actual government survey program** that flew that specific spot — which flight, what year, what resolution, what accuracy. So if a report ever gets questioned, I'm not saying "trust me" — I hand over the real citation.

*(Small aside if it comes up: two flights can overlap the same area over the years, and I made sure the program's honest about which one actually won rather than just assuming "newest is best" — it isn't always.)*

---

## A few other things I didn't get to today

I've only got so much lunch hour, so there's more packed into this than what I showed:

- **Query Culverts** — real culvert data (material, size, invert elevation where it exists) for anyone building a PCSWMM watershed model.
- **Quick Report** — one button pulls together soil, drainage, land use, wetlands, conservation authority, and more for a whole boundary into one combined report — same sourcing built in.
- **Export by Property** — takes that same report and breaks it down parcel by parcel into an Excel sheet, so instead of one boundary-wide number you get one row per property.
- **Zoom to layer / isolate / search** — same quality-of-life stuff ArcGIS has, now across all 41 layers.

Happy to walk anyone through any of that one-on-one after — just grab me.
