import Colors, { Gradients } from './colors'
console.log(`Gradients`, Gradients)

export const darkPalette = {
  palette: {
    type: 'dark',
    common: {
      first: Colors.W1,
      second: Colors.W2,
      third: Colors.W3,
      fourth: Colors.W4,
      fifth: Colors.W5
    },
    alt: {
      first: Colors.B1,
      second: Colors.B2,
      third: Colors.B3,
      fourth: Colors.B4,
      fifth: Colors.B5
    },
    primary: {
      main: Colors.W1,
      gradient: Gradients.background.dark
    },
    secondary: {
      main: Colors.Green
    },
    text: {
      primary: Colors.W1,
      secondary: Colors.W2
    },
    action: {
      hover: Colors.B3
    }
  }
}

export const lightPalette = {
  palette: {
    type: 'light',
    common: {
      first: Colors.B1,
      second: Colors.B2,
      third: Colors.B3,
      fourth: Colors.B4,
      fifth: Colors.B5
    },
    alt: {
      first: Colors.W1,
      second: Colors.W2,
      third: Colors.W3,
      fourth: Colors.W4,
      fifth: Colors.W5
    },
    primary: {
      main: Colors.B2,
      gradient: Gradients.background.light
    },
    secondary: {
      main: Colors.Black
    },
    third: {
      main: Colors.Green
    },
    text: {
      primary: Colors.Black,
      secondary: Colors.DarkGrey
    },
    action: {
      hover: Colors.W3
    }
  }
}

export const theme = ({ palette }) => {
  return { overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        borderRadius: '0.65rem'
      },
      outlined: {
        borderRadius: '0.65rem',
        borderWidth: '0.15rem',
        borderColor: palette.common.second,
        color: palette.common.second,
        boxShadow:
          `5px 5px 30px 0 ${palette.alt.second}44, -5px -5px 30px 0 ${palette.common.third}44`,
        lineHeight: '23px',
        letterSpacing: '1%',
        fontWeight: '500',
        fontFamily: 'Gilroy',
        '&:hover': {
          boxShadow:
            '8px 8px 30px 0 rgba(0, 0, 0, 0.06), -8px -8px 15px 0 rgba(170, 170, 170, 0.03), inset 8px 8px 30px 0 rgba(0, 0, 0, 0.06), inset -8px -8px 15px 0 rgba(170, 170, 170, 0.03)',
          backgroundColor: 'inherit'
        }
      },
      contained: {
        borderRadius: '0.55rem',
        border: 'none',
        backgroundColor: palette.alt.third,
        color: palette.common.second,
        boxShadow:
          `1px 1px 20px 0 ${palette.alt.second}02, -1px -1px 20px 0 ${palette.common.third}02`,
        lineHeight: '23px',
        letterSpacing: '1%',
        fontWeight: '500',
        fontFamily: 'Gilroy',
        '&:hover': {
          boxShadow:
            `8px 8px 30px 0 ${palette.alt.second}07, -8px -8px 15px 0 ${palette.common.third}04, inset 8px 8px 30px 0  ${palette.alt.second}07, inset -8px -8px 15px 0 ${palette.common.third}04`,
          backgroundColor: palette.alt.fourth
        }
      }
    },
    MuiIconButton: {
      root: {
        borderRadius: '100px',
        border: 'none',
        boxShadow: `8px 8px 30px 0 ${palette.common.first}04, -8px -8px 15px 0 ${palette.common.first}02, inset 8px 8px 30px 0 ${palette.common.first}04, inset -8px -8px 15px 0 ${palette.common.first}02`,
        '&:hover': {
          boxShadow:
            '-8px -8px 30px 0 rgba(0, 0, 0, 0.04), 8px 8px 15px 0 rgba(170, 170, 170, 0.02), inset -8px -8px 30px 0 rgba(0, 0, 0, 0.04), inset 8px 8px 15px 0 rgba(170, 170, 170, 0.02)',
          backgroundColor: 'inherit'
        }
      }
    },
    MuiIcon: {
      root: {
        color: palette.common.first
      }
    },
    MuiDialogContent: {
      root: {
        color: palette.common.first
      }
    },
    MuiAvatar: {
      colorDefault: {
        color: palette.common.first
      }
    },
    MuiTab: {
      root: {
        textTransform: 'capitalize',
        fontSize: '1.2rem'
      }
    },
    MuiListItemIcon: {
      root: {
        color: palette.common.third,
        overflow: 'visible',
        textAlign: 'center',
        justifyContent: 'center'
      }
    },
    MuiListSubheader: {
      root: {
        color: palette.common.second
      }
    },
    MuiBadge: {
      colorSecondary: {
        backgroundColor: palette.common.second
      }
    },
    MuiInputLabel: {
      shrink: {
        color: `${Colors.Grey}50`
      },
      formControl: {
      }
    },
    MuiMenu: {
      paper: {
        backgroundColor: palette.alt.second
      }
    },
    MuiMenuItem: {
      dense: {
        color: palette.common.first
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '0.625rem',
        color: Colors.DarkWhite
      },
      notchedOutline: {
        borderColor: Colors.DarkWhite,
        color: Colors.DarkWhite
      },
      input: {
        padding: '10px 14px'
      }
    },
    MuiTextField: {
      root: {
        color: palette.common.first
      }
    },
    MuiSelect: {
      icon: {
        color: Colors.White
      }
    },
    MuiDialogActions: {
      root: {
        padding: '8px 24px'
      }
    },
    MuiAppBar: {
      root: {
        background: palette.primary.gradient
      }
    },
    MuiDrawer: {
      paper: {
        background: palette.primary.gradient
      }
    },
    MuiDialog: {
      paper: {
        backgroundColor: palette.alt.second,
        borderRadius: '25px',
        boxShadow: `0px 0px 20px 6px ${palette.common.first}05`,
        width: '80%',
        padding: '1rem 0.5rem',
        maxWidth: '500px'
      },
      backdrop: {
        backdropFilter: 'blur(3px)'
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0.65rem'
      }
    },
    MuiStepIcon: {
      root: {
        color: `${Colors.YupGreen} !important`
      },
      text: {
        fill: `${palette.alt.first} !important`
      }
    },
    MuiStepLabel: {
      label: {
        color: `${palette.common.first} !important`
      }
    }
  },
  typography: {
    h1: {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '4rem',
      lineHeight: '3.25rem',
      marginBottom: '0.2rem',
      color: palette.common.first
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
      color: palette.common.first
    },
    h3: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '1.75rem',
      lineHeight: '1.85rem',
      color: palette.common.second
    },
    h4: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: '1.6rem',
      color: palette.common.third
    },
    h5: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: '1.3rem',
      color: palette.common.third
    },
    h6: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '1rem',
      lineHeight: '1.25rem',
      color: palette.common.third
    },
    subtitle1: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '1.625rem',
      lineHeight: '1.25rem',
      color: palette.common.third
    },
    subtitle2: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 200,
      fontSize: '1.2rem',
      lineHeight: '1.1875rem',
      color: palette.common.fourth
    },
    body1: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '0.875rem',
      lineHeight: '1rem',
      color: palette.common.second
    },
    display3: {
      fontFamily: 'Gilroy',
      fontStyle: 'thin',
      fontSize: '20px',
      lineHeight: '20px',
      color: Colors.Green,
      fontWeight: '100'
    },
    display2: {
      fontFamily: 'Gilroy',
      fontStyle: 'thin',
      fontSize: '34px',
      lineHeight: '59px',
      color: Colors.Green
    },
    display1: {
      fontFamily: 'Gilroy',
      fontStyle: 'thin',
      fontSize: '24px',
      lineHeight: '29px',
      color: Colors.Yellow,
      fontWeight: '100'
    },
    headline: {
      fontSize: '20px',
      lineHeight: '29px',
      color: Colors.Yellow,
      fontStyle: 'thin',
      letterSpacing: '0.25%',
      paragraphSpacing: '16px'
    },
    title: {
      fontSize: '16px',
      lineHeight: '23px',
      letterSpacing: '0.75%',
      fontStyle: 'thin',
      color: palette.common.first
    },
    caption: {
      fontFamily: 'Gilroy',
      fontStyle: '600',
      fontSize: '16px',
      color: palette.common.third
    },
    subheader: {
      fontSize: '20px',
      lineHeight: '29px',
      fontFamily: 'Gilroy',
      letterSpacing: '0.15%',
      color: palette.common.fourth,
      fontStyle: 'thin'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '21px',
      color: Colors.White,
      letterSpacing: '0.25%',
      fontWeight: '100'
    },
    body3: {
      fontSize: '12px',
      lineHeight: '18px',
      color: Colors.White,
      letterSpacing: '0.25%',
      fontWeight: '200'
    },
    colorError: {
      color: Colors.Red
    },
    fontFamily: 'Gilroy'
  },
  props: {
    MuiWithWidth: {
      initialWidth: 'lg'
    }
  }
}
}
