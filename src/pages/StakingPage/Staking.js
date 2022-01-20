import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Tabs, Tab } from '@material-ui/core'
// import { Skeleton } from '@material-ui/lab'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import '../../components/Tour/tourstyles.css'
import YupInput from '../../components/Miscellaneous/YupInput'
// import Colors from '../../utils/colors'
/* CLEAN UP */
const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    padding: '80px 220px 80px 220px',
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
                <Typography variant='h1'
                  style={{ background: '-webkit-linear-gradient(45deg, #00e08e, #f0c909, #eb3650)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }}
                >
                  523.432% APR
                </Typography>
              </Grid>
              <Grid item
                container
                direction='row'
                spacing={2}
              >
                <Grid item>
                  <Button variant='outlined'
                    href='https://matcha.xyz/markets/1/0x69bbc3f8787d573f1bbdd0a5f40c7ba0aee9bcc9/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                    target='_blank'
                  > Buy YUP </Button>
                </Grid>
                <Grid item>
                  <Button href='https://docs.yup.io/protocol/yup-protocol'
                    target='_blank'
                  > Learn More </Button>
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
                xs={12}
                md={6}
                container
                direction='row'
                spacing={4}
              >
                <Grid item
                  xs={44}
                >
                  <img src='images/graphics/yupeth.svg' />
                </Grid>
                <Grid item
                  xs={8}
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
                  spacing={4}
                >
                  <Grid item>
                    <Typography variant='subtitle1'>
                      Your Stake
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Card >
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                        sx={{ p: 2 }}
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
                            <Grid item
                              container
                              direction='column'
                              xs={12}
                              sx={{ p: 5 }}
                              spacing={2}
                            >
                              <Grid item
                                container
                                direction='row'
                                spacing={1}
                              >
                                <Grid item
                                  xs={10}
                                >
                                  <YupInput
                                    fullWidth
                                    id='name'
                                    maxLength='10'
                                    multiline
                                    type='text'
                                    variant='outlined'
                                    size='small'
                                  />
                                </Grid>
                                <Grid item
                                  xs={2}
                                >
                                  <Button size='large'
                                    variant='contained'
                                    style={{ height: '100%' }}
                                  >
                                    <Typography variant='body2'>
                                      Stake
                                    </Typography>
                                  </Button>
                                </Grid>
                              </Grid>
                              <Grid item
                                container
                                direction='column'
                              >
                                <Grid item
                                  container
                                  direction='row'
                                  justify='space-between'
                                >
                                  <Grid item>
                                    <Typography variant='body2'>
                                      UNI V2 YUP-ETH LP in wallet:
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant='body2'>
                                      --
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item
                                  container
                                  direction='row'
                                  justify='space-between'
                                >
                                  <Grid item>
                                    <Typography variant='body2'>
                                      Staked:
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant='body2'>
                                      0
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography variant='body2'>
                                  Pending YUP rewards will be automatically collected when you stake or unstake.
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item
                xs={12}
                md={6}
                container
                direction='row'
                spacing={4}
              >
                <Grid item
                  xs={44}
                >
                  <img src='images/graphics/yupeth.svg' />
                </Grid>
                <Grid item
                  xs={8}
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
                      Stake YUP-ETH LP Tokens from Uniswap V3 on Polygon
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
                  spacing={4}
                >
                  <Grid item>
                    <Typography variant='subtitle1'>
                      Your Stake
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Card >
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                        sx={{ p: 2 }}
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
                            <Grid item
                              container
                              direction='column'
                              xs={12}
                              sx={{ p: 5 }}
                              spacing={2}
                            >
                              <Grid item
                                container
                                direction='row'
                                spacing={1}
                              >
                                <Grid item
                                  xs={10}
                                >
                                  <YupInput
                                    fullWidth
                                    id='name'
                                    maxLength='10'
                                    multiline
                                    type='text'
                                    variant='outlined'
                                    size='small'
                                  />
                                </Grid>
                                <Grid item
                                  xs={2}
                                >
                                  <Button size='large'
                                    variant='contained'
                                    style={{ height: '100%' }}
                                  >
                                    <Typography variant='body2'>
                                      Stake
                                    </Typography>
                                  </Button>
                                </Grid>
                              </Grid>
                              <Grid item
                                container
                                direction='column'
                              >
                                <Grid item
                                  container
                                  direction='row'
                                  justify='space-between'
                                >
                                  <Grid item>
                                    <Typography variant='body2'>
                                      UNI V2 YUP-ETH LP in wallet:
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant='body2'>
                                      --
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item
                                  container
                                  direction='row'
                                  justify='space-between'
                                >
                                  <Grid item>
                                    <Typography variant='body2'>
                                      Staked:
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant='body2'>
                                      0
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography variant='body2'>
                                  Pending YUP rewards will be automatically collected when you stake or unstake.
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item
                xs={12}
                md={6}
                container
                direction='row'
                spacing={4}
              >
                <Grid item
                  container
                  direction='column'
                  spacing={4}
                >
                  <Grid item>
                    <Typography variant='h5'>
                      Rewards to Collect
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Card >
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                        sx={{ p: 2 }}
                      >
                        <Grid item>
                          <Grid item
                            spacing={5}
                            container
                          >
                            <Grid item
                              container
                              direction='column'
                              xs={12}
                              sx={{ p: 5 }}
                              spacing={2}
                            >
                              <Grid item
                                container
                                direction='row'
                                spacing={1}
                              >
                                <Grid item
                                  xs={10}
                                >
                                  <YupInput
                                    fullWidth
                                    id='name'
                                    maxLength='10'
                                    multiline
                                    type='text'
                                    variant='outlined'
                                    size='small'
                                  />
                                </Grid>
                                <Grid item
                                  xs={2}
                                >
                                  <Button size='large'
                                    variant='contained'
                                    style={{ height: '100%' }}
                                  >
                                    <Typography variant='body2'>
                                      Collect
                                    </Typography>
                                  </Button>
                                </Grid>
                              </Grid>
                              <Grid item
                                container
                                direction='column'
                              >
                                <Grid item
                                  container
                                  direction='row'
                                  justify='space-between'
                                >
                                  <Grid item>
                                    <Typography variant='body2'>
                                      Last collected:
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant='body2'>
                                      --
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item
                                  container
                                  direction='row'
                                  justify='space-between'
                                >
                                  <Grid item>
                                    <Typography variant='body2'>
                                      Collected to date:
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant='body2'>
                                      0
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
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
