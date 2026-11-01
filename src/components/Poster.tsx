import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'network' && (
          <g fill="none" stroke={a}>
            {[
              [290, 70], [350, 120], [330, 200], [250, 220], [215, 140], [290, 140],
            ].map(([x, y], i, arr) => (
              <g key={i}>
                {arr.slice(i + 1).map(([x2, y2], j) => (
                  <line key={j} x1={x} y1={y} x2={x2} y2={y2} strokeWidth="1" strokeOpacity={i === 5 || j === 5 - i - 1 ? 0.7 : 0.22} />
                ))}
              </g>
            ))}
            {[[290, 70], [350, 120], [330, 200], [250, 220], [215, 140]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="8" fill={a} fillOpacity="0.35" strokeWidth="2" />
            ))}
            <circle cx="290" cy="140" r="20" fill={a} fillOpacity="0.85" stroke="none" />
            <circle cx="290" cy="140" r="34" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 6" />
          </g>
        )}
        {project.motif === 'leaf' && (
          <g fill="none" stroke={a}>
            <path d="M210 230 C210 120 280 60 370 50 C370 150 310 220 210 230 Z" strokeWidth="2.5" fill={a} fillOpacity="0.12" />
            <path d="M210 230 C260 180 310 120 360 62" strokeWidth="2" strokeOpacity="0.8" />
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${245 + i * 28} ${190 - i * 34} l${-18 + i * 2} ${-26 + i * 3}`} strokeWidth="1.5" strokeOpacity="0.5" />
            ))}
            <path d="M180 262 h200" strokeWidth="2" strokeOpacity="0.5" />
            <circle cx="350" cy="230" r="14" strokeWidth="2" strokeOpacity="0.6" />
            <path d="M350 210 v-6 M350 256 v-6 M330 230 h-6 M376 230 h-6" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
          </g>
        )}
        {project.motif === 'bridge' && (
          <g fill="none" stroke={a}>
            <path d="M180 200 Q290 70 400 200" strokeWidth="2.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const x = 192 + i * 24;
              const t = (x - 180) / 220;
              const y = 200 - 4 * 65 * t * (1 - t);
              return <line key={i} x1={x} x2={x} y1={y} y2={200} strokeWidth="1.2" strokeOpacity="0.55" />;
            })}
            <path d="M170 200 h240" strokeWidth="3" />
            <path d="M220 240 h40 v-14 h-40 z M270 240 h40 v-14 h-40 z" strokeWidth="1.6" strokeOpacity="0.7" fill={a} fillOpacity="0.15" />
            <path d="M330 248 l14 -10 l14 10" strokeWidth="2" strokeOpacity="0.6" />
          </g>
        )}
        {project.motif === 'pins' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M190 ${80 + i * 40} h200`} strokeWidth="1" strokeOpacity="0.15" />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M${210 + i * 40} 60 v190`} strokeWidth="1" strokeOpacity="0.15" />
            ))}
            <path d="M240 190 L300 110 L350 170" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.7" />
            {[[240, 190], [300, 110], [350, 170]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M0 0 C-14 -16 -14 -36 0 -36 C14 -36 14 -16 0 0 Z" fill={a} fillOpacity={i === 1 ? 0.85 : 0.3} strokeWidth="2" />
                <circle cx="0" cy="-24" r="4" fill="#06070d" stroke="none" />
              </g>
            ))}
            <circle cx="300" cy="110" r="44" strokeWidth="1.5" strokeOpacity="0.45" />
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M3 29 L12 3 L21 29 M7 19 H17" fill="none" stroke="#6d4aff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}
