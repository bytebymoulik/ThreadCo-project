/**
 * ThreadCo Halloween Animation Engine & Spooky Sound Synthesizer
 * High-Definition Halloween Audio Effects (Web Audio API), Particle Canvas, Bats & Spider Physics
 */

class HalloweenFX {
  constructor() {
    this.canvas = document.getElementById('halloween-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.bats = [];
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    this.audioCtx = null;
    this.masterGain = null;
    this.isAudioMuted = false; // Audio enabled by default!
    this.volume = 0.7;
    this.droneOsc = null;
    this.droneOsc2 = null;
    this.droneGain = null;
    this.audioUnlocked = false;

    this.initCanvas();
    this.initCursor();
    this.initBats();
    this.initEventListeners();
    this.initSpider();
    this.initAudioAutoUnlock();
    this.animate();
  }

  /* ============================================================
     AUDIO AUTO-UNLOCK & WEB AUDIO API ENGINE
     ============================================================ */
  initAudioAutoUnlock() {
    // Unlock AudioContext on first user interaction (click, touch, or key)
    const unlockHandler = () => {
      this.ensureAudioContext();
      if (this.audioCtx && this.audioCtx.state === 'running') {
        this.audioUnlocked = true;
        // Start subtle ambient drone
        if (!this.isAudioMuted) {
          this.startAmbientDrone();
        }
        window.removeEventListener('click', unlockHandler);
        window.removeEventListener('keydown', unlockHandler);
        window.removeEventListener('touchstart', unlockHandler);
      }
    };

    window.addEventListener('click', unlockHandler, { once: false });
    window.addEventListener('keydown', unlockHandler, { once: false });
    window.addEventListener('touchstart', unlockHandler, { once: false });
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.isAudioMuted ? 0 : this.volume, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, parseFloat(val)));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.isAudioMuted ? 0 : this.volume, this.audioCtx.currentTime);
    }
  }

  toggleAudio() {
    this.ensureAudioContext();
    this.isAudioMuted = !this.isAudioMuted;

    const btn = document.getElementById('sound-toggle');
    const label = document.getElementById('sound-toggle-label');
    const floatBtn = document.getElementById('soundboard-toggle-btn');

    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.isAudioMuted ? 0 : this.volume, this.audioCtx.currentTime);
    }

    if (!this.isAudioMuted) {
      this.startAmbientDrone();
      if (btn) btn.classList.add('audio-active');
      if (label) label.textContent = 'Spook Audio: ON';
      if (floatBtn) floatBtn.classList.add('active');
      this.playSpookySound('hover');
    } else {
      this.stopAmbientDrone();
      if (btn) btn.classList.remove('audio-active');
      if (label) label.textContent = 'Spook Audio: OFF';
      if (floatBtn) floatBtn.classList.remove('active');
    }
  }

  startAmbientDrone() {
    if (!this.audioCtx || this.droneOsc || this.isAudioMuted) return;

    try {
      this.droneOsc = this.audioCtx.createOscillator();
      this.droneOsc2 = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      this.droneGain = this.audioCtx.createGain();

      this.droneOsc.type = 'sawtooth';
      this.droneOsc.frequency.setValueAtTime(55, this.audioCtx.currentTime); // Low A1 note

      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(82.4, this.audioCtx.currentTime); // Eerie fifth interval

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.audioCtx.currentTime);

      this.droneGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.025, this.audioCtx.currentTime + 3);

      this.droneOsc.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain || this.audioCtx.destination);

      this.droneOsc.start();
      this.droneOsc2.start();
    } catch (e) {
      console.warn("Ambient drone failed:", e);
    }
  }

  stopAmbientDrone() {
    if (this.droneGain && this.audioCtx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
        setTimeout(() => {
          if (this.droneOsc) {
            try {
              this.droneOsc.stop();
              this.droneOsc.disconnect();
              if (this.droneOsc2) {
                this.droneOsc2.stop();
                this.droneOsc2.disconnect();
              }
            } catch(e) {}
            this.droneOsc = null;
            this.droneOsc2 = null;
          }
        }, 850);
      } catch (e) {}
    }
  }

  /**
   * Comprehensive Halloween Sound Effects Synthesizer
   */
  playSpookySound(type = 'hover') {
    if (this.isAudioMuted) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const dest = this.masterGain || ctx.destination;
    const now = ctx.currentTime;

    switch (type) {
      // 1. Subtle card hover chime
      case 'hover': {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1040, now);
        osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.22);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(dest);

        osc.start(now);
        osc2.start(now);
        osc.stop(now + 0.35);
        osc2.stop(now + 0.35);
        break;
      }

      // 2. Size pill selection (sharp supernatural blade click)
      case 'select-size': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(980, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.14);
        break;
      }

      // 3. Color swatch selection (cauldron bubble)
      case 'select-color':
      case 'bubble': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.2);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      // 4. Add to Coven Cart (ascending triumph + bubbling cauldron boil)
      case 'add-to-cart': {
        const freqs = [330, 440, 554, 660, 880];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + i * 0.06;

          osc.type = i % 2 === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(f, t);
          gain.gain.setValueAtTime(0.07, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

          osc.connect(gain);
          gain.connect(dest);
          osc.start(t);
          osc.stop(t + 0.3);
        });
        break;
      }

      // 5. Bat flutter / screech
      case 'bat': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.18);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }

      // 6. Spider jump / creak
      case 'spider':
      case 'creak': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.15);
        osc.frequency.linearRampToValueAtTime(360, now + 0.3);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }

      // 7. Ghost whisper / ethereal wind
      case 'whisper': {
        const bufferSize = ctx.sampleRate * 0.6;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufferSize);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(700, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.6);
        filter.Q.setValueAtTime(5.0, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(now);
        break;
      }

      // 8. Raven caw (formant double croak)
      case 'raven': {
        [0, 0.22].forEach(delay => {
          const t = now + delay;
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(680, t);
          osc.frequency.exponentialRampToValueAtTime(380, t + 0.18);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1050, t);
          filter.Q.setValueAtTime(4.0, t);

          gain.gain.setValueAtTime(0.08, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(dest);
          osc.start(t);
          osc.stop(t + 0.2);
        });
        break;
      }

      // 9. Lightning strike & rolling thunder
      case 'lightning':
      case 'thunder': {
        // Crack
        const crackBufferSize = ctx.sampleRate * 0.15;
        const crackBuffer = ctx.createBuffer(1, crackBufferSize, ctx.sampleRate);
        const crackData = crackBuffer.getChannelData(0);
        for (let i = 0; i < crackBufferSize; i++) {
          crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (crackBufferSize * 0.1));
        }
        const crackSource = ctx.createBufferSource();
        crackSource.buffer = crackBuffer;
        const crackGain = ctx.createGain();
        crackGain.gain.setValueAtTime(0.18, now);
        crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        crackSource.connect(crackGain);
        crackGain.connect(dest);
        crackSource.start(now);

        // Sub rumble
        const rumbleOsc = ctx.createOscillator();
        const rumbleFilter = ctx.createBiquadFilter();
        const rumbleGain = ctx.createGain();

        rumbleOsc.type = 'sawtooth';
        rumbleOsc.frequency.setValueAtTime(60, now);
        rumbleOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.setValueAtTime(110, now);

        rumbleGain.gain.setValueAtTime(0.14, now + 0.05);
        rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        rumbleOsc.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(dest);
        rumbleOsc.start(now + 0.05);
        rumbleOsc.stop(now + 1.4);
        break;
      }

      // 10. Witch cackle (staccato descending laughter)
      case 'cackle': {
        const notes = [659, 622, 659, 587, 523, 440, 392];
        notes.forEach((f, idx) => {
          const t = now + idx * 0.09;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, t);
          osc.frequency.linearRampToValueAtTime(f * 0.85, t + 0.08);

          gain.gain.setValueAtTime(0.06, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

          osc.connect(gain);
          gain.connect(dest);
          osc.start(t);
          osc.stop(t + 0.08);
        });
        break;
      }

      // 11. Cathedral Crypt Bell / Bronze Gong
      case 'gong':
      case 'bell': {
        const partials = [196, 392, 587, 830, 1174];
        partials.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);

          const initialGain = 0.09 / (i + 1);
          gain.gain.setValueAtTime(initialGain, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

          osc.connect(gain);
          gain.connect(dest);
          osc.start(now);
          osc.stop(now + 2.5);
        });
        break;
      }

      // 12. Modal Open (ancient book / grimoire opening chime)
      case 'modal-open': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.25);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }

      // 13. Modal Close / Banish (spectral vanishing woosh)
      case 'modal-close':
      case 'banish': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      default:
        break;
    }
  }

  /* ============================================================
     CANVAS PARTICLES & AMBIENT BATS
     ============================================================ */
  initCanvas() {
    if (!this.canvas) return;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    const particleCount = window.innerWidth < 768 ? 40 : 85;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    const isEmber = Math.random() > 0.45;
    return {
      x: Math.random() * (this.canvas ? this.canvas.width : window.innerWidth),
      y: Math.random() * (this.canvas ? this.canvas.height : window.innerHeight),
      size: isEmber ? Math.random() * 2.8 + 1 : Math.random() * 24 + 12,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: isEmber ? -(Math.random() * 0.9 + 0.3) : -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.6 + 0.2,
      maxOpacity: isEmber ? 0.85 : 0.25,
      type: isEmber ? 'ember' : 'fog',
      hue: isEmber ? (Math.random() > 0.6 ? 28 : (Math.random() > 0.5 ? 140 : 275)) : 270,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.03 + 0.01
    };
  }

  initCursor() {
    const cursor = document.getElementById('spooky-cursor');
    const cursorDot = document.getElementById('spooky-cursor-dot');
    if (!cursor) return;

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }
    });

    const interactiveSelectors = 'a, button, .clothing-card, .size-pill, .color-swatch, .ouija-planchette, input, select';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.add('cursor-expanded');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.remove('cursor-expanded');
      }
    });
  }

  initBats() {
    const batCount = window.innerWidth < 768 ? 3 : 6;
    for (let i = 0; i < batCount; i++) {
      this.bats.push(this.createBat());
    }
  }

  createBat() {
    const fromLeft = Math.random() > 0.5;
    return {
      x: fromLeft ? -60 : window.innerWidth + 60,
      y: Math.random() * (window.innerHeight * 0.6) + 40,
      vx: (fromLeft ? 1 : -1) * (Math.random() * 2.5 + 2),
      vy: (Math.random() - 0.5) * 1.5,
      wingCycle: Math.random() * Math.PI * 2,
      wingSpeed: Math.random() * 0.25 + 0.2,
      size: Math.random() * 12 + 16,
      color: Math.random() > 0.4 ? 'rgba(20, 15, 30, 0.85)' : 'rgba(255, 115, 0, 0.75)'
    };
  }

  spawnBatBurst(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5);
      const speed = Math.random() * 4 + 3;
      this.bats.push({
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        wingCycle: Math.random() * Math.PI,
        wingSpeed: 0.35,
        size: Math.random() * 10 + 14,
        color: '#ff7700',
        temporary: true,
        life: 120
      });
    }
    this.playSpookySound('bat');
  }

  initSpider() {
    const spider = document.getElementById('hanging-spider');
    if (!spider) return;

    let isJumping = false;
    spider.addEventListener('click', () => {
      if (isJumping) return;
      isJumping = true;
      spider.classList.add('spider-jump');
      this.playSpookySound('spider');
      this.spawnBatBurst(window.innerWidth - 180, 120, 4);
      setTimeout(() => {
        spider.classList.remove('spider-jump');
        isJumping = false;
      }, 1600);
    });
  }

  initEventListeners() {
    // Sound toggle in navbar
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => this.toggleAudio());
    }

    // Card 3D tilt & mouse glow tracking
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.clothing-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        } else if (card.style.transform) {
          card.style.transform = '';
        }
      });
    });

    // Sound effect trigger buttons on the floating soundboard
    document.querySelectorAll('[data-sound-fx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const soundType = e.currentTarget.getAttribute('data-sound-fx');
        this.playSpookySound(soundType);
      });
    });
  }

  // Animation Loop
  animate() {
    requestAnimationFrame(() => this.animate());

    const cursor = document.getElementById('spooky-cursor');
    if (cursor && this.mouse.targetX !== -1000) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.15;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.15;
      cursor.style.left = `${this.mouse.x}px`;
      cursor.style.top = `${this.mouse.y}px`;
    }

    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      const currentOpacity = (Math.sin(p.pulse) * 0.5 + 0.5) * p.maxOpacity;

      if (p.type === 'ember') {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${currentOpacity})`;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = `hsl(${p.hue}, 100%, 55%)`;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      } else {
        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 60%, 40%, ${currentOpacity * 0.6})`);
        grad.addColorStop(1, 'transparent');
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = grad;
        this.ctx.fill();
      }

      if (p.y < -30) {
        p.y = this.canvas.height + 20;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -30) p.x = this.canvas.width + 20;
      if (p.x > this.canvas.width + 30) p.x = -20;
    }

    // Bats
    for (let i = this.bats.length - 1; i >= 0; i--) {
      const b = this.bats[i];
      b.x += b.vx;
      b.y += b.vy + Math.sin(b.wingCycle * 2) * 0.8;
      b.wingCycle += b.wingSpeed;

      this.drawBat(b);

      if (b.temporary) {
        b.life--;
        if (b.life <= 0) {
          this.bats.splice(i, 1);
          continue;
        }
      } else {
        if (b.vx > 0 && b.x > window.innerWidth + 80) {
          b.x = -80;
          b.y = Math.random() * (window.innerHeight * 0.6) + 30;
        } else if (b.vx < 0 && b.x < -80) {
          b.x = window.innerWidth + 80;
          b.y = Math.random() * (window.innerHeight * 0.6) + 30;
        }
      }
    }
  }

  drawBat(b) {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.translate(b.x, b.y);
    if (b.vx < 0) this.ctx.scale(-1, 1);

    const wingFlap = Math.sin(b.wingCycle) * 0.45;
    const s = b.size;

    this.ctx.fillStyle = b.color;
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = '#ff6200';

    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, s * 0.35, s * 0.6, 0, 0, Math.PI * 2);
    this.ctx.moveTo(-s * 0.2, -s * 0.5);
    this.ctx.lineTo(-s * 0.35, -s * 0.9);
    this.ctx.lineTo(-s * 0.05, -s * 0.55);
    this.ctx.moveTo(s * 0.2, -s * 0.5);
    this.ctx.lineTo(s * 0.35, -s * 0.9);
    this.ctx.lineTo(s * 0.05, -s * 0.55);

    // Left Wing
    this.ctx.moveTo(-s * 0.2, -s * 0.2);
    this.ctx.quadraticCurveTo(-s * 1.2, -s * (1.2 + wingFlap), -s * 1.8, -s * (0.2 + wingFlap));
    this.ctx.quadraticCurveTo(-s * 1.3, s * 0.2, -s * 0.9, s * (0.4 + wingFlap * 0.5));
    this.ctx.quadraticCurveTo(-s * 0.5, s * 0.1, -s * 0.2, s * 0.3);

    // Right Wing
    this.ctx.moveTo(s * 0.2, -s * 0.2);
    this.ctx.quadraticCurveTo(s * 1.2, -s * (1.2 + wingFlap), s * 1.8, -s * (0.2 + wingFlap));
    this.ctx.quadraticCurveTo(s * 1.3, s * 0.2, s * 0.9, s * (0.4 + wingFlap * 0.5));
    this.ctx.quadraticCurveTo(s * 0.5, s * 0.1, s * 0.2, s * 0.3);

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
}

window.halloweenFX = null;
window.addEventListener('DOMContentLoaded', () => {
  window.halloweenFX = new HalloweenFX();
});
