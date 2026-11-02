import { lazy, Suspense, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

const Core3D = lazy(() => import('./Core3D'));

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.6em', '0.02em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(16px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const [toast, setToast] = useState<string | null>(null);

  // "Let's Build" opens a pre-written Gmail draft to Aditya in a new tab — works without a desktop mail app.
  const subject = "Let's build something together";
  const body = `Hi Aditya,\n\nI came across your portfolio and would love to connect about:\n\n- \n\nBest,\n`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // "Email" copies the address (and still offers the mail app via mailto).
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast(`Copied ${profile.email}`);
    } catch {
      setToast(profile.email);
    }
    window.setTimeout(() => setToast(null), 2600);
  };

  const ctas: { label: string; href: string; primary?: boolean; cursor: string; onClick?: () => void; external?: boolean }[] = [
    { label: "Let's Build", href: gmail, primary: true, cursor: 'play', external: true },
    { label: 'LinkedIn', href: profile.links.linkedin, cursor: 'link', external: true },
    { label: 'GitHub', href: profile.links.github, cursor: 'link', external: true },
    { label: 'Email', href: `mailto:${profile.email}`, cursor: 'link', onClick: copyEmail },
  ];

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(109,74,255,0.18),transparent_70%)]" />
      <Particles count={36} />
      <Suspense fallback={null}>
        <Core3D align="center" className="opacity-60" />
      </Suspense>

      <motion.p
        className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Next Episode
      </motion.p>
      <motion.h2
        className="relative font-display leading-[0.85] text-bone"
        style={{ fontSize: 'clamp(3.4rem, 13vw, 12rem)', letterSpacing: spacing, filter: blur, opacity }}
      >
        TO BE CONTINUED…
      </motion.h2>

      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <p className="font-sans text-2xl font-semibold tracking-[0.2em] text-bone sm:text-3xl">{profile.displayName.toUpperCase()}</p>
        <p className="mt-2 text-xs font-semibold tracking-[0.4em] text-mist sm:text-sm">{profile.role.toUpperCase()}</p>
      </motion.div>

      <motion.div
        className="relative mt-10 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.35 }}
      >
        {ctas.map((c) => (
          <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}>
            <Magnetic>
              <a
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                onClick={c.onClick}
                title={c.label === 'Email' ? `${profile.email} — click to copy` : undefined}
                data-cursor={c.cursor}
                className={`flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold tracking-[0.12em] transition ${
                  c.primary ? 'bg-crimson text-white shadow-[0_0_50px_rgba(109,74,255,0.5)] hover:bg-crimson-2' : 'border border-white/25 text-bone hover:border-bone hover:bg-white/10'
                }`}
              >
                {c.primary && <span>▶</span>}
                {c.label.toUpperCase()}
                {!c.primary && <span className="text-mist">↗</span>}
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>

      <p className="relative mt-6 text-xs text-smoke">
        or write directly to{' '}
        <button type="button" onClick={copyEmail} className="font-semibold text-mist underline decoration-white/20 underline-offset-4 hover:text-bone">
          {profile.email}
        </button>
      </p>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] -translate-x-1/2 rounded-xl px-5 py-3 text-sm text-bone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-16 flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-[0.24em] text-smoke">
        <button type="button" onClick={() => scrollTo(0, { offset: 0 })} className="hover:text-bone">
          ↺ WATCH AGAIN
        </button>
        <button type="button" onClick={onReplay} className="hover:text-bone">
          ▶ REPLAY OPENING
        </button>
      </div>

      <footer className="absolute inset-x-0 bottom-0 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <div className="mb-2 text-base">
          <SeriesMark />
        </div>
        <p className="text-[11px] leading-relaxed text-smoke">
          © {new Date().getFullYear()} {profile.displayName}. A personal, streaming-inspired portfolio — not affiliated with any streaming service.
        </p>
      </footer>
    </section>
  );
}
