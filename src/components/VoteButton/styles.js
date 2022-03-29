import { levelColors } from '../../utils/colors'

const styles = (theme) => ({
  greenArrow: {
    color: levelColors.second
  },
  redArrow: {
    color: levelColors.sixth
  },
  defaultArrow: {
    color: 'white',
    opacity: 0.6
  },
  catIcon: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    padding: '2px',
    [theme.breakpoints.down('xs')]: {
      height: 25,
      width: 25,
      margin: '0'
    }
  },
  postWeight: {
    minWidth: '50px',
    fontSize: '16px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px'
    }
  },
  snackbar: {
    position: 'absolute',
    backgroundColor: '#ff5252',
    textColor: '#f0f0f0',
    width: '8%'
  },
  snack: {
    backgroundColor: '#ff5252',
    color: '#fff8f3',
    fontWeight: 'light'
  },
  snackbarContent: {
    width: 150
  },
  snackUpper: {
    backgroundColor: 'transparent',
    paddingBottom: 0
  },
  dialog: {
    width: '100%',
    marginLeft: 190,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 190,
      width: `calc(100% - 190px)`
    },
    [theme.breakpoints.up('1600')]: {
      width: '100%',
      marginLeft: 0
    }
  },
  mobileBtn: {
    [theme.breakpoints.down('sm')]: {
      width: '1.2em'
    }
  }
})

export default styles
