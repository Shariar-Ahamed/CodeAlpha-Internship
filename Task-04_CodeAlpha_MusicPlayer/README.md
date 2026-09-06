# 🎵 AuraMusic — Modern Web Audio Player

> **CodeAlpha Frontend Development Internship — Task 04**  
> Developed with pure HTML5, modern CSS3, and Vanilla JavaScript (ES6+).

---

## 👤 Intern Information

- **Intern Name:** **Shariar Ahamed Ripon**
- **Student ID:** `CA/DF1/269964`
- **Domain:** Frontend Web Development
- **Internship Duration:** September 10, 2026 – October 10, 2026
- **Live Demo:** [🌐 AuraMusic Live Preview](https://shariar-ahamed.github.io/CodeAlpha-Internship/Task-04_CodeAlpha_MusicPlayer/)

---

## ✨ Key Features & Capabilities

### 🎛️ 1. Audio Engine & Playback Controls
- **Full Transport Controls:** Play, Pause, Next, Previous, Fast forward (+5s), and Rewind (-5s).
- **Smart Shuffle Mode:** Plays tracks in randomized non-repeating sequence.
- **3-State Repeat Mode:** Cycle between *Off*, *Repeat All in Queue*, and *Repeat Single Track*.
- **Playback Speed Controller:** Adjust speed smoothly (`0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`).
- **Sleep Timer:** Automatic playback auto-stop with countdown timer (`5m`, `15m`, `30m`, `60m`).

### 📊 2. Dynamic Audio Visualizer & Vinyl Deck
- **Canvas Audio Spectrum:** Real-time animated audio wave / frequency equalizer.
- **Spinning Vinyl Record:** Realistic vinyl disk groove simulation with active spinning animation that pauses/resumes seamlessly.

### ⏱️ 3. Interactive Seekbar & Tooltip Preview
- **Buffered & Current Progress:** Live dual-layer track progress indicator.
- **Hover Time Preview:** Real-time time stamp tooltip (`02:15`) displayed on scrubber hover.
- **Click & Drag Seek:** Smooth scrubbing support across all viewports.

### 📜 4. Queue Explorer & Search
- **Curated Catalog:** 8 royalty-free ambient, lofi, synthwave, chillhop, and acoustic tracks.
- **Live Search Bar:** Instant search by song title, artist, or genre.
- **Genre Filter Pills:** Filter by *All, Lofi, Synthwave, Chillhop, Acoustic, Ambient*.
- **Favorites / Likes System:** ❤️ Save favorite tracks with persistent browser `localStorage`.

### 🔊 5. Precision Volume Control
- **Custom Range Slider:** Smooth level adjustments with percentage badge.
- **Dynamic Icons:** Speaker iconography dynamically updates (`Muted`, `Low`, `High`).
- **One-Click Mute:** Instant toggle for sound muting.

---

## ⌨️ Keyboard Shortcuts Reference

| Key / Shortcut | Action |
| :---: | :--- |
| <kbd>Space</kbd> | Play / Pause toggle |
| <kbd>→</kbd> | Seek forward 5 seconds |
| <kbd>←</kbd> | Seek backward 5 seconds |
| <kbd>↑</kbd> | Increase volume by 5% |
| <kbd>↓</kbd> | Decrease volume by 5% |
| <kbd>M</kbd> | Toggle Mute / Unmute |
| <kbd>N</kbd> | Skip to Next track |
| <kbd>P</kbd> | Return to Previous track (or restart) |
| <kbd>S</kbd> | Toggle Shuffle mode |
| <kbd>R</kbd> | Toggle Repeat mode (*Off / All / One*) |
| <kbd>L</kbd> | Toggle Favorite / Like current track |

---

## 🛠️ Technology Stack

- **HTML5:** Semantic architecture, accessible audio controls, and canvas visualizer.
- **CSS3:** Custom properties design tokens, realistic soft elevations, vinyl spinning animation, and responsive media queries.
- **JavaScript (ES6+):** HTML5 Audio API, Canvas 2D rendering, state management, and `localStorage` persistence.

---

## 📱 Responsive Support

- **Desktop & PC (> 960px):** Dual-column layout with primary vinyl player deck and live queue sidebar.
- **Tablets (640px – 960px):** Responsive single-column flow with full-width library drawer.
- **Mobile Phones (< 640px):** Compact vinyl size, touch-friendly oversized control buttons, auto-collapsible queue drawer, and touch seekbar.

---

## 📄 License & Attribution

Developed for the **CodeAlpha Virtual Internship Program**. Royalty-free audio tracks courtesy of SoundHelix and curated imagery from Unsplash.
