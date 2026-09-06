/**
 * AeroCalc Pro — Advanced Precision Calculator Engine
 * CodeAlpha Frontend Development Internship — Calculator
 * Author: Shariar Ahamed Ripon (Student ID: CA/DF1/269964)
 */

'use strict';

// ==========================================================================
// 1. Audio Click Synthesizer (Web Audio API - Zero External Dependencies)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem("aerocalc_sound") !== "false";
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
  }

  playClick(freq = 800, duration = 0.03, type = "sine") {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Ignore audio context errors gracefully
    }
  }

  playOperator() {
    this.playClick(1100, 0.04, "triangle");
  }

  playEqual() {
    this.playClick(1400, 0.05, "sine");
  }

  playClear() {
    this.playClick(400, 0.04, "square");
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("aerocalc_sound", this.enabled);
    return this.enabled;
  }
}

const sfx = new SoundFX();

// ==========================================================================
// 2. State Management & Storage
// ==========================================================================
const HISTORY_STORAGE_KEY = "aerocalc_history";

function loadHistoryFromStorage() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveHistoryToStorage(historyArray) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyArray.slice(0, 50)));
  } catch (err) {
    console.warn("Could not save history to localStorage", err);
  }
}

const state = {
  currentInput: "0",
  expression: "",
  prevValue: null,
  pendingOperator: null,
  isCalculated: false,
  memory: 0,
  hasMemory: false,
  mode: "standard", // "standard" | "scientific"
  history: loadHistoryFromStorage()
};

// ==========================================================================
// 3. DOM Elements Selectors
// ==========================================================================
const calculatorCard = document.getElementById("calculatorCard");
const mainDisplay = document.getElementById("mainDisplay");
const expressionDisplay = document.getElementById("expressionDisplay");
const currentModeTag = document.getElementById("currentModeTag");
const memoryTag = document.getElementById("memoryTag");
const copyResultBtn = document.getElementById("copyResultBtn");
const soundToggleBtn = document.getElementById("soundToggleBtn");
const soundIcon = document.getElementById("soundIcon");
const historyToggleBtn = document.getElementById("historyToggleBtn");
const historyBadge = document.getElementById("historyBadge");
const historyDrawer = document.getElementById("historyDrawer");
const historyList = document.getElementById("historyList");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const standardModeBtn = document.getElementById("standardModeBtn");
const scientificModeBtn = document.getElementById("scientificModeBtn");
const toastContainer = document.getElementById("toastContainer");

// ==========================================================================
// 4. Toast Notifications
// ==========================================================================
function showToast(message) {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="ri-check-line"></i> <span>${escapeHTML(message)}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================================================
// 5. Display Formatter & Utilities
// ==========================================================================
function formatNumber(numStr) {
  if (!numStr || numStr === "Error" || numStr === "Infinity" || numStr === "-Infinity" || numStr === "NaN") {
    return numStr;
  }

  const parts = numStr.toString().split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  // Add thousand comma separators to integer part
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
}

function updateDisplay() {
  mainDisplay.textContent = formatNumber(state.currentInput);
  expressionDisplay.textContent = state.expression;

  // Dynamically adjust font size for long numbers
  const len = state.currentInput.length;
  if (len > 14) {
    mainDisplay.style.fontSize = "1.5rem";
  } else if (len > 10) {
    mainDisplay.style.fontSize = "1.875rem";
  } else if (len > 7) {
    mainDisplay.style.fontSize = "2.125rem";
  } else {
    mainDisplay.style.fontSize = "2.5rem";
  }

  // Update Memory Tag
  memoryTag.style.display = state.hasMemory ? "inline" : "none";
}

// ==========================================================================
// 6. Core Mathematical Calculations Engine
// ==========================================================================
function inputDigit(digit) {
  sfx.playClick();

  if (state.isCalculated) {
    state.currentInput = digit;
    state.isCalculated = false;
  } else {
    if (state.currentInput === "0") {
      state.currentInput = digit;
    } else {
      if (state.currentInput.replace(/[^0-9]/g, "").length >= 16) return; // Limit digits
      state.currentInput += digit;
    }
  }
  updateDisplay();
}

function inputDecimal() {
  sfx.playClick();

  if (state.isCalculated) {
    state.currentInput = "0.";
    state.isCalculated = false;
  } else if (!state.currentInput.includes(".")) {
    state.currentInput += ".";
  }
  updateDisplay();
}

function handleOperator(op) {
  sfx.playOperator();

  const symbolMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  const displaySymbol = symbolMap[op] || op;

  if (state.pendingOperator && !state.isCalculated) {
    executeCalculation(false);
  } else {
    state.prevValue = parseFloat(state.currentInput);
  }

  state.pendingOperator = op;
  state.expression = `${formatNumber(state.currentInput)} ${displaySymbol} `;
  state.isCalculated = true;
  updateDisplay();
}

function executeCalculation(recordHistory = true) {
  if (!state.pendingOperator || state.prevValue === null) return;

  const current = parseFloat(state.currentInput);
  const prev = state.prevValue;
  let result = 0;

  const symbolMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  const displaySymbol = symbolMap[state.pendingOperator] || state.pendingOperator;

  switch (state.pendingOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        state.currentInput = "Error";
        state.expression = `${formatNumber(prev)} ÷ 0 =`;
        state.pendingOperator = null;
        state.prevValue = null;
        state.isCalculated = true;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Handle Floating Precision Issues (e.g. 0.1 + 0.2 = 0.3)
  result = Math.round((result + Number.EPSILON) * 1e12) / 1e12;

  const equationStr = `${formatNumber(prev)} ${displaySymbol} ${formatNumber(current)} =`;
  const resultStr = result.toString();

  if (recordHistory) {
    sfx.playEqual();
    addHistoryItem(equationStr, formatNumber(resultStr));
  }

  state.expression = equationStr;
  state.currentInput = resultStr;
  state.prevValue = result;
  state.pendingOperator = null;
  state.isCalculated = true;
  updateDisplay();
}

function clearAll() {
  sfx.playClear();
  state.currentInput = "0";
  state.expression = "";
  state.prevValue = null;
  state.pendingOperator = null;
  state.isCalculated = false;
  updateDisplay();
}

function deleteLastChar() {
  sfx.playClick();
  if (state.isCalculated) {
    state.expression = "";
    state.isCalculated = false;
  }

  if (state.currentInput.length > 1) {
    state.currentInput = state.currentInput.slice(0, -1);
    if (state.currentInput === "-" || state.currentInput === "") {
      state.currentInput = "0";
    }
  } else {
    state.currentInput = "0";
  }
  updateDisplay();
}

function toggleNegate() {
  sfx.playClick();
  if (state.currentInput === "0" || state.currentInput === "Error") return;

  if (state.currentInput.startsWith("-")) {
    state.currentInput = state.currentInput.slice(1);
  } else {
    state.currentInput = "-" + state.currentInput;
  }
  updateDisplay();
}

function applyPercentage() {
  sfx.playOperator();
  const val = parseFloat(state.currentInput);
  if (isNaN(val)) return;

  const res = val / 100;
  state.expression = `${formatNumber(state.currentInput)}% =`;
  state.currentInput = res.toString();
  state.isCalculated = true;
  addHistoryItem(`${formatNumber(val)}% =`, formatNumber(res));
  updateDisplay();
}

// ==========================================================================
// 7. Scientific Mode Functions
// ==========================================================================
function applyScientificFunction(action) {
  sfx.playOperator();
  const val = parseFloat(state.currentInput);
  if (isNaN(val) && action !== "pi" && action !== "e") return;

  let result = 0;
  let eqStr = "";

  switch (action) {
    case "sin":
      result = Math.sin((val * Math.PI) / 180); // Degrees
      eqStr = `sin(${val}°) =`;
      break;
    case "cos":
      result = Math.cos((val * Math.PI) / 180);
      eqStr = `cos(${val}°) =`;
      break;
    case "tan":
      result = Math.tan((val * Math.PI) / 180);
      eqStr = `tan(${val}°) =`;
      break;
    case "sqrt":
      if (val < 0) {
        state.currentInput = "Error";
        updateDisplay();
        return;
      }
      result = Math.sqrt(val);
      eqStr = `√(${val}) =`;
      break;
    case "sqr":
      result = Math.pow(val, 2);
      eqStr = `sqr(${val}) =`;
      break;
    case "ln":
      if (val <= 0) {
        state.currentInput = "Error";
        updateDisplay();
        return;
      }
      result = Math.log(val);
      eqStr = `ln(${val}) =`;
      break;
    case "log":
      if (val <= 0) {
        state.currentInput = "Error";
        updateDisplay();
        return;
      }
      result = Math.log10(val);
      eqStr = `log(${val}) =`;
      break;
    case "inv":
      if (val === 0) {
        state.currentInput = "Error";
        updateDisplay();
        return;
      }
      result = 1 / val;
      eqStr = `1/(${val}) =`;
      break;
    case "fact":
      if (val < 0 || !Number.isInteger(val) || val > 170) {
        state.currentInput = "Error";
        updateDisplay();
        return;
      }
      result = factorial(val);
      eqStr = `${val}! =`;
      break;
    case "abs":
      result = Math.abs(val);
      eqStr = `|${val}| =`;
      break;
    case "pi":
      result = Math.PI;
      eqStr = "π =";
      break;
    case "e":
      result = Math.E;
      eqStr = "e =";
      break;
    default:
      return;
  }

  result = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
  state.currentInput = result.toString();
  state.expression = eqStr;
  state.isCalculated = true;
  addHistoryItem(eqStr, formatNumber(result));
  updateDisplay();
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// ==========================================================================
// 8. Memory Management (MC, MR, M+, M-)
// ==========================================================================
function handleMemory(action) {
  sfx.playClick();
  const val = parseFloat(state.currentInput) || 0;

  switch (action) {
    case "mc":
      state.memory = 0;
      state.hasMemory = false;
      showToast("Memory Cleared (MC)");
      break;
    case "mr":
      if (state.hasMemory) {
        state.currentInput = state.memory.toString();
        state.isCalculated = true;
        showToast(`Memory Recalled: ${formatNumber(state.memory)}`);
      }
      break;
    case "m-plus":
      state.memory += val;
      state.hasMemory = true;
      state.isCalculated = true;
      showToast(`Added to Memory (M+)`);
      break;
    case "m-minus":
      state.memory -= val;
      state.hasMemory = true;
      state.isCalculated = true;
      showToast(`Subtracted from Memory (M−)`);
      break;
  }
  updateDisplay();
}

// ==========================================================================
// 9. History Manager
// ==========================================================================
function addHistoryItem(equation, result) {
  const item = {
    equation,
    result,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  state.history.unshift(item);
  saveHistoryToStorage(state.history);
  renderHistory();
}

function renderHistory() {
  if (!historyList) return;
  historyList.innerHTML = "";

  historyBadge.textContent = state.history.length;

  if (state.history.length === 0) {
    historyList.innerHTML = `
      <div class="history-empty">
        <i class="ri-history-line"></i>
        <p>No calculation history yet</p>
      </div>
    `;
    return;
  }

  state.history.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.setAttribute("tabindex", "0");
    div.setAttribute("title", "Click to load this calculation");
    div.innerHTML = `
      <div class="history-item-eq">${item.equation}</div>
      <div class="history-item-res">${item.result}</div>
    `;

    div.addEventListener("click", () => {
      sfx.playClick();
      state.expression = item.equation;
      state.currentInput = item.result.replace(/,/g, "");
      state.isCalculated = true;
      updateDisplay();
      showToast(`Loaded calculation: ${item.result}`);
    });

    historyList.appendChild(div);
  });
}

function clearHistory() {
  sfx.playClear();
  state.history = [];
  saveHistoryToStorage(state.history);
  renderHistory();
  showToast("Calculation history cleared");
}

// ==========================================================================
// 10. Keypad Event Delegation & Dispatcher
// ==========================================================================
document.addEventListener("click", (e) => {
  const key = e.target.closest(".calc-key");
  if (!key) return;

  const action = key.dataset.action;
  const val = key.dataset.val;

  switch (action) {
    case "num":
      inputDigit(val);
      break;
    case "decimal":
      inputDecimal();
      break;
    case "operator":
      handleOperator(val);
      break;
    case "calculate":
      executeCalculation(true);
      break;
    case "clear":
      clearAll();
      break;
    case "delete":
      deleteLastChar();
      break;
    case "negate":
      toggleNegate();
      break;
    case "percent":
      applyPercentage();
      break;
    default:
      // Scientific functions
      if (action) applyScientificFunction(action);
      break;
  }
});

// Memory Buttons
document.querySelectorAll(".mem-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    handleMemory(btn.dataset.action);
  });
});

// Sound Toggle Button
soundToggleBtn.addEventListener("click", () => {
  const isEnabled = sfx.toggle();
  soundToggleBtn.classList.toggle("active", isEnabled);
  soundIcon.className = isEnabled ? "ri-volume-up-line" : "ri-volume-mute-line";
  showToast(isEnabled ? "Sound feedback enabled 🔊" : "Sound muted 🔇");
});

// History Drawer Toggle
historyToggleBtn.addEventListener("click", () => {
  sfx.playClick();
  historyDrawer.classList.toggle("closed");
});

closeHistoryBtn.addEventListener("click", () => {
  historyDrawer.classList.add("closed");
});

clearHistoryBtn.addEventListener("click", clearHistory);

// Mode Switchers
standardModeBtn.addEventListener("click", () => {
  sfx.playClick();
  state.mode = "standard";
  standardModeBtn.classList.add("active");
  scientificModeBtn.classList.remove("active");
  calculatorCard.classList.remove("scientific-active");
  currentModeTag.textContent = "STANDARD";
});

scientificModeBtn.addEventListener("click", () => {
  sfx.playClick();
  state.mode = "scientific";
  scientificModeBtn.classList.add("active");
  standardModeBtn.classList.remove("active");
  calculatorCard.classList.add("scientific-active");
  currentModeTag.textContent = "SCIENTIFIC";
});

// Copy Result Button
copyResultBtn.addEventListener("click", () => {
  const text = mainDisplay.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${text} to clipboard! 📋`);
  }).catch(() => {
    showToast(`Result: ${text}`);
  });
});

// ==========================================================================
// 11. Full Physical Keyboard Support
// ==========================================================================
window.addEventListener("keydown", (e) => {
  let matchedKey = null;

  // Numbers 0-9
  if (e.key >= "0" && e.key <= "9") {
    inputDigit(e.key);
    matchedKey = document.querySelector(`.calc-key[data-key="${e.key}"]`);
  }
  // Decimal .
  else if (e.key === ".") {
    inputDecimal();
    matchedKey = document.querySelector(`.calc-key[data-key="."]`);
  }
  // Basic Operators
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    handleOperator(e.key);
    matchedKey = document.querySelector(`.calc-key[data-key="${e.key}"]`);
  }
  // Enter or Equal =
  else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    executeCalculation(true);
    matchedKey = document.querySelector(`.calc-key[data-action="calculate"]`);
  }
  // Backspace / Delete
  else if (e.key === "Backspace") {
    deleteLastChar();
    matchedKey = document.querySelector(`.calc-key[data-action="delete"]`);
  }
  // Escape / C / c (Clear)
  else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
    clearAll();
    matchedKey = document.querySelector(`.calc-key[data-action="clear"]`);
  }
  // Percentage %
  else if (e.key === "%") {
    applyPercentage();
    matchedKey = document.querySelector(`.calc-key[data-action="percent"]`);
  }
  // Scientific keys mapping
  else if (e.key === "s" || e.key === "S") {
    applyScientificFunction("sin");
    matchedKey = document.querySelector(`.calc-key[data-action="sin"]`);
  } else if (e.key === "r" || e.key === "R") {
    applyScientificFunction("sqrt");
    matchedKey = document.querySelector(`.calc-key[data-action="sqrt"]`);
  } else if (e.key === "h" || e.key === "H") {
    historyDrawer.classList.toggle("closed");
  }

  // Visual press animation on screen button
  if (matchedKey) {
    matchedKey.classList.add("key-pressed");
    setTimeout(() => matchedKey.classList.remove("key-pressed"), 120);
  }
});

// ==========================================================================
// 12. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Check sound state
  const isSoundOn = localStorage.getItem("aerocalc_sound") !== "false";
  soundToggleBtn.classList.toggle("active", isSoundOn);
  soundIcon.className = isSoundOn ? "ri-volume-up-line" : "ri-volume-mute-line";

  // Hide history initially on small screens
  historyDrawer.classList.add("closed");

  updateDisplay();
  renderHistory();
});
