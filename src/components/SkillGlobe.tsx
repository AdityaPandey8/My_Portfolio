import { useEffect, useMemo, useRef, useState } from 'react';
import { skillCategories } from '../data/portfolio';

const HUES = ['#9d8cff', '#22d3ee', '#4ade80', '#fbbf24', '#c084fc', '#fb923c', '#7dd3fc', '#f472b6'];

/**
 * Interactive 3D skill globe — every skill sits on a Fibonacci sphere.
 * Drag (or swipe) to spin it; it keeps rotating with inertia and auto-spins when idle.
 * Clicking a tag jumps to that skill's category.
 */
export default function SkillGlobe({ onPick }: { onPick?: (categoryIndex: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLButtonElement | null)[]>([]);
  const [radius, setRadius] = useState(220);

  const items = useMemo(() => {
    const flat = skillCategories.flatMap((c, ci) => c.skills.map((s) => ({ name: s.name, ci })));
    const n = flat.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return flat.map((s, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      return { ...s, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
    });
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const resize = () => setRadius(Math.max(130, Math.min(260, el.clientWidth * 0.38, el.clientHeight * 0.44)));
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rx = -0.25;
    let ry = 0;
    let vx = 0;
    let vy = reduced ? 0 : 0.0035;
    let dragging = false;
    let lx = 0;
    let ly = 0;
    let moved = 0;

    const draw = () => {
      const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      items.forEach((p, i) => {
        const node = tags.current[i];
        if (!node) return;
        // rotate around Y then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const scale = 0.5 + depth * 0.5;
        node.style.transform = `translate3d(${x1 * radius}px, ${y2 * radius}px, ${z2 * radius}px) translate(-50%, -50%) scale(${scale})`;
        node.style.opacity = String(0.18 + depth * 0.82);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : 'none';
        node.tabIndex = depth > 0.5 ? 0 : -1;
      });
    };

    let raf = 0;
    let running = false;
    const tick = () => {
      if (!dragging) {
        vx *= 0.95;
        vy = vy * 0.95 + (reduced ? 0 : 0.0035) * 0.05;
      }
      rx = Math.max(-1.2, Math.min(1.2, rx + vx));
      ry += vy;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lx = e.clientX;
      ly = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      moved += Math.abs(dx) + Math.abs(dy);
      lx = e.clientX;
      ly = e.clientY;
      vy = dx * 0.006;
      vx = -dy * 0.006;
    };
    const up = () => {
      dragging = false;
    };
    // swallow the click that ends a drag so tags don't fire
    const click = (e: MouseEvent) => {
      if (moved > 6) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('click', click, true);

    draw();
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('click', click, true);
    };
  }, [items, radius]);

  return (
    <div className="gutter mt-16">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
          <span className="h-px w-8 bg-crimson-2" /> The Skill Universe · 3D
        </p>
        <p className="text-xs text-smoke">Drag to spin · tap a skill to open its genre</p>
      </div>
      <div
        ref={wrap}
        className="relative h-[clamp(340px,62vw,560px)] cursor-grab touch-pan-y select-none overflow-hidden rounded-3xl bg-[radial-gradient(60%_60%_at_50%_50%,rgba(109,74,255,0.18),transparent_70%)] ring-1 ring-white/10 active:cursor-grabbing"
        style={{ perspective: 900 }}
        data-cursor="drag"
      >
        <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ width: radius * 2 }} />
        <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/20 blur-3xl" style={{ width: radius * 0.8 }} />
        <div className="absolute left-1/2 top-1/2" style={{ transformStyle: 'preserve-3d' }}>
          {items.map((s, i) => (
            <button
              key={s.name}
              ref={(n) => {
                tags.current[i] = n;
              }}
              type="button"
              onClick={() => onPick?.(s.ci)}
              className="absolute left-0 top-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold text-bone transition-colors hover:bg-white/15 sm:text-[13px]"
              style={{ borderColor: `${HUES[s.ci % HUES.length]}66`, background: `${HUES[s.ci % HUES.length]}18`, willChange: 'transform, opacity' }}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: HUES[s.ci % HUES.length] }} />
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
