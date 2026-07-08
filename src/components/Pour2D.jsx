/* CSS/SVG fallback for devices without WebGL. Same interaction, same
   pale milky-tea liquid spec, no GPU required. */

export default function Pour2D({ liters, pouring, capacity, sourceLiters, onTap }) {
  const cupFrac = Math.min(liters / capacity, 1);
  const kegFrac = Math.max((sourceLiters - liters) / sourceLiters, 0);

  const kegLiquidH = 150 * kegFrac;
  const cupLiquidH = 86 * cupFrac;

  return (
    <svg viewBox="0 0 360 460" className="w-full h-full" role="img" aria-label="Pouring Muratina from the reserve keg into your container">
      <defs>
        <linearGradient id="p2-liq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0DFC4" stopOpacity="0.92" />
          <stop offset="1" stopColor="#D3AE87" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="p2-haze" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FDFBF4" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FDFBF4" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FDFBF4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* keg */}
      <g>
        <rect x="70" y="30" width="220" height="180" rx="14" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2.5" />
        {/* keg liquid, drains as you pour */}
        <rect
          x="76"
          y={204 - kegLiquidH}
          width="208"
          height={kegLiquidH}
          rx="8"
          fill="url(#p2-liq)"
          style={{ transition: "all 200ms linear" }}
        />
        <rect x="76" y="54" width="208" height="150" fill="url(#p2-haze)" opacity="0.5" />
        <rect x="60" y="24" width="240" height="14" rx="7" fill="#3A2C1E" />
        <rect x="64" y="82" width="232" height="6" rx="3" fill="#9A7B2F" opacity="0.75" />
        <rect x="64" y="168" width="232" height="6" rx="3" fill="#9A7B2F" opacity="0.75" />
        <text x="180" y="130" textAnchor="middle" fill="#9A7B2F" fontSize="13" letterSpacing="3" fontFamily="Manrope, sans-serif">
          20L RESERVE
        </text>
      </g>

      {/* tap */}
      <g
        onClick={onTap}
        style={{ cursor: "pointer" }}
        role="button"
        aria-label={pouring ? "Close the tap" : "Open the tap"}
      >
        <rect x="196" y="206" width="16" height="26" fill="#9A7B2F" rx="3" />
        <rect
          x="188"
          y="196"
          width="32"
          height="12"
          rx="5"
          fill="#3A2C1E"
          style={{
            transformOrigin: "204px 202px",
            transform: pouring ? "rotate(-55deg)" : "rotate(0deg)",
            transition: "transform 300ms ease",
          }}
        />
        <circle cx="204" cy="240" r="22" fill="transparent" />
      </g>

      {/* stream */}
      <rect
        x="199"
        y="232"
        width="10"
        height={pouring ? 122 : 0}
        fill="url(#p2-liq)"
        opacity="0.85"
        style={{ transition: "height 220ms ease" }}
      />

      {/* receiving cup */}
      <g>
        <path d="M154 354h100l-8 74a12 12 0 0 1-12 11h-60a12 12 0 0 1-12-11l-8-74Z" fill="#FDFBF4" stroke="#D8C6A6" strokeWidth="2.5" />
        <rect
          x="160"
          y={432 - cupLiquidH}
          width="88"
          height={cupLiquidH}
          fill="url(#p2-liq)"
          style={{ transition: "all 200ms linear" }}
        />
        <rect x="160" y="360" width="88" height="72" fill="url(#p2-haze)" opacity="0.5" />
      </g>
    </svg>
  );
}
