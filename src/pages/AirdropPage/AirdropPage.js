import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Snackbar, SnackbarContent, Icon } from '@material-ui/core'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import YupInput from '../../components/Miscellaneous/YupInput'
import SubscribeDialog from '../../components/SubscribeDialog/SubscribeDialog'
import axios from 'axios'
import CountUp from 'react-countup'
import { accountInfoSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import { getAuth } from '../../utils/authentication'
import rollbar from '../../utils/rollbar'
import MetaTags from '../../components/Airdrop/MetaTags'
// import YupStepper from '../../components/Airdrop/YupStepper'
import LoaderButton from '../../components/Miscellaneous/LoaderButton'
import { isAddress } from 'web3-utils'
import { TwitterShareButton } from 'react-share'
import Colors from '../../utils/colors'

const BACKEND_API = 'http://localhost:4001'
const { WEB_APP_URL } = process.env

const styles = theme => ({
  page: {
    minHeight: '100vh',
    maxWidth: '100vw',
    backgroundColor: theme.palette.alt.second
  },
  balanceContainer: {
    borderRadius: '0.65rem',
    border: `solid 2px ${Colors.B6}`
  },
  card: {
    padding: theme.spacing(6),
    width: 450,
    boxShadow:
      `0px 0px 30px 0px ${theme.palette.shadow.first}44, 0px 0px 0.75px  ${theme.palette.shadow.first}66`,
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      width: 350
    }
  },
  btn: {
  },
  rainbowBtn: {
  },
  stepper: {
    position: 'fixed',
    top: 20
  }
})

class AirdropPage extends Component {
  state = {
    isLoading: false,
    polygonAddress: this.props.location.pathname.split('/')[2] || '',
    airdrop: null,
    subscribeDialogOpen: false,
    snackbarMsg: null,
    activeStep: 0
  }

  incrementStep = () => this.setState((prevState, props) => ({
    activeStep: prevState.activeStep + 1
}))

  handleInput = e => this.setState({ polygonAddress: (e.target.value).toLowerCase() })

  handleSubscribeDialogClose = () => this.setState({ subscribeDialogOpen: false })
  handleSubscribeDialogOpen = () => this.setState({ subscribeDialogOpen: true })

  handleSnackbarClose = () => this.setState({ snackbarMsg: '' })

  claimAirdrop = async () => {
    const { polygonAddress } = this.state
    const { account } = this.props
    if (!isAddress(polygonAddress)) {
      this.setState({ snackbarMsg: 'Please enter a valid polygon address' })
      return
    }

    this.setState({ isLoading: true, activeStep: 2 })
    const auth = await getAuth(account)
    const params = { polygonAddress, eosname: account.name, ...auth }

    try {
      await axios.post(`${BACKEND_API}/airdrop/claim`, params)
      this.setState({ activeStep: 3 })
    } catch (err) {
      rollbar.error(`Error claiming airdrop: ${JSON.stringify(err)}`)
      this.setState({ snackbarMsg: 'Something went wrong. Try again later.' })
    }
    this.setState({ isLoading: false })
  }

  fetchAirdropData = async () => {
    try {
      this.setState({ isLoading: true })
      const airdrop = (await axios.get(`${BACKEND_API}/airdrop?eosname=${this.props.account.name}`)).data
      this.setState({ airdrop, activeStep: 1 })
    } catch (err) {
      rollbar.error(`Error fetching airdrop data: ${JSON.stringify(err)}`)
      this.setState({ snackbarMsg: 'Something went wrong. Try again later.' })
    }
    this.setState({ isLoading: false })
  }

  render () {
    const { classes, account } = this.props
    const { isLoading, airdrop, snackbarMsg, polygonAddress, activeStep, subscribeDialogOpen } = this.state
    const isValidAddress = isAddress(polygonAddress)

    const enableClaim = airdrop && isValidAddress
    const shareStep = activeStep === 3
//    const steps = ['Check', 'Claim', 'Share']

    return (
      <ErrorBoundary>
        <MetaTags polygonAddress={polygonAddress}
          airdrop={airdrop}
        />
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
          {/* <YupStepper steps={steps}
            activeStep={activeStep}
            className={classes.stepper}
    /> */}
          <Card className={classes.card}
            elevation={0}
          >
            <Grid container
              alignItems='stretch'
              direction='column'
              justify='center'
              spacing={3}
            >
              <Grid
                container
                direction='row'
                justify='space-around'
              >
                <img
                  src='/images/graphics/yuppoly.png'
                  alt='yup logo'
                  height='90'
                />

              </Grid>
              <Grid item>
                <Typography
                  variant='h5'
                  align='center'
                >
                  {shareStep ? 'Congratulations' : 'Polygon Migration'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant='body2'
                  align='center'
                >
                  {shareStep ? "You've claimed" : 'You can claim'}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container
                  direction='column'
                >
                  <Grid item>
                    <Typography variant='h3'
                      style={{ color: airdrop ? Colors.Green : Colors.B6, textAlign: 'center' }}
                    >
                      <CountUp
                        end={airdrop && airdrop.amount}
                        decimals={2}
                        start={0}
                        duration={2}
                        suffix=' YUP'
                      />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h3'
                      style={{ color: airdrop ? Colors.Green : Colors.B6, textAlign: 'center' }}
                    >
                      <CountUp
                        end={airdrop && airdrop.amount}
                        decimals={2}
                        start={0}
                        duration={2}
                        suffix=' YUPETH'
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {shareStep
              ? <Grid item>
                <Button
                  fullWidth
                  onClick={this.handleSubscribeDialogOpen}
                  className={classes.rainbowBtn}
                  variant='contained'
                  startIcon={<Icon className='fa fa-upload' />}
                >
                  Stake
                </Button>
              </Grid> : <Grid item /> }
              <Grid item>
                <Typography
                  variant='body2'
                  align='center'
                >
                  {shareStep ? 'Let the people know!' : 'Input a Polygon address to link account & receive tokens'}
                </Typography>
              </Grid>
              <Grid item>
                <YupInput
                  style={{ display: shareStep ? 'none' : 'inherit' }}
                  fullWidth
                  id='address'
                  maxLength={50}
                  label='Address'
                  type='text'
                  onSubmit={this.fetchAirdropData}
                  inputIsValid={isValidAddress}
                  value={polygonAddress}
                  variant='outlined'
                  onChange={this.handleInput}
                  onClick={this.incrementStep}
                />
              </Grid>
              <Grid item>
                {!shareStep ? account && account.name ? (
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
              onClick={this.handleSubscribeDialogOpen}
              className={classes.btn}
              variant='contained'
              >
              Login
            </Button>
                  : <Grid container
                    direction='row'
                    alignContent='stretch'
                    >
                    <Grid item
                      xs={6}
                    >
                      <TwitterShareButton
                        url={`${WEB_APP_URL}/airdrop`}
                        title={`Claiming #polygon airdrop on @yup_io`}
                        hashtags={['YUP']}
                        windowWidth={800}
                        windowHeight={600}
                        className={classes.btn}
                      >
                        <Icon className='fa fa-twitter fa-2x' />
                      </TwitterShareButton>
                    </Grid>
                    <Grid item
                      xs={6}
                    >
                      <Button
                        fullWidth
                        onClick={this.handleSubscribeDialogOpen}
                        className={classes.rainbowBtn}
                        variant='outlined'
                        startIcon={<Icon className='fa fa-copy fa-2x' />}
                      >
                        Copy
                      </Button>
                    </Grid>
                  </Grid>
          }
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <SubscribeDialog
          account={account}
          dialogOpen={subscribeDialogOpen}
          handleDialogClose={this.handleSubscribeDialogClose}
        />
      </ErrorBoundary>
    )
  }
}

AirdropPage.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const account = accountInfoSelector(state)
  return { account }
}

export default connect(mapStateToProps)(withStyles(styles)(AirdropPage))
