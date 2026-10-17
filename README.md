# 🎃 ThreadCo — Haute Halloween Streetwear & Dark Gothic Apparel

An ultra-premium, dark-themed online shopping platform for luxury clothing brand **ThreadCo**, crafted for an exclusive **Halloween** drop.

![ThreadCo Halloween Collection](assets/images/hero.jpg)

---

## 🌟 Key Features

- **🕯️ Luxury Dark Theme**: Deep obsidian, toxic neon green, radiant pumpkin orange, and mystical witch violet palette.
- **⚡ Interactive Hover Glow & 3D Tilt**: Real-time cursor-following radial light halos (`--mouse-x`, `--mouse-y`), neon box-shadow bloom, and 3D card perspective tilt.
- **📏 Vessel Sizing & Interactive Size Chart**:
  - Selectable sizes (`XS`, `S`, `M`, `L`, `XL`, `XXL`) with live stock indicators.
  - Interactive Size Chart Modal with **Inches (in)** and **Centimeters (cm)** conversion.
  - Tailored measurement tables for Hoodies & Knits, Cloaks & Outerwear, Witch Gowns, and Techwear & Bottoms.
  - **🔮 Ghost Fit Advisor**: Real-time height and mass calculation recommending your ideal cursed size.
  - Visual tailoring anatomy diagram.
- **🧥 12 Curated Halloween Product Profile Cards**:
  - 100% Halloween-exclusive product photography for every garment.
  - Interactive colorway swatches.
  - Star & Skull rating system (`💀💀💀💀💀`).
  - Quick Summon modal with detailed fabric specs and nocturnal lore.
  - Add to Coven Cart button with bat particle bursts and sound feedback.
- **🔮 Ouija Spirit Reviews**:
  - Modeled as an authentic enchanted Ouija board with golden celestial runes and sliding Planchette.
  - Ghostly testimonials with character avatars (Vampires, Witches, 17th Century Apparitions).
  - "Echo Whisper" audio playback.
  - "Speak Through The Veil" review submission form.
- **🦇 Raven Dispatch Sanctuary**: Small contact column for order tracking, custom sizing curses, and wholesale coven inquiries.
- **🔊 Web Audio API Halloween Synthesizer**:
  - Ambient organ drone, thunder & lightning cracks, witch cackle, fluttering bat swarms, bubbling cauldron, cathedral crypt bell, and raven caws.
  - Floating **Coven Sound FX Dock** with instant soundboard triggers.
- **📜 Footer with Company Rights & Creative Shopper Ode**:
  - Proprietary ThreadCo company rights and legal notice.
  - Dedicated illuminated plaque honoring the brave mortal who shopped.
- **🛒 Interactive Coven Cart & Crypt Checkout**:
  - Free shipping progress bar, promo code applicator (`BLOODMOON` for 20% off), quantity controls, item banishment, and sealed order confirmation.

---

## 📁 Repository Structure

```
.
├── index.html                 # Semantic HTML5 platform structure
├── README.md                  # Project documentation
├── assets/
│   └── images/                # 100% Halloween product photos & banners
│       ├── hero.jpg
│       ├── hoodie_rune.jpg
│       ├── cloak_vampire.jpg
│       ├── sweater_skeleton.jpg
│       ├── dress_witch.jpg
│       ├── jacket_techwear.jpg
│       ├── trench_salem.jpg
│       ├── tee_pumpkin.jpg
│       ├── cardigan_striped.jpg
│       ├── skirt_banshee.jpg
│       ├── pants_gargoyle.jpg
│       ├── crop_ectoplasm.jpg
│       ├── choker_skull.jpg
│       ├── collection_hoodies.jpg
│       ├── collection_cloaks.jpg
│       ├── collection_witch.jpg
│       ├── size_guide_diagram.jpg
│       ├── avatar_vlad.jpg
│       ├── avatar_witch.jpg
│       ├── avatar_ghost.jpg
│       ├── avatar_cyber.jpg
│       └── avatar_lilith.jpg
├── styles/
│   ├── main.css               # Core variables, dark theme tokens, hero & layout
│   ├── components.css         # Profile cards, hover glow, modals, cart & sound dock
│   └── animations.css         # Keyframe animations (bats, spider, flicker, planchette)
└── js/
    ├── products.js            # 12 clothing items, size chart data (in/cm), reviews
    ├── animations.js          # Particle canvas, bat engine, Web Audio API synth
    └── app.js                 # Cart state, filters, search, size chart, checkout flow
```

---

## 🚀 Running Locally

No complex dependencies or build steps required. Simply serve the files using any HTTP server:

```bash
# Using Python 3
python3 -m http.server 3000

# Or using Node.js npx serve
npx serve .
```

Open `http://localhost:3000` in your modern web browser.

---

## 📜 Company Rights

© 2026 ThreadCo Apparel Ltd. All Dark Rights Reserved.  
Woven from ethically sourced organic cotton, royal mulberry silk, and nocturnal devotion.
