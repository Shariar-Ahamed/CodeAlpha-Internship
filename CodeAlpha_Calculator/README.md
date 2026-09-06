# 🧮 AeroCalc Pro — Precision Interactive Calculator

A modern, desktop-grade web calculator built with vanilla HTML5, CSS3, and modern JavaScript as part of the **CodeAlpha Frontend Development Internship**.

---

## 🔗 Live Demo & Repository Links

* **Live Demo Preview:** [https://shariar-ahamed.github.io/CodeAlpha-Internship/CodeAlpha_Calculator/](https://shariar-ahamed.github.io/CodeAlpha-Internship/CodeAlpha_Calculator/)
* **Project Repository:** [github.com/Shariar-Ahamed/CodeAlpha-Internship/tree/main/CodeAlpha_Calculator](https://github.com/Shariar-Ahamed/CodeAlpha-Internship/tree/main/CodeAlpha_Calculator)

---

## 🌟 Key Features

1. **Human-Crafted Desktop App Look:**
   - Clean, light-themed modern canvas (`#F8FAFC`, `#FFFFFF`, refined Slate & Indigo accents).
   - Tactile 3D physical keypress animations with realistic bottom shadows and press states.
   - Clean mathematical typography using Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*).

2. **Dual-Line Precision Display:**
   - Active formula expression line (e.g. `1,250 × 8 =`) and large primary result display.
   - Thousands comma separator formatting (`1,250,000.50`) and dynamic auto-scaling font size for large calculations.

3. **Complete Arithmetic & Scientific Modes:**
   - **Standard Mode:** Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`÷`), Percentage (`%`), Negate (`±`), and Decimal (`.`).
   - **Scientific Mode:** Square root ($\sqrt{x}$), Exponents ($x^2$, $x^y$), Logarithms ($\ln$, $\log$), Trigonometry ($\sin$, $\cos$, $\tan$), Factorial ($x!$), Absolute value ($|x|$), Inverse ($1/x$), $\pi$, and Euler's constant ($e$).

4. **Calculation History Drawer (with LocalStorage):**
   - Automatically stores all completed calculations with equations and results.
   - Persistent across browser reloads using `localStorage`.
   - Click any past calculation to restore it into the active display.

5. **Full Physical Keyboard Support & Visual Key Feedback:**
   - Numbers: <kbd>0</kbd> - <kbd>9</kbd> and <kbd>.</kbd>
   - Operators: <kbd>+</kbd>, <kbd>-</kbd>, <kbd>*</kbd>, <kbd>/</kbd>, <kbd>%</kbd>
   - Calculation: <kbd>Enter</kbd> or <kbd>=</kbd>
   - Clear: <kbd>Esc</kbd> or <kbd>C</kbd>
   - Backspace: <kbd>Backspace</kbd>
   - History: <kbd>H</kbd>
   - Pressing any key triggers visual on-screen key depression and color animation.

6. **Haptic Audio Feedback (Web Audio API):**
   - Synthesizes soft mechanical tactile click sounds without external MP3 files.
   - Sound toggle button to mute/unmute audio.

7. **One-Click Clipboard Copy & Toast Notifications:**
   - Copy calculated result with one click.
   - Smooth animated toast alerts for user feedback.

8. **Memory Registers:**
   - Memory Clear (`MC`), Memory Recall (`MR`), Memory Add (`M+`), and Memory Subtract (`M-`) with active `[M]` indicator.

---

## 🛠️ Built With

* **HTML5** – Semantic markup, ARIA accessibility labels
* **CSS3** – CSS Variables, Flexbox, CSS Grid, tactile 3D button animations, smooth transforms
* **JavaScript (ES6+)** – Mathematical evaluation engine, Web Audio API, Web Storage API, Clipboard API, global Keyboard event listener

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Shariar-Ahamed/CodeAlpha-Internship.git
   ```
2. Open `CodeAlpha_Calculator/index.html` directly in any web browser, or run a local server:
   ```bash
   # Using Python
   python -m http.server 3000
   ```
3. Navigate to `http://localhost:3000/CodeAlpha_Calculator/` in your browser.

---

## 👤 Author
* **Intern:** Shariar Ahamed Ripon
* **Student ID:** `CA/DF1/269964`
* **Program:** CodeAlpha Virtual Internship (Frontend Development)
