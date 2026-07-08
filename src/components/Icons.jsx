/* Every icon on the site is a hand-drawn inline SVG in the brand palette.
   No icon fonts, no emoji, anywhere. */

const stroke = "currentColor";

export function TapIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 10h10v4H8l-2 4H4v-8Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 11h4l2 2v1h-6" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 10V6m-2 0h4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 17.5c0 .9-.7 1.7-1.5 2.6-.8-.9-1.5-1.7-1.5-2.6a1.5 1.5 0 0 1 3 0Z" fill={stroke} />
    </svg>
  );
}

export function CartIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 4h2.4l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.2L21 8H6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20.2" r="1.4" fill={stroke} />
      <circle cx="17.4" cy="20.2" r="1.4" fill={stroke} />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 8.4c-.3.1-.8.5-.8 1.4 0 2.4 3 5.2 5.6 5.9.9.2 1.4-.3 1.6-.7l.4-.9c.1-.3 0-.6-.3-.8l-1.5-.8a.6.6 0 0 0-.7.1l-.5.5c-.9-.4-2.1-1.5-2.5-2.4l.5-.5a.6.6 0 0 0 .1-.7l-.8-1.4c-.2-.3-.5-.4-.8-.3l-.3.1Z"
        fill={stroke}
      />
    </svg>
  );
}

export function StarIcon({ className = "w-5 h-5", filled = true }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.6l-5.1 2.6 1-5.6-4.1-4 5.7-.8L12 3.6Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowBendIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6c10 1 16 7 17 17"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3 4"
      />
      <path d="M18.5 21.5 23 23l1.5-4.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DragHandleIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3v18M12 3l-3 3m3-3 3 3M12 21l-3-3m3 3 3-3M3 12h18M3 12l3-3m-3 3 3 3M21 12l-3-3m3 3-3 3"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* Trust badge marks — engraved-medallion style */
export function BadgeRegistered({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="15.5" stroke={stroke} strokeWidth="1.4" />
      <circle cx="20" cy="20" r="12" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 3" />
      <path d="M15.5 26v-12h5.2a3.6 3.6 0 0 1 0 7.2h-3.4m3.6 0 3.6 4.8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeCertified({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 4.5l3.4 3 4.5-.4 1 4.4 4 2.2-1.9 4.1 1.9 4.1-4 2.2-1 4.4-4.5-.4-3.4 3-3.4-3-4.5.4-1-4.4-4-2.2 1.9-4.1L6.6 13.7l4-2.2 1-4.4 4.5.4 3.9-3Z"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="m14.5 20.5 3.6 3.6 7.4-8" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeFermented({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M17 6h6m-5 0v6.5c-4 2-6.5 5.5-6.5 10A8.5 8.5 0 0 0 20 31a8.5 8.5 0 0 0 8.5-8.5c0-4.5-2.5-8-6.5-10V6"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="23" r="1.2" fill={stroke} />
      <circle cx="22.5" cy="20" r="1" fill={stroke} />
      <circle cx="21" cy="26" r="1.4" fill={stroke} />
    </svg>
  );
}

export function BadgeHandcrafted({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21V11.8a1.8 1.8 0 0 1 3.6 0V19m0-8.4V9a1.8 1.8 0 0 1 3.6 0v10m0-9a1.8 1.8 0 0 1 3.6 0v9.5m0-6.7a1.8 1.8 0 0 1 3.6 0v10.8c0 5-3.4 8.8-8.2 8.8-3.9 0-6-1.7-8-5.2l-2.6-4.6a1.9 1.9 0 0 1 3.2-2l1.8 2.6"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
