export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          fontWeight: 300,
          fontVariant: 'small-caps',
          letterSpacing: '0.2em',
          color: 'var(--text, #F5F2EE)',
          marginBottom: '32px',
        }}
      >
        Solitude of Mechanics
      </h1>

      <div
        style={{
          width: '48px',
          height: '1px',
          background: 'var(--accent, #8A7D6B)',
          marginBottom: '32px',
        }}
      />

      <p
        style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
          fontStyle: 'italic',
          color: 'var(--text-muted, #9E9890)',
          letterSpacing: '0.03em',
          marginBottom: '64px',
        }}
      >
        A love letter to watchmaking
      </p>

      <p
        style={{
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: 'var(--text-dim, #5E5954)',
          marginBottom: '16px',
        }}
      >
        Coming soon
      </p>

      <a
        href="https://instagram.com/solitudeofmechanics"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          color: 'var(--accent, #8A7D6B)',
        }}
      >
        @solitudeofmechanics
      </a>
    </div>
  )
}
