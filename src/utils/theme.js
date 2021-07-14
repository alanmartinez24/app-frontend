import Colors from './colors'

export const darkPalette = {
  palette: {
    primary: {
      main: Colors.Black,
      contrastText: Colors.White
    },
    secondary: {
      main: Colors.White
    },
    third: {
      main: '#00eab7'
    },
    background: 'linear-gradient(180deg, #1B1B1B 0%, #151515 100%)'
  }
}

export const lightPalette = {
  palette: {
    primary: {
      main: Colors.White,
      contrastText: Colors.Black
    },
    secondary: {
      main: Colors.Black
    },
    third: {
      main: '#00eab7'
    },
    background: {
      paper: '#fff'
    }
  }
}

export const themeObject = {
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        borderRadius: '0.65rem'
      },
      outlined: {
        borderRadius: '0.65rem',
        borderWidth: '0.15rem',
        borderColor: Colors.Grey,
        color: Colors.White,
        boxShadow:
          '5px 5px 30px 0 rgba(10, 10, 10, 0.2), -5px -5px 30px 0 rgba(170, 170, 170, 0.1)',
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
        backgroundColor: Colors.Green,
        color: Colors.Black,
        boxShadow:
          '5px 5px 30px 0 rgba(10, 10, 10, 0.2), -5px -5px 30px 0 rgba(170, 170, 170, 0.1)',
        lineHeight: '23px',
        letterSpacing: '1%',
        fontWeight: '500',
        fontFamily: 'Gilroy',
        '&:hover': {
          boxShadow:
            '8px 8px 30px 0 rgba(0, 0, 0, 0.06), -8px -8px 15px 0 rgba(170, 170, 170, 0.03), inset 8px 8px 30px 0 rgba(0, 0, 0, 0.06), inset -8px -8px 15px 0 rgba(170, 170, 170, 0.03)',
          backgroundColor: Colors.Green
        }
      }
    },
    MuiIconButton: {
      root: {
        borderRadius: '100px',
        border: 'none',
        boxShadow:
          '8px 8px 30px 0 rgba(0, 0, 0, 0.04), -8px -8px 15px 0 rgba(170, 170, 170, 0.02), inset 8px 8px 30px 0 rgba(0, 0, 0, 0.04), inset -8px -8px 15px 0 rgba(170, 170, 170, 0.02)',
        '&:hover': {
          boxShadow:
            '-8px -8px 30px 0 rgba(0, 0, 0, 0.04), 8px 8px 15px 0 rgba(170, 170, 170, 0.02), inset -8px -8px 30px 0 rgba(0, 0, 0, 0.04), inset 8px 8px 15px 0 rgba(170, 170, 170, 0.02)',
          backgroundColor: 'inherit'
        }
      }
    },
    MuiDialogContent: {
      root: {
        color: '#fafafa'
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
        color: '#c0c0c0',
        overflow: 'visible',
        textAlign: 'center',
        justifyContent: 'center'
      }
    },
    MuiBadge: {
      colorSecondary: {
        backgroundColor: '#fafafa'
      }
    },
    MuiInputLabel: {
      shrink: {
        color: `${Colors.Grey}50`
      },
      formControl: {
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
        color: Colors.White
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
    MuiPaper: {
      rounded: {
        borderRadius: '0.65rem'
      }
    },
    MuiStepIcon: {
      root: {
        color: '#00EAB7 !important'
      },
      text: {
        fill: '#000 !important'
      }
    },
    MuiStepLabel: {
      label: {
        color: '#fff !important'
      }
    }
  },
  typography: {
    h1: {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '4rem',
      lineHeight: '3.25rem',
      marginBottom: '0.2rem'
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: '2.5rem'
    },
    h3: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '1.75rem',
      lineHeight: '1.85rem'
    },
    h4: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: '1.6rem'
    },
    h5: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: '1.3rem'
    },
    h6: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '1rem',
      lineHeight: '1.25rem'
    },
    subtitle1: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '1.625rem',
      lineHeight: '1.25rem'
    },
    subtitle2: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 200,
      fontSize: '1.2rem',
      lineHeight: '1.1875rem',
      color: Colors.DarkerGrey
    },
    body1: {
      fontFamily: 'Gilroy',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '0.875rem',
      lineHeight: '1rem',
      color: Colors.White
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
      fontStyle: 'thin'
    },
    caption: {
      fontFamily: 'Gilroy',
      fontStyle: '600',
      fontSize: '16px'
    },
    subheader: {
      fontSize: '20px',
      lineHeight: '29px',
      fontFamily: 'Gilroy',
      letterSpacing: '0.15%',
      color: Colors.DarkerGrey,
      fontStyle: 'thin'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '21px',
      color: Colors.Grey,
      letterSpacing: '0.25%',
      fontWeight: '100'
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
