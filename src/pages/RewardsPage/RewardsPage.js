import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Colors from '../../utils/colors'
import YupInput from '../../components/Miscellaneous/YupInput'
import SubscribeDialog from '../../components/SubscribeDialog/SubscribeDialog'
import axios from 'axios'

const BACKEND_API = process.env.BACKEND_API
const REWARDS_MANAGER_API = process.env.REWARDS_MANAGER_API

const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    backgroundColor: theme.palette.alt.second
  },
  btn: {
    backgroundColor: '#00E08E',
    fontFamily: 'Gilroy',
    width: 350,
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
    width: '350px',
    marginBottom: 0,
    boxShadow:
      `0px 0px 30px 0px ${theme.palette.shadow.first}44, 0px 0px 0.75px  ${theme.palette.shadow.first}66`,
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20vh',
      width: '90%'
    }
  },
  Skeleton: {
    background: `linear-gradient(90deg, ${Colors.Green}33, ${Colors.Moss}33, ${Colors.Yellow}33, ${Colors.Orange}33,  ${Colors.Red}33)`
  }
})

class RewardsPage extends Component {
  state = {
    isLoading: false,
    ethAddress: this.props.location.pathname.split('/')[2] || '',
    rewards: null,
    price: null,
    dialogOpen: false
  }

  handleInput = e => {
    this.setState({ ethAddress: e.target.value })
  }

  componentDidMount = () => {
    const ethAddress = this.props.location.pathname.split('/')[2]
    if (ethAddress) {
      this.setState({ ethAddress }, () => { this.fetchCreatorRewards() })
      this.ethInput = ethAddress
    }
    axios.get(`${REWARDS_MANAGER_API}/prices/yupeth`).then(({ data }) => this.setState({ price: data.YUPETH }))
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.history.push(`/rewards/${this.state.ethAddress}`)
    this.setState({ isLoading: true })
    this.fetchCreatorRewards()
  }

  fetchCreatorRewards = async () => {
    try {
      const rewards = (await (axios.get(`${BACKEND_API}/rewards/eth/${this.state.ethAddress}`))).data.creatorRewards
      this.setState({ rewards })
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.log('Not a valid eth address')
      }
    }
    this.setState({ isLoading: false })
  }
  openWalletConnectDialog = () => this.setState({ dialogOpen: true })
  handleDialogClose = () => this.setState({ dialogOpen: false })

  render () {
    const { classes } = this.props
    const { isLoading, rewards, price, dialogOpen } = this.state
    console.log(`rewards in rewards page`, rewards)

    return (
      <ErrorBoundary>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Rewards</title>
          <meta property='description'
            content=''
          />
          <meta property='image'
            content=''
          />
          <meta name='twitter:card'
            content='summary_large_image'
          />
          <meta
            name='twitter:title'
            content=''
          />
          <meta name='twitter:site'
            content='@yup_io'
          />
          <meta
            name='twitter:description'
            content=''
          />
          <meta
            name='twitter:image'
            content=''
          />
          <meta
            property='og:title'
            content=''
          />
          <meta
            property='og:description'
            content=''
          />
          <meta property='og:image'
            content=''
          />
        </Helmet>
        <div className={classes.container}>
          <Grid className={classes.page}
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Card className={classes.card}
              elevation={0}
              style={{ background: 'transparent', boxShadow: 'none', padding: '16px 4px' }}
            >
              <Grid container
                justify='space-between'
                alignItems='center'
                direction='row'
                spacing={3}
              >
                <Grid item>
                  <Typography
                    variant='h4'
                  >
                    Check Rewards Eligibility
                  </Typography>
                </Grid>
                <Grid item
                  xs={12}
                >
                  <form onSubmit={this.onSubmit}>
                    <YupInput
                      fullWidth
                      id='name'
                      maxLength={50}
                      label={'Enter ETH address'}
                      type='text'
                      value={this.state.ethAddress}
                      variant='outlined'
                      onChange={this.handleInput}
                    /></form>
                </Grid>
              </Grid>
            </Card>
            <Card className={classes.card}
              style={{ display: rewards !== null ? 'inherit' : 'none' }}
              elevation={0}
            >
              <Grid container
                direction='row'
              >
                <Grid
                  item
                  container
                  alignItems='center'
                  direction='row'
                >
                  <Typography variant='h2'
                    style={{ color: '#00E08E' }}
                  >
                    { isLoading
                    ? <Skeleton
                      animation='pulse'
                      className={classes.Skeleton}
                      style={{ transform: 'none' }}
                      >&nbsp;&nbsp;&nbsp;&nbsp;</Skeleton> : `${rewards && rewards.toFixed(2)} YUP` }
                  </Typography>
                  <Typography variant='h4'
                    style={{ opacity: 0.5, marginLeft: 20 }}
                  >
                    ~{(price * rewards).toFixed(2)} USD
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            {rewards !== null && (
            <Button
              fullWidth
              className={classes.btn}
              onClick={this.openWalletConnectDialog}
              variant='contained'
            >
              Claim
            </Button>
            )}
            <SubscribeDialog
              dialogOpen={dialogOpen}
              method='walletconnect'
              rewards={rewards}
              handleDialogClose={this.handleDialogClose}
            />
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}

RewardsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default withStyles(styles)(RewardsPage)
