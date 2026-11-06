import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;
root.classList.add('js');

// ── Signal background ──────────────────────────────────────
// Three.js is loaded lazily so text and layout paint first.
type Signal = { setPalette: (p: [string, string, string]) => void; setIntensity: (v: number) => void };
let signal: Signal | null = null;
const queued: { palette?: [string, string, string]; intensity?: number } = {};
const signalProxy: Signal = {
  setPalette: (p) => { signal ? signal.setPalette(p) : (queued.palette = p); },
  setIntensity: (v) => { signal ? signal.setIntensity(v) : (queued.intensity = v); },
};
const canvas = document.getElementById('gl') as HTMLCanvasElement | null;
const pagePalette = document.body.dataset.palette?.split(',') as [string, string, string] | undefined;
if (pagePalette) signalProxy.setPalette(pagePalette);
if (!fine) signalProxy.setIntensity(0.8);
if (canvas) {
  import('./signal').then(({ initSignal }) => {
    signal = initSignal(canvas, queued.palette);
    if (signal && queued.intensity !== undefined) signal.setIntensity(queued.intensity);
  });
}
const basePalette = pagePalette ?? ['#ff3b1f', '#ff8a00', '#0d0606'];

// ── Smooth scroll ──────────────────────────────────────────
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ── Split text into masked lines ───────────────────────────
function splitLines(el: HTMLElement) {
  // Wrap words, measure line breaks, regroup into masked lines.
  const text = el.innerHTML.replace(/<br[^>]*>/gi, ' \n ');
  const tokens = text.split(/\s+/).filter(Boolean);
  el.innerHTML = tokens.map((w) => (w === '\n' ? '<br data-br>' : `<span class="w" style="display:inline-block">${w}</span>`)).join(' ');
  const lines: string[][] = [];
  let lastTop: number | null = null;
  el.querySelectorAll<HTMLElement>('.w, [data-br]').forEach((node) => {
    if (node.hasAttribute('data-br')) { lastTop = null; return; }
    const top = node.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 4) { lines.push([]); lastTop = top; }
    lines[lines.length - 1].push(node.innerHTML);
  });
  el.innerHTML = lines.map((l) => `<span class="line-mask"><span class="line-inner">${l.join(' ')}</span></span>`).join('');
}

document.fonts.ready.then(() => {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    splitLines(el);
    const inners = el.querySelectorAll('.line-inner');
    if (!reduce) gsap.set(inners, { yPercent: 105 });
    el.classList.add('is-split');
    if (reduce) return;
    const immediate = el.hasAttribute('data-split-now');
    gsap.fromTo(inners, { yPercent: 105 }, {
      yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08,
      delay: immediate ? 0.45 : 0,
      scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%' },
    });
  });
  ScrollTrigger.refresh();
});

// ── Generic reveals ────────────────────────────────────────
if (!reduce) {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
  });
  gsap.utils.toArray<HTMLElement>('.rule[data-draw]').forEach((r) => {
    gsap.fromTo(r, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: r, start: 'top 92%' } });
  });
  // parallax
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(el, { yPercent: -amt * 100 }, { yPercent: amt * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement, scrub: true } });
  });
  // dim the signal as you scroll past the hero
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    ScrollTrigger.create({
      trigger: hero, start: 'top top', end: 'bottom top',
      onUpdate: (st) => signalProxy.setIntensity(fine ? 1 - st.progress * 0.65 : 0.8 - st.progress * 0.68),
    });
  }
} else {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
}

// ── Project index: hover re-tints the signal + floating preview ─
const preview = document.querySelector<HTMLElement>('.preview');
const rows = document.querySelectorAll<HTMLElement>('[data-project]');
if (rows.length) {
  let px: ((v: number) => void) | null = null, py: ((v: number) => void) | null = null;
  if (preview && fine) {
    px = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
    py = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { px!(e.clientX); py!(e.clientY); }, { passive: true });
  }
  if (fine) rows.forEach((row) => {
    const pal = row.dataset.palette!.split(',') as [string, string, string];
    row.addEventListener('pointerenter', () => {
      signalProxy.setPalette(pal);
      signalProxy.setIntensity(1);
      if (preview) {
        preview.style.setProperty('--p1', pal[0]);
        preview.style.setProperty('--p2', pal[1]);
        preview.style.setProperty('--p3', pal[2]);
        preview.querySelector('.preview__title')!.textContent = row.dataset.title ?? '';
        const img = preview.querySelector<HTMLImageElement>('img');
        const src = row.dataset.cover;
        if (img) { if (src) { img.src = src; img.hidden = false; } else img.hidden = true; }
        preview.classList.add('is-on');
      }
    });
    row.addEventListener('pointerleave', () => {
      signalProxy.setPalette(basePalette as [string, string, string]);
      preview?.classList.remove('is-on');
    });
  });
}

// ── Masonry gallery: size each item's row span to its real height ─
const gallery = document.querySelector<HTMLElement>('.gallery');
if (gallery) {
  const ROW = 4;
  const layout = () => {
    gallery.querySelectorAll<HTMLElement>('.gallery__item').forEach((it) => {
      it.style.gridRowEnd = `span ${Math.ceil(it.getBoundingClientRect().height / ROW)}`;
    });
    ScrollTrigger.refresh();
  };
  layout();
  new ResizeObserver(() => requestAnimationFrame(layout)).observe(gallery);
  document.fonts.ready.then(layout);
}

// ── Lightbox (graphic & print gallery) ─────────────────────
const lb = document.querySelector<HTMLElement>('[data-lightbox-root]');
const lbLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]'));
if (lb && lbLinks.length) {
  const img = lb.querySelector('img')!;
  const cap = lb.querySelector<HTMLElement>('.lightbox__cap')!;
  let idx = 0;
  const show = (i: number) => {
    idx = (i + lbLinks.length) % lbLinks.length;
    const a = lbLinks[idx];
    img.src = a.href; img.alt = a.dataset.caption ?? '';
    cap.textContent = `${a.dataset.caption ?? ''}  ·  ${idx + 1}/${lbLinks.length}`;
  };
  const open = (i: number) => { show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lenis?.stop(); };
  const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); lenis?.start(); };
  lbLinks.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); open(i); }));
  lb.querySelector('[data-lb-close]')!.addEventListener('click', close);
  lb.querySelector('[data-lb-prev]')!.addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
  lb.querySelector('[data-lb-next]')!.addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  window.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  // swipe on touch
  let sx = 0;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
}

// ── Mobile menu ────────────────────────────────────────────
const menuBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (menuBtn && menu) {
  const setMenu = (open: boolean) => {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.querySelector('.nav__menu-label')!.textContent = open ? 'Close' : 'Menu';
    open ? lenis?.stop() : lenis?.start();
  };
  menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}

// ── Touch: project rows activate as they cross the middle of the screen ─
if (rows.length && !fine) {
  rows.forEach((row) => {
    const pal = row.dataset.palette!.split(',') as [string, string, string];
    ScrollTrigger.create({
      trigger: row, start: 'top 55%', end: 'bottom 45%',
      onToggle: (st) => {
        row.classList.toggle('is-active', st.isActive);
        if (st.isActive) { signalProxy.setPalette(pal); signalProxy.setIntensity(0.3); }
      },
      onLeaveBack: () => signalProxy.setPalette(basePalette as [string, string, string]),
    });
  });
  const list = document.querySelector('.work__list');
  if (list) ScrollTrigger.create({ trigger: list, start: 'top 55%', end: 'bottom 45%', onToggle: (st) => { list.classList.toggle('has-active', st.isActive); if (!st.isActive) signalProxy.setIntensity(0.12); } });
}

// ── Page transitions (curtain) ─────────────────────────────
const curtain = document.querySelector<HTMLElement>('.curtain');
if (curtain && !reduce) {
  const bars = curtain.querySelectorAll('span');
  // reveal on load
  gsap.set(bars, { scaleY: 1, transformOrigin: 'top' });
  gsap.to(bars, { scaleY: 0, duration: 0.9, ease: 'expo.inOut', stagger: 0.05, delay: 0.05 });

  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href);
      if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      if (url.pathname === location.pathname) {
        if (url.hash) { e.preventDefault(); lenis ? lenis.scrollTo(url.hash) : document.querySelector(url.hash)?.scrollIntoView(); }
        return;
      }
      if (/\.(pdf|jpg|png|zip)$/i.test(url.pathname)) return;
      e.preventDefault();
      gsap.set(bars, { transformOrigin: 'bottom' });
      gsap.to(bars, { scaleY: 1, duration: 0.7, ease: 'expo.inOut', stagger: 0.05, onComplete: () => { location.href = a.href; } });
    });
  });
  // back/forward cache: make sure curtain is open
  window.addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(bars, { scaleY: 0 }); });
}
