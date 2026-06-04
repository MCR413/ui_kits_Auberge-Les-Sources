// components.jsx — Primitives + chrome for the Auberge Les Sources mobile app

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────

function Eyebrow({ children, color }) {
  return (
    <div style={{
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.22em',
      color: color || 'var(--als-terracotta)',
    }}>{children}</div>
  );
}

function SectionStart({ eyebrow, title, lead, padding = '36px 20px 18px' }) {
  return (
    <div style={{ padding }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 28, height: 1, background: 'var(--als-terracotta)' }} />
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 30,
        lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--fg-1)', margin: 0,
      }}>{title}</h2>
      {lead && <p style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 15, lineHeight: 1.55, color: 'var(--fg-2)', margin: '10px 0 0',
        maxWidth: 340,
      }}>{lead}</p>}
    </div>
  );
}

function Button({ children, kind = 'primary', size = 'md', onClick, icon, style = {} }) {
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: 500,
    border: '1px solid currentColor', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 10, transition: 'all 220ms var(--ease-soft)',
    letterSpacing: '0.18em', textTransform: 'uppercase',
    borderRadius: 2, background: 'transparent',
  };
  const sizes = {
    sm: { padding: '9px 18px', fontSize: 10 },
    md: { padding: '13px 24px', fontSize: 11 },
    lg: { padding: '16px 32px', fontSize: 12 },
  };
  const kinds = {
    // Thin ink outline — the canonical website "Book now"
    primary: { color: 'var(--als-ink)' },
    // Filled ink for highest emphasis (e.g. bottom-fixed confirm CTA)
    solid:   { background: 'var(--als-ink)', color: 'var(--als-cream)', borderColor: 'var(--als-ink)' },
    // White outline for use over photography
    light:   { color: 'var(--als-cream)', borderColor: 'var(--als-cream)' },
    // Editorial terracotta accent — sparingly
    accent:  { color: 'var(--als-clay)', borderColor: 'var(--als-clay)' },
    // Soft ghost (rare) — paper bg, no border
    ghost:   { background: 'var(--als-paper)', color: 'var(--als-ink)', borderColor: 'transparent', textTransform: 'none', letterSpacing: 0, fontSize: 13, fontWeight: 600, borderRadius: 14 },
    // Sentence-case hairline link with arrow
    link:    { background: 'transparent', color: 'var(--als-ink)', border: 'none', borderBottom: '1px solid var(--als-ink)', padding: '6px 0', borderRadius: 0, textTransform: 'none', letterSpacing: '0.04em', fontSize: 13, fontWeight: 500 },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...kinds[kind], ...style }}>
      {icon && <Icon name={icon} size={14} stroke={1.8} />}
      {children}
    </button>
  );
}

function Chip({ children, active, onClick, kind = 'default' }) {
  const styles = {
    default: {
      bg: active ? 'var(--als-petal)' : 'transparent',
      color: active ? 'var(--als-clay)' : 'var(--fg-2)',
      border: active ? '1px solid var(--als-terracotta)' : '1px solid var(--border-soft)',
      fontWeight: active ? 600 : 500,
    },
    meta: {
      bg: 'transparent', color: 'var(--fg-3)',
      border: '1px solid var(--border-soft)', fontWeight: 500,
    },
    heart: {
      bg: 'var(--als-blush)', color: 'var(--als-clay)',
      border: 'none', fontWeight: 600,
    },
    dark: {
      bg: 'var(--als-ink)', color: 'var(--als-cream)',
      border: 'none', fontWeight: 600,
    },
  };
  const s = styles[kind];
  return (
    <button onClick={onClick} style={{
      padding: kind === 'meta' ? '4px 9px' : '6px 12px',
      borderRadius: 999, background: s.bg, color: s.color, border: s.border,
      fontFamily: 'var(--font-sans)', fontSize: kind === 'meta' ? 11 : 12,
      fontWeight: s.fontWeight,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 180ms var(--ease-soft)',
      whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

function HairlineDivider({ inset = 0 }) {
  return <div style={{ height: 1, background: 'var(--border-soft)', margin: `0 ${inset}px` }} />;
}

// ─────────────────────────────────────────────────────────────
// Cards
// ─────────────────────────────────────────────────────────────

function PhotoCard({ image, eyebrow, title, meta, onClick, aspect = '5/3' }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-soft)',
      borderRadius: 24,
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      cursor: 'pointer',
    }}>
      <div style={{
        aspectRatio: aspect,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div style={{ padding: '14px 16px 16px' }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1.15,
          fontWeight: 500, color: 'var(--fg-1)', marginTop: 6,
          letterSpacing: '-0.01em',
        }}>{title}</div>
        {meta && <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 12,
          color: 'var(--fg-3)', marginTop: 6,
        }}>{meta}</div>}
      </div>
    </div>
  );
}

function EditorialCard({ image, eyebrow, title, quote, meta, action, onClick, aspect = '4/5' }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--als-paper)',
      borderRadius: 28, overflow: 'hidden',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        aspectRatio: aspect,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        margin: 10, borderRadius: 20,
      }} />
      <div style={{ padding: '4px 20px 20px' }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.15,
          fontWeight: 500, color: 'var(--fg-1)', marginTop: 8,
          letterSpacing: '-0.01em',
        }}>{title}</div>
        {quote && <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14,
          color: 'var(--fg-2)', marginTop: 10, lineHeight: 1.55,
        }}>{quote}</div>}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 14,
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-3)' }}>{meta}</span>
          {action && <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            color: 'var(--als-clay)',
          }}>{action} →</span>}
        </div>
      </div>
    </div>
  );
}

function ListRow({ left, title, subtitle, right, onClick, divider = true }) {
  return (
    <React.Fragment>
      <div onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 20px', cursor: onClick ? 'pointer' : 'default',
      }}>
        {left && <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'var(--als-paper)', color: 'var(--als-cocoa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>{left}</div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
            color: 'var(--fg-1)',
          }}>{title}</div>
          {subtitle && <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-3)',
            marginTop: 2,
          }}>{subtitle}</div>}
        </div>
        {right && <div style={{ color: 'var(--fg-3)' }}>{right}</div>}
      </div>
      {divider && <HairlineDivider inset={20} />}
    </React.Fragment>
  );
}

// ─────────────────────────────────────────────────────────────
// Chrome — sticky header & bottom tab bar
// ─────────────────────────────────────────────────────────────

function ScreenHeader({ title, onBack, right, transparent = false }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: transparent ? 'transparent' : 'rgba(251,247,241,0.92)',
      backdropFilter: transparent ? 'none' : 'blur(20px)',
      WebkitBackdropFilter: transparent ? 'none' : 'blur(20px)',
      borderBottom: transparent ? 'none' : '1px solid var(--border-soft)',
      padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
      minHeight: 48,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 999,
          background: transparent ? 'rgba(251,247,241,0.7)' : 'transparent',
          backdropFilter: transparent ? 'blur(12px)' : 'none',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fg-1)',
        }}>
          <Icon name="back" size={18} stroke={2} />
        </button>
      )}
      <div style={{ flex: 1, textAlign: onBack ? 'center' : 'left', marginRight: onBack ? 36 : 0 }}>
        {title && <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
          color: 'var(--fg-1)', letterSpacing: '0.01em',
        }}>{title}</div>}
      </div>
      {right}
    </div>
  );
}

const TABS = [
  { id: 'home',      label: 'Accueil',    icon: 'home' },
  { id: 'discover',  label: 'Découvrir',  icon: 'compass' },
  { id: 'breakfast', label: 'Petit-déj.', icon: 'coffee' },
  { id: 'stay',      label: 'Séjour',     icon: 'bed' },
];

function TabBar({ active, onChange }) {
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 12,
      background: 'rgba(251,247,241,0.92)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-soft)',
      border: '1px solid var(--border-soft)',
      borderRadius: 24,
      padding: '10px 8px 12px',
      display: 'flex', justifyContent: 'space-around',
      boxShadow: 'var(--shadow-md)',
      zIndex: 20,
    }}>
      {TABS.map(t => {
        const a = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '4px 10px',
            color: a ? 'var(--als-terracotta)' : 'var(--fg-3)',
          }}>
            <Icon name={t.icon} size={22} stroke={a ? 1.8 : 1.5} />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 10,
              fontWeight: a ? 600 : 500, letterSpacing: '0.02em',
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  Eyebrow, SectionStart, Button, Chip, HairlineDivider,
  PhotoCard, EditorialCard, ListRow,
  ScreenHeader, TabBar, TABS,
});
