// Icons.jsx — Lucide-derived line icons, sized to brand hairline weight
// All strokes use currentColor so the parent's color cascades.

const PATHS = {
  // navigation
  home:       'M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2z',
  compass:    'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
  coffee:     'M17 8h1a4 4 0 1 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M6 2v3 M10 2v3 M14 2v3',
  bed:        'M2 9V20 M22 20V13a3 3 0 0 0-3-3H2 M2 13h20 M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3',
  bag:        'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6L18 2zM3 6h18 M16 10a4 4 0 0 1-8 0',
  // chrome
  menu:       'M3 6h18 M3 12h18 M3 18h18',
  back:       'M19 12H5 M12 19l-7-7 7-7',
  search:     'M21 21l-4.35-4.35 M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z',
  close:      'M18 6L6 18 M6 6l12 12',
  arrowRight: 'M5 12h14 M12 5l7 7-7 7',
  chevronRight:'M9 6l6 6-6 6',
  chevronDown:'M6 9l6 6 6-6',
  // content
  map:        'M9 2L3 5v17l6-3 6 3 6-3V2l-6 3-6-3z M9 2v17 M15 5v17',
  clock:      'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
  wifi:       'M5 13a10 10 0 0 1 14 0 M8.5 16.5a5 5 0 0 1 7 0 M2 9a16 16 0 0 1 20 0 M12 20h.01',
  car:        'M5 16h14 M5 11l1-5h12l1 5 M5 11h14v6H5z M7 17v2 M17 17v2 M7.5 14.5h.01 M16.5 14.5h.01',
  phone:      'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z',
  heart:      'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  mountain:   'M8 3l4 8 5-5 5 15H2L8 3z',
  utensils:   'M3 2v7c0 1.1.9 2 2 2h4 M7 2v20 M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7',
  wine:       'M8 22h8 M7 10h10 M12 15v7 M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5z',
  gift:       'M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
  leaf:       'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.5 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10-1.06 0-2.13-.24-3-.5 M2 21c0-3 1.85-5.36 5.08-6',
  star:       'M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.24L7 14.13l-5-4.87 6.91-1z',
  plus:       'M12 5v14 M5 12h14',
  minus:      'M5 12h14',
  check:      'M20 6L9 17l-5-5',
};

function Icon({ name, size = 20, stroke = 1.5, style = {}, color }) {
  const d = PATHS[name];
  if (!d) return null;
  // Split multi-path strings by 'M ' boundaries while keeping each path valid
  const paths = d.split(/(?=M[\s-])/).filter(Boolean);
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || 'currentColor'} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      {paths.map((p, i) => <path key={i} d={p.trim()} />)}
    </svg>
  );
}

Object.assign(window, { Icon, ICON_PATHS: PATHS });
