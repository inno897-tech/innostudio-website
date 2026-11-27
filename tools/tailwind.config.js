// Tailwind build config for innostudio.net (same as the old in-page config)
module.exports = {
  content: ['./index.html'],
  ...({
      theme: {
        borderRadius: { none: '0px', DEFAULT: '0px', sm: '0px', md: '0px', lg: '0px', full: '9999px' },
        extend: {
          colors: { poster: '#E5E5E5', ink: '#111111', vermilion: '#FFD400', alloyLight: '#DCDCDC', oled: '#161616', muted: '#595959' },
          fontFamily: {
            sans: ['"Switzer"', 'Arial', 'sans-serif'],
            mono: ['"Switzer"', 'Arial', 'sans-serif'],
          },
          fontSize: {
            'micro': ['0.6875rem', { lineHeight: '1.35', letterSpacing: '0.04em' }],
            'nano': ['0.625rem', { lineHeight: '1.3', letterSpacing: '0.08em' }],
            'poster-num': ['clamp(5rem, 11.5vw, 10.5rem)', { lineHeight: '0.82', letterSpacing: '0' }],
            'poster-sub': ['clamp(0.9rem, 1.35vw, 1.25rem)', { lineHeight: '1.1', letterSpacing: '0' }],
          },
          transitionTimingFunction: { 'swiss': 'cubic-bezier(0.16, 1, 0.3, 1)' }
        }
      }
    })
};
