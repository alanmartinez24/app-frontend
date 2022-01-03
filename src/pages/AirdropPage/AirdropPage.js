import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Snackbar, SnackbarContent } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Colors from '../../utils/colors'
import YupInput from '../../components/Miscellaneous/YupInput'
import SubscribeDialog from '../../components/SubscribeDialog/SubscribeDialog'
import axios from 'axios'
import CountUp from 'react-countup'
import { accountInfoSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import { getAuth } from '../../utils/authentication'

const BACKEND_API = 'http://localhost:4001'
// const { BACKEND_API } = process.env
const AIRDROP_IMG = 'https://miro.medium.com/max/1400/0*zvnqZxE7NNDduw6c.png'

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
    width: 380,
    height: '45px',
    borderRadius: '0.65rem',
    marginTop: 15,
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
  card: {
    padding: theme.spacing(2),
    height: '70%',
    width: 380,
    marginBottom: 0,
    boxShadow:
      `0px 0px 30px 0px ${theme.palette.shadow.first}44, 0px 0px 0.75px  ${theme.palette.shadow.first}66`,
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20vh',
      width: '90%'
    }
  },
  skeleton: {
    background: `linear-gradient(90deg, ${Colors.Green}33, ${Colors.Moss}33, ${Colors.Yellow}33, ${Colors.Orange}33,  ${Colors.Red}33)`,
    transform: 'none'
  }
})

const AirdropMetaTags = ({ polygonAddress, airdrop }) => {
  const metaDescription = polygonAddress ? `${polygonAddress.slice(0, 5)}...${polygonAddress.slice(-6, -1)} has ${Math.round(airdrop)} $YUP ready to be airdropped to Polygon`
  : `Claim your airdrop on Polygon`
  const metaTitle = 'yup NFT Creator Rewards'
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>Airdrop</title>
      <meta property='description'
        content={metaDescription}
      />
      <meta property='image'
        content={AIRDROP_IMG}
      />
      <meta name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:title'
        content={metaTitle}
      />
      <meta name='twitter:site'
        content='@yup_io'
      />
      <meta
        name='twitter:description'
        content={metaDescription}
      />
      <meta
        name='twitter:image'
        content={AIRDROP_IMG}
      />
      <meta
        property='og:title'
        content={metaTitle}
      />
      <meta
        property='og:description'
        content={metaDescription}
      />
      <meta property='og:image'
        content={AIRDROP_IMG}
      />
    </Helmet>
  )
}

class AirdropPage extends Component {
  state = {
    isLoading: false,
    polygonAddress: this.props.location.pathname.split('/')[2] || '',
    airdrop: null,
    dialogOpen: false,
    snackbarMsg: null
  }
  componentDidMount = () => {
    const polygonAddress = this.props.location.pathname.split('/')[2]
    if (polygonAddress) {
      this.setState({ polygonAddress }, () => { this.fetchAirdropData() })
    }
  }

  handleInput = e => { this.setState({ polygonAddress: (e.target.value).toLowerCase() }) }
  handleDialogClose = () => { this.setState({ dialogOpen: false }) }

  onSubmit = async (e) => {
    try {
      this.setState({ isLoading: true })
      if (!this.state.airdrop) {
        await this.fetchAirdropData()
      }
      e.preventDefault()
      this.props.history.push(`/airdrop/${this.state.polygonAddress}`)
      this.setState({ isLoading: true })
      await this.claimAirdrop()
    } catch (err) {
      if (err.response && err.response.status === 422) {
        this.setState({ snackbarMsg: 'Please enter a valid polygon address' })
      }
    }
  }

  claimAirdrop = async () => {
    try {
      this.setState({ isLoading: true })
      const { polygonAddress } = this.state
      const { account } = this.props
      const auth = await getAuth(account)
      const params = { polygonAddress, eosname: account.name, ...auth }
      const res = (await axios.post(`${BACKEND_API}/airdrop/claim`, params)).data
      console.log(`res`, res)
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
      console.log(`airdrop`, airdrop)
      localStorage.setItem('POLY_AIRDROP', airdrop)
      this.setState({ airdrop })
    } catch (err) {
      this.setState({ snackbarMsg: 'Something went wrong' })
    }
    this.setState({ isLoading: false })
  }

  render () {
    const { classes, account } = this.props
    const { isLoading, airdrop, snackbarMsg, polygonAddress } = this.state
    console.log(`polygonAddress`, !!polygonAddress)
    return (
      <ErrorBoundary>
        <AirdropMetaTags polygonAddress={polygonAddress}
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
                  <form>
                    <YupInput
                      fullWidth
                      id='address'
                      maxLength={50}
                      label={'Address'}
                      type='text'
                      onSubmit={this.onSubmit}
                      value={this.state.polygonAddress}
                      variant='outlined'
                      onChange={this.handleInput}
                    />
                  </form>
                </Grid>
              </Grid>
            </Card>
            <Card className={classes.card}
              style={{ display: airdrop !== null || isLoading ? 'inherit' : 'none' }}
              elevation={0}
            >
              <Grid container
                direction='row'
              >
                <Grid
                  item
                  container
                  justifyContent='center'
                  alignItems='center'
                  direction='row'
                >
                  <Typography variant='h2'
                    style={{ color: '#00E08E' }}
                  >
                    { isLoading
                    ? <Skeleton
                      animation='pulse'
                      className={classes.skeleton}
                      >&nbsp;&nbsp;&nbsp;&nbsp;</Skeleton>
                      : <CountUp
                        end={airdrop && airdrop.amount}
                        decimals={2}
                        start={0}
                        duration={1}
                        suffix=' YUP'
                        /> }
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            {account && account.name ? (
              <Button
                fullWidth
                className={classes.btn}
                variant='contained'
                disabled={polygonAddress === ''}
                onClick={this.onSubmit}
              >
                Claim
              </Button>
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

AirdropMetaTags.propTypes = {
  airdrop: PropTypes.string,
  polygonAddress: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const account = accountInfoSelector(state)
  return { account }
}

export default connect(mapStateToProps)(withStyles(styles)(AirdropPage))
