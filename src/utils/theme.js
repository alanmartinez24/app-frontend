import Colors, { Gradients } from './colors'

export const darkPalette = {
  palette: {
    type: 'dark',
    M50: Colors.M50,
    M100: Colors.M100,
    M150: Colors.M150,
    M200: Colors.M200,
    M300: Colors.M300,
    M400: Colors.M400,
    M500: Colors.M500,
    M600: Colors.M600,
    M700: Colors.M700,
    M750: Colors.M750,
    M800: Colors.M800,
    M900: Colors.M900,
    P50: Colors.P50,
    P100: Colors.P100,
    P150: Colors.P150,
    P200: Colors.P200,
    P300: Colors.P300,
    P400: Colors.P400,
    P500: Colors.P500,
    P600: Colors.P600,
    P700: Colors.P700,
    P800: Colors.P800,
    P850: Colors.P850,
    P900: Colors.P900
  },
  rainbowGradient: Gradients.rainbowGradient,
  text: {
    primary: Colors.M50,
    secondary: Colors.M100
  },
  shadow: {
    first: Colors.M900,
    second: Colors.M900
  },
  action: {
    hover: Colors.M850
  }
}

export const lightPalette = {
  palette: {
    type: 'light',
    M50: Colors.M900,
    M100: Colors.M850,
    M150: Colors.M800,
    M200: Colors.M750,
    M300: Colors.M700,
    M400: Colors.M600,
    M500: Colors.M500,
    M600: Colors.M400,
    M700: Colors.M300,
    M750: Colors.M200,
    M800: Colors.M150,
    M850: Colors.M100,
    M900: Colors.M50,
    P50: Colors.P900,
    P100: Colors.P850,
    P150: Colors.P800,
    P200: Colors.P750,
    P300: Colors.P700,
    P400: Colors.P600,
    P500: Colors.P500,
    P600: Colors.P400,
    P700: Colors.P300,
    P750: Colors.P200,
    P800: Colors.P150,
    P850: Colors.P100,
    P900: Colors.P50
  },
  rainbowGradient: Gradients.rainbowGradient,
  primary: {
    main: Colors.M850,
    gradient: Gradients.background.light
  },
  secondary: {
    main: Colors.M900
  },
  third: {
    main: Colors.P500
  },
  text: {
    primary: Colors.M900,
    secondary: Colors.M400
  },
  shadow: {
    first: Colors.M400,
    second: Colors.M300
  },
  action: {
    hover: Colors.M150
  }
}

export const theme = ({ palette }) => {
  return {
    overrides: {
      body: {
        backgroundColor: palette.M500
      },
      MuiButton: {
        root: {
          borderRadius: '8px',
          textTransform: 'capitalize',
          letterSpacing: '0.02em',
          lineHeight: '23px',
          fontWeight: '500',
          textDecoration: 'none'
        },
        contained: {
          border: 'none',
          boxShadow: 'none',
          color: palette.M900,
          backgroundColor: palette.P400,
          '&:hover': {
            boxShadow: `0 0 0 2px ${palette.P300}`,
            backgroundColor: palette.P300
          },
          '&:active': {
            boxShadow: 'none'
          },
          '&:disabled': {
            backgroundColor: palette.P700
          },
          '&:selected': {
            backgroundColor: palette.P600
          }
        },
        outlined: {
          border: 'none',
          color: palette.P400,
          backgroundColor: palette.P850,
          '&:hover': {
            boxShadow: `0 0 0 2px ${palette.P800}`,
            color: palette.P300,
            backgroundColor: palette.P800
          },
          '&:disabled': {
            color: palette.P600,
            backgroundColor: palette.P900
          },
          '&:selected': {
            color: palette.P500,
            backgroundColor: palette.P900
          }
        },
        text: {
          color: palette.P400,
          '&:hover': {
            color: palette.P300,
            backgroundColor: 'transparent'
          },
          '&:disabled': {
            color: palette.P600,
            backgroundColor: 'transparent'
          },
          '&:selected': {
            color: palette.P500,
            backgroundColor: 'transparent'
          }
        }
      },
      MuiIconButton: {
        root: {
          borderRadius: '100px',
          border: 'none',
          boxShadow: `8px 8px 30px 0 ${palette.M100}04, -8px -8px 15px 0 ${palette.M100}02, inset 8px 8px 30px 0 ${palette.M100}04, inset -8px -8px 15px 0 ${palette.M100}02`,
          '&:hover': {
            boxShadow:
              '-8px -8px 30px 0 rgba(0, 0, 0, 0.04), 8px 8px 15px 0 rgba(170, 170, 170, 0.02), inset -8px -8px 30px 0 rgba(0, 0, 0, 0.04), inset 8px 8px 15px 0 rgba(170, 170, 170, 0.02)',
            backgroundColor: 'inherit'
          }
        }
      },
      MuiIcon: {
        root: {
          color: palette.M100
        }
      },
      MuiAvatar: {
        colorDefault: {
          color: palette.M100
        }
      },
      MuiTab: {
        root: {
          textTransform: 'capitalize',
          fontSize: '1.2rem'
        }
      },
      MuiTooltip: {
        tooltip: {
          color: '#fff',
          fontSize: '12px'
        }
      },
      MuiListItemIcon: {
        root: {
          color: palette.M300,
          overflow: 'visible',
          textAlign: 'center',
          justifyContent: 'center'
        }
      },
      MuiListSubheader: {
        root: {
          color: palette.M200
        }
      },
      MuiBadge: {
        colorSecondary: {
          backgroundColor: palette.M200
        }
      },
      MuiInputLabel: {
        shrink: {
          color: `${palette.M100}50`
        },
        outlined: {
          transform: 'translate(15%, 85%) scale(1)'
        }
      },
      MuiMenu: {
        paper: {
          backgroundColor: `${palette.M800}CC`,
          backdropFilter: 'blur(20px)'
        }
      },
      MuiMenuItem: {
        dense: {
          color: palette.M100
        }
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: '0.625rem',
          color: palette.M100
        },
        notchedOutline: {
          borderColor: palette.M500,
          color: palette.M100
        },
        input: {
          padding: '10px 14px'
        }
      },
      MuiTextField: {
        root: {
          color: palette.M100
        }
      },
      MuiSelect: {
        icon: {
          color: palette.M50
        }
      },
      MuiDialogActions: {
        root: {
          padding: '8px 24px'
        }
      },
      MuiAppBar: {
        root: {
          background: palette.M800
        },
        colorPrimary: {
          backgroundColor: palette.M800
        }
      },
      MuiDrawer: {
        paper: {
          background: palette.M800
        }
      },
      MuiDialog: {
        paper: {
          backgroundColor: `${palette.M800}cc`,
          borderRadius: '25px',
          backdropFilter: 'blur(45px)',
          boxShadow: `0 0 20px 6px ${palette.M100}05`,
          width: '80%',
          padding: '1rem 0.5rem',
          maxWidth: '500px'
        },
        backdrop: {
          backdropFilter: 'blur(3px)'
        }
      },
      MuiDialogContent: {
        root: {
          color: palette.M100
        }
      },
      MuiDialogTitle: {
        root: {
          fontWeight: 100,
          fontSize: '2.441rem',
          lineHeight: '105%',
          color: `${palette.M200}EE`
        }
      },
      MuiPaper: {
        root: {
          backgroundColor: palette.M700
        },
        rounded: {
          borderRadius: '0.65rem'
        }
      },
      MuiStepIcon: {
        root: {
          color: `${palette.P500} !important`
        },
        text: {
          fill: `${palette.M900} !important`
        }
      },
      MuiStepLabel: {
        label: {
          color: `${palette.M100} !important`
        }
      },
      MuiBackdrop: {
        root: {
          backgroundColor: `${palette.M300}40`,
          backdropFilter: 'blur(10px)'
        }
      },
      MuiFab: {
        extended: {
          textTransform: 'capitalize',
          backgroundColor: palette.M700,
          borderRadius: '0.65rem'
        }
      },
      MuiTouchRipple: {
        root: {
          opacity: 0.2
        }
      },
      MuiSkeleton: {
        wave: {
          background: `${palette.M600}AA`,
          '&::after': {
            background: `linear-gradient(90deg, transparent, ${palette.M800}, transparent)`
          }
        }
      },
      MuiChip: {
        root: {
          padding: '0 0.5rem'
        },
        icon: {
          height: 'minContent',
          color: palette.M100,
          fontSize: 'small !important',
          opacity: 0.4
        }
      }
    },
    typography: {
      fontFamily: [
        'Gilroy',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ].join(','),
      fontStyle: 'normal',
      h1: {
        fontWeight: 600,
        fontSize: '3.815rem',
        lineHeight: '100%',
        color: `${palette.M50}EE`
      },
      h2: {
        fontWeight: 700,
        fontSize: '3.052rem',
        lineHeight: '100%',
        color: `${palette.M50}EE`
      },
      h3: {
        fontWeight: 600,
        fontSize: '2.441rem',
        lineHeight: '100%',
        color: `${palette.M50}EE`
      },
      h4: {
        fontWeight: 400,
        fontSize: '1.953rem',
        lineHeight: '100%',
        color: `${palette.M50}EE`
      },
      h5: {
        fontWeight: 700,
        fontSize: '1.562rem',
        lineHeight: '105%',
        color: `${palette.M50}EE`
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.339rem',
        lineHeight: '105%',
        color: `${palette.M50}EE`
      },
      subtitle1: {
        fontWeight: 400,
        fontSize: '1.25rem',
        lineHeight: '100%',
        color: `${palette.M50}DD`
      },
      subtitle2: {
        fontWeight: 700,
        fontSize: '1rem',
        lineHeight: '100%',
        color: `${palette.M50}DD`
      },
      body1: {
        fontWeight: 800,
        fontSize: '0.875rem',
        lineHeight: '110%',
        color: `${palette.M50}EE`
      },
      body2: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: '110%',
        color: `${palette.M50}DE`
      },
      caption: {
        fontStyle: '600',
        fontSize: '1rem',
        color: `${palette.M50}DE`
      },
      tooltip: {
        fontSize: '0.75rem',
        fontWeight: '200'
      },
      colorError: {
        color: '#EB3650'
      }
    },
    props: {
      MuiWithWidth: {
        initialWidth: 'lg'
      }
    }
  }
}
