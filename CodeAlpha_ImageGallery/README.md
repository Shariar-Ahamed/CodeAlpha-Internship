# 🖼️ Lumina Image Gallery — CodeAlpha

An editorial, responsive, and human-crafted photography showcase developed as part of the **CodeAlpha Frontend Development Internship**.

---

## 🔗 Live Demo & Repository Links

* **Live Demo Preview:** [https://shariar-ahamed.github.io/CodeAlpha-Internship/CodeAlpha_ImageGallery/](https://shariar-ahamed.github.io/CodeAlpha-Internship/CodeAlpha_ImageGallery/)
* **Project Repository:** [github.com/Shariar-Ahamed/CodeAlpha-Internship/tree/main/CodeAlpha_ImageGallery](https://github.com/Shariar-Ahamed/CodeAlpha-Internship/tree/main/CodeAlpha_ImageGallery)

---

## 🌟 Key Features

1. **Editorial & Human-Crafted Aesthetic:**
   - Clean, light-themed modern canvas (`#F8FAFC`, `#FFFFFF`, refined Slate & Indigo accents).
   - Designed without generic AI clichés or pitch-black neon gradients.
   - Clean typography using Google Fonts (*Plus Jakarta Sans*).

2. **24 Curated High-Resolution Photographs:**
   - 100% unique photographs across 5 distinct categories with zero duplicate images.
   - Categorized under: *Nature & Landscapes*, *Architecture*, *Portraits & People*, *Street & Travel*, *Minimalist & Fine Art*.

3. **❤️ Saved / Favorites Collection (with LocalStorage):**
   - Instant bookmarking with real-time counter badge.
   - Persistent across browser reloads via `localStorage`.
   - Dedicated "Saved" filter tab to view your favorite picks in one click.

4. **🔃 Smart Sorting Selector:**
   - Sort by **Featured Order**, **Most Liked / Popular**, **Title (A → Z)**, and **Title (Z → A)**.

5. **📷 Realistic EXIF Camera Metadata:**
   - Displays real-world camera body, lens, exposure/ISO, and resolution specifications inside the Lightbox viewer.

6. **🔗 One-Click Direct Sharing & Deep Linking:**
   - Copy direct shareable URLs with hash routing (`#photo-ID`).
   - Opens the exact photograph automatically when someone visits the shared link.

7. **✨ Interactive Toast Notifications:**
   - Smooth animated toast alerts for liking photos and copying share links.

8. **Live Debounced Search:**
   - Instant filtering across photo titles, photographers, locations, and tags.
   - One-click clear search button and empty state handling with reset button.

9. **Multi-Layout Switcher:**
   - Toggle between **Balanced Grid Layout** (Default) and **Editorial Dynamic Masonry** layout.

10. **Advanced Interactive Lightbox Modal:**
    - Next (`>`) & Previous (`<`) buttons with smooth cycling navigation.
    - **Keyboard Navigation Support:**
      - <kbd>&larr;</kbd> (Previous Image)
      - <kbd>&rarr;</kbd> (Next Image)
      - <kbd>Esc</kbd> (Close Modal)
      - <kbd>Z</kbd> (Toggle Zoom In / Out)
      - <kbd>F</kbd> (Toggle Fullscreen mode)
    - Image details drawer with title, photographer attribution, location, category badge, like counter, and direct download button.

11. **Fully Responsive:**
    - Fluid experience across mobile phones (320px+), tablets (768px+), and large desktop displays.

---

## 🛠️ Built With

* **HTML5** – Semantic structure, ARIA accessibility attributes
* **CSS3** – CSS Custom Properties (Tokens), Flexbox, CSS Grid, Masonry columns, smooth transitions, Toast system
* **JavaScript (ES6+)** – DOM manipulation, event delegation, keyboard listeners, Web Storage API, Fullscreen API, Clipboard API

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Shariar-Ahamed/CodeAlpha-Internship.git
   ```
2. Open `CodeAlpha_ImageGallery/index.html` directly in any web browser, or run a local server:
   ```bash
   # Using Python
   python -m http.server 3000
   ```
3. Navigate to `http://localhost:3000/CodeAlpha_ImageGallery/` in your browser.

---

## 👤 Author
* **Intern:** Shariar Ahamed Ripon
* **Student ID:** `CA/DF1/269964`
* **Program:** CodeAlpha Virtual Internship (Frontend Development)
