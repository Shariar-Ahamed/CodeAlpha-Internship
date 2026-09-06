/**
 * AuraMusic Player — Modern Web Audio Engine & Controller
 * CodeAlpha Frontend Development Internship — Music Player
 * Author: Shariar Ahamed Ripon (CA/DF1/269964)
 */

'use strict';

// ==========================================================================
// 1. Music Library & Track Catalog
// ==========================================================================
const TRACKS = [
  {
    id: 'track-1',
    title: 'Midnight City Lights',
    artist: 'Aura Beats & Synth Collective',
    genre: 'Synthwave',
    duration: '03:15',
    art: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'
  },
  {
    id: 'track-2',
    title: 'Sunday Morning Coffee',
    artist: 'Lo-Fi Dreamer',
    genre: 'Lofi',
    duration: '03:41',
    art: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'
  },
  {
    id: 'track-3',
    title: 'Acoustic Horizon',
    artist: 'Elena Vance',
    genre: 'Acoustic',
    duration: '02:33',
    art: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
    src: 'https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3'
  },
  {
    id: 'track-4',
    title: 'Deep Focus Flow',
    artist: 'Zenith Sound',
    genre: 'Chillhop',
    duration: '04:32',
    art: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg'
  },
  {
    id: 'track-5',
    title: 'Celestial Drift',
    artist: 'Nova Cosmos',
    genre: 'Ambient',
    duration: '01:55',
    art: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race1.ogg'
  },
  {
    id: 'track-6',
    title: 'Tokyo Raindrops',
    artist: 'Komorebi Vibes',
    genre: 'Lofi',
    duration: '02:08',
    art: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg'
  },
  {
    id: 'track-7',
    title: 'Retro Arcade 1984',
    artist: 'Pixel Wave',
    genre: 'Synthwave',
    duration: '01:40',
    art: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg'
  },
  {
    id: 'track-8',
    title: 'Gentle Meadow Walk',
    artist: 'Acoustic Journey',
    genre: 'Acoustic',
    duration: '03:15',
    art: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    src: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'
  }
];

// ==========================================================================
// 2. Application State Management
// ==========================================================================
const state = {
  currentTrackIndex: 0,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 'all', // 'off' | 'all' | 'one'
  volume: 0.8,
  isMuted: false,
  playbackSpeed: 1.0,
  sleepTimerTimeout: null,
  sleepTimerInterval: null,
  sleepTimerRemaining: 0,
  favorites: JSON.parse(localStorage.getItem('auramusic_favorites') || '[]'),
  currentGenreFilter: 'all',
  searchQuery: '',
  isDraggingSeekbar: false
};

// ==========================================================================
// 3. DOM Elements
// ==========================================================================
const audio = document.getElementById('audioElement');
const albumArt = document.getElementById('albumArt');
const vinylRecord = document.getElementById('vinylRecord');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const trackGenre = document.getElementById('trackGenre');
const likeBtn = document.getElementById('likeBtn');
const shareBtn = document.getElementById('shareBtn');

// Scrubber
const progressBarContainer = document.getElementById('progressBarContainer');
const progressBuffered = document.getElementById('progressBuffered');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const progressTooltip = document.getElementById('progressTooltip');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

// Controls
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const repeatOneBadge = document.getElementById('repeatOneBadge');

// Volume
const muteBtn = document.getElementById('muteBtn');
const volIcon = document.getElementById('volIcon');
const volSlider = document.getElementById('volSlider');
const volFill = document.getElementById('volFill');
const volPercent = document.getElementById('volPercent');

// Header Tools
const sleepTimerBtn = document.getElementById('sleepTimerBtn');
const timerBadge = document.getElementById('timerBadge');
const timerMenu = document.getElementById('timerMenu');
const speedBtn = document.getElementById('speedBtn');
const speedBadge = document.getElementById('speedBadge');
const speedMenu = document.getElementById('speedMenu');
const playlistToggleBtn = document.getElementById('playlistToggleBtn');

// Playlist
const playlistSidebar = document.getElementById('playlistSidebar');
const playlistTrackList = document.getElementById('playlistTrackList');
const playlistEmptyState = document.getElementById('playlistEmptyState');
const playlistSearchInput = document.getElementById('playlistSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const genrePillGroup = document.getElementById('genrePillGroup');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const queueCount = document.getElementById('queueCount');

// Canvas Visualizer
const visualizerCanvas = document.getElementById('visualizerCanvas');
const canvasCtx = visualizerCanvas.getContext('2d');
let audioCtx = null;
let analyser = null;
let audioSource = null;
let animationFrameId = null;

// ==========================================================================
// 4. Initialization & Setup
// ==========================================================================
function initPlayer() {
  loadTrack(state.currentTrackIndex, false);
  renderPlaylist();
  setupEventListeners();
  setupCanvasVisualizer();
  audio.volume = state.volume;
  updateVolumeUI();
}

// ==========================================================================
// 5. Track Loading & Metadata
// ==========================================================================
function loadTrack(index, autoPlay = true) {
  if (index < 0 || index >= TRACKS.length) return;
  state.currentTrackIndex = index;
  const track = TRACKS[index];

  // Update Media Elements
  audio.src = track.src;
  audio.playbackRate = state.playbackSpeed;
  albumArt.src = track.art;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  trackGenre.textContent = track.genre;
  durationTimeEl.textContent = track.duration;
  currentTimeEl.textContent = '00:00';
  progressFill.style.width = '0%';
  progressHandle.style.left = '0%';
  progressBuffered.style.width = '0%';

  // Update Favorite status
  updateLikeButton();

  // Highlight active playlist item
  updateActivePlaylistItem();

  if (autoPlay) {
    playTrack();
  }
}

function updateLikeButton() {
  const currentTrack = TRACKS[state.currentTrackIndex];
  const isFav = state.favorites.includes(currentTrack.id);
  
  if (isFav) {
    likeBtn.classList.add('liked');
    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
  } else {
    likeBtn.classList.remove('liked');
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }
}

// ==========================================================================
// 6. Playback Controls
// ==========================================================================
function playTrack() {
  initAudioContext();
  audio.play()
    .then(() => {
      state.isPlaying = true;
      playIcon.className = 'fa-solid fa-pause';
      vinylRecord.classList.remove('paused');
      vinylRecord.classList.add('playing');
      updateActivePlaylistItem();
    })
    .catch((err) => {
      console.warn('Playback interrupted or blocked by browser policy:', err);
    });
}

function pauseTrack() {
  audio.pause();
  state.isPlaying = false;
  playIcon.className = 'fa-solid fa-play';
  vinylRecord.classList.add('paused');
  updateActivePlaylistItem();
}

function togglePlayPause() {
  if (state.isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  if (state.isShuffle) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * TRACKS.length);
    } while (randomIndex === state.currentTrackIndex && TRACKS.length > 1);
    loadTrack(randomIndex, true);
  } else {
    let nextIndex = state.currentTrackIndex + 1;
    if (nextIndex >= TRACKS.length) {
      nextIndex = 0;
    }
    loadTrack(nextIndex, true);
  }
}

function prevTrack() {
  // If playing more than 3 seconds, restart current track
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  let prevIndex = state.currentTrackIndex - 1;
  if (prevIndex < 0) {
    prevIndex = TRACKS.length - 1;
  }
  loadTrack(prevIndex, true);
}

function toggleShuffle() {
  state.isShuffle = !state.isShuffle;
  shuffleBtn.classList.toggle('active', state.isShuffle);
  showToast(state.isShuffle ? 'Shuffle turned ON' : 'Shuffle turned OFF', 'fa-shuffle');
}

function toggleRepeat() {
  if (state.repeatMode === 'off') {
    state.repeatMode = 'all';
    repeatBtn.className = 'ctrl-btn sub-ctrl active';
    repeatOneBadge.style.display = 'none';
    showToast('Repeat: All tracks in queue', 'fa-repeat');
  } else if (state.repeatMode === 'all') {
    state.repeatMode = 'one';
    repeatBtn.className = 'ctrl-btn sub-ctrl active repeat-one';
    repeatOneBadge.style.display = 'block';
    showToast('Repeat: Current track only', 'fa-repeat');
  } else {
    state.repeatMode = 'off';
    repeatBtn.className = 'ctrl-btn sub-ctrl';
    repeatOneBadge.style.display = 'none';
    showToast('Repeat turned OFF', 'fa-repeat');
  }
}

// Audio Metadata Loaded
audio.addEventListener('loadedmetadata', () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    durationTimeEl.textContent = formatTime(audio.duration);
  }
});

// Audio Error Handling
audio.addEventListener('error', (e) => {
  console.warn('Audio streaming error:', e);
  showToast('Buffering next available track stream...', 'fa-triangle-exclamation');
});

// Audio Ended Event
audio.addEventListener('ended', () => {
  if (state.repeatMode === 'one') {
    audio.currentTime = 0;
    playTrack();
  } else if (state.repeatMode === 'all') {
    nextTrack();
  } else {
    if (state.currentTrackIndex < TRACKS.length - 1) {
      nextTrack();
    } else {
      pauseTrack();
    }
  }
});

// ==========================================================================
// 7. Time Formatting & Scrubber Progress
// ==========================================================================
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('timeupdate', () => {
  if (state.isDraggingSeekbar || isNaN(audio.duration)) return;
  
  const current = audio.currentTime;
  const duration = audio.duration;
  const percent = (current / duration) * 100;

  progressFill.style.width = `${percent}%`;
  progressHandle.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(current);
  durationTimeEl.textContent = formatTime(duration);
});

// Buffered Progress
audio.addEventListener('progress', () => {
  if (audio.buffered.length > 0 && !isNaN(audio.duration)) {
    const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
    const bufferedPercent = (bufferedEnd / audio.duration) * 100;
    progressBuffered.style.width = `${bufferedPercent}%`;
  }
});

// Scrubber Click & Drag
function seek(e) {
  const rect = progressBarContainer.getBoundingClientRect();
  const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const percent = clickX / rect.width;
  
  if (!isNaN(audio.duration)) {
    audio.currentTime = percent * audio.duration;
    progressFill.style.width = `${percent * 100}%`;
    progressHandle.style.left = `${percent * 100}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
}

progressBarContainer.addEventListener('mousedown', (e) => {
  state.isDraggingSeekbar = true;
  seek(e);
});

window.addEventListener('mousemove', (e) => {
  if (state.isDraggingSeekbar) {
    seek(e);
  }
});

window.addEventListener('mouseup', () => {
  if (state.isDraggingSeekbar) {
    state.isDraggingSeekbar = false;
  }
});

// Tooltip on Hover
progressBarContainer.addEventListener('mousemove', (e) => {
  const rect = progressBarContainer.getBoundingClientRect();
  const hoverX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const percent = hoverX / rect.width;
  
  if (!isNaN(audio.duration)) {
    const hoverTime = percent * audio.duration;
    progressTooltip.textContent = formatTime(hoverTime);
    progressTooltip.style.left = `${hoverX}px`;
  }
});

// ==========================================================================
// 8. Volume Control
// ==========================================================================
function setVolume(value) {
  state.volume = value;
  audio.volume = value;
  if (value > 0) state.isMuted = false;
  updateVolumeUI();
}

function updateVolumeUI() {
  const percent = state.isMuted ? 0 : Math.round(state.volume * 100);
  volSlider.value = percent;
  volFill.style.width = `${percent}%`;
  volPercent.textContent = `${percent}%`;

  if (state.isMuted || percent === 0) {
    volIcon.className = 'fa-solid fa-volume-xmark';
  } else if (percent < 40) {
    volIcon.className = 'fa-solid fa-volume-low';
  } else {
    volIcon.className = 'fa-solid fa-volume-high';
  }
}

volSlider.addEventListener('input', (e) => {
  setVolume(e.target.value / 100);
});

muteBtn.addEventListener('click', () => {
  state.isMuted = !state.isMuted;
  audio.muted = state.isMuted;
  updateVolumeUI();
  showToast(state.isMuted ? 'Muted' : `Volume: ${Math.round(state.volume * 100)}%`, state.isMuted ? 'fa-volume-xmark' : 'fa-volume-high');
});

// ==========================================================================
// 9. Playlist Rendering & Filtering
// ==========================================================================
function renderPlaylist() {
  const filteredTracks = TRACKS.filter(track => {
    // Genre filter
    const matchesGenre = 
      state.currentGenreFilter === 'all' ||
      (state.currentGenreFilter === 'favorites' && state.favorites.includes(track.id)) ||
      track.genre.toLowerCase() === state.currentGenreFilter.toLowerCase();

    // Search filter
    const matchesSearch = 
      track.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(state.searchQuery.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  queueCount.textContent = `${filteredTracks.length} Track${filteredTracks.length === 1 ? '' : 's'}`;
  playlistTrackList.innerHTML = '';

  if (filteredTracks.length === 0) {
    playlistEmptyState.classList.add('show');
  } else {
    playlistEmptyState.classList.remove('show');
    
    filteredTracks.forEach((track) => {
      const originalIndex = TRACKS.findIndex(t => t.id === track.id);
      const isActive = originalIndex === state.currentTrackIndex;
      const isFav = state.favorites.includes(track.id);

      const item = document.createElement('div');
      item.className = `track-item ${isActive ? 'active' : ''} ${isActive && state.isPlaying ? 'playing' : ''}`;
      item.dataset.index = originalIndex;
      item.innerHTML = `
        <img src="${track.art}" alt="${track.title}" class="track-item-art">
        <div class="track-item-info">
          <div class="track-item-title">${track.title}</div>
          <div class="track-item-artist">${track.artist}</div>
        </div>
        <div class="track-item-equalizer">
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
          <div class="eq-bar"></div>
        </div>
        <div class="track-item-duration">${track.duration}</div>
        <button class="track-item-fav-btn ${isFav ? 'liked' : ''}" data-id="${track.id}" title="Toggle Favorite">
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      `;

      // Click to play track
      item.addEventListener('click', (e) => {
        if (e.target.closest('.track-item-fav-btn')) return;
        loadTrack(originalIndex, true);
      });

      // Favorite button
      const favBtn = item.querySelector('.track-item-fav-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavoriteTrack(track.id);
      });

      playlistTrackList.appendChild(item);
    });
  }
}

function updateActivePlaylistItem() {
  const items = playlistTrackList.querySelectorAll('.track-item');
  items.forEach(item => {
    const itemIdx = parseInt(item.dataset.index, 10);
    if (itemIdx === state.currentTrackIndex) {
      item.classList.add('active');
      if (state.isPlaying) {
        item.classList.add('playing');
      } else {
        item.classList.remove('playing');
      }
    } else {
      item.classList.remove('active', 'playing');
    }
  });
}

function toggleFavoriteTrack(trackId) {
  const idx = state.favorites.indexOf(trackId);
  const track = TRACKS.find(t => t.id === trackId);
  
  if (idx > -1) {
    state.favorites.splice(idx, 1);
    showToast(`Removed from Favorites`, 'fa-heart', 'toast-heart');
  } else {
    state.favorites.push(trackId);
    showToast(`Added to Favorites: ${track.title}`, 'fa-heart', 'toast-heart');
  }
  
  localStorage.setItem('auramusic_favorites', JSON.stringify(state.favorites));
  updateLikeButton();
  renderPlaylist();
}

likeBtn.addEventListener('click', () => {
  const currentTrack = TRACKS[state.currentTrackIndex];
  toggleFavoriteTrack(currentTrack.id);
});

// Share button
shareBtn.addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Track link copied to clipboard!', 'fa-link', 'toast-success');
  }).catch(() => {
    showToast('Share link: ' + url, 'fa-link');
  });
});

// Search functionality
playlistSearchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value.trim();
  clearSearchBtn.classList.toggle('show', state.searchQuery.length > 0);
  renderPlaylist();
});

clearSearchBtn.addEventListener('click', () => {
  playlistSearchInput.value = '';
  state.searchQuery = '';
  clearSearchBtn.classList.remove('show');
  renderPlaylist();
});

// Genre pills
genrePillGroup.addEventListener('click', (e) => {
  const pill = e.target.closest('.genre-pill');
  if (!pill) return;

  genrePillGroup.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');

  state.currentGenreFilter = pill.dataset.genre;
  renderPlaylist();
});

resetFilterBtn.addEventListener('click', () => {
  state.searchQuery = '';
  playlistSearchInput.value = '';
  state.currentGenreFilter = 'all';
  genrePillGroup.querySelectorAll('.genre-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.genre === 'all');
  });
  renderPlaylist();
});

// ==========================================================================
// 10. Playback Speed & Sleep Timer
// ==========================================================================
// Playback Speed
speedBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  speedMenu.classList.toggle('show');
  timerMenu.classList.remove('show');
});

speedMenu.addEventListener('click', (e) => {
  const opt = e.target.closest('.speed-opt');
  if (!opt) return;

  speedMenu.querySelectorAll('.speed-opt').forEach(o => o.classList.remove('active'));
  opt.classList.add('active');

  const speed = parseFloat(opt.dataset.speed);
  state.playbackSpeed = speed;
  audio.playbackRate = speed;
  speedBadge.textContent = `${speed}x`;
  speedMenu.classList.remove('show');
  showToast(`Speed set to ${speed}x`, 'fa-gauge-high');
});

// Sleep Timer
sleepTimerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  timerMenu.classList.toggle('show');
  speedMenu.classList.remove('show');
});

timerMenu.addEventListener('click', (e) => {
  const opt = e.target.closest('.timer-opt');
  if (!opt) return;

  timerMenu.querySelectorAll('.timer-opt').forEach(o => o.classList.remove('active'));
  opt.classList.add('active');

  const minutes = parseInt(opt.dataset.minutes, 10);
  setSleepTimer(minutes);
  timerMenu.classList.remove('show');
});

function setSleepTimer(minutes) {
  if (state.sleepTimerTimeout) clearTimeout(state.sleepTimerTimeout);
  if (state.sleepTimerInterval) clearInterval(state.sleepTimerInterval);

  if (minutes === 0) {
    timerBadge.textContent = 'Timer';
    showToast('Sleep timer cancelled', 'fa-clock');
    return;
  }

  state.sleepTimerRemaining = minutes * 60;
  timerBadge.textContent = `${minutes}m`;
  showToast(`Sleep timer set for ${minutes} minutes`, 'fa-clock');

  state.sleepTimerInterval = setInterval(() => {
    state.sleepTimerRemaining--;
    const mins = Math.ceil(state.sleepTimerRemaining / 60);
    timerBadge.textContent = `${mins}m`;

    if (state.sleepTimerRemaining <= 0) {
      clearInterval(state.sleepTimerInterval);
    }
  }, 1000);

  state.sleepTimerTimeout = setTimeout(() => {
    pauseTrack();
    timerBadge.textContent = 'Timer';
    showToast('Sleep timer expired. Playback stopped.', 'fa-moon');
  }, minutes * 60 * 1000);
}

// Close Dropdowns on outside click
document.addEventListener('click', () => {
  timerMenu.classList.remove('show');
  speedMenu.classList.remove('show');
});

// Mobile Playlist Toggle
playlistToggleBtn.addEventListener('click', () => {
  const isShown = playlistSidebar.style.display === 'flex';
  playlistSidebar.style.display = isShown ? 'none' : 'flex';
  playlistSidebar.scrollIntoView({ behavior: 'smooth' });
});

// ==========================================================================
// 11. Dynamic Canvas Audio Visualizer
// ==========================================================================
function resizeCanvas() {
  if (visualizerCanvas && visualizerCanvas.parentElement) {
    const rect = visualizerCanvas.parentElement.getBoundingClientRect();
    visualizerCanvas.width = Math.max(100, Math.floor(rect.width - 12));
    visualizerCanvas.height = 48;
  }
}

function setupCanvasVisualizer() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function draw() {
    animationFrameId = requestAnimationFrame(draw);

    const width = visualizerCanvas.width;
    const height = visualizerCanvas.height;
    canvasCtx.clearRect(0, 0, width, height);

    const barCount = width < 340 ? 24 : 36;
    const barWidth = (width / barCount) - 3;

    if (state.isPlaying) {
      for (let i = 0; i < barCount; i++) {
        // Generate active aesthetic waveform
        const t = Date.now() / 200;
        const wave = Math.sin(t + i * 0.3) * 0.4 + Math.cos(t * 1.5 + i * 0.2) * 0.3 + 0.3;
        const barHeight = Math.max(6, Math.min(height - 8, wave * height));

        const x = i * (barWidth + 3);
        const y = (height - barHeight) / 2;

        const gradient = canvasCtx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#4F46E5');
        gradient.addColorStop(1, '#2563EB');

        canvasCtx.fillStyle = gradient;
        canvasCtx.beginPath();
        canvasCtx.roundRect(x, y, barWidth, barHeight, 3);
        canvasCtx.fill();
      }
    } else {
      // Idle Flat Visualizer state
      for (let i = 0; i < barCount; i++) {
        const barHeight = 4;
        const x = i * (barWidth + 3);
        const y = (height - barHeight) / 2;

        canvasCtx.fillStyle = '#CBD5E1';
        canvasCtx.beginPath();
        canvasCtx.roundRect(x, y, barWidth, barHeight, 2);
        canvasCtx.fill();
      }
    }
  }

  draw();
}

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }
  }
}

// ==========================================================================
// 12. Keyboard Shortcuts Listener
// ==========================================================================
function setupEventListeners() {
  playPauseBtn.addEventListener('click', togglePlayPause);
  nextBtn.addEventListener('click', nextTrack);
  prevBtn.addEventListener('click', prevTrack);
  shuffleBtn.addEventListener('click', toggleShuffle);
  repeatBtn.addEventListener('click', toggleRepeat);

  window.addEventListener('keydown', (e) => {
    // Ignore keystrokes when typing inside search inputs
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0);
        showToast('+5s Forward', 'fa-forward');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        audio.currentTime = Math.max(audio.currentTime - 5, 0);
        showToast('-5s Backward', 'fa-backward');
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(Math.min(state.volume + 0.05, 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(Math.max(state.volume - 0.05, 0));
        break;
      case 'KeyM':
        muteBtn.click();
        break;
      case 'KeyN':
        nextTrack();
        break;
      case 'KeyP':
        prevTrack();
        break;
      case 'KeyS':
        toggleShuffle();
        break;
      case 'KeyR':
        toggleRepeat();
        break;
      case 'KeyL':
        likeBtn.click();
        break;
    }
  });
}

// ==========================================================================
// 13. Toast Notification Helper
// ==========================================================================
function showToast(message, icon = 'fa-circle-info', customClass = '') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${customClass}`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Start player on DOM loaded
document.addEventListener('DOMContentLoaded', initPlayer);
