/**
 * ThreadCo - Halloween Edition Catalog Data
 * Haute Gothic Streetwear & All Hallows' Apparel
 */

const PRODUCTS_DATA = [
  {
    id: "tc-001",
    name: "Runic Chaos Heavyweight Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies & Knits",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller 🎃",
    badgeType: "fire",
    image: "assets/images/hoodie_rune.jpg",
    fallbackImage: "assets/images/hero.jpg",
    glowColor: "var(--glow-orange)",
    description: "480 GSM ultra-heavyweight combed French terry embroidered with glowing demonic runes and spiderweb seam accents. Pre-shrunk in midnight dye.",
    lore: "Woven under the October blood moon. Features luminous thermochromatic rune threads that radiate heat when worn.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultSize: "L",
    stock: { XS: 3, S: 8, M: 14, L: 6, XL: 4, XXL: 2 },
    colors: [
      { name: "Obsidian Rune", hex: "#0c0a12", active: true },
      { name: "Blood Moon", hex: "#7a0c1e", active: false },
      { name: "Toxic Slime", hex: "#0b2e1b", active: false }
    ],
    fabric: "100% Organic Heavy Cotton + Luminous Glow Fibers",
    fit: "Oversized Gothic Boxy Fit"
  },
  {
    id: "tc-002",
    name: "Crimson Crypt Victorian Velvet Cloak",
    category: "cloaks",
    categoryLabel: "Cloaks & Outerwear",
    price: 189,
    originalPrice: 240,
    rating: 5.0,
    reviewsCount: 89,
    badge: "Vampire Haute Couture 🦇",
    badgeType: "purple",
    image: "assets/images/cloak_vampire.jpg",
    fallbackImage: "assets/images/hero.jpg",
    glowColor: "var(--glow-crimson)",
    description: "Floor-sweeping midnight velvet coat with crimson blood silk lining, hand-cast antique silver skull clasps, and high structured vampire collar.",
    lore: "Direct from the Transylvanian vaults. Crafted to withstand torrential mist and 300 years of immortal night walks.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    stock: { S: 4, M: 7, L: 5, XL: 2, XXL: 1 },
    colors: [
      { name: "Vampire Velvet", hex: "#16071e", active: true },
      { name: "Eternal Raven", hex: "#09090b", active: false }
    ],
    fabric: "Deep Micro-Velvet & Royal Mulberry Silk Lining",
    fit: "Dramatic Cascading Silhouette"
  },
  {
    id: "tc-003",
    name: "Abyssal Ribcage Distressed Knit Jumper",
    category: "hoodies",
    categoryLabel: "Hoodies & Knits",
    price: 98,
    originalPrice: 135,
    rating: 4.8,
    reviewsCount: 116,
    badge: "Phosphor Glow 💀",
    badgeType: "green",
    image: "assets/images/sweater_skeleton.jpg",
    fallbackImage: "assets/images/hero.jpg",
    glowColor: "var(--glow-green)",
    description: "Hand-distressed chunky cotton-wool blend jumper featuring an anatomical ribcage jacquard that charges in sunlight and glows eerie phosphor green at night.",
    lore: "Each fray is manually shredded by our coven artisans. Reveals your inner skeleton with striking radiological elegance.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    stock: { XS: 5, S: 11, M: 18, L: 9, XL: 3, XXL: 2 },
    colors: [
      { name: "Phosphor Bone", hex: "#0e1a14", active: true },
      { name: "Charcoal Ash", hex: "#1c1917", active: false }
    ],
    fabric: "70% Merino Wool, 30% Luminous Acrylic Thread",
    fit: "Slouchy Grunge Oversized"
  },
  {
    id: "tc-004",
    name: "Nocturne Spiderweb Corset Gown",
    category: "gowns",
    categoryLabel: "Witch Gowns",
    price: 210,
    originalPrice: 280,
    rating: 5.0,
    reviewsCount: 74,
    badge: "Coven Elite 🔮",
    badgeType: "purple",
    image: "assets/images/dress_witch.jpg",
    fallbackImage: "assets/images/hero.jpg",
    glowColor: "var(--glow-purple)",
    description: "Architectural boned corset gown crafted from crushed obsidian velvet, gossamer spiderweb lace bell sleeves, and an asymmetrical trailing hemline.",
    lore: "Summoned for the High Priestess. The gossamer lace captures the morning dew and deflects minor hexes.",
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultSize: "S",
    stock: { XS: 3, S: 6, M: 5, L: 2, XL: 1 },
    colors: [
      { name: "Midnight Onyx", hex: "#0a0a0f", active: true },
      { name: "Witch Violet", hex: "#220e33", active: false }
    ],
    fabric: "Heavyweight Brocade Velvet & French Spider Lace",
    fit: "Hourglass Corseted Fit with Flowing Skirt"
  },
  {
    id: "tc-005",
    name: "Phantom Techwear Bat-Crest Bomber",
    category: "streetwear",
    categoryLabel: "Cyber-Streetwear",
    price: 155,
    originalPrice: 195,
    rating: 4.9,
    reviewsCount: 168,
    badge: "Luminescent Cyber ⚡",
    badgeType: "fire",
    image: "assets/images/jacket_techwear.jpg",
    fallbackImage: "assets/images/hero.jpg",
    glowColor: "var(--glow-orange)",
    description: "Ballistic matte nylon bomber with modular magnetic straps, glowing hazard neon piping, and an embroidered cyber-bat tactical chest crest.",
    lore: "Engineered for nocturnal urban stalking. Weatherproofed against acid rain, ectoplasm, and October chills.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "L",
    stock: { S: 7, M: 12, L: 8, XL: 5, XXL: 3 },
    colors: [
      { name: "Hazard Black", hex: "#111116", active: true },
      { name: "Stealth Ghost", hex: "#1f2421", active: false }
    ],
    fabric: "Triple-Layer Cordura Nylon with 3M Reflective Trims",
    fit: "Athletic Tactical Streetwear"
  },
  {
    id: "tc-006",
    name: "Salem Alchemist Distressed Trench Duster",
    category: "cloaks",
    categoryLabel: "Cloaks & Outerwear",
    price: 199,
    originalPrice: 260,
    rating: 4.9,
    reviewsCount: 63,
    badge: "Salem Archives 📜",
    badgeType: "purple",
    image: "assets/images/trench_salem.jpg",
    fallbackImage: "assets/images/hero.jpg",
    glowColor: "var(--glow-purple)",
    description: "Double-breasted heavyweight twill trench with raw hem distressing, deep internal potion pockets, and tarnished brass occult hardware.",
    lore: "Patterned after the 1692 Salem inquisitor coats, modernized with dropped shoulders and asymmetric storm flaps.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "L",
    stock: { S: 5, M: 8, L: 4, XL: 2, XXL: 1 },
    colors: [
      { name: "Grimoire Charcoal", hex: "#18181b", active: true },
      { name: "Sepia Crypt", hex: "#27201c", active: false }
    ],
    fabric: "Waxed Heavyweight Cotton Canvas",
    fit: "Relaxed Dramatic Duster Length"
  },
  {
    id: "tc-007",
    name: "Cyber Jack-O'-Lantern Acid Wash Tee",
    category: "streetwear",
    categoryLabel: "Cyber-Streetwear",
    price: 48,
    originalPrice: 68,
    rating: 4.7,
    reviewsCount: 215,
    badge: "Fast Selling 🎃",
    badgeType: "fire",
    image: "assets/images/tee_pumpkin.jpg",
    fallbackImage: "assets/images/hoodie_rune.jpg",
    glowColor: "var(--glow-orange)",
    description: "320 GSM heavyweight vintage mineral washed tee featuring high-density neon puff print of a biomechanical cyber pumpkin skull.",
    lore: "Every piece undergoes our proprietary pumice-stone wash in dark herbal tinctures, creating one-of-a-kind ghostly patterns.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    stock: { XS: 12, S: 25, M: 32, L: 19, XL: 11, XXL: 6 },
    colors: [
      { name: "Mineral Ash", hex: "#232326", active: true },
      { name: "Pumpkin Sludge", hex: "#2b1911", active: false }
    ],
    fabric: "100% Ring-Spun Vintage Combed Cotton",
    fit: "Boxy 90s Vintage Skater Fit"
  },
  {
    id: "tc-008",
    name: "Witching Hour Mohair Striped Cardigan",
    category: "hoodies",
    categoryLabel: "Hoodies & Knits",
    price: 85,
    originalPrice: 110,
    rating: 4.8,
    reviewsCount: 94,
    badge: "Cozy Spook 🕷️",
    badgeType: "green",
    image: "assets/images/cardigan_striped.jpg",
    fallbackImage: "assets/images/sweater_skeleton.jpg",
    glowColor: "var(--glow-green)",
    description: "Fluffy brushed mohair blend cardigan with alternating charcoal and neon ectoplasm green stripes, finished with spider-carved mother-of-pearl buttons.",
    lore: "Feels like resting inside a warm cloud of friendly ghosts. Irresistibly soft yet defiantly grunge.",
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultSize: "M",
    stock: { XS: 4, S: 9, M: 12, L: 7, XL: 2 },
    colors: [
      { name: "Ecto Green Stripe", hex: "#10281b", active: true },
      { name: "Blood Moon Stripe", hex: "#2e111a", active: false }
    ],
    fabric: "45% Mohair, 35% Wool, 20% Recycled Polyamide",
    fit: "Oversized Slouch Fit with Dropped Armholes"
  },
  {
    id: "tc-009",
    name: "Banshee Velvet Asymmetric Slit Skirt",
    category: "gowns",
    categoryLabel: "Witch Gowns",
    price: 95,
    originalPrice: 140,
    rating: 4.9,
    reviewsCount: 58,
    badge: "Haunted Silhouette 🌙",
    badgeType: "purple",
    image: "assets/images/skirt_banshee.jpg",
    fallbackImage: "assets/images/dress_witch.jpg",
    glowColor: "var(--glow-purple)",
    description: "High-waisted crushed velvet midi skirt with a thigh-high jagged slit, detachable silver pentagram chains, and spiderweb mesh underlay.",
    lore: "Rustles with the sound of autumn leaves. Flowing gracefully behind you like an apparition passing through cemetery gates.",
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultSize: "S",
    stock: { XS: 6, S: 10, M: 8, L: 4, XL: 2 },
    colors: [
      { name: "Crypt Velvet", hex: "#120e1c", active: true },
      { name: "Emerald Swamp", hex: "#0a1f15", active: false }
    ],
    fabric: "Silk-Blend Stretch Velvet & Stainless Steel Chains",
    fit: "High Waist with Flowing Flare"
  },
  {
    id: "tc-010",
    name: "Gargoyle Cyber-Goth Cargo Trousers",
    category: "streetwear",
    categoryLabel: "Cyber-Streetwear",
    price: 125,
    originalPrice: 160,
    rating: 4.9,
    reviewsCount: 133,
    badge: "Heavy Techwear ⚙️",
    badgeType: "fire",
    image: "assets/images/pants_gargoyle.jpg",
    fallbackImage: "assets/images/jacket_techwear.jpg",
    glowColor: "var(--glow-orange)",
    description: "Multi-pocket tactical trousers featuring 8 expandable cargo compartments, reflective neon webbing straps, and reinforced waterproof knee panels.",
    lore: "Built for urban night crawlers. Magnetic Cobra buckles snap into place with a crisp, menacing click.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    defaultSize: "M",
    stock: { S: 8, M: 15, L: 11, XL: 6, XXL: 3 },
    colors: [
      { name: "Obsidian Tech", hex: "#121214", active: true },
      { name: "Urban Phantom", hex: "#22252a", active: false }
    ],
    fabric: "Ripstop Military-Spec Cotton Poly Blend",
    fit: "Tapered Cargo Fit with Adjustable Ankle Straps"
  },
  {
    id: "tc-011",
    name: "Ectoplasm Glow Distressed Crop Hoodie",
    category: "hoodies",
    categoryLabel: "Hoodies & Knits",
    price: 82,
    originalPrice: 115,
    rating: 4.8,
    reviewsCount: 78,
    badge: "Night Crawler 👻",
    badgeType: "green",
    image: "assets/images/crop_ectoplasm.jpg",
    fallbackImage: "assets/images/sweater_skeleton.jpg",
    glowColor: "var(--glow-green)",
    description: "Raw-hem cropped hoodie featuring glow-in-the-dark ectoplasm splatter graphics and thumbhole cuffs for chilly graveyard strolls.",
    lore: "Infused with glowing organic pigment that charges in ambient light. Invisible by day, electric phantom green by night.",
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultSize: "S",
    stock: { XS: 7, S: 14, M: 9, L: 5, XL: 2 },
    colors: [
      { name: "Ecto Splatter", hex: "#0c1712", active: true },
      { name: "Abyss Black", hex: "#0a0a0a", active: false }
    ],
    fabric: "420 GSM Brushed Fleece Cotton",
    fit: "Cropped Boxy Streetwear Cut"
  },
  {
    id: "tc-012",
    name: "Cursed Talisman Skull Choker & Ring Set",
    category: "accessories",
    categoryLabel: "Cursed Accessories",
    price: 55,
    originalPrice: 75,
    rating: 5.0,
    reviewsCount: 92,
    badge: "Cursed Artifact 💀",
    badgeType: "purple",
    image: "assets/images/choker_skull.jpg",
    fallbackImage: "assets/images/cloak_vampire.jpg",
    glowColor: "var(--glow-purple)",
    description: "Hand-forged blackened surgical steel bat-skull signet ring paired with a genuine full-grain leather choker featuring an inverted blood drop jewel.",
    lore: "Forged in the dead of winter. Said to bestow magnetic nocturnal charisma upon the mortal wearer.",
    sizes: ["S", "M", "L"],
    defaultSize: "M",
    stock: { S: 15, M: 22, L: 14 },
    colors: [
      { name: "Blackened Steel", hex: "#232328", active: true },
      { name: "Antique Blood Silver", hex: "#3f2b35", active: false }
    ],
    fabric: "316L Stainless Steel & Hypoallergenic Vegan Leather",
    fit: "Adjustable 3-Position Buckle"
  }
];

// Spooky Size Chart Measurements Data (Inches & CM)
const SIZE_CHART_DATA = {
  in: {
    hoodies: [
      { size: "XS", chest: "38-40", shoulder: "18.5", length: "27.0", sleeve: "24.5", waist: "36-38" },
      { size: "S",  chest: "41-43", shoulder: "19.5", length: "28.0", sleeve: "25.0", waist: "39-41" },
      { size: "M",  chest: "44-46", shoulder: "20.5", length: "29.0", sleeve: "25.5", waist: "42-44" },
      { size: "L",  chest: "47-49", shoulder: "21.5", length: "30.0", sleeve: "26.0", waist: "45-47" },
      { size: "XL", chest: "50-52", shoulder: "22.5", length: "31.0", sleeve: "26.5", waist: "48-50" },
      { size: "XXL",chest: "53-56", shoulder: "23.5", length: "32.0", sleeve: "27.0", waist: "51-54" }
    ],
    cloaks: [
      { size: "S",  chest: "40-42", shoulder: "18.0", length: "52.0", sleeve: "25.0", waist: "38-40" },
      { size: "M",  chest: "43-45", shoulder: "19.0", length: "54.0", sleeve: "25.5", waist: "41-43" },
      { size: "L",  chest: "46-48", shoulder: "20.0", length: "56.0", sleeve: "26.0", waist: "44-46" },
      { size: "XL", chest: "49-51", shoulder: "21.0", length: "58.0", sleeve: "26.5", waist: "47-49" },
      { size: "XXL",chest: "52-55", shoulder: "22.0", length: "60.0", sleeve: "27.0", waist: "50-53" }
    ],
    gowns: [
      { size: "XS", bust: "32-34", waist: "24-26", hips: "34-36", length: "56.0", underbust: "27-28" },
      { size: "S",  bust: "35-37", waist: "27-29", hips: "37-39", length: "57.0", underbust: "29-30" },
      { size: "M",  bust: "38-40", waist: "30-32", hips: "40-42", length: "58.0", underbust: "31-33" },
      { size: "L",  bust: "41-43", waist: "33-35", hips: "43-45", length: "59.0", underbust: "34-36" },
      { size: "XL", bust: "44-47", waist: "36-39", hips: "46-49", length: "60.0", underbust: "37-40" }
    ],
    streetwear: [
      { size: "S",  waist: "28-30", hips: "38-40", inseam: "30.0", outseam: "41.0", thigh: "24.0" },
      { size: "M",  waist: "31-33", hips: "41-43", inseam: "31.0", outseam: "42.0", thigh: "25.5" },
      { size: "L",  waist: "34-36", hips: "44-46", inseam: "32.0", outseam: "43.0", thigh: "27.0" },
      { size: "XL", waist: "37-39", hips: "47-49", inseam: "32.5", outseam: "44.0", thigh: "28.5" },
      { size: "XXL",waist: "40-43", hips: "50-53", inseam: "33.0", outseam: "45.0", thigh: "30.0" }
    ]
  },
  cm: {
    hoodies: [
      { size: "XS", chest: "96-101", shoulder: "47", length: "68", sleeve: "62", waist: "91-96" },
      { size: "S",  chest: "104-109", shoulder: "49", length: "71", sleeve: "63", waist: "99-104" },
      { size: "M",  chest: "112-117", shoulder: "52", length: "74", sleeve: "65", waist: "107-112" },
      { size: "L",  chest: "119-124", shoulder: "55", length: "76", sleeve: "66", waist: "114-119" },
      { size: "XL", chest: "127-132", shoulder: "57", length: "79", sleeve: "67", waist: "122-127" },
      { size: "XXL",chest: "135-142", shoulder: "60", length: "81", sleeve: "68", waist: "130-137" }
    ],
    cloaks: [
      { size: "S",  chest: "101-106", shoulder: "46", length: "132", sleeve: "63", waist: "96-101" },
      { size: "M",  chest: "109-114", shoulder: "48", length: "137", sleeve: "65", waist: "104-109" },
      { size: "L",  chest: "117-122", shoulder: "51", length: "142", sleeve: "66", waist: "112-117" },
      { size: "XL", chest: "124-129", shoulder: "53", length: "147", sleeve: "67", waist: "119-124" },
      { size: "XXL",chest: "132-140", shoulder: "56", length: "152", sleeve: "68", waist: "127-135" }
    ],
    gowns: [
      { size: "XS", bust: "81-86",  waist: "61-66", hips: "86-91",  length: "142", underbust: "68-71" },
      { size: "S",  bust: "89-94",  waist: "68-74", hips: "94-99",  length: "145", underbust: "74-76" },
      { size: "M",  bust: "96-101", waist: "76-81", hips: "101-107", length: "147", underbust: "79-84" },
      { size: "L",  bust: "104-109", waist: "84-89", hips: "109-114", length: "150", underbust: "86-91" },
      { size: "XL", bust: "112-119", waist: "91-99", hips: "117-124", length: "152", underbust: "94-102" }
    ],
    streetwear: [
      { size: "S",  waist: "71-76", hips: "96-101", inseam: "76", outseam: "104", thigh: "61" },
      { size: "M",  waist: "79-84", hips: "104-109", inseam: "79", outseam: "107", thigh: "65" },
      { size: "L",  waist: "86-91", hips: "112-117", inseam: "81", outseam: "109", thigh: "68" },
      { size: "XL", waist: "94-99", hips: "119-124", inseam: "83", outseam: "112", thigh: "72" },
      { size: "XXL",waist: "102-109", hips: "127-135", inseam: "84", outseam: "114", thigh: "76" }
    ]
  }
};

// Unique Ouija Board Reviews from Different Realms
const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Lord Vladislav III",
    realm: "Transylvanian Sanguine Crypt",
    spiritBadge: "Vampire Noble 🧛",
    avatar: "assets/images/avatar_vlad.jpg",
    garment: "Crimson Crypt Victorian Velvet Cloak",
    skulls: 5,
    date: "Full Moon, Oct 2026",
    quote: "The velvet is heavy enough to block silver light and the inner silk is dyed with authentic crimson elegance. Survived 3 nocturnal duels without a single frayed stitch. An immortal masterpiece.",
    verifiedSpirit: true
  },
  {
    id: "rev-2",
    author: "Morgana Nightshade",
    realm: "Salem Covens Guild",
    spiritBadge: "17th Century Witch 🔮",
    avatar: "assets/images/avatar_witch.jpg",
    garment: "Nocturne Spiderweb Corset Gown",
    skulls: 5,
    date: "Witching Hour, Oct 2026",
    quote: "The corsetry holds my corporeal vessel with divine precision. When I cast incantations under the autumn rain, the spiderweb bell sleeves dance like spectral familiars. ThreadCo never misses.",
    verifiedSpirit: true
  },
  {
    id: "rev-3",
    author: "Ghost of Lord Cedric",
    realm: "The Ethereal Void (Est. 1692)",
    spiritBadge: "Verified Apparition 👻",
    avatar: "assets/images/avatar_ghost.jpg",
    garment: "Abyssal Ribcage Distressed Knit Jumper",
    skulls: 5,
    date: "Midnight Seance, Oct 2026",
    quote: "Even without mortal skin, the phosphor green glow of this ribcage makes me feel truly alive again. Mortal onlookers gasp when I drift into coffee shops. 10/10 haunting drip.",
    verifiedSpirit: true
  },
  {
    id: "rev-4",
    author: "Raven Kaelen",
    realm: "Shibuya Neo-Goth Underground",
    spiritBadge: "Cyber-Vampire 🦇",
    avatar: "assets/images/avatar_cyber.jpg",
    garment: "Runic Chaos Heavyweight Hoodie",
    skulls: 5,
    date: "Eclipse Eve, Oct 2026",
    quote: "The 480GSM weight on this hoodie feels like armor. The orange runes literally catch fire under blacklight. Everyone at the warehouse rave asked if I summoned it from hell.",
    verifiedSpirit: true
  },
  {
    id: "rev-5",
    author: "Lilith Von Grim",
    realm: "Catacombs of Paris",
    spiritBadge: "Haunted Stylist 🕸️",
    avatar: "assets/images/avatar_lilith.jpg",
    garment: "Phantom Techwear Bat-Crest Bomber",
    skulls: 5,
    date: "Blood Moon, Oct 2026",
    quote: "The magnetic straps and waterproof shell make this the ultimate nightwear piece. ThreadCo has captured the exact intersection of dystopian cyberpunk and gothic horror.",
    verifiedSpirit: true
  }
];

