// Simple line icons for the profile buttons (colour comes from the button).
const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const icons = {
  call: (
    <svg {...base}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  whatsapp: (
    <svg {...base}>
      <path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.4L3 21z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5z" />
    </svg>
  ),
  email: (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  instagram: (
    <svg {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </svg>
  ),
  website: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  linkedin: (
    <svg {...base}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v6M8 7.5v.01M12 17v-6m0 3c0-2 1.5-3 3-3s2 1 2 3v3" />
    </svg>
  ),
  location: (
    <svg {...base}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  share: (
    <svg {...base}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="17" cy="6" r="2.5" />
      <circle cx="17" cy="18" r="2.5" />
      <path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" />
    </svg>
  ),
  x: (
    <svg {...base}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  ),
  tiktok: (
    <svg {...base}>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.4 2 4 4.5 4.2" />
    </svg>
  ),
  facebook: (
    <svg {...base}>
      <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6.5H14V14h2.5l.5-3.5h-3V8z" />
    </svg>
  ),
  snapchat: (
    <svg {...base}>
      <path d="M12 3.5c2.5 0 4 1.8 4 4V10c.5.7 1.5.8 2.5.8-.3 1-1.2 1.2-2 1.5.5 1.3 1.6 2.2 3 2.5-.5 1-2 1-3 1.2-.4.7-1 1.5-2 1.5-.8 0-1.3-.5-2.5-.5s-1.7.5-2.5.5c-1 0-1.6-.8-2-1.5-1-.2-2.5-.2-3-1.2 1.4-.3 2.5-1.2 3-2.5-.8-.3-1.7-.5-2-1.5 1 0 2-.1 2.5-.8V7.5c0-2.2 1.5-4 4-4z" />
    </svg>
  ),
};
