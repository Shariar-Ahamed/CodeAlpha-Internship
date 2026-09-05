/**
 * Lumina Gallery — Interactive JavaScript Logic
 * CodeAlpha Frontend Development Internship — Task 01
 * Author: Shariar Ahamed Ripon (Student ID: CA/DF1/269964)
 */

'use strict';

// ==========================================================================
// 1. Curated Photo Dataset with Realistic EXIF Camera Metadata
// ==========================================================================
const GALLERY_DATA = [
  // ==================== 1. Nature & Landscapes ====================
  {
    id: 1,
    title: "Misty Alpine Ridge at Sunrise",
    category: "nature",
    categoryLabel: "Nature & Landscapes",
    author: "Luca Bravo",
    location: "Dolomites, Italy",
    tags: ["mountains", "fog", "sunrise", "alpine", "nature"],
    likes: 142,
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Sony α7R IV",
      lens: "24-70mm ƒ/2.8 GM",
      shutter: "1/640s · ISO 100",
      resolution: "9504 × 6336"
    }
  },
  {
    id: 2,
    title: "Emerald Forest Cascades",
    category: "nature",
    categoryLabel: "Nature & Landscapes",
    author: "Bailey Zindel",
    location: "Olympic National Park, USA",
    tags: ["waterfall", "forest", "green", "river", "wilderness"],
    likes: 264,
    thumb: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Canon EOS R5",
      lens: "16-35mm ƒ/4L IS",
      shutter: "1/4s · ISO 50",
      resolution: "8192 × 5464"
    }
  },
  {
    id: 3,
    title: "Snow-Capped Peaks Under Indigo Skies",
    category: "nature",
    categoryLabel: "Nature & Landscapes",
    author: "Kalen Emsley",
    location: "Banff National Park, Canada",
    tags: ["lake", "snow", "winter", "canada", "reflection"],
    likes: 340,
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Nikon Z7 II",
      lens: "24-120mm ƒ/4 S",
      shutter: "1/800s · ISO 64",
      resolution: "8256 × 5504"
    }
  },
  {
    id: 4,
    title: "Golden Hour Ocean Waves & Shoreline",
    category: "nature",
    categoryLabel: "Nature & Landscapes",
    author: "Sean Oulashin",
    location: "Maui, Hawaii",
    tags: ["beach", "ocean", "sunset", "waves", "summer"],
    likes: 215,
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Fujifilm GFX 100S",
      lens: "32-64mm ƒ/4 R",
      shutter: "1/250s · ISO 100",
      resolution: "11648 × 8736"
    }
  },
  {
    id: 5,
    title: "Turquoise Waves Crashing on Coral Reef",
    category: "nature",
    categoryLabel: "Nature & Landscapes",
    author: "Shifaaz Shamoon",
    location: "Vaadhoo Island, Maldives",
    tags: ["ocean", "waves", "aerial", "coast", "maldives"],
    likes: 288,
    thumb: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "DJI Mavic 3 Pro",
      lens: "24mm ƒ/2.8 Hasselblad",
      shutter: "1/1250s · ISO 100",
      resolution: "5280 × 3956"
    }
  },

  // ==================== 2. Architecture & Urban Design ====================
  {
    id: 6,
    title: "Minimalist Concrete Spiral Architecture",
    category: "architecture",
    categoryLabel: "Architecture",
    author: "Simone Hutsch",
    location: "Valencia, Spain",
    tags: ["minimal", "concrete", "geometry", "curves", "modern"],
    likes: 218,
    thumb: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/5",
    exif: {
      camera: "Leica Q2",
      lens: "Summilux 28mm ƒ/1.7",
      shutter: "1/1000s · ISO 100",
      resolution: "8368 × 5584"
    }
  },
  {
    id: 7,
    title: "Contemporary Museum Cantilever",
    category: "architecture",
    categoryLabel: "Architecture",
    author: "Lance Anderson",
    location: "Munich, Germany",
    tags: ["museum", "modern", "structure", "angles", "sky"],
    likes: 198,
    thumb: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/3",
    exif: {
      camera: "Sony α7 III",
      lens: "16-35mm ƒ/2.8 GM",
      shutter: "1/500s · ISO 100",
      resolution: "6000 × 4000"
    }
  },
  {
    id: 8,
    title: "Futuristic Glass Skyscraper Geometric Reflection",
    category: "architecture",
    categoryLabel: "Architecture",
    author: "Joel Filipe",
    location: "Copenhagen, Denmark",
    tags: ["glass", "futuristic", "skyline", "reflection", "geometric"],
    likes: 310,
    thumb: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Canon 5D Mark IV",
      lens: "TS-E 24mm ƒ/3.5L II Tilt-Shift",
      shutter: "1/320s · ISO 100",
      resolution: "6720 × 4480"
    }
  },
  {
    id: 9,
    title: "Colosseum Roman Arches in Morning Radiance",
    category: "architecture",
    categoryLabel: "Architecture",
    author: "Michele Bitetto",
    location: "Rome, Italy",
    tags: ["columns", "historical", "arches", "rome", "heritage"],
    likes: 275,
    thumb: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/5",
    exif: {
      camera: "Sony α7R III",
      lens: "35mm ƒ/1.4 GM",
      shutter: "1/400s · ISO 100",
      resolution: "7952 × 5304"
    }
  },
  {
    id: 10,
    title: "Geometric Timber & Modern Urban Facade",
    category: "architecture",
    categoryLabel: "Architecture",
    author: "Rory Kelly",
    location: "Tokyo, Japan",
    tags: ["wood", "facade", "geometric", "urban", "design"],
    likes: 184,
    thumb: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Fujifilm X-T4",
      lens: "XF 16-55mm ƒ/2.8 R",
      shutter: "1/500s · ISO 160",
      resolution: "6240 × 4160"
    }
  },

  // ==================== 3. Portraits & People ====================
  {
    id: 11,
    title: "Candid Portrait in Warm Evening Light",
    category: "portraits",
    categoryLabel: "Portraits",
    author: "Aiony Haust",
    location: "Lisbon, Portugal",
    tags: ["portrait", "golden hour", "smile", "people", "candid"],
    likes: 389,
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/4",
    exif: {
      camera: "Canon EOS R6",
      lens: "85mm ƒ/1.2L USM",
      shutter: "1/1000s · ISO 100",
      resolution: "5472 × 3648"
    }
  },
  {
    id: 12,
    title: "Expressive Studio Shadowplay & Depth",
    category: "portraits",
    categoryLabel: "Portraits",
    author: "Houcine Ncib",
    location: "Paris, France",
    tags: ["studio", "shadows", "editorial", "fashion", "eyes"],
    likes: 450,
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/4",
    exif: {
      camera: "Hasselblad X1D II 50C",
      lens: "XCD 90mm ƒ/3.2",
      shutter: "1/160s · ISO 100",
      resolution: "8272 × 6200"
    }
  },
  {
    id: 13,
    title: "Street Musician with Acoustic Guitar",
    category: "portraits",
    categoryLabel: "Portraits",
    author: "Austin Neill",
    location: "Nashville, USA",
    tags: ["music", "guitar", "musician", "acoustic", "passion"],
    likes: 326,
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Sony α7 IV",
      lens: "50mm ƒ/1.2 GM",
      shutter: "1/500s · ISO 200",
      resolution: "7008 × 4672"
    }
  },
  {
    id: 14,
    title: "Serene Profile with Floral Silhouette",
    category: "portraits",
    categoryLabel: "Portraits",
    author: "Ali Pazani",
    location: "Milan, Italy",
    tags: ["flowers", "silhouette", "fineart", "gentle", "moody"],
    likes: 412,
    thumb: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/4",
    exif: {
      camera: "Nikon Z6 II",
      lens: "85mm ƒ/1.8 S",
      shutter: "1/800s · ISO 100",
      resolution: "6048 × 4024"
    }
  },
  {
    id: 15,
    title: "Elder Artisan Crafting Traditional Ceramics",
    category: "portraits",
    categoryLabel: "Portraits",
    author: "Quino Al",
    location: "Oaxaca, Mexico",
    tags: ["craft", "pottery", "hands", "culture", "artisan"],
    likes: 290,
    thumb: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/4",
    exif: {
      camera: "Fujifilm X-Pro3",
      lens: "XF 35mm ƒ/1.4 R",
      shutter: "1/250s · ISO 320",
      resolution: "6240 × 4160"
    }
  },

  // ==================== 4. Street & Travel ====================
  {
    id: 16,
    title: "Historic Alleyway in Rain Reflection",
    category: "street",
    categoryLabel: "Street & Travel",
    author: "Alex Knight",
    location: "Kyoto, Japan",
    tags: ["japan", "rain", "neon", "travel", "night", "street"],
    likes: 312,
    thumb: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Sony α7S III",
      lens: "24mm ƒ/1.4 GM",
      shutter: "1/125s · ISO 1600",
      resolution: "4240 × 2832"
    }
  },
  {
    id: 17,
    title: "Vibrant Old Town Spice Market",
    category: "street",
    categoryLabel: "Street & Travel",
    author: "Annie Spratt",
    location: "Marrakech, Morocco",
    tags: ["market", "colors", "culture", "spices", "travel"],
    likes: 285,
    thumb: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Canon 5D Mark III",
      lens: "50mm ƒ/1.4 USM",
      shutter: "1/400s · ISO 200",
      resolution: "5760 × 3840"
    }
  },
  {
    id: 18,
    title: "Evening Tram on Historic Cobblestone",
    category: "street",
    categoryLabel: "Street & Travel",
    author: "Roman Kraft",
    location: "Prague, Czech Republic",
    tags: ["tram", "street", "city", "golden light", "europe"],
    likes: 377,
    thumb: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/5",
    exif: {
      camera: "Leica M10-R",
      lens: "Summicron-M 35mm ƒ/2",
      shutter: "1/320s · ISO 200",
      resolution: "7864 × 5200"
    }
  },
  {
    id: 19,
    title: "Sunset over Santorini Coastal Cliffs",
    category: "street",
    categoryLabel: "Street & Travel",
    author: "Heidi Kaden",
    location: "Oia, Santorini, Greece",
    tags: ["greece", "santorini", "sunset", "island", "sea"],
    likes: 462,
    thumb: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Sony α7R IV",
      lens: "16-35mm ƒ/2.8 GM",
      shutter: "1/500s · ISO 100",
      resolution: "9504 × 6336"
    }
  },
  {
    id: 20,
    title: "Neon Crosswalk in Shinjuku",
    category: "street",
    categoryLabel: "Street & Travel",
    author: "Aleksandar Pasaric",
    location: "Tokyo, Japan",
    tags: ["neon", "shinjuku", "tokyo", "cyberpunk", "nightlife"],
    likes: 520,
    thumb: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Sony α7 III",
      lens: "85mm ƒ/1.8",
      shutter: "1/160s · ISO 800",
      resolution: "6000 × 4000"
    }
  },

  // ==================== 5. Minimalist & Fine Art ====================
  {
    id: 21,
    title: "Desert Dunes & Gentle S-Curve Shadows",
    category: "minimalist",
    categoryLabel: "Minimalist",
    author: "Jeremy Bishop",
    location: "Namib Desert, Namibia",
    tags: ["sand", "dunes", "clean", "calm", "serene", "curves"],
    likes: 220,
    thumb: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/5",
    exif: {
      camera: "Nikon Z7",
      lens: "70-200mm ƒ/2.8 VR S",
      shutter: "1/640s · ISO 64",
      resolution: "8256 × 5504"
    }
  },
  {
    id: 22,
    title: "Nordic Minimalist Ceramic Still Life",
    category: "minimalist",
    categoryLabel: "Minimalist",
    author: "Content Pixie",
    location: "Stockholm, Sweden",
    tags: ["coffee", "ceramic", "white", "scandinavian", "simple"],
    likes: 265,
    thumb: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/5",
    exif: {
      camera: "Fujifilm X-T3",
      lens: "XF 23mm ƒ/2 R WR",
      shutter: "1/200s · ISO 160",
      resolution: "6240 × 4160"
    }
  },
  {
    id: 23,
    title: "Pastel Architectural Geometry & Clean Shadows",
    category: "minimalist",
    categoryLabel: "Minimalist",
    author: "Scott Webb",
    location: "London, UK",
    tags: ["pastel", "geometry", "wall", "minimalism", "aesthetic"],
    likes: 310,
    thumb: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "4/5",
    exif: {
      camera: "Sony α7R II",
      lens: "55mm ƒ/1.8 Sonnar T*",
      shutter: "1/500s · ISO 100",
      resolution: "7952 × 5304"
    }
  },
  {
    id: 24,
    title: "Tranquil Misty Lake Island Solitude",
    category: "minimalist",
    categoryLabel: "Minimalist",
    author: "David Marcu",
    location: "Lake Bled, Slovenia",
    tags: ["lake", "island", "fog", "mist", "solitude", "calm"],
    likes: 395,
    thumb: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    full: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85",
    aspectRatio: "3/2",
    exif: {
      camera: "Canon EOS 5D Mark IV",
      lens: "70-200mm ƒ/2.8L IS III",
      shutter: "1/320s · ISO 100",
      resolution: "6720 × 4480"
    }
  }
];

// ==========================================================================
// 2. Application State & Storage Persistence
// ==========================================================================
const STORAGE_KEY = "lumina_saved_favorites";

function loadSavedFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      return new Set(arr);
    }
  } catch (err) {
    console.warn("Could not load favorites from localStorage", err);
  }
  return new Set();
}

function saveFavoritesToStorage(favSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favSet]));
  } catch (err) {
    console.warn("Could not persist favorites to localStorage", err);
  }
}

const state = {
  currentCategory: "all",
  searchQuery: "",
  currentSort: "featured",
  filteredPhotos: [...GALLERY_DATA],
  lightboxIndex: 0,
  isLightboxOpen: false,
  isZoomed: false,
  likedItems: loadSavedFavorites()
};

// DOM Elements
const galleryGrid = document.getElementById("galleryGrid");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const filterPills = document.querySelectorAll(".filter-pill");
const photoCountText = document.getElementById("photoCountText");
const emptyState = document.getElementById("emptyState");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const masonryViewBtn = document.getElementById("masonryViewBtn");
const balancedViewBtn = document.getElementById("balancedViewBtn");
const sortSelect = document.getElementById("sortSelect");
const favCountBadge = document.getElementById("favCount");
const toastContainer = document.getElementById("toastContainer");

// Lightbox Elements
const lightboxModal = document.getElementById("lightboxModal");
const lbMainImage = document.getElementById("lbMainImage");
const lbLoader = document.getElementById("lbLoader");
const lbCurrentIndex = document.getElementById("lbCurrentIndex");
const lbTotalCount = document.getElementById("lbTotalCount");
const lbCategory = document.getElementById("lbCategory");
const lbTitle = document.getElementById("lbTitle");
const lbAuthor = document.getElementById("lbAuthor");
const lbLocation = document.getElementById("lbLocation");
const lbCamera = document.getElementById("lbCamera");
const lbLens = document.getElementById("lbLens");
const lbShutter = document.getElementById("lbShutter");
const lbResolution = document.getElementById("lbResolution");
const lbLikeBtn = document.getElementById("lbLikeBtn");
const lbLikeIcon = document.getElementById("lbLikeIcon");
const lbLikeCount = document.getElementById("lbLikeCount");
const lbPrevBtn = document.getElementById("lbPrevBtn");
const lbNextBtn = document.getElementById("lbNextBtn");
const lbCloseBtn = document.getElementById("lbCloseBtn");
const lbZoomBtn = document.getElementById("lbZoomBtn");
const lbZoomIcon = document.getElementById("lbZoomIcon");
const lbFullscreenBtn = document.getElementById("lbFullscreenBtn");
const lbFsIcon = document.getElementById("lbFsIcon");
const lbDownloadBtn = document.getElementById("lbDownloadBtn");
const lbShareBtn = document.getElementById("lbShareBtn");
const lbViewport = document.getElementById("lbViewport");

// ==========================================================================
// 3. Toast Notifications
// ==========================================================================
function showToast(message, type = "success") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconClass = "ri-check-line";
  if (type === "like") iconClass = "ri-heart-fill";
  if (type === "share") iconClass = "ri-links-line";

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span>${escapeHTML(message)}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==========================================================================
// 4. Core Functions: Rendering, Sorting & Filtering
// ==========================================================================

/**
 * Filter and sort the photo dataset based on state
 */
function applyFilters() {
  const query = state.searchQuery.trim().toLowerCase();
  
  // 1. Filter
  let list = GALLERY_DATA.filter((photo) => {
    let matchesCategory = true;
    if (state.currentCategory === "favorites") {
      matchesCategory = state.likedItems.has(photo.id);
    } else if (state.currentCategory !== "all") {
      matchesCategory = photo.category === state.currentCategory;
    }

    const matchesQuery =
      !query ||
      photo.title.toLowerCase().includes(query) ||
      photo.author.toLowerCase().includes(query) ||
      photo.location.toLowerCase().includes(query) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  // 2. Sort
  if (state.currentSort === "likes-desc") {
    list.sort((a, b) => {
      const likesA = a.likes + (state.likedItems.has(a.id) ? 1 : 0);
      const likesB = b.likes + (state.likedItems.has(b.id) ? 1 : 0);
      return likesB - likesA;
    });
  } else if (state.currentSort === "title-asc") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.currentSort === "title-desc") {
    list.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    // Featured / original order
    list.sort((a, b) => a.id - b.id);
  }

  state.filteredPhotos = list;
  renderGallery();
  updateStats();
  updateFavBadgeCount();
}

/**
 * Render filtered photos into the gallery grid
 */
function renderGallery() {
  galleryGrid.innerHTML = "";

  if (state.filteredPhotos.length === 0) {
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");

  const fragment = document.createDocumentFragment();

  state.filteredPhotos.forEach((photo, index) => {
    const isLiked = state.likedItems.has(photo.id);
    const likeCount = photo.likes + (isLiked ? 1 : 0);

    const card = document.createElement("article");
    card.className = "photo-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", photo.title);

    card.innerHTML = `
      <div class="photo-media" data-index="${index}">
        <span class="photo-badge">${escapeHTML(photo.categoryLabel)}</span>
        <img 
          src="${photo.thumb}" 
          alt="${escapeHTML(photo.title)}" 
          class="photo-card-img" 
          loading="lazy"
        >
        <div class="photo-overlay">
          <button class="overlay-expand-btn" data-action="open-lightbox" data-index="${index}">
            <i class="ri-fullscreen-line"></i> Expand View
          </button>
        </div>
      </div>
      
      <div class="photo-info">
        <h3 class="photo-title" data-index="${index}">${escapeHTML(photo.title)}</h3>
        <div class="photo-meta-bar">
          <span class="photo-author">
            <i class="ri-user-line"></i> ${escapeHTML(photo.author)}
          </span>
          <div class="photo-actions">
            <button class="card-action-btn ${isLiked ? 'liked' : ''}" data-action="like" data-id="${photo.id}" title="Like this photo" aria-label="Like photo">
              <i class="${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
              <span>${likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  galleryGrid.appendChild(fragment);
}

/**
 * Update header counter
 */
function updateStats() {
  const count = state.filteredPhotos.length;
  const total = GALLERY_DATA.length;
  photoCountText.textContent = `Showing ${count} of ${total} curated photographs`;
}

function updateFavBadgeCount() {
  if (favCountBadge) {
    favCountBadge.textContent = state.likedItems.size;
  }
}

/**
 * Helper to escape HTML safely
 */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================================================
// 5. Lightbox Controller with EXIF Specs & Direct Sharing
// ==========================================================================

/**
 * Open Lightbox modal at a specific photo index
 */
function openLightbox(index) {
  if (index < 0 || index >= state.filteredPhotos.length) return;

  state.lightboxIndex = index;
  state.isLightboxOpen = true;
  state.isZoomed = false;
  resetZoomState();

  updateLightboxContent();

  lightboxModal.classList.add("active");
  lightboxModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Lock background scroll
  lightboxModal.focus();

  // Update URL hash for deep linking
  const photo = state.filteredPhotos[state.lightboxIndex];
  if (photo) {
    history.replaceState(null, "", `#photo-${photo.id}`);
  }
}

/**
 * Close Lightbox modal
 */
function closeLightbox() {
  state.isLightboxOpen = false;
  state.isZoomed = false;
  resetZoomState();

  lightboxModal.classList.remove("active");
  lightboxModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Restore background scroll

  // Clear hash
  if (window.location.hash.startsWith("#photo-")) {
    history.replaceState(null, "", window.location.pathname);
  }
}

/**
 * Update active image and metadata in Lightbox
 */
function updateLightboxContent() {
  const photo = state.filteredPhotos[state.lightboxIndex];
  if (!photo) return;

  // Show loader while full-res loads
  lbLoader.classList.add("show");
  lbMainImage.style.opacity = "0.3";

  // Preload and switch image
  const tempImg = new Image();
  tempImg.src = photo.full;
  tempImg.onload = () => {
    lbMainImage.src = photo.full;
    lbMainImage.alt = photo.title;
    lbLoader.classList.remove("show");
    lbMainImage.style.opacity = "1";
  };

  // Update text & counters
  lbCurrentIndex.textContent = state.lightboxIndex + 1;
  lbTotalCount.textContent = state.filteredPhotos.length;
  lbCategory.textContent = photo.categoryLabel;
  lbTitle.textContent = photo.title;
  lbAuthor.textContent = photo.author;
  lbLocation.textContent = photo.location;

  // Update EXIF Camera Specs
  if (photo.exif) {
    lbCamera.textContent = photo.exif.camera;
    lbLens.textContent = photo.exif.lens;
    lbShutter.textContent = photo.exif.shutter;
    lbResolution.textContent = photo.exif.resolution;
  }

  // Update download link
  lbDownloadBtn.href = photo.full;
  lbDownloadBtn.setAttribute("download", `${photo.title.toLowerCase().replace(/\s+/g, "-")}.jpg`);

  // Update Like State in Lightbox
  const isLiked = state.likedItems.has(photo.id);
  const currentLikes = photo.likes + (isLiked ? 1 : 0);
  lbLikeCount.textContent = currentLikes;
  if (isLiked) {
    lbLikeBtn.classList.add("liked");
    lbLikeIcon.className = "ri-heart-fill";
  } else {
    lbLikeBtn.classList.remove("liked");
    lbLikeIcon.className = "ri-heart-line";
  }
}

/**
 * Navigate to Previous Image
 */
function showPrevPhoto() {
  if (!state.isLightboxOpen) return;
  state.isZoomed = false;
  resetZoomState();

  state.lightboxIndex =
    (state.lightboxIndex - 1 + state.filteredPhotos.length) %
    state.filteredPhotos.length;
  updateLightboxContent();

  const photo = state.filteredPhotos[state.lightboxIndex];
  if (photo) history.replaceState(null, "", `#photo-${photo.id}`);
}

/**
 * Navigate to Next Image
 */
function showNextPhoto() {
  if (!state.isLightboxOpen) return;
  state.isZoomed = false;
  resetZoomState();

  state.lightboxIndex = (state.lightboxIndex + 1) % state.filteredPhotos.length;
  updateLightboxContent();

  const photo = state.filteredPhotos[state.lightboxIndex];
  if (photo) history.replaceState(null, "", `#photo-${photo.id}`);
}

/**
 * Toggle Zoom In / Out
 */
function toggleZoom() {
  state.isZoomed = !state.isZoomed;
  if (state.isZoomed) {
    lbMainImage.classList.add("zoomed");
    lbZoomIcon.className = "ri-zoom-out-line";
    lbZoomBtn.title = "Reset Zoom";
  } else {
    resetZoomState();
  }
}

function resetZoomState() {
  lbMainImage.classList.remove("zoomed");
  lbZoomIcon.className = "ri-zoom-in-line";
  lbZoomBtn.title = "Zoom In";
}

/**
 * Toggle Fullscreen API
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    lightboxModal.requestFullscreen?.().catch((err) => {
      console.warn("Fullscreen request error:", err);
    });
    lbFsIcon.className = "ri-fullscreen-exit-line";
  } else {
    document.exitFullscreen?.();
    lbFsIcon.className = "ri-fullscreen-line";
  }
}

/**
 * Toggle Like / Bookmark
 */
function toggleLike(photoId) {
  let wasAdded = false;
  if (state.likedItems.has(photoId)) {
    state.likedItems.delete(photoId);
    showToast("Removed from saved favorites", "like");
  } else {
    state.likedItems.add(photoId);
    showToast("Added to your saved collection! ❤️", "like");
    wasAdded = true;
  }

  saveFavoritesToStorage(state.likedItems);
  updateFavBadgeCount();

  // If currently filtering by favorites, re-apply filter
  if (state.currentCategory === "favorites") {
    applyFilters();
  } else {
    renderGallery();
  }

  // Sync Lightbox if open
  if (state.isLightboxOpen) {
    const currentPhoto = state.filteredPhotos[state.lightboxIndex];
    if (currentPhoto && currentPhoto.id === photoId) {
      const isLiked = state.likedItems.has(photoId);
      lbLikeCount.textContent = currentPhoto.likes + (isLiked ? 1 : 0);
      if (isLiked) {
        lbLikeBtn.classList.add("liked");
        lbLikeIcon.className = "ri-heart-fill";
      } else {
        lbLikeBtn.classList.remove("liked");
        lbLikeIcon.className = "ri-heart-line";
      }
    }
  }
}

/**
 * Copy Direct Share URL to clipboard
 */
function shareCurrentPhoto() {
  const photo = state.filteredPhotos[state.lightboxIndex];
  if (!photo) return;

  const url = `${window.location.origin}${window.location.pathname}#photo-${photo.id}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast("Direct link copied to clipboard! 🔗", "share");
  }).catch(() => {
    showToast("Share URL: " + url, "share");
  });
}

// ==========================================================================
// 6. Event Listeners & Interactions
// ==========================================================================

// Category Pill Clicks
filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    filterPills.forEach((p) => {
      p.classList.remove("active");
      p.setAttribute("aria-selected", "false");
    });
    pill.classList.add("active");
    pill.setAttribute("aria-selected", "true");
    
    state.currentCategory = pill.dataset.category;
    applyFilters();
  });
});

// Sort Selector
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    state.currentSort = e.target.value;
    applyFilters();
  });
}

// Search Input Live Filtering (Debounced)
let searchTimeout = null;
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  const val = e.target.value;
  
  if (val.length > 0) {
    clearSearchBtn.classList.add("show");
  } else {
    clearSearchBtn.classList.remove("show");
  }

  searchTimeout = setTimeout(() => {
    state.searchQuery = val;
    applyFilters();
  }, 150);
});

// Clear Search Button
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.searchQuery = "";
  clearSearchBtn.classList.remove("show");
  applyFilters();
  searchInput.focus();
});

// Reset Filters Button (Empty state)
resetFilterBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.searchQuery = "";
  clearSearchBtn.classList.remove("show");
  
  filterPills.forEach((p) => {
    const isAll = p.dataset.category === "all";
    p.classList.toggle("active", isAll);
    p.setAttribute("aria-selected", isAll ? "true" : "false");
  });
  state.currentCategory = "all";
  if (sortSelect) sortSelect.value = "featured";
  state.currentSort = "featured";
  applyFilters();
});

// Layout Switcher
masonryViewBtn.addEventListener("click", () => {
  masonryViewBtn.classList.add("active");
  balancedViewBtn.classList.remove("active");
  galleryGrid.classList.remove("balanced-layout");
  galleryGrid.classList.add("masonry-layout");
});

balancedViewBtn.addEventListener("click", () => {
  balancedViewBtn.classList.add("active");
  masonryViewBtn.classList.remove("active");
  galleryGrid.classList.remove("masonry-layout");
  galleryGrid.classList.add("balanced-layout");
});

// Gallery Grid Clicks (Delegation)
galleryGrid.addEventListener("click", (e) => {
  // 1. Like button click
  const likeBtn = e.target.closest('[data-action="like"]');
  if (likeBtn) {
    e.stopPropagation();
    const photoId = parseInt(likeBtn.dataset.id, 10);
    toggleLike(photoId);
    return;
  }

  // 2. Card click or expand button click to open Lightbox
  const mediaTrigger = e.target.closest(".photo-media");
  const titleTrigger = e.target.closest(".photo-title");
  const expandBtn = e.target.closest('[data-action="open-lightbox"]');

  if (mediaTrigger || titleTrigger || expandBtn) {
    const indexStr = (mediaTrigger || titleTrigger || expandBtn).dataset.index;
    const index = parseInt(indexStr, 10);
    if (!isNaN(index)) {
      openLightbox(index);
    }
  }
});

// Lightbox Controls
lbPrevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrevPhoto();
});

lbNextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showNextPhoto();
});

lbCloseBtn.addEventListener("click", closeLightbox);
lbZoomBtn.addEventListener("click", toggleZoom);
lbFullscreenBtn.addEventListener("click", toggleFullscreen);
lbShareBtn.addEventListener("click", shareCurrentPhoto);

lbLikeBtn.addEventListener("click", () => {
  const currentPhoto = state.filteredPhotos[state.lightboxIndex];
  if (currentPhoto) {
    toggleLike(currentPhoto.id);
  }
});

// Close Lightbox when clicking outside image viewport
lbViewport.addEventListener("click", (e) => {
  if (e.target === lbViewport || e.target.id === "lbImgWrapper") {
    closeLightbox();
  }
});

// Keyboard Navigation & Shortcuts
window.addEventListener("keydown", (e) => {
  if (!state.isLightboxOpen) return;

  switch (e.key) {
    case "ArrowLeft":
      showPrevPhoto();
      break;
    case "ArrowRight":
      showNextPhoto();
      break;
    case "Escape":
      closeLightbox();
      break;
    case "f":
    case "F":
      toggleFullscreen();
      break;
    case "z":
    case "Z":
      toggleZoom();
      break;
  }
});

// ==========================================================================
// 7. Initialization & Deep Link Routing
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  updateFavBadgeCount();
  applyFilters();

  // Check URL hash for direct photo open (e.g. #photo-5)
  if (window.location.hash.startsWith("#photo-")) {
    const id = parseInt(window.location.hash.replace("#photo-", ""), 10);
    if (!isNaN(id)) {
      const targetIndex = state.filteredPhotos.findIndex((p) => p.id === id);
      if (targetIndex !== -1) {
        setTimeout(() => openLightbox(targetIndex), 200);
      }
    }
  }
});
