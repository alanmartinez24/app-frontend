import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Snackbar, SnackbarContent } from '@material-ui/core'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Colors from '../../utils/colors'
import YupInput from '../../components/Miscellaneous/YupInput'
import SubscribeDialog from '../../components/SubscribeDialog/SubscribeDialog'
import axios from 'axios'
import CountUp from 'react-countup'
import { accountInfoSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import { getAuth } from '../../utils/authentication'
import MetaTags from '../../components/Airdrop/MetaTags'
import YupStepper from '../../components/Airdrop/YupStepper'
import LoaderButton from '../../components/Miscellaneous/LoaderButton'

import { isAddress } from 'web3-utils'

const BACKEND_API = 'http://localhost:4001'
// const { BACKEND_API } = process.env

const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    backgroundColor: theme.palette.alt.second
  },
  imgBanner: {
    marginTop: 20
  },
  btn: {
    backgroundColor: '#00E08E',
    fontFamily: 'Gilroy',
    width: '80%',
    height: 30,
    borderRadius: '0.65rem',
    marginTop: 5,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#00E08E'
    }
  },
  page: {
    width: '100%',
    marginLeft: 0,
    overflowX: 'hidden',
    flex: 1
  },
  balanceContainer: {
    borderRadius: '0.5rem',
    border: 'solid 2px #1D1E1F',
    width: '100%',
    padding: 5
  },
  card: {
    padding: theme.spacing(2),
    height: '70%',
    width: 400,
    marginBottom: 0,
    boxShadow:
      `0px 0px 30px 0px ${theme.palette.shadow.first}44, 0px 0px 0.75px  ${theme.palette.shadow.first}66`,
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20vh',
      width: 300
    }
  },
  skeleton: {
    background: `linear-gradient(90deg, ${Colors.Green}33, ${Colors.Moss}33, ${Colors.Yellow}33, ${Colors.Orange}33,  ${Colors.Red}33)`,
    transform: 'none'
  }
})

class AirdropPage extends Component {
  state = {
    isLoading: false,
    polygonAddress: this.props.location.pathname.split('/')[2] || '',
    airdrop: null,
    dialogOpen: false,
    snackbarMsg: null,
    activeStep: 1
  }
  // componentDidMount = () => {
  //   const polygonAddress = this.props.location.pathname.split('/')[2]
  //   if (polygonAddress) {
  //     this.setState({ polygonAddress }, () => { this.fetchAirdropData() })
  //   }
  // }

  handleInput = e => { this.setState({ polygonAddress: (e.target.value).toLowerCase() }) }

  handleDialogClose = () => { this.setState({ dialogOpen: false }) }

  claimAirdrop = async () => {
    try {
      if (!isAddress(this.state.polygonAddress)) {
        this.setState({ snackbarMsg: 'Please enter a valid polygon address' })
        return
      }
      this.setState({ isLoading: true })
      const { polygonAddress } = this.state
      const { account } = this.props
      this.props.history.push(`/airdrop/${polygonAddress}`)
      const auth = await getAuth(account)
      const params = { polygonAddress, eosname: account.name, ...auth }
      const res = (await axios.post(`${BACKEND_API}/airdrop/claim`, params)).data
      console.log(`res`, res)
      this.setState({ activeStep: 3 })
    } catch (err) {
      this.setState({ snackbarMsg: 'Something went wrong' })
    }
    this.setState({ isLoading: false })
  }

  handleSnackbarClose = () => this.setState({ snackbarMsg: '' })

  fetchAirdropData = async () => {
    try {
      this.setState({ isLoading: true })
      const airdrop = (await axios.get(`${BACKEND_API}/airdrop?eosname=${this.props.account.name}`)).data
      this.setState({ airdrop, activeStep: 2 })
    } catch (err) {
      this.setState({ snackbarMsg: 'Something went wrong' })
    }
    this.setState({ isLoading: false })
  }

  render () {
    const { classes, account } = this.props
    const { isLoading, airdrop, snackbarMsg, polygonAddress, activeStep } = this.state

    const enableClaim = airdrop && isAddress(polygonAddress)
    const steps = ['Check elgibility', 'Claim your tokens', 'Let everyone know']

    return (
      <ErrorBoundary>
        <MetaTags polygonAddress={polygonAddress}
          airdrop={airdrop}
        />
        <div className={classes.container}>
          <Snackbar
            autoHideDuration={3000}
            onClose={this.handleSnackbarClose}
            open={!!snackbarMsg}
          >
            <SnackbarContent
              message={snackbarMsg}
            />
          </Snackbar>

          <Grid className={classes.page}
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Card className={classes.card}
              elevation={0}
            >
              <YupStepper steps={steps}
                activeStep={activeStep}
              />
              <Grid container
                alignItems='center'
                direction='column'
                spacing={3}
              >
                <Grid
                  container
                  direction='row'
                  justify='space-around'
                  className={classes.imgBanner}
                >
                  <Grid item>
                    <img
                      src='/images/graphics/yup-logo.svg'
                      alt='yup logo'
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src='/images/graphics/polygon-logo.svg'
                      alt='polygon logo'
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h4'
                  >
                    Polygon Airdrop
                  </Typography>
                </Grid>
                <Grid item
                  xs={12}
                >
                  <YupInput
                    fullWidth
                    id='address'
                    maxLength={50}
                    label={'Address'}
                    type='text'
                    onSubmit={this.fetchAirdropData}
                    value={this.state.polygonAddress}
                    variant='outlined'
                    onChange={this.handleInput}
                  />
                </Grid>
                <Grid item>
                  <Typography variant='h4'
                    className={classes.balanceContainer}
                    style={{ color: airdrop ? '#00E08E' : '#616467' }}
                  >
                    <CountUp
                      end={airdrop && airdrop.amount}
                      decimals={2}
                      start={0}
                      duration={1}
                      suffix=' YUP'
                    />
                  </Typography>
                </Grid>
                <Grid item
                  xs={12}
                >
                  {account && account.name ? (
                    <LoaderButton
                      fullWidth
                      className={classes.btn}
                      variant='contained'
                      buttonText='Claim'
                      disabled={!enableClaim}
                      isLoading={isLoading}
                      onClick={this.claimAirdrop}
                    />
            )
            : <Button
              fullWidth
              onClick={() => { this.setState({ dialogOpen: true }) }}
              className={classes.btn}
              variant='contained'
              >
              Login
            </Button>
          }
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <SubscribeDialog
            account={account}
            dialogOpen={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose}
          />
        </div>
      </ErrorBoundary>
    )
  }
}

AirdropPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  account: PropTypes.object,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const account = accountInfoSelector(state)
  return { account }
}

export default connect(mapStateToProps)(withStyles(styles)(AirdropPage))
