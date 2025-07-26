/**
 * Design Tokens for Grupo Naser React CMS
 * Extracted from the original CSS to maintain visual consistency
 */

const designTokens = {
  // Colors
  colors: {
    primary: {
      main: '#524030', // Brown - Primary brand color
      light: '#cfbfaa', // Light brown - Secondary brand color
    },
    text: {
      primary: '#666666', // Main text color
      secondary: '#565656', // Secondary text color
      dark: '#524030', // Dark text (headers)
      light: '#fff', // Light text (on dark backgrounds)
    },
    background: {
      light: '#fff', // White background
      offWhite: '#f4f4f4', // Light gray background
      dark: '#524030', // Dark background (footer, etc)
      darker: '#343434', // Darker background (sub-footer)
    },
    ui: {
      success: '#4CAF50',
      error: '#F44336',
      warning: '#FF9800',
      info: '#2196F3',
    },
    border: {
      light: '#eee',
      dark: 'rgba(250,250,250,0.3)',
    }
  },

  // Typography
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      base: '16px',
      small: '13px',
      medium: '15px',
      large: '18px',
      h1: '36px',
      h2: '36px',
      h3: '24px',
      h4: '20px',
      h5: '18px',
      h6: '15px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    lineHeight: {
      base: '24px',
      heading: '1.2',
    },
    letterSpacing: {
      normal: 'normal',
      wide: '0.5px',
      wider: '1px',
      widest: '2.5px',
    }
  },

  // Spacing
  spacing: {
    xs: '5px',
    sm: '10px',
    md: '15px',
    lg: '20px',
    xl: '30px',
    xxl: '40px',
    section: '80px',
    largeSections: '140px',
  },

  // Borders
  borders: {
    radius: {
      button: '30px',
      input: '20px',
      card: '5px',
    },
    width: {
      thin: '1px',
      normal: '2px',
      thick: '3px',
    }
  },

  // Shadows
  shadows: {
    small: '0px 1px 10px rgba(0,0,0,0.1)',
    medium: '0px 4px 12px rgba(0,0,0,0.15)',
    large: '0px 8px 24px rgba(0,0,0,0.2)',
  },

  // Transitions
  transitions: {
    default: 'all 0.3s',
    fast: 'all 0.2s',
    slow: 'all 0.5s',
  },

  // Z-index
  zIndex: {
    navbar: 99999,
    modal: 9000,
    overlay: 8000,
    dropdown: 7000,
    preloader: 9999999,
  },

  // Buttons
  buttons: {
    filled: {
      backgroundColor: '#524030',
      color: '#fff',
      fontSize: '15px',
      fontWeight: 700,
      padding: '12px 30px',
      borderRadius: '30px',
      textTransform: 'uppercase',
      hover: {
        backgroundColor: '#fff',
        color: '#cfbfaa',
      }
    },
    border: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '2px solid #fff',
      fontSize: '15px',
      fontWeight: 700,
      padding: '10px 28px',
      borderRadius: '30px',
      textTransform: 'uppercase',
      hover: {
        backgroundColor: '#fff',
        color: '#cfbfaa',
      }
    }
  },

  // Forms
  forms: {
    input: {
      height: '40px',
      lineHeight: '40px',
      padding: '0px 15px',
      borderRadius: '20px',
      fontSize: '13px',
    },
    textarea: {
      padding: '15px',
      borderRadius: '20px',
      minHeight: '120px',
      fontSize: '13px',
    }
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },

  // Layout
  layout: {
    maxWidth: '1200px',
    containerPadding: '0 15px',
  },

  // Header
  header: {
    height: '80px',
    navbarPadding: '20px 0px',
  },

  // Section styles
  sections: {
    heading: {
      marginBottom: '80px',
      textAlign: 'center',
    },
    subHeader: {
      backgroundColor: '#524030',
      height: '50px',
      lineHeight: '50px',
    },
    banner: {
      height: '95vh',
    },
    request: {
      backgroundColor: '#524030',
      padding: '40px 0px',
    },
    services: {
      marginTop: '140px',
    },
    funFacts: {
      marginTop: '140px',
      padding: '140px 0px',
      backgroundImage: 'url(../images/fun-facts-bg.jpg)',
    },
    moreInfo: {
      marginTop: '140px',
    },
    testimonials: {
      marginTop: '140px',
      backgroundColor: '#f4f4f4',
      padding: '140px 0px',
    },
    team: {
      backgroundColor: '#f4f4f4',
      marginTop: '20px',
      marginBottom: '-140px',
      padding: '80px 0px',
    },
    contact: {
      backgroundColor: '#f4f4f4',
      padding: '140px 0px',
    },
    footer: {
      backgroundColor: '#524030',
      padding: '80px 0px',
    },
    subFooter: {
      backgroundColor: '#343434',
      padding: '25px 0px',
      textAlign: 'center',
    }
  }
};

export default designTokens;