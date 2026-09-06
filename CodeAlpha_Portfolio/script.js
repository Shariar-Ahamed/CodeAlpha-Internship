/**
 * Shariar Ahamed Ripon — Official Portfolio Gateway Script
 * CodeAlpha Frontend Development Internship — Portfolio
 * Author: Shariar Ahamed Ripon (CA/DF1/269964)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const TARGET_URL = 'https://shariarahamed.me/';
  const TOTAL_SECONDS = 3;
  let remainingSeconds = TOTAL_SECONDS;

  const countdownNum = document.getElementById('countdownNum');
  const ringProgress = document.getElementById('ringProgress');
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  const copyIcon = document.getElementById('copyIcon');

  // Circumference of radius 44: 2 * PI * 44 = 276.46
  const CIRCUMFERENCE = 276.46;

  function updateCountdownUI() {
    if (countdownNum) {
      countdownNum.textContent = remainingSeconds;
    }
    if (ringProgress) {
      const progressRatio = (TOTAL_SECONDS - remainingSeconds) / TOTAL_SECONDS;
      const offset = CIRCUMFERENCE * progressRatio;
      ringProgress.style.strokeDashoffset = offset;
    }
  }

  // Initial State
  updateCountdownUI();

  // 1-second Interval Countdown
  const interval = setInterval(() => {
    remainingSeconds--;
    updateCountdownUI();

    if (remainingSeconds <= 0) {
      clearInterval(interval);
      window.location.replace(TARGET_URL);
    }
  }, 1000);

  // Hard fallback redirect after 3.2 seconds
  setTimeout(() => {
    window.location.replace(TARGET_URL);
  }, 3200);

  // Copy Link Button Feature
  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(TARGET_URL)
        .then(() => {
          if (copyIcon) copyIcon.className = 'fa-solid fa-check';
          showToast('Portfolio link copied to clipboard!', 'fa-link');
          setTimeout(() => {
            if (copyIcon) copyIcon.className = 'fa-regular fa-copy';
          }, 2000);
        })
        .catch(() => {
          showToast(`Domain: ${TARGET_URL}`, 'fa-link');
        });
    });
  }
});

// Toast Helper
function showToast(message, icon = 'fa-circle-info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2800);
}
