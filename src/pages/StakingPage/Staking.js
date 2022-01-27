import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Tabs, Tab, Snackbar, SnackbarContent, InputAdornment } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import YupInput from '../../components/Miscellaneous/YupInput'
import ConnectEth from '../../components/ConnectEth/ConnectEth'
import { accountInfoSelector } from '../../redux/selectors'
import { ethers } from 'ethers'
import { getPolygonWeb3Provider, getEthConnector } from '../../utils/eth'
import LIQUIDITY_ABI from '../../abis/LiquidityRewards.json'
import YUPETH_ABI from '../../abis/YUPETH.json'
// import axios from 'axios'
import CountUp from 'react-countup'

const isMobile = window.innerWidth <= 600
// const isMedium = window.innerWidth <= 900
// const isLarge = window.innerWidth <= 1200
// const isXL = window.innerWidth <= 1536

const { YUP_DOCS_URL, YUP_BUY_LINK, POLY_LP_RWRDS_CONTRACT, POLY_LP_TOKEN, ETH_LP_TOKEN, ETH_LP_RWRDS_CONTRACT } = process.env

const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    padding: `${isMobile ? '80px 2vw 80px 2vw' : '80px 8vw 80px 8vw'}`,
    overflowY: 'hidden',
    backgroundColor: theme.palette.alt.second
  },
  submitBtnTxt: {
    color: theme.palette.alt.second
  },
  page: {
    width: '100%',
    marginLeft: 0,
    overflowX: 'hidden'
  },
  maxBtn: {
    lineHeight: 0,
    maxWidth: 30,
    height: '100%'
  },
  submitBtn: {
    background: theme.palette.rainbowGradient,
    height: '100%'
  },
  aprText: {
    background: '-webkit-linear-gradient(45deg, #00e08e, #f0c909, #eb3650)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  },
  card: {
    padding: 20,
    border: '1px solid #616467',
    background: theme.palette.alt.second
  }
})

const StakingPage = ({ classes, account }) => {
  const { palette } = useTheme()

  const [activePolyTab, setActivePolyTab] = useState(0)
  const [activeEthTab, setActiveEthTab] = useState(0)
  const [ethConnectorDialog, setEthConnectorDialog] = useState(false)
  const [ethStakeAmt, setEthStakeAmt] = useState(3)
  const [polyStakeAmt, setPolyStakeAmt] = useState(2)
  const [polyApr, setPolyApr] = useState(0)
  const [ethApr, setEthApr] = useState(0)
  const [rwrdAmt, setRwrdAmt] = useState(0)
  const [polyLpBal, setPolyLpBal] = useState(2)
  const [ethLpBal, setEthLpBal] = useState(0)
  const [contracts, setContracts] = useState(null)
  const [address, setAddress] = useState('')
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [provider, setProvider] = useState(null)
  const [connector, setConnector] = useState(null)

  const handleEthTabChange = (e, newTab) => setActiveEthTab(newTab)
  const handlePolyTabChange = (e, newTab) => setActivePolyTab(newTab)
  const handleEthConnectorDialogClose = () => setEthConnectorDialog(false)
  const handleEthStakeAmountChange = ({ target }) => setEthStakeAmt(target.value)
  const handlePolyStakeAmountChange = ({ target }) => setPolyStakeAmt(target.value)
  const handleSnackbarOpen = msg => setSnackbarMsg(msg)
  const handleSnackbarClose = () => setSnackbarMsg('')
  const handleEthStakeMax = () => setEthStakeAmt(ethLpBal)
  const handlePolyStakeMax = () => setPolyStakeAmt(polyLpBal)

  useEffect(() => {
    setProvider(getPolygonWeb3Provider())
    setConnector(getEthConnector())
  }, [])

  useEffect(() => {
    if (!connector) { return }
    setAddress(connector._accounts[0])
  }, [connector])

  useEffect(() => {
    getContracts()
  }, [provider])

  useEffect(() => {
    if (!contracts) { return }
    getAprsAndRwrds()
    getStakeAmts()
    getBalances()
  }, [contracts])

  const getContracts = async () => {
    try {
      if (!provider) { return }
      const polyLiquidity = new provider.eth.Contract(LIQUIDITY_ABI, POLY_LP_RWRDS_CONTRACT)
      const ethLiquidity = new provider.eth.Contract(LIQUIDITY_ABI, ETH_LP_RWRDS_CONTRACT)
      const polyLpToken = new provider.eth.Contract(YUPETH_ABI, POLY_LP_TOKEN)
      const ethLpToken = new provider.eth.Contract(YUPETH_ABI, ETH_LP_TOKEN)
      setContracts({ polyLpToken, ethLpToken, polyLiquidity, ethLiquidity })
    } catch (err) {
      handleSnackbarOpen('An error occured. Try again later.')
      console.log('ERR getting token contracts', err)
    }
  }
  const getBalances = async () => {
    try {
      const polyBal = await contracts.polyLpToken.methods.balanceOf(address).call({ from: address })
      setPolyLpBal(polyBal)
      const ethBal = await contracts.ethLpToken.methods.balanceOf(address).call({ from: address })
      setEthLpBal(ethBal)
    } catch (err) {
      console.log('ERR getting balances', err)
    }
  }

  const getAprsAndRwrds = async () => {
    try {
      const ethApr = 5424
      // const ethApr = (await axios.get(`${REWARDS_MANAGER_API}/prices/apy`)).data.APY
      setEthApr(ethApr)
      setPolyApr(500.12)
      const rwrdsEarned = await contracts.polyLiquidity.methods.earned(address).call({ from: address })
      setRwrdAmt(rwrdsEarned)
    } catch (err) {
      console.log('ERR fetching rwrds and aprs', err)
    }
  }

  const getStakeAmts = async () => {
    try {
      const polyStake = await contracts.polyLiquidity.methods.balanceOf(address).call({ from: address })
      setPolyStakeAmt(polyStake / Math.pow(10, 18))
      const ethStake = await contracts.ethLiquidity.methods.balanceOf(address).call({ from: address })
      setEthStakeAmt(ethStake / Math.pow(10, 18))
    } catch (err) {
      console.log('ERR getting stake amts', err)
    }
  }

  const handleEthStaking = async () => {
    try {
      const isStake = !activeEthTab // index 0 active tab is stake, 1 is unstake
      console.log('isStake', isStake)
      const stakeAmt = ethers.BigNumber.from(ethStakeAmt)
      console.log('stakeAmt', stakeAmt)
    } catch (err) {
      console.log('ERR handling eth staking', err)
    }
  }

  const handlePolygonStaking = async () => {
    try {
      const stakeAmt = ethers.BigNumber.from(polyStakeAmt)
      await contracts.polyLiquidity.methods.stake(stakeAmt)
      console.log('activePolyTab', activePolyTab)
      console.log('stakeAmt', stakeAmt)
    } catch (err) {
      console.log('ERR handling polygon staking', err)
    }
  }

    return (
      <ErrorBoundary>
        <Helmet>
          <meta charSet='utf-8' />
          <title> Yup LP Staking </title>
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
        <Grid container
          className={classes.container}
        >
          <Grid className={classes.page}
            container
            direction='column'
            justify='center'
            alignItems='start'
            spacing={10}
          >
            <Snackbar
              autoHideDuration={4000}
              onClose={handleSnackbarClose}
              open={!!snackbarMsg}
            >
              <SnackbarContent
                message={snackbarMsg}
              />
            </Snackbar>
            <Grid item>
              <Grid
                container
                direction='column'
                spacing={2}
              >
                <Grid item>
                  <Typography variant='subtitle1'>
                    Provide liquidity, earn up to
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h1'
                    className={classes.aprText}
                  >
                    <CountUp
                      end={Math.max(polyApr, ethApr)}
                      decimals={2}
                      start={0}
                      duration={1}
                      suffix='% APR'
                    />
                  </Typography>
                </Grid>
                <Grid item
                  container
                  direction='row'
                  spacing={2}
                >
                  <Grid item>
                    <Button variant='outlined'
                      href={YUP_BUY_LINK}
                      target='_blank'
                    > Buy YUP </Button>
                  </Grid>
                  <Grid item>
                    <Button href={`${YUP_DOCS_URL}/protocol/yup-protocol`}
                      target='_blank'
                    > Learn More </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='start'
                spacing={5}
              >
                <Grid item
                  xs={12}
                  md={6}
                >
                  <Grid
                    container
                    direction='row'
                    spacing={4}
                  >
                    <Grid item
                      xs={3}
                    >
                      <img style={{ width: '100%' }}
                        src='images/graphics/yupeth.svg'
                        alt='yupeth graphic'
                      />
                    </Grid>
                    <Grid item
                      xs={9}
                    >
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                      >
                        <Grid item>
                          <Typography variant='subtitle1'>
                            Stake YUP-ETH Uniswap V2 LP Tokens from Ethereum
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='h5'>
                            {`${ethApr.toFixed(2)}% APR`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item
                      xs
                    >
                      <Grid item>
                        <Card
                          className={classes.card}
                        >
                          <Grid
                            container
                            direction='column'
                            spacing={2}
                          >
                            <Grid item>
                              <Tabs
                                value={activeEthTab}
                                onChange={handleEthTabChange}
                                TabIndicatorProps={{ style: { background: palette.rainbowGradient } }}
                              >
                                <Tab label='Staked' />
                                <Tab label='Unstaked' />
                              </Tabs>
                            </Grid>
                            <Grid item
                              xs={12}
                            >
                              <Grid
                                container
                                direction='column'
                                spacing={2}
                              >
                                <Grid item>
                                  <Grid
                                    container
                                    direction='row'
                                    spacing={1}
                                  >
                                    <Grid item
                                      xs
                                    >
                                      <Grid
                                        container
                                        justify='space-between'
                                      >
                                        <YupInput
                                          fullWidth
                                          id='stake-amount'
                                          maxLength='10'
                                          type='number'
                                          variant='outlined'
                                          size='small'
                                          value={ethStakeAmt}
                                          onChange={handleEthStakeAmountChange}
                                          adornment={<Button size='xs'
                                            variant='default'
                                            onClick={handleEthStakeMax}
                                            className={classes.maxBtn}
                                                     >Max</Button>}
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <Button size='large'
                                        variant='contained'
                                        className={classes.submitBtn}
                                      >
                                        <Typography variant='body1'
                                          className={classes.submitBtnTxt}
                                          onClick={handleEthStaking}
                                        >
                                          {activeEthTab ? 'Unstake' : 'Stake'}
                                        </Typography>
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction='column'
                                  >
                                    <Grid item>
                                      <Grid container
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
                                            {ethLpBal / Math.pow(10, 18)}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid
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
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item
                  xs={12}
                  md={6}
                >
                  <Grid
                    container
                    direction='row'
                    spacing={4}
                  >
                    <Grid item
                      xs={3}
                    >
                      <img style={{ width: '100%' }}
                        src='images/graphics/yupmatic.svg'
                        alt='yupmatic graphic'
                      />
                    </Grid>
                    <Grid item
                      xs={9}
                    >
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                      >
                        <Grid item>
                          <Typography variant='subtitle1'>
                            Stake YUP-WETH Uniswap V3 LP Tokens from Polygon
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='h5'>
                            {`${polyApr.toFixed(2)}% APR`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item
                      xs
                    >
                      <Grid item>
                        <Card
                          className={classes.card}
                        >
                          <Grid
                            container
                            direction='column'
                            spacing={2}
                          >
                            <Grid item>
                              <Tabs
                                value={activePolyTab}
                                onChange={handlePolyTabChange}
                                TabIndicatorProps={{ style: { background: palette.rainbowGradient } }}
                              >
                                <Tab label='Staked' />
                                <Tab label='Unstaked' />
                              </Tabs>
                            </Grid>
                            <Grid item
                              xs={12}
                            >
                              <Grid
                                container
                                direction='column'
                                spacing={2}
                              >
                                <Grid item>
                                  <Grid
                                    container
                                    direction='row'
                                    spacing={1}
                                  >
                                    <Grid item
                                      xs
                                    >
                                      <Grid
                                        container
                                        justify='space-between'
                                      >
                                        <YupInput
                                          fullWidth
                                          id='stake-amount'
                                          maxLength='10'
                                          type='number'
                                          variant='outlined'
                                          size='small'
                                          value={polyStakeAmt}
                                          onChange={handlePolyStakeAmountChange}
                                          adornment={<Button size='xs'
                                            variant='text'
                                            onClick={handlePolyStakeMax}
                                            className={classes.maxBtn}
                                                     >Max</Button>}
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <Button size='large'
                                        variant='contained'
                                        className={classes.submitBtn}
                                      >
                                        <Typography variant='body1'
                                          className={classes.submitBtnTxt}
                                          onClick={handlePolygonStaking}
                                        >
                                          {activePolyTab ? 'Unstake' : 'Stake'}
                                        </Typography>
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction='column'
                                  >
                                    <Grid item>
                                      <Grid container
                                        direction='row'
                                        justify='space-between'
                                      >
                                        <Grid item>
                                          <Typography variant='body2'>
                                            UNI V3 YUP-WETH LP in wallet:
                                          </Typography>
                                        </Grid>
                                        <Grid item>
                                          <Typography variant='body2'>
                                            {polyLpBal / Math.pow(10, 18)}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid
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
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item
                  xs={12}
                >
                  <Grid
                    container
                    direction='column'
                    spacing={4}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid item>
                      <Typography variant='h5'>
                        Rewards to Collect
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction='column'
                        spacing={2}
                      >
                        <Grid item>
                          <Grid
                            spacing={5}
                            container
                          >

                            <Grid item
                              xs={12}
                            >
                              <Grid
                                container
                                direction='column'
                                spacing={2}
                              >
                                <Grid item>
                                  <Grid
                                    container
                                    direction='row'
                                    spacing={1}
                                  >
                                    <Grid item
                                      xs
                                    >
                                      <Grid
                                        container
                                        justify='space-between'
                                      >
                                        <YupInput
                                          fullWidth
                                          id='stake-amount'
                                          maxLength='10'
                                          type='number'
                                          variant='outlined'
                                          size='small'
                                          disabled
                                          value={rwrdAmt}
                                          startAdornment={
                                            <InputAdornment position='start'>
                                              <img src='public/images/logos/logo_g.svg' />
                                            </InputAdornment>
                                            }
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <Button size='large'
                                        variant='contained'
                                        className={classes.submitBtn}
                                      >
                                        <Typography variant='body1'
                                          className={classes.submitBtnTxt}
                                        >
                                          Collect
                                        </Typography>
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <ConnectEth
              account={account}
              dialogOpen={ethConnectorDialog}
              handleDialogClose={handleEthConnectorDialogClose}
            />
          </Grid>
        </Grid>
      </ErrorBoundary>
    )
  }

const mapStateToProps = state => {
  const { router } = state
  const account = accountInfoSelector(state)
  return {
    feed: router.location.query.feed || state.homeFeed.feed,
    query: router.location.query,
    account
  }
}

StakingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired
}

export default memo(connect(mapStateToProps)(withStyles(styles)(StakingPage)))
