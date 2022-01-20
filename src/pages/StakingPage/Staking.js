import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Tabs, Tab } from '@material-ui/core'
// import { Skeleton } from '@material-ui/lab'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import '../../components/Tour/tourstyles.css'
// import Colors from '../../utils/colors'
/* CLEAN UP */
const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    padding: '80px 220px 80px 260px',
    overflowY: 'hidden',
    backgroundColor: theme.palette.alt.second
  },
  page: {
    width: '100%',
    marginLeft: 0,
    overflowX: 'hidden',
    flex: 1
  },
  sideFeed: {
    position: 'fixed',
    marginLeft: '38vw',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  Card: {
    padding: theme.spacing(2),
    height: '70%',
    width: '300px',
    marginBottom: 0,
    boxShadow:
      `0px 0px 30px 0px ${theme.palette.shadow.first}44, 0px 0px 0.75px  ${theme.palette.shadow.first}66`,
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20vh',
      width: '90%'
    }
  }
})

/* CLEAN UP */
class StakingPage extends Component {
  state = {
  }

  render () {
    const { classes } = this.props

    return (
      <ErrorBoundary>
        <Helmet>
          <meta charSet='utf-8' />
          <title>  </title>
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
            alignItems='start'
            spacing={10}
          >
            <Grid item
              container
              direction='column'
              spacing={5}
            >
              <Grid item>
                <Typography variant='subtitle1'>
                  Provide liquidity, earn up to
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h1'>
                  523.432% APR
                </Typography>
              </Grid>
              <Grid item
                container
                direction='row'
                spacing={2}
              >
                <Grid item>
                  <Button variant='outlined'> Buy YUP </Button>
                </Grid>
                <Grid item>
                  <Button> Learn More </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item
              container
              direction='row'
              justify='space-between'
              alignItems='start'
              spacing={5}
            >
              <Grid item
                xs={6}
                container
                direction='row'
                spacing={4}
              >
                <Grid item
                  xs={2}
                >
                  <Card>
                    <Typography variant='h6'>
                      Pic
                    </Typography>
                  </Card>
                </Grid>
                <Grid item
                  xs={10}
                  container
                  direction='column'
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant='body1'>
                      LP Token Staking
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle1'>
                      Stake YUP-ETH LP Tokens from Uniswap V2 on Ethereum
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h5'>
                      523.53% APR
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item
                  container
                  direction='column'
                  spacing={6}
                >
                  <Grid item>
                    <Typography variant='subtitle1'>
                      Your Stake
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Card>
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                      >
                        <Grid item>
                          <Tabs
                            aria-label='basic tabs example'
                          >
                            <Tab label='Staked' />
                            <Tab label='Unstaked' />
                          </Tabs>
                        </Grid>
                        <Grid item>
                          <Grid item
                            spacing={5}
                            container
                          >
                            <Grid item>
                              <Typography variant='h6'>
                                Main
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item
                xs={6}
              >
                <Card>
                  <Typography variant='h6'>
                    Text
                  </Typography>
                  <Button />
                </Card>
              </Grid>
              <Grid item
                xs={6}
              >
                <Card>
                  <Typography variant='h6'>
                    Text
                  </Typography>
                  <Button />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = state => {
  const { router } = state
  return {
    feed: router.location.query.feed || state.homeFeed.feed,
    query: router.location.query
  }
}

StakingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default memo(connect(mapStateToProps)(withStyles(styles)(StakingPage)))
