/**
 * ==============================================================================
 * E-LINTAS - SIMULATION MODULE (simulation.js)
 * ==============================================================================
 * Logika Simulasi Berkendara Jalur Uji SIM C berbasis HTML5 Canvas 2D & Vanilla JS.
 * Fitur Utama:
 * 1. Sudut pandang kamera dinamis (Chase / Follow Camera) yang mengikuti dan
 *    berputar menyesuaikan arah pergerakan motor (arah maju selalu ke atas).
 * 2. Deteksi batas keluar jalur: garis pembatas warna biru & rumput diuji secara
 *    presisi dari data piksel track.png.
 * 3. Sistem Poin Uji Praktik SIM C (Maksimal 100 poin, batas kelulusan 75 poin).
 *    - Pengurangan poin jika menyentuh garis biru / keluar jalur (-10 Poin).
 *    - Pengurangan poin jika menerobos lampu merah (-10 Poin).
 *    - Peringatan kecepatan rendah jika di bawah 30 km/jam terlalu lama.
 * 4. Peringatan real-time dan dialog modal mengulang saat poin di bawah 75.
 * ==============================================================================
 */

(function (window) {
  'use strict';

  /* ----------------------------------------------------------------------------
   * 1. KONFIGURASI SIMULASI (SIMULATION CONFIG)
   * ----------------------------------------------------------------------------
   */
  const CONFIG = {
    // Koordinat internal dunia (resolusi asli peta track.png)
    worldWidth: 971,
    worldHeight: 768,
    finishLine: { minX: 760, maxX: 816, y: 230 },
    wrongFinishLine: { minX: 680, maxX: 740, y: 230 },
    firstBrakeLine: {
      minY: 88,
      maxY: 132,
      stopBoxMinX: 348,
      stopBoxMaxX: 384,
      stopLineX: 410
    },

    // Posisi dan sudut awal motor (tengah area hijau START pada track.png)
    initialX: 45,
    initialY: 112,
    initialAngle: 0, // 0 radian = menghadap ke kanan (Timur) pada peta asli

    // Koreksi orientasi aset motor (motorcycle.png aslinya menghadap ke ATAS / Utara)
    assetRotationOffset: Math.PI / 2,

    // Dimensi gambar motor di kanvas dunia
    motorWidth: 54,
    motorHeight: 54 * (768 / 971),

    // Konfigurasi Sudut Pandang Kamera Dinamis (Chase Camera)
    cameraZoom: 2.8,          // Skala perbesaran kamera agar lintasan terlihat detail
    cameraAheadOffset: 0.72,  // Posisi motor di 72% dari atas layar (memberi pandangan luas ke depan)

    // Fisika Kendaraan
    maxForwardSpeed: 175,     // Kecepatan maju maksimum
    maxReverseSpeed: 55,      // Kecepatan mundur maksimum
    acceleration: 130,        // Tingkat akselerasi gas
    brakeDecel: 240,          // Daya cengkeram rem
    naturalFriction: 52,      // Perlambatan alami jalan
    turnSpeed: 2.5,           // Kelincahan putaran kemudi (rad/dtk)
    speedDisplayRatio: 0.22,  // Rasio konversi kecepatan ke km/jam

    // Aturan Ujian Praktik SIM C
    maxExamPoints: 100,       // Poin keberhasilan maksimal
    minimumPassPoints: 75,    // Batas minimum kelulusan
    minimumSpeedKmH: 30,      // Kecepatan minimum yang disarankan
    lowSpeedWarningDelaySec: 5,
    offTrackPenalty: 10,      // Poin berkurang saat menyentuh garis biru
    redLightPenalty: 10,
    penaltyCooldownSec: 1.5,  // Jeda waktu antar pengurangan poin agar adil

    // Lokasi file aset gambar
    assets: {
      track: 'assets/images/track.png',
      motorcycle: 'assets/images/motorcycle.png'
    }
  };

  /* ----------------------------------------------------------------------------
   * 2. STATE KENDARAAN, SISTEM POIN, & GAME LOOP
   * ----------------------------------------------------------------------------
   */
  const vehicle = {
    x: CONFIG.initialX,
    y: CONFIG.initialY,
    angle: CONFIG.initialAngle,
    speed: 0,
    status: 'stopped' // 'stopped', 'moving', 'braking', 'reversing'
  };

  const inputState = {
    gas: false,
    brake: false,
    left: false,
    right: false
  };

  let engineAudioContext = null;
  let engineOscillator = null;
  let engineHarmonicOscillator = null;
  let engineSubOscillator = null;
  let engineFilter = null;
  let engineGain = null;
  let engineCompressor = null;
  let engineAudioUnavailable = false;

  // State Ujian Praktik
  let examPoints = CONFIG.maxExamPoints;
  let penaltyCooldownTimer = 0;
  let canReverseOffTrack = false;
  let hasFailedExam = false;
  let hasShownOffTrackWarning = false;
  let isExamFinished = false;
  let firstSignalPhase = 'red';
  let firstSignalStopTimer = 0;
  let firstSignalViolationRecorded = false;
  let hasStartedDriving = false;
  let lowSpeedDuration = 0;
  let lowSpeedWarningShown = false;
  let toastTimeoutId = null;

  // State loop & lifecycle
  let isRunning = false;
  let isPaused = false;
  let animationFrameId = null;
  let lastTimestamp = 0;

  // DOM Elements cache
  let canvas = null;
  let ctx = null;
  let hudSpeedVal = null;
  let hudSpeedContainer = null;
  let hudPointsVal = null;
  let hudPointsUnit = null;
  let hudStatusBadge = null;
  let playPauseBtn = null;
  let playStateText = null;
  let playStateIcon = null;
  let warningToast = null;
  let warningToastText = null;
  let failedModal = null;
  let failedScoreValue = null;
  let failedDialog = null;
  let failedTitle = null;
  let failedDescription = null;
  let failedIcon = null;
  let btnRetakeExam = null;
  let assetErrorOverlay = null;
  let assetErrorMsg = null;

  // Image objects & Offscreen collision buffer
  const trackImage = new Image();
  const motorcycleImage = new Image();
  let isTrackLoaded = false;
  let isMotorLoaded = false;
  let trackPixelData = null;
  let groundPattern = null;

  /* ----------------------------------------------------------------------------
   * 3. INISIALISASI DAN PEMUATAN ASET
   * ----------------------------------------------------------------------------
   */
  function initSimulation() {
    canvas = document.getElementById('simCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');

    // Cache DOM Elements
    hudSpeedVal = document.getElementById('hud-speed-value');
    hudSpeedContainer = document.querySelector('.hud-speed');
    hudPointsVal = document.getElementById('hud-points-value');
    hudPointsUnit = document.querySelector('.hud-points .hud-unit');
    hudStatusBadge = document.getElementById('hud-status-badge');
    playPauseBtn = document.getElementById('btn-sim-play-pause');
    playStateText = document.getElementById('text-play-state');
    playStateIcon = document.getElementById('icon-play-state');
    warningToast = document.getElementById('sim-warning-toast');
    warningToastText = document.getElementById('sim-warning-text');
    failedModal = document.getElementById('sim-failed-modal');
    failedScoreValue = document.getElementById('failed-score-value');
    failedDialog = failedModal?.querySelector('.failed-dialog');
    failedTitle = document.getElementById('exam-result-title');
    failedDescription = document.getElementById('exam-result-description');
    failedIcon = document.getElementById('exam-result-icon');
    btnRetakeExam = document.getElementById('btn-retake-exam');
    assetErrorOverlay = document.getElementById('sim-asset-error');
    assetErrorMsg = document.getElementById('sim-error-message');

    // Pasang Event Listeners
    setupKeyboardListeners();
    setupTouchListeners();
    setupControlButtons();

    // Resize canvas ke resolusi display yang optimal
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Muat aset gambar
    loadAssets();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.max(300, Math.round(rect.width * dpr));
    const targetH = Math.max(300, Math.round(rect.height * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
  }

  function loadAssets() {
    let loadedCount = 0;
    const totalAssets = 2;

    if (assetErrorOverlay) {
      assetErrorOverlay.classList.add('hidden');
    }

    function handleLoadSuccess() {
      loadedCount++;
      if (loadedCount === totalAssets) {
        prepareCollisionData();
        renderStaticScene();
      }
    }

    function handleLoadError(assetName, path) {
      if (assetErrorOverlay && assetErrorMsg) {
        assetErrorMsg.innerHTML = `Gagal memuat aset gambar <strong>${assetName}</strong> (${path}).<br>Pastikan file tersedia pada folder <code>assets/images/</code>.`;
        assetErrorOverlay.classList.remove('hidden');
      }
    }

    trackImage.onload = () => {
      isTrackLoaded = true;
      const grassTile = document.createElement('canvas');
      grassTile.width = 48;
      grassTile.height = 32;
      const grassCtx = grassTile.getContext('2d');
      grassCtx.drawImage(trackImage, 0, 0, grassTile.width, grassTile.height, 0, 0, grassTile.width, grassTile.height);
      groundPattern = ctx.createPattern(grassTile, 'repeat');
      handleLoadSuccess();
    };
    trackImage.onerror = () => handleLoadError('Jalur Uji (track.png)', CONFIG.assets.track);
    trackImage.src = CONFIG.assets.track;

    motorcycleImage.onload = () => {
      isMotorLoaded = true;
      handleLoadSuccess();
    };
    motorcycleImage.onerror = () => handleLoadError('Motor (motorcycle.png)', CONFIG.assets.motorcycle);
    motorcycleImage.src = CONFIG.assets.motorcycle;
  }

  function initializeEngineAudio() {
    if (!engineAudioContext) {
      if (!window.AudioContext) {
        if (!engineAudioUnavailable) {
          console.warn('Efek suara motor tidak tersedia karena browser tidak mendukung Web Audio API.');
          engineAudioUnavailable = true;
        }
        return;
      }

      engineAudioContext = new window.AudioContext();
      engineOscillator = engineAudioContext.createOscillator();
      engineHarmonicOscillator = engineAudioContext.createOscillator();
      engineSubOscillator = engineAudioContext.createOscillator();
      const oscillatorGain = engineAudioContext.createGain();
      const harmonicGain = engineAudioContext.createGain();
      const subGain = engineAudioContext.createGain();
      engineFilter = engineAudioContext.createBiquadFilter();
      engineGain = engineAudioContext.createGain();
      engineCompressor = engineAudioContext.createDynamicsCompressor();

      engineOscillator.type = 'triangle';
      engineHarmonicOscillator.type = 'sine';
      engineSubOscillator.type = 'sine';
      oscillatorGain.gain.value = 0.55;
      harmonicGain.gain.value = 0.18;
      subGain.gain.value = 0.35;
      engineFilter.type = 'lowpass';
      engineFilter.frequency.value = 400;
      engineFilter.Q.value = 0.7;
      engineGain.gain.value = 0;
      engineCompressor.threshold.value = -12;
      engineCompressor.knee.value = 12;
      engineCompressor.ratio.value = 4;
      engineCompressor.attack.value = 0.003;
      engineCompressor.release.value = 0.2;

      engineOscillator.connect(oscillatorGain);
      engineHarmonicOscillator.connect(harmonicGain);
      engineSubOscillator.connect(subGain);
      oscillatorGain.connect(engineFilter);
      harmonicGain.connect(engineFilter);
      subGain.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(engineCompressor);
      engineCompressor.connect(engineAudioContext.destination);
      engineOscillator.start();
      engineHarmonicOscillator.start();
      engineSubOscillator.start();
    }

    if (engineAudioContext.state === 'suspended') {
      engineAudioContext.resume().catch((error) => {
        console.error('Gagal mengaktifkan efek suara motor:', error);
      });
    }
  }

  function updateEngineAudio() {
    if (!engineAudioContext || !engineOscillator || !engineHarmonicOscillator || !engineSubOscillator || !engineFilter || !engineGain) return;

    const now = engineAudioContext.currentTime;
    const speed = Math.abs(vehicle.speed);
    const isMoving = isRunning && !isPaused && !isExamFinished && speed > 1;
    const speedRatio = Math.min(speed / CONFIG.maxForwardSpeed, 1);
    const throttleAmount = inputState.gas && isMoving ? 12 : 0;
    const engineFrequency = 60 + speedRatio * 50 + throttleAmount;

    engineOscillator.frequency.setTargetAtTime(engineFrequency, now, 0.08);
    engineHarmonicOscillator.frequency.setTargetAtTime(engineFrequency * 2, now, 0.16);
    engineSubOscillator.frequency.setTargetAtTime(engineFrequency * 0.5, now, 0.16);
    engineFilter.frequency.setTargetAtTime(650 + speedRatio * 650 + (throttleAmount ? 120 : 0), now, 0.16);
    engineGain.gain.setTargetAtTime(isMoving ? 0.42 + speedRatio * 0.22 : 0, now, 0.16);
  }

  /**
   * Mengambil data piksel mentah dari track.png untuk deteksi garis biru & keluar jalur
   */
  function prepareCollisionData() {
    try {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = CONFIG.worldWidth;
      offCanvas.height = CONFIG.worldHeight;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      offCtx.drawImage(trackImage, 0, 0, CONFIG.worldWidth, CONFIG.worldHeight);
      trackPixelData = offCtx.getImageData(0, 0, CONFIG.worldWidth, CONFIG.worldHeight).data;
    } catch (e) {
      console.warn('Tidak dapat membaca pixel data peta untuk deteksi batas jalur:', e);
    }
  }

  /* ----------------------------------------------------------------------------
   * 4. SISTEM KENDALI INPUT (KEYBOARD & TOUCHSCREEN)
   * ----------------------------------------------------------------------------
   */
  function setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      const simSection = document.getElementById('view-simulation');
      if (!simSection || !simSection.classList.contains('active')) return;
      const guidelinesOverlay = document.getElementById('sim-guidelines-overlay');
      if (guidelinesOverlay && !guidelinesOverlay.classList.contains('hidden')) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          inputState.gas = true;
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          inputState.brake = true;
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          inputState.left = true;
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          inputState.right = true;
          e.preventDefault();
          break;
        case ' ':
          togglePause();
          e.preventDefault();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          inputState.gas = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          inputState.brake = false;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          inputState.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          inputState.right = false;
          break;
      }
    });
  }

  function setupTouchListeners() {
    const touchMappings = [
      { id: 'touch-gas', key: 'gas' },
      { id: 'touch-brake', key: 'brake' },
      { id: 'touch-left', key: 'left' },
      { id: 'touch-right', key: 'right' }
    ];

    touchMappings.forEach(({ id, key }) => {
      const btn = document.getElementById(id);
      if (!btn) return;

      const activate = (e) => {
        e.preventDefault();
        inputState[key] = true;
        btn.classList.add('touch-pressed');
        try {
          btn.setPointerCapture(e.pointerId);
        } catch (_) {}
      };

      const deactivate = (e) => {
        inputState[key] = false;
        btn.classList.remove('touch-pressed');
        try {
          btn.releasePointerCapture(e.pointerId);
        } catch (_) {}
      };

      btn.addEventListener('pointerdown', activate);
      btn.addEventListener('pointerup', deactivate);
      btn.addEventListener('pointercancel', deactivate);
      btn.addEventListener('pointerleave', deactivate);
    });
  }

  function setupControlButtons() {
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', togglePause);
    }

    const resetBtn = document.getElementById('btn-sim-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetSimulation);
    }

    if (btnRetakeExam) {
      btnRetakeExam.addEventListener('click', () => {
        if (failedModal) failedModal.classList.add('hidden');
        resetSimulation();
        startSimulation();
      });
    }

    const reloadAssetsBtn = document.getElementById('btn-reload-assets');
    if (reloadAssetsBtn) {
      reloadAssetsBtn.addEventListener('click', loadAssets);
    }
  }

  /* ----------------------------------------------------------------------------
   * 5. DETEKSI BATAS KELUAR JALUR (GARIS WARNA BIRU & RUMPUT)
   * ----------------------------------------------------------------------------
   */
  function getMotorcycleTrackState() {
    if (!trackPixelData) return 'on-track';

    // Titik-titik kontak fisik motor (roda depan, roda belakang, dan sisi ban)
    const cosA = Math.cos(vehicle.angle);
    const sinA = Math.sin(vehicle.angle);
    const cosPerp = Math.cos(vehicle.angle + Math.PI / 2);
    const sinPerp = Math.sin(vehicle.angle + Math.PI / 2);

    const checkPoints = [
      { x: vehicle.x + cosA * 20, y: vehicle.y + sinA * 20 },     // Ban Depan
      { x: vehicle.x - cosA * 18, y: vehicle.y - sinA * 18 },     // Ban Belakang
      { x: vehicle.x + cosPerp * 9, y: vehicle.y + sinPerp * 9 }, // Sisi Kiri Kemudi
      { x: vehicle.x - cosPerp * 9, y: vehicle.y - sinPerp * 9 }  // Sisi Kanan Kemudi
    ];
    let touchesBoundary = false;
    let touchesGrass = false;

    for (let i = 0; i < checkPoints.length; i++) {
      const pt = checkPoints[i];

      // Jika menyentuh batas luar peta
      if (pt.x < 0 || pt.x >= CONFIG.worldWidth || pt.y < 0 || pt.y >= CONFIG.worldHeight) {
        return 'grass';
      }

      const px = Math.floor(pt.x);
      const py = Math.floor(pt.y);
      const idx = (py * CONFIG.worldWidth + px) * 4;
      const alpha = trackPixelData[idx + 3];
      if (alpha < 128) {
        touchesGrass = true;
        continue;
      }

      const r = trackPixelData[idx];
      const g = trackPixelData[idx + 1];
      const b = trackPixelData[idx + 2];

      // Karakteristik warna garis batas biru pada track.png:
      // Kanal Biru sangat dominan dibanding Merah dan Hijau (B > 120, B > R + 35, B > G + 25)
      const isBlueLine = (b > 120 && b > (r + 35) && b > (g + 25)) || (r < 40 && g < 100 && b > 140);

      // Piksel tepi anti-alias pada area START/FINISH juga termasuk jalur aman.
      const isSafeGreenLane = g >= 220 && g - r >= 20 && g - b >= 20;

      // Karakteristik rumput hijau di luar garis pembatas
      const isGrass = !isSafeGreenLane && g > 80 && g > (r + 15) && g > (b + 15);

      if (isGrass) {
        touchesGrass = true;
        continue;
      }
      if (isBlueLine) {
        touchesBoundary = true;
      }
    }

    if (touchesGrass) return 'grass';
    return touchesBoundary ? 'boundary' : 'on-track';
  }

  /* ----------------------------------------------------------------------------
   * 6. SISTEM PENGURANGAN POIN & PERINGATAN UJIAN
   * ----------------------------------------------------------------------------
   */
  function deductPoints(amount, message) {
    if (isExamFinished) return;

    examPoints -= amount;
    if (examPoints < 0) examPoints = 0;

    showWarningToast(message);
    updateHUD();

  }

  function showWarningToast(message) {
    if (!warningToast || !warningToastText) return;

    warningToastText.textContent = message;
    warningToast.classList.toggle('slow-warning', message.includes('Anda Terlalu Pelan'));
    warningToast.classList.remove('hidden');

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    toastTimeoutId = setTimeout(() => {
      if (warningToast) warningToast.classList.add('hidden');
    }, 2200);
  }

  function finishExam(wrongRoute = false) {
    if (isExamFinished) return;

    isExamFinished = true;
    vehicle.speed = 0;
    vehicle.status = 'stopped';
    const passed = !wrongRoute && !hasFailedExam && examPoints >= CONFIG.minimumPassPoints;

    if (failedScoreValue) {
      failedScoreValue.textContent = examPoints.toString();
    }

    if (failedDialog) {
      failedDialog.classList.toggle('exam-passed', passed);
    }
    if (failedTitle) {
      failedTitle.textContent = passed ? 'Ujian Praktik Lulus!' : 'Ujian Praktik Gagal';
    }
    if (failedDescription) {
      failedDescription.textContent = hasFailedExam
        ? 'Anda keluar jalur saat ujian. Status gagal tetap berlaku meskipun kembali ke jalur dan mencapai garis finis. Coba lagi untuk mengulang ujian.'
        : wrongRoute
          ? 'Anda mencapai garis finis pada jalur merah. Perhatikan tanda lampu lalu lintas hijau dan pilih jalur tersebut untuk menyelesaikan ujian.'
        : passed
          ? 'Selamat! Anda menyelesaikan jalur dengan nilai yang memenuhi batas minimum kelulusan.'
          : `Poin Anda berada di bawah batas minimum kelulusan (${CONFIG.minimumPassPoints} poin). Coba lagi untuk melatih pengendalian laju dan ketepatan jalur uji SIM C.`;
    }
    if (failedIcon) {
      failedIcon.setAttribute('stroke', passed ? '#16A34A' : '#DC2626');
      failedIcon.innerHTML = passed
        ? '<path d="m5 12 4 4L19 6"></path>'
        : '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
    }

    if (failedModal) {
      failedModal.classList.remove('hidden');
    }

    stopSimulation();
  }

  /* ----------------------------------------------------------------------------
   * 7. FISIKA KENDARAAN (DELTA TIME)
   * ----------------------------------------------------------------------------
   */
  function updatePhysics(dt) {
    if (dt > 0.1) dt = 0.1;

    // Kurangi timer jeda penalti
    if (penaltyCooldownTimer > 0) {
      penaltyCooldownTimer -= dt;
    }
    // 1. Akselerasi dan Rem
    if (inputState.gas) {
      if (vehicle.speed < 0) {
        vehicle.speed += CONFIG.brakeDecel * dt;
        if (vehicle.speed > 0) vehicle.speed = 0;
        vehicle.status = vehicle.speed < -1 ? 'braking' : 'stopped';
      } else {
        vehicle.speed += CONFIG.acceleration * dt;
        if (vehicle.speed > CONFIG.maxForwardSpeed) {
          vehicle.speed = CONFIG.maxForwardSpeed;
        }
        vehicle.status = 'moving';
      }
    } else if (inputState.brake) {
      if (vehicle.speed > 0) {
        vehicle.speed -= CONFIG.brakeDecel * dt;
        if (vehicle.speed < 0) vehicle.speed = 0;
        vehicle.status = vehicle.speed > 1 ? 'braking' : 'stopped';
      } else if (canReverseOffTrack) {
        vehicle.speed -= CONFIG.acceleration * dt;
        if (vehicle.speed < -CONFIG.maxReverseSpeed) {
          vehicle.speed = -CONFIG.maxReverseSpeed;
        }
        vehicle.status = vehicle.speed < -1 ? 'reversing' : 'stopped';
      } else {
        vehicle.speed = 0;
        vehicle.status = 'stopped';
      }
    } else {
      // Coasting Friction
      if (vehicle.speed > 0) {
        vehicle.speed -= CONFIG.naturalFriction * dt;
        if (vehicle.speed < 0) vehicle.speed = 0;
        vehicle.status = vehicle.speed > 1 ? 'moving' : 'stopped';
      } else if (vehicle.speed < 0) {
        vehicle.speed += CONFIG.naturalFriction * dt;
        if (vehicle.speed > 0) vehicle.speed = 0;
        vehicle.status = vehicle.speed < -1 ? 'reversing' : 'stopped';
      } else {
        vehicle.status = 'stopped';
      }
    }

    // 2. Putaran Kemudi (Steering)
    if (Math.abs(vehicle.speed) > 2) {
      const speedFactor = Math.min(Math.abs(vehicle.speed) / 70, 1.0);
      const turnAmount = CONFIG.turnSpeed * speedFactor * dt;

      if (inputState.left) {
        vehicle.angle -= turnAmount;
      }
      if (inputState.right) {
        vehicle.angle += turnAmount;
      }
    }

    // Normalisasi sudut [-PI, PI]
    while (vehicle.angle > Math.PI) vehicle.angle -= Math.PI * 2;
    while (vehicle.angle < -Math.PI) vehicle.angle += Math.PI * 2;

    // 3. Pergerakan Posisi Sesuai Sudut Hadap Motor
    const vx = Math.cos(vehicle.angle) * vehicle.speed;
    const vy = Math.sin(vehicle.angle) * vehicle.speed;

    const previousX = vehicle.x;
    const previousY = vehicle.y;
    vehicle.x += vx * dt;
    vehicle.y += vy * dt;

    // 4. Batasan Tepi Kanvas Dunia
    const margin = 20;
    if (vehicle.x < margin) vehicle.x = margin;
    if (vehicle.x > CONFIG.worldWidth - margin) vehicle.x = CONFIG.worldWidth - margin;
    if (vehicle.y < margin) vehicle.y = margin;
    if (vehicle.y > CONFIG.worldHeight - margin) vehicle.y = CONFIG.worldHeight - margin;

    let trackState = getMotorcycleTrackState();
    const candidateX = vehicle.x;
    const candidateY = vehicle.y;
    const travelDistance = Math.hypot(candidateX - previousX, candidateY - previousY);
    const sweepSteps = Math.ceil(travelDistance);
    let touchedBoundary = trackState === 'boundary';
    let grassCollision = false;
    let lastSafeX = previousX;
    let lastSafeY = previousY;
    for (let step = 1; !grassCollision && step < sweepSteps; step++) {
      const sampleRatio = step / sweepSteps;
      vehicle.x = previousX + ((candidateX - previousX) * sampleRatio);
      vehicle.y = previousY + ((candidateY - previousY) * sampleRatio);
      const intermediateState = getMotorcycleTrackState();
      if (intermediateState === 'boundary') {
        touchedBoundary = true;
        lastSafeX = vehicle.x;
        lastSafeY = vehicle.y;
      } else if (intermediateState === 'grass') {
        grassCollision = true;
      } else {
        lastSafeX = vehicle.x;
        lastSafeY = vehicle.y;
      }
    }
    if (trackState === 'grass') {
      grassCollision = true;
    }
    vehicle.x = candidateX;
    vehicle.y = candidateY;

    const isOffTrack = touchedBoundary || trackState === 'boundary' || grassCollision;
    if (isOffTrack) {
      canReverseOffTrack = true;
      hasFailedExam = true;
    }

    // 5. Evaluasi Pelanggaran Ujian Praktik SIM C
    if (Math.abs(vehicle.speed) > 3 && isOffTrack) {
      if ((touchedBoundary || trackState === 'boundary') && penaltyCooldownTimer <= 0) {
        deductPoints(CONFIG.offTrackPenalty, `Melanggar Garis Batas Jalur! (-${CONFIG.offTrackPenalty} Poin)`);
        penaltyCooldownTimer = CONFIG.penaltyCooldownSec;
      }
    }
    if (isOffTrack && !hasShownOffTrackWarning) {
      showWarningToast('Keluar jalur dan gagal! Tahan rem untuk mundur ke jalur.');
      hasShownOffTrackWarning = true;
    }

    if (grassCollision) {
      vehicle.x = lastSafeX;
      vehicle.y = lastSafeY;
      vehicle.speed = 0;
      vehicle.status = 'stopped';
    } else if (trackState === 'on-track' && !grassCollision) {
      canReverseOffTrack = false;
      if (vehicle.speed < 0) {
        vehicle.speed = 0;
        vehicle.status = 'stopped';
      }
      hasShownOffTrackWarning = false;
    }

    if (firstSignalPhase === 'red') {
      const crossedStopLine = vehicle.speed > 3
        && Math.cos(vehicle.angle) > 0.7
        && previousX + 20 < CONFIG.firstBrakeLine.stopLineX
        && vehicle.x + 20 >= CONFIG.firstBrakeLine.stopLineX
        && vehicle.y >= CONFIG.firstBrakeLine.minY
        && vehicle.y <= CONFIG.firstBrakeLine.maxY;
      if (crossedStopLine && !firstSignalViolationRecorded) {
        firstSignalViolationRecorded = true;
        deductPoints(CONFIG.redLightPenalty, `Menerobos lampu merah! (-${CONFIG.redLightPenalty} Poin)`);
      }

      const stoppedInFirstStopBox = Math.abs(vehicle.speed) < 0.5
        && vehicle.status === 'stopped'
        && vehicle.x >= CONFIG.firstBrakeLine.stopBoxMinX
        && vehicle.x <= CONFIG.firstBrakeLine.stopBoxMaxX
        && vehicle.y >= CONFIG.firstBrakeLine.minY
        && vehicle.y <= CONFIG.firstBrakeLine.maxY;

      firstSignalStopTimer = stoppedInFirstStopBox
        ? firstSignalStopTimer + dt
        : 0;

      if (firstSignalStopTimer >= 2) {
        firstSignalPhase = 'green';
      }
    }

    const currentSpeedKmH = Math.round(Math.abs(vehicle.speed) * CONFIG.speedDisplayRatio);
    if (Math.abs(vehicle.speed) > 1) {
      hasStartedDriving = true;
    }

    const isRequiredSignalStop = firstSignalPhase === 'red'
      && vehicle.x >= CONFIG.firstBrakeLine.stopBoxMinX
      && vehicle.x <= CONFIG.firstBrakeLine.stopBoxMaxX
      && vehicle.y >= CONFIG.firstBrakeLine.minY
      && vehicle.y <= CONFIG.firstBrakeLine.maxY
      && Math.abs(vehicle.speed) < 0.5;
    const isTurning = inputState.left || inputState.right;
    if (isTurning) {
      lowSpeedDuration = 0;
      lowSpeedWarningShown = false;
      if (warningToastText?.textContent.includes('Anda Terlalu Pelan')) {
        warningToast?.classList.add('hidden');
        warningToast?.classList.remove('slow-warning');
        if (toastTimeoutId) {
          clearTimeout(toastTimeoutId);
          toastTimeoutId = null;
        }
      }
    } else if (!hasStartedDriving || isRequiredSignalStop || currentSpeedKmH >= CONFIG.minimumSpeedKmH) {
      lowSpeedDuration = 0;
      lowSpeedWarningShown = false;
    } else {
      lowSpeedDuration += dt;
      if (lowSpeedDuration >= CONFIG.lowSpeedWarningDelaySec && !lowSpeedWarningShown) {
        showWarningToast('Anda Terlalu Pelan');
        lowSpeedWarningShown = true;
      }
    }

    const crossedFinishLine = vehicle.speed > 0
      && vy < 0
      && previousY > CONFIG.finishLine.y
      && vehicle.y <= CONFIG.finishLine.y
      && vehicle.x >= CONFIG.finishLine.minX
      && vehicle.x <= CONFIG.finishLine.maxX;
    if (crossedFinishLine) {
      finishExam();
      return;
    }

    const crossedWrongFinishLine = vehicle.speed > 0
      && vy < 0
      && previousY > CONFIG.wrongFinishLine.y
      && vehicle.y <= CONFIG.wrongFinishLine.y
      && vehicle.x >= CONFIG.wrongFinishLine.minX
      && vehicle.x <= CONFIG.wrongFinishLine.maxX;
    if (crossedWrongFinishLine) {
      finishExam(true);
    }

    updateEngineAudio();
  }

  /* ----------------------------------------------------------------------------
   * 8. RENDERING CANVAS (CHASE / FOLLOW CAMERA PERSPECTIVE)
   * ----------------------------------------------------------------------------
   * Sudut pandang kamera dinamis:
   * - Mengikuti posisi motor secara terus-menerus.
   * - Memutar dunia sehingga arah hadap motor SELALU menghadap lurus ke ATAS layar.
   * - Memberikan pengalaman simulasi mengemudi yang imersif dan intuitif.
   */
  function renderScene() {
    if (!ctx) return;

    resizeCanvas();

    const viewW = canvas.width;
    const viewH = canvas.height;

    ctx.clearRect(0, 0, viewW, viewH);

    ctx.save();

    // 1. Pindahkan titik fokus kamera ke motor (posisi 72% dari atas layar)
    ctx.translate(viewW / 2, viewH * CONFIG.cameraAheadOffset);

    // 2. Putar dunia permainan agar arah hadap motor selalu menghadap ke ATAS layar (-PI/2)
    ctx.rotate(-vehicle.angle - Math.PI / 2);

    // 3. Zoom perbesaran kamera agar jalur dan rambu terlihat jelas proporsional
    const dpr = window.devicePixelRatio || 1;
    const responsiveZoom = (viewW / (240 * dpr)) * (CONFIG.cameraZoom / 2.8);
    ctx.scale(responsiveZoom, responsiveZoom);

    // 4. Geser koordinat dunia relatif terhadap posisi motor
    ctx.translate(-vehicle.x, -vehicle.y);

    // 5. Isi area transparan di sekitar peta dengan tekstur rumput.
    ctx.fillStyle = groundPattern || '#2b7d20';
    ctx.fillRect(-CONFIG.worldWidth, -CONFIG.worldHeight, CONFIG.worldWidth * 3, CONFIG.worldHeight * 3);

    // 6. Gambar peta jalur uji praktik SIM C (track.png)
    if (isTrackLoaded && trackImage.complete && trackImage.naturalWidth !== 0) {
      ctx.drawImage(trackImage, 0, 0, CONFIG.worldWidth, CONFIG.worldHeight);
    } else {
      ctx.fillStyle = '#2b7d20';
      ctx.fillRect(0, 0, CONFIG.worldWidth, CONFIG.worldHeight);
    }

    drawFirstTrafficLight();
    drawFinishTrafficLight();

    // 7. Gambar karakter motor (motorcycle.png)
    if (isMotorLoaded && motorcycleImage.complete && motorcycleImage.naturalWidth !== 0) {
      ctx.save();
      ctx.translate(vehicle.x, vehicle.y);
      // Di dunia permainan, motor diputar sesuai vehicle.angle + assetRotationOffset
      // Berkat rotasi kamera di atas, di layar motor selalu menghadap tegak ke atas
      ctx.rotate(vehicle.angle + CONFIG.assetRotationOffset);

      ctx.drawImage(
        motorcycleImage,
        -CONFIG.motorWidth / 2,
        -CONFIG.motorHeight / 2,
        CONFIG.motorWidth,
        CONFIG.motorHeight
      );

      ctx.restore();
    }

    ctx.restore();
  }

  function drawFirstTrafficLight() {
    ctx.save();
    ctx.translate(422, 60);
    ctx.rotate(Math.PI / 2);

    ctx.fillStyle = '#004FB5';
    ctx.fillRect(-12, -22, 24, 44);

    ctx.fillStyle = '#6B7280';
    ctx.fillRect(-2, 22, 4, 6);

    ctx.fillStyle = '#111827';
    ctx.fillRect(-12, -22, 24, 44);

    const lights = [
      { y: -14, color: '#ef4444', inactive: '#592626', active: firstSignalPhase === 'red' },
      { y: 0, color: '#facc15', inactive: '#574b1f', active: false },
      { y: 14, color: '#22c55e', inactive: '#1c4d32', active: firstSignalPhase === 'green' }
    ];

    lights.forEach(({ y, color, inactive, active }) => {
      ctx.beginPath();
      ctx.arc(0, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = active ? color : inactive;
      ctx.fill();
      if (active) {
        ctx.beginPath();
        ctx.arc(0, y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}66`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    ctx.restore();
  }

  function drawFinishTrafficLight() {
    ctx.save();
    ctx.translate(747, 260);
    ctx.fillStyle = '#111827';
    ctx.fillRect(-19, -10, 38, 20);

    const lights = [
      { x: -11, color: '#ef4444' },
      { x: 11, color: '#22c55e' }
    ];

    lights.forEach(({ x, color }) => {
      ctx.beginPath();
      ctx.arc(x, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, 0, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}66`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.restore();
  }

  function renderStaticScene() {
    renderScene();
    updateHUD();
  }

  /* ----------------------------------------------------------------------------
   * 9. PEMBARUAN TAMPILAN HUD (HEADS-UP DISPLAY)
   * ----------------------------------------------------------------------------
   */
  function updateHUD() {
    const currentSpeedKmH = Math.round(Math.abs(vehicle.speed) * CONFIG.speedDisplayRatio);

    // 1. Kecepatan & Peringatan Melebihi 30 km/jam
    if (hudSpeedVal) {
      hudSpeedVal.textContent = currentSpeedKmH.toString();
    }

    if (hudSpeedContainer) {
      hudSpeedContainer.classList.toggle('speed-too-slow', lowSpeedWarningShown);
    }

    // 2. Poin Uji Praktik (100 -> 75 threshold)
    if (hudPointsVal) {
      hudPointsVal.textContent = hasFailedExam ? 'Gagal' : examPoints.toString();
      hudPointsVal.className = 'hud-value hud-points-val';

      if (hasFailedExam || examPoints < CONFIG.minimumPassPoints) {
        hudPointsVal.classList.add('danger');
      } else if (examPoints >= 85) {
        // Hijau: Aman
      } else if (examPoints >= CONFIG.minimumPassPoints) {
        hudPointsVal.classList.add('warn'); // Kuning: Peringatan
      }
    }
    if (hudPointsUnit) {
      hudPointsUnit.textContent = hasFailedExam ? '' : '/ 100';
    }

    // 3. Status Kendaraan
    if (hudStatusBadge) {
      hudStatusBadge.className = 'hud-status-badge';
      if (vehicle.status === 'moving') {
        hudStatusBadge.classList.add('status-moving');
        hudStatusBadge.textContent = 'Bergerak';
      } else if (vehicle.status === 'reversing') {
        hudStatusBadge.classList.add('status-reversing');
        hudStatusBadge.textContent = 'Mundur';
      } else if (vehicle.status === 'braking') {
        hudStatusBadge.classList.add('status-braking');
        hudStatusBadge.textContent = 'Mengerem';
      } else {
        hudStatusBadge.classList.add('status-stopped');
        hudStatusBadge.textContent = 'Berhenti';
      }
    }
  }

  /* ----------------------------------------------------------------------------
   * 10. SIKLUS HIDUP SIMULASI (GAME LOOP)
   * ----------------------------------------------------------------------------
   */
  function gameLoop(timestamp) {
    if (!isRunning) return;

    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (!isPaused && !isExamFinished) {
      updatePhysics(dt);
      if (!isRunning) {
        renderScene();
        updateHUD();
        return;
      }
      renderScene();
      updateHUD();
    }

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function startSimulation() {
    if (isRunning) return;
    initializeEngineAudio();
    isRunning = true;
    isPaused = false;
    isExamFinished = false;
    lastTimestamp = 0;
    updatePlayPauseButtonUI();
    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function stopSimulation() {
    isRunning = false;
    isPaused = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    clearAllInputs();
    updateEngineAudio();
  }

  function togglePause() {
    if (isExamFinished) {
      resetSimulation();
      startSimulation();
      return;
    }

    if (!isRunning) {
      startSimulation();
      return;
    }

    isPaused = !isPaused;
    updateEngineAudio();
    updatePlayPauseButtonUI();
  }

  function updatePlayPauseButtonUI() {
    if (!playPauseBtn || !playStateText || !playStateIcon) return;

    if (isPaused) {
      playStateText.textContent = 'Lanjutkan';
      playStateIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      playPauseBtn.className = 'btn btn-primary';
    } else {
      playStateText.textContent = 'Jeda';
      playStateIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      playPauseBtn.className = 'btn btn-secondary';
    }
  }

  function resetSimulation() {
    vehicle.x = CONFIG.initialX;
    vehicle.y = CONFIG.initialY;
    vehicle.angle = CONFIG.initialAngle;
    vehicle.speed = 0;
    vehicle.status = 'stopped';
    examPoints = CONFIG.maxExamPoints;
    penaltyCooldownTimer = 0;
    canReverseOffTrack = false;
    hasFailedExam = false;
    hasShownOffTrackWarning = false;
    isExamFinished = false;
    firstSignalPhase = 'red';
    firstSignalStopTimer = 0;
    firstSignalViolationRecorded = false;
    hasStartedDriving = false;
    lowSpeedDuration = 0;
    lowSpeedWarningShown = false;

    if (failedModal) {
      failedModal.classList.add('hidden');
    }

    if (warningToast) {
      warningToast.classList.add('hidden');
    }

    clearAllInputs();
    updateEngineAudio();
    updatePlayPauseButtonUI();
    renderStaticScene();
  }

  function clearAllInputs() {
    inputState.gas = false;
    inputState.brake = false;
    inputState.left = false;
    inputState.right = false;

    document.querySelectorAll('.touch-btn').forEach(btn => {
      btn.classList.remove('touch-pressed');
    });
  }

  /* ----------------------------------------------------------------------------
   * 11. PUBLIC API SIMULATION
   * ----------------------------------------------------------------------------
   */
  window.ELintasSimulation = {
    init: initSimulation,
    start: startSimulation,
    stop: stopSimulation,
    pause: () => { isPaused = true; updateEngineAudio(); updatePlayPauseButtonUI(); },
    resume: () => { isPaused = false; initializeEngineAudio(); updateEngineAudio(); updatePlayPauseButtonUI(); },
    reset: resetSimulation,
    getConfig: () => CONFIG,
    getVehicleState: () => vehicle,
    getExamPoints: () => examPoints
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulation);
  } else {
    initSimulation();
  }

})(window);
