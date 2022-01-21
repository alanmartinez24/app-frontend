import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, Typography, CircularProgress, Stepper, Step, StepLabel, StepContent, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import axios from 'axios'
import { keccak256 } from 'web3-utils'
import Portal from '@material-ui/core/Portal'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { fetchSocialLevel } from '../../redux/actions'
// import { updateEthAuthInfo } from '../../redux/actions'

const { BACKEND_API } = process.env
const ERROR_MSG = `Unable to link your account. Please try again.`
const NOTMAINNET_MSG = 'Please connect with a mainnet Ethereum address.'

const styles = theme => ({
  dialog: {
      width: '100%'
  },
  dialogTitleText: {
    fontWeight: '500'
  },
  dialogContentText: {
    fontWeight: '200'
  },
  buttons: {
    backgroundColor: 'transparent',
    fontWeight: '400',
    fontSize: '14px'
  },
  platforms: {
    width: '100%',
    fontSize: '16px',
    textTransform: 'none',
    margin: '5px 0'
  },
  walletConnectIcon: {
    maxWidth: '4vw',
    width: '20px',
    height: 'auto',
    float: 'right'
  },
  twitterIcon: {
    maxWidth: '4vw',
    width: '20px',
    height: 'auto',
    float: 'right'
  },
  loader: {
    float: 'right'
  },
  outline: {
    borderColor: '#AAAAAA'
  },
  input: {
    padding: '5px',
    color: '#aaa'
  },
  desktop: {
    display: 'inline',
    [theme.breakpoints.down('600')]: {
      display: 'none'
    }
  },
  snackUpper: {
    backgroundColor: 'transparent',
    paddingBottom: 0
  },
  snack: {
    color: '#fff8f3',
    justifyContent: 'center'
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  stepperInput: {
    width: '250px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '160px'
    }
  },
  inputText: {
    fontSize: '16px',
    padding: '0px',
    fontFamily: '"Gilroy", sans-serif',
    fontWeight: '200',
    color: theme.palette.common.first,
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  }
})

class ConnectEth extends Component {
  state = {
    ethIsLoading: false,
    account: null,
    connector: null,
    connected: false,
    showWhitelist: false,
    showUsername: false,
    steps: ['Connect Ethereum Account', 'Verify Ownership'],
    activeStep: 0,
    snackbar: {
      open: false,
      error: true,
      content: ''
    },
    walletConnectOpen: false
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return 'Connect your account from your mobile device.'
      case 1:
        return 'Sign the message on your mobile device to confirm your account ownership.'
      case 2:
        return this.state.showWhitelist ? 'Your address needs to be whitelisted. Please add your email so we can notify you.' : 'Please enter a Yup username to create your account.'
    }
  }

  initWalletConnect = async () => {
    if (this.state.walletConnectOpen) { return }
    this.setState({ walletConnectOpen: true })
    this.onDisconnect()
    const bridge = 'https://bridge.walletconnect.org'
    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal })
    this.setState({ connector })

    // already logged in
    if (connector.connected && !localStorage.getItem('YUP_ETH_AUTH')) {
      localStorage.removeItem('walletconnect')
      this.initWalletConnect()
    }

    if (!connector.connected) {
     await connector.createSession()
    }

    await this.subscribeToEvents()
  }

   subscribeToEvents = async () => {
    const { connector } = this.state

    if (!connector) { return }

    connector.on('connect', (error, payload) => {
      if (error) {
        this.handleSnackbarOpen(ERROR_MSG, true)
        throw error
      }

      this.onConnect(payload, false)
    })

    connector.on('disconnect', (error, payload) => {
      if (error) {
        this.handleSnackbarOpen(ERROR_MSG, true)
        throw error
      }

      this.onDisconnect()
      this.handleSnackbarOpen('Wallet disconnected.', true)
    })

    // already connected
    if (connector.connected) {
      this.setState({ connector })
      this.onConnect(connector, true)
    }
  };

   onConnect = async (payload, connected) => {
     if (!this.state.connector || !payload) { return }

     try {
      const chainId = connected ? payload._chainId : payload.params[0].chainId
      const accounts = connected ? payload._accounts : payload.params[0].accounts

      if (chainId !== 1) {
        this.handleSnackbarOpen(NOTMAINNET_MSG, true)
        this.onDisconnect()
        return
      }

      this.handleSnackbarOpen('Successfully connected.', false)
      this.setState({
        connected: true,
        activeStep: 1
      })

      const address = accounts[0]
      const challenge = (await axios.get(`${BACKEND_API}/v1/eth/challenge`, { params: { address } })).data.data
      const msgParams = [
        address,
        keccak256('\x19Ethereum Signed Message:\n' + challenge.length + challenge)
      ]
      const signature = await this.state.connector.signMessage(msgParams)
      this.setState({
        activeStep: 2
      })
      await axios.post(`${BACKEND_API}/accounts/linked/eth`, { address: address, eosname: this.state.account.name, signature: signature })
      this.props.dispatch(fetchSocialLevel(this.state.account.name))
      this.handleSnackbarOpen('Successfully linked ETH account.', false)
      this.props.handleDialogClose()
      this.setState({ walletConnectOpen: false })
      } catch (err) {
        console.error(err)
        this.handleSnackbarOpen(ERROR_MSG, true)
        this.onDisconnect()
      }
  }

  onDisconnect = () => {
    this.setState({
      connected: false,
      connector: null,
      steps: ['Connect Ethereum Account', 'Verify Ownership'],
      activeStep: 0,
      showWhitelist: false,
      showUsername: false,
      ethIsLoading: false
    },
    localStorage.removeItem('YUP_ETH_AUTH')
    )
  }
  handleSnackbarOpen = (msg, error) => {
    this.setState({
      snackbar: {
        open: true,
        content: msg,
        error: error
      }
    })
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false,
        content: '',
        error: this.state.snackbar.error
      }
    })
  }

  render () {
    const { handleDialogClose, dialogOpen, classes, account } = this.props
    if (account && !this.state.account) this.setState({ account: account })
    return (
      <ErrorBoundary>
        <Portal>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={4000}
            className={classes.snackUpper}
            onClose={this.handleSnackbarClose}
            open={this.state.snackbar.open}
          >
            <SnackbarContent
              className={classes.snack}
              message={this.state.snackbar.content}
              style={{ backgroundColor: this.state.snackbar.error ? '#ff5252' : '#48B04C' }}
            />
          </Snackbar>
        </Portal>

        <Dialog open={dialogOpen}
          onClose={() => {
            handleDialogClose()
            this.setState({ walletConnectOpen: false })
          }}
          aria-labelledby='form-dialog-title'
          className={classes.dialog}
        >
          {!this.state.connected && (!this.state.showWhitelist && !this.state.showUsername) &&
            <>
              <DialogTitle style={{ paddingBottom: '10px' }}>
                <Typography
                  align='left'
                  className={classes.dialogTitleText}
                  variant='h3'
                >
                  Link your Ethereum account
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container
                  direction='column'
                  spacing={1}
                >
                  <Grid item>
                    <Button
                      variant='outlined'
                      size='large'
                      onClick={this.initWalletConnect}
                      fullWidth
                    >
                      <Typography
                        align='left'
                        className={classes.platforms}
                      >
                        WalletConnect
                      </Typography>
                      {this.state.ethIsLoading
                    ? <CircularProgress size={13.5}
                      className={classes.loader}
                      />
                    : <img alt='wallet connect'
                      src='/images/icons/wallet_connect.png'
                      className={classes.walletConnectIcon}
                      />
                  }
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          }

          {this.state.connected &&
            <>
              <DialogTitle style={{ paddingBottom: '10px' }}>
                <Typography
                  align='left'
                  className={classes.dialogTitleText}
                  variant='h5'
                >
                  Sign Up / Login
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Please sign up with an 'active' wallet, one that has held some ETH or YUP before. Fresh unused wallets will not be whitelisted and will need to be approved </DialogContentText>
                <Stepper activeStep={this.state.activeStep}
                  orientation='vertical'
                  className={classes.stepper}
                >
                  {this.state.steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        <Typography
                          align='left'
                          variant='body1'
                        >
                          {this.getStepContent(this.state.activeStep)}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </DialogContent>
            </>
          }
        </Dialog>
      </ErrorBoundary>
    )
  }
}

ConnectEth.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
export default memo(withRouter(connect(null)(withStyles(styles)(ConnectEth))))
