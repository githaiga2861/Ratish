/* Illustrated vessels in the museum-photo treatment. Every liquid fill uses
   the Muratina spec: pale, hazy, milky-tea, translucent — never dark. */

export function LiquidDefs({ idPrefix = "lq" }) {
  return (
    <defs>
      <linearGradient id={`${idPrefix}-fill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F0DFC4" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#E2C39E" stopOpacity="0.72" />
        <stop offset="1" stopColor="#D3AE87" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-haze`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FDFBF4" stopOpacity="0" />
        <stop offset="0.5" stopColor="#FDFBF4" stopOpacity="0.35" />
        <stop offset="1" stopColor="#FDFBF4" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-wood`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4A3826" />
        <stop offset="0.5" stopColor="#6B5236" />
        <stop offset="1" stopColor="#3A2C1E" />
      </linearGradient>
    </defs>
  );
}

/* Carved wooden cup, liquid visible at the rim — the hero object. */
export function CarvedCup({ className = "" }) {
  return (
    <svg viewBox="0 0 320 380" className={className} role="img" aria-label="Carved wooden cup of pale Muratina">
      <LiquidDefs idPrefix="hero" />
      <ellipse cx="160" cy="352" rx="120" ry="16" fill="#131110" opacity="0.18" />
      {/* cup body */}
      <path
        d="M62 96c0 10 44 22 98 22s98-12 98-22l-16 196c-2 26-38 44-82 44s-80-18-82-44L62 96Z"
        fill="url(#hero-wood)"
      />
      {/* carved bands */}
      <path d="M74 150c26 10 146 10 172 0M80 208c24 9 136 9 160 0" stroke="#2A1F14" strokeWidth="3" fill="none" opacity="0.6" />
      <g stroke="#C6A85C" strokeWidth="1.6" opacity="0.75" fill="none">
        <path d="M96 172l10-12 10 12-10 12z M126 172l10-12 10 12-10 12z M156 172l10-12 10 12-10 12z M186 172l10-12 10 12-10 12z M216 172l10-12 10 12-10 12z" />
      </g>
      {/* rim */}
      <ellipse cx="160" cy="96" rx="98" ry="24" fill="#2A1F14" />
      {/* liquid surface — pale milky tea, hazy */}
      <ellipse cx="160" cy="98" rx="88" ry="19" fill="url(#hero-fill)" />
      <ellipse cx="160" cy="98" rx="88" ry="19" fill="url(#hero-haze)" />
      <ellipse cx="136" cy="94" rx="30" ry="7" fill="#FDFBF4" opacity="0.4" />
      {/* light passing through spilled sheen on wood */}
      <path d="M92 120c10 60 14 130 20 190" stroke="#F0DFC4" strokeWidth="4" opacity="0.14" strokeLinecap="round" />
    </svg>
  );
}

/* Simple bottle / jerrican family for the gallery cards.
   fillLevel: 0..1 */
export function GalleryVessel({ variant = "bottle", className = "" }) {
  const id = `gv-${variant}`;
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true">
      <LiquidDefs idPrefix={id} />
      <ellipse cx="100" cy="224" rx="66" ry="8" fill="#131110" opacity="0.12" />
      {variant === "bottle" && (
        <g>
          <path d="M88 24h24v26c14 10 24 26 24 48v98a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V98c0-22 10-38 24-48V24Z" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2" />
          <path d="M67 120h66v76a13 13 0 0 1-13 13H80a13 13 0 0 1-13-13v-76Z" transform="translate(16 0)" fill={`url(#${id}-fill)`} />
          <rect x="86" y="18" width="28" height="12" rx="3" fill="#3A2C1E" />
          <rect x="72" y="128" width="56" height="40" rx="4" fill="#F7F2E7" stroke="#C6A85C" strokeWidth="1.4" />
        </g>
      )}
      {variant === "flask" && (
        <g>
          <path d="M90 22h20v30c22 12 34 32 34 58 0 44-28 78-44 78s-44-34-44-78c0-26 12-46 34-58V22Z" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2" />
          <path d="M60 118c2 38 26 66 40 66s38-28 40-66c-12-10-56-10-80 0Z" fill={`url(#${id}-fill)`} />
          <rect x="87" y="16" width="26" height="10" rx="3" fill="#3A2C1E" />
        </g>
      )}
      {variant === "jerry" && (
        <g>
          <path d="M56 60h88a12 12 0 0 1 12 12v128a12 12 0 0 1-12 12H56a12 12 0 0 1-12-12V72a12 12 0 0 1 12-12Z" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2" />
          <path d="M44 110h112v90a12 12 0 0 1-12 12H56a12 12 0 0 1-12-12v-90Z" fill={`url(#${id}-fill)`} />
          <path d="M70 60V44a8 8 0 0 1 8-8h16" stroke="#3A2C1E" strokeWidth="8" fill="none" strokeLinecap="round" />
          <rect x="118" y="40" width="26" height="20" rx="4" fill="#3A2C1E" />
          <path d="M60 132h80M60 152h80M60 172h80" stroke="#EBE0CC" strokeWidth="3" opacity="0.8" />
        </g>
      )}
      {variant === "keg" && (
        <g>
          <path d="M52 52h96a10 10 0 0 1 10 10v140a10 10 0 0 1-10 10H52a10 10 0 0 1-10-10V62a10 10 0 0 1 10-10Z" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2" />
          <path d="M42 92h116v110a10 10 0 0 1-10 10H52a10 10 0 0 1-10-10V92Z" fill={`url(#${id}-fill)`} />
          <path d="M42 84h116M42 190h116" stroke="#9A7B2F" strokeWidth="4" opacity="0.7" />
          <rect x="86" y="36" width="28" height="16" rx="4" fill="#3A2C1E" />
          <path d="M100 212v14m-10 0h20" stroke="#3A2C1E" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {/* cloudiness haze on every vessel */}
      <rect x="40" y="90" width="120" height="120" fill={`url(#${id}-haze)`} opacity="0.5" />
    </svg>
  );
}
