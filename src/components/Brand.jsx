/* RATISH horn mark — a drinking horn rising from a carved base, drawn as a
   single engraved SVG. Crisp on transparent backgrounds. */
export function HornMark({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M31 6c3 6 4 12 2 18-2.2 6.8-7.6 11.4-14.6 13.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M31 6c-6.8 1.4-11.8 4.8-14.6 10-2.6 4.9-3 10.6-1.4 16.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M18 20.5c3.4-1 6.8-1 10.6.2M15.6 27.4c4.4-1.4 8.6-1.4 13.2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 40h16M15 43.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33.5 9.5c1.6-.6 3-1.6 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <HornMark className="w-9 h-9" />
      <span
        className="font-display text-2xl tracking-[0.28em] font-medium"
        style={{ fontFamily: "var(--font-display)" }}
      >
        RATISH
      </span>
    </span>
  );
}

/* Engraved gourd-style border pattern, used as a section divider.
   Alternating incised triangles and seed dots, like a carved calabash band. */
export function GourdDivider({ className = "text-gold/50" }) {
  return (
    <div className={`flex justify-center py-2 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 360 16" className="w-64 sm:w-80 h-4" fill="none">
        <path d="M0 8h130M230 8h130" stroke="currentColor" strokeWidth="1" />
        {[140, 158, 176, 194, 212].map((x, i) =>
          i % 2 === 0 ? (
            <path key={x} d={`M${x} 12 l6 -8 l6 8 Z`} stroke="currentColor" strokeWidth="1" />
          ) : (
            <circle key={x} cx={x + 6} cy="8" r="2" fill="currentColor" />
          ),
        )}
      </svg>
    </div>
  );
}
