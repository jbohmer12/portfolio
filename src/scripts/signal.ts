// ─────────────────────────────────────────────────────────────
//  SIGNAL — the generative background.
//  One fullscreen WebGL plane. A domain-warped noise field is
//  drawn as glowing contour lines (like a VJ feedback patch).
//  The visitor "plays" it: cursor speed = MID, scroll speed = LOW,
//  time noise = HIGH. Hovering a project re-tints it.
// ─────────────────────────────────────────────────────────────
import {
  WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, Mesh,
  ShaderMaterial, Vector2, Vector3, Color,
} from 'three';

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform vec3  uBands;     // low, mid, high (0..1)
  uniform float uIntensity; // global brightness
  uniform vec3  uRipple;    // x, y, age (0 = just tapped, 1 = gone)
  uniform vec3  uC1;
  uniform vec3  uC2;
  uniform vec3  uC3;

  // hash / value noise
  float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < OCTAVES; i++) { v += a * noise(p); p = r * p * 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);

    // lens: field bends around the cursor
    vec2 dm = p - m;
    float md = length(dm);
    float lens = exp(-md * md * 7.0);
    p -= dm * lens * (0.35 + uBands.y * 0.5);

    float t = uTime * 0.06;
    vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(fbm(p * 1.6 + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.6 + 3.0 * q + vec2(8.3, 2.8) - t));
    float f = fbm(p * 1.2 + (2.6 + uBands.x * 1.6) * r);

    // contour lines (topographic "signal")
    float freq = 15.0 + uBands.z * 6.0;
    float c = abs(fract(f * freq) - 0.5);
    float w = fwidth(f * freq);
    float lines = 1.0 - smoothstep(0.0, w * 1.6, c);

    // glow body
    float body = smoothstep(0.25, 0.95, f) ;
    vec3 col = uC3;
    col = mix(col, uC1 * 0.55, body * 0.55);
    col += uC2 * pow(length(q), 3.0) * 0.35;
    col += mix(uC1, uC2, r.x) * lines * (0.35 + body * 0.9 + lens * 0.8);

    // hot core near the cursor on movement
    col += uC2 * lens * uBands.y * 0.35;

    // scanlines + vignette
    col *= 0.88 + 0.12 * sin(uv.y * uRes.y * 1.4);
    // tap ripple (touch "kick")
    vec2 rp = (uRipple.xy - 0.5) * vec2(aspect, 1.0);
    float rd = length(p - rp);
    float ring = smoothstep(0.02, 0.0, abs(rd - uRipple.z * 1.1)) * (1.0 - uRipple.z);
    col += mix(uC2, vec3(1.0), 0.35) * ring * RIPPLE;

    float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(aspect * 0.8, 1.0)));
    col *= vig;

    gl_FragColor = vec4(col * uIntensity, 1.0);
  }
`;

type Palette = [string, string, string];

export function initSignal(canvas: HTMLCanvasElement, initial?: Palette) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  } catch {
    canvas.style.display = 'none';
    return null;
  }
  const coarse = matchMedia('(pointer: coarse)').matches;
  const dpr = Math.min(window.devicePixelRatio, coarse ? 1 : 1.5);
  renderer.setPixelRatio(dpr);

  const scene = new Scene();
  const cam = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uTime: { value: 0 },
    uRes: { value: new Vector2(1, 1) },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uBands: { value: new Vector3(0, 0, 0) },
    uIntensity: { value: 1 },
    uRipple: { value: new Vector3(0.5, 0.5, 1) },
    uC1: { value: new Color('#ff3b1f') },
    uC2: { value: new Color('#ff8a00') },
    uC3: { value: new Color('#0d0606') },
  };
  const mat = new ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, defines: { OCTAVES: coarse ? 4 : 5, RIPPLE: coarse ? '0.7' : '1.4' } });
  scene.add(new Mesh(new PlaneGeometry(2, 2), mat));

  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
  };
  resize();
  window.addEventListener('resize', resize);

  // ── inputs ──
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, speed: 0 };
  let lastX = 0, lastY = 0;
  if (!coarse) {
    window.addEventListener('pointermove', (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
      const d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      mouse.speed = Math.min(1, mouse.speed + d / 400);
      lastX = e.clientX; lastY = e.clientY;
    }, { passive: true });
  }

  // a "kick": ripple + bass hit on the LOW band
  let kickLow = 0;
  const kick = (clientX: number, clientY: number) => {
    uniforms.uRipple.value.set(clientX / window.innerWidth, 1 - clientY / window.innerHeight, 0);
    kickLow = coarse ? 0.6 : 1;
  };
  const isUI = (t: EventTarget | null) => !!(t as Element)?.closest?.('a, button, input, textarea');

  if (!coarse) {
    window.addEventListener('pointerdown', (e) => { if (!isUI(e.target)) kick(e.clientX, e.clientY); }, { passive: true });
  } else {
    // Touch: swipes are for scrolling, so they don't move the visual.
    // Only a real tap (short, no movement) inside the hero triggers a kick,
    // and the lens eases toward where you tapped.
    let down: { x: number; y: number; t: number; ok: boolean } | null = null;
    window.addEventListener('touchstart', (e) => {
      const t = e.touches[0]; if (!t || e.touches.length > 1) { down = null; return; }
      const hero = document.querySelector('[data-hero]');
      const inHero = !!hero && hero.getBoundingClientRect().bottom > t.clientY;
      down = { x: t.clientX, y: t.clientY, t: performance.now(), ok: inHero && !isUI(e.target) };
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (down && t && Math.hypot(t.clientX - down.x, t.clientY - down.y) > 10) down.ok = false;
    }, { passive: true });
    window.addEventListener('touchend', () => {
      if (down?.ok && performance.now() - down.t < 300) {
        kick(down.x, down.y);
        mouse.tx = down.x / window.innerWidth;
        mouse.ty = 1 - down.y / window.innerHeight;
        mouse.speed = Math.min(1, mouse.speed + 0.5);
      }
      down = null;
    }, { passive: true });
  }

  let scrollVel = 0;
  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollVel = Math.min(1, scrollVel + Math.abs(window.scrollY - lastScroll) / (coarse ? 1600 : 600));
    lastScroll = window.scrollY;
  }, { passive: true });

  // ── palette tweening ──
  const target = { c1: new Color('#ff3b1f'), c2: new Color('#ff8a00'), c3: new Color('#0d0606') };
  let targetIntensity = 1;
  let first = true;
  const setPalette = (p: Palette) => {
    target.c1.set(p[0]); target.c2.set(p[1]); target.c3.set(p[2]);
    if (first) { // snap on page load instead of fading from the default red
      uniforms.uC1.value.copy(target.c1); uniforms.uC2.value.copy(target.c2); uniforms.uC3.value.copy(target.c3);
    }
    document.documentElement.style.setProperty('--c1', p[0]);
    document.documentElement.style.setProperty('--c2', p[1]);
  };
  const setIntensity = (v: number) => { targetIntensity = v; };

  if (initial) setPalette(initial);
  first = false;

  // ── meters (HUD) ──
  const meters = Array.from(document.querySelectorAll<HTMLElement>('[data-band]'));
  const bands = { low: 0, mid: 0, high: 0 };

  let running = true;
  let raf = 0;
  const start = performance.now();
  const tick = () => {
    const t = (performance.now() - start) / 1000;
    uniforms.uTime.value = reduce ? 20 : t * (coarse ? 0.6 : 1);

    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    uniforms.uMouse.value.set(mouse.x, mouse.y);

    mouse.speed *= 0.94; scrollVel *= 0.92;
    const high = 0.35 + 0.35 * Math.sin(t * 2.1) * Math.sin(t * 0.73 + 1.3);
    kickLow *= 0.9;
    const r = uniforms.uRipple.value; if (r.z < 1) r.z = Math.min(1, r.z + 0.018);
    bands.low += (Math.max(scrollVel, kickLow) - bands.low) * 0.18;
    bands.mid += (mouse.speed - bands.mid) * 0.12;
    bands.high += (high - bands.high) * 0.08;
    uniforms.uBands.value.set(bands.low, bands.mid, bands.high);

    uniforms.uC1.value.lerp(target.c1, coarse ? 0.03 : 0.05);
    uniforms.uC2.value.lerp(target.c2, coarse ? 0.03 : 0.05);
    uniforms.uC3.value.lerp(target.c3, coarse ? 0.03 : 0.05);
    uniforms.uIntensity.value += (targetIntensity - uniforms.uIntensity.value) * 0.06;

    for (const el of meters) {
      const k = el.dataset.band as keyof typeof bands;
      const v = Math.max(0.04, Math.min(1, bands[k] * (k === 'high' ? 1.3 : 1.6) + 0.04));
      el.style.setProperty('--v', v.toFixed(3));
    }

    renderer.render(scene, cam);
    if (running && !reduce) raf = requestAnimationFrame(tick);
  };
  tick();
  if (reduce) {
    // re-render a few frames so palette changes still land
    const settle = () => { let n = 0; const s = () => { tick(); if (++n < 90) requestAnimationFrame(s); }; s(); };
    const origSet = setPalette;
    return { setPalette: (p: Palette) => { origSet(p); settle(); }, setIntensity: (v: number) => { setIntensity(v); settle(); }, kick: () => {} };
  }

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    cancelAnimationFrame(raf);
    if (running) raf = requestAnimationFrame(tick);
  });

  return { setPalette, setIntensity, kick };
}
