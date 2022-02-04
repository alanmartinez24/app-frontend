import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Typography, Card, Button, Tabs, Tab, Snackbar, SnackbarContent, InputAdornment } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import YupInput from '../../components/Miscellaneous/YupInput'
import ConnectEth from '../../components/ConnectEth/ConnectEth'
import LoadingBar from '../../components/Miscellaneous/LoadingBar'
import { accountInfoSelector } from '../../redux/selectors'
import { getPolygonWeb3Provider, getEthConnector } from '../../utils/eth'
import LIQUIDITY_ABI from '../../abis/LiquidityRewards.json'
import YUPETH_ABI from '../../abis/YUPETH.json'
import CountUp from 'react-countup'
import axios from 'axios'
import { getPolyContractAddresses } from '@yupio/contract-addresses'

const { YUP_DOCS_URL, YUP_BUY_LINK, POLY_CHAIN_ID, REWARDS_MANAGER_API } = process.env

const { POLY_LIQUIDITY_REWARDS, POLY_UNI_LP_TOKEN, ETH_UNI_LP_TOKEN, ETH_LIQUIDITY_REWARDS } = getPolyContractAddresses(POLY_CHAIN_ID)

const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    padding: '80px 8vw 80px 8vw',
    overflowY: 'hidden',
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      padding: '80px 2vw 80px 2vw'
    }
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
    background: theme.palette.alt.second,
    border: `1px solid ${theme.palette.alt.fifth}`
  }
})

const StakingPage = ({ classes, account }) => {
  const { palette } = useTheme()

  const [activePolyTab, setActivePolyTab] = useState(0)
  const [activeEthTab, setActiveEthTab] = useState(0)
  const [ethConnectorDialog, setEthConnectorDialog] = useState(false)

  const [ethStakeInput, setEthStakeInput] = useState(0) // amount of eth uni lp to stake
  const [polyStakeInput, setPolyStakeInput] = useState(0) // amount of poly uni lp to stake

  const [polyApr, setPolyApr] = useState(0)
  const [ethApr, setEthApr] = useState(0)

  const [polyRwrdAmt, setPolyRwrdAmt] = useState(0) // amt in rewards poly uni lpto claim
  const [ethRwrdAmt, setEthRwrdAmt] = useState(0) // amt in rewards eth uni lp to claim

  const [polyLpBal, setPolyLpBal] = useState(0) // available poly uni lp bal
  const [ethLpBal, setEthLpBal] = useState(0) // available eth uni lp bal

  const [currentStakeEth, setCurrentStakeEth] = useState(0) // current amount staked
  const [currentStakePoly, setCurrentStakePoly] = useState(0) // current amount staked

  const [contracts, setContracts] = useState(null)
  const [address, setAddress] = useState('')
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [provider, setProvider] = useState(null)
  const [connector, setConnector] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [walletIsConnected, setWalletIsConnected] = useState(false)

  const handleEthTabChange = (e, newTab) => setActiveEthTab(newTab)
  const handlePolyTabChange = (e, newTab) => setActivePolyTab(newTab)
  const handleEthConnectorDialogClose = () => setEthConnectorDialog(false)
  const handleEthStakeAmountChange = ({ target }) => setEthStakeInput(target.value)
  const handlePolyStakeAmountChange = ({ target }) => setPolyStakeInput(target.value)
  const handleSnackbarOpen = msg => setSnackbarMsg(msg)
  const handleSnackbarClose = () => setSnackbarMsg('')

  const handleEthStakeMax = () => {
    const isStake = !activeEthTab
    setEthStakeInput(toBaseNum(isStake ? ethLpBal : currentStakeEth))
  }
  const handlePolyStakeMax = () => {
    const isStake = !activePolyTab
    setPolyStakeInput(toBaseNum(isStake ? polyLpBal : currentStakePoly))
  }

  useEffect(() => {
    setConnector(getEthConnector())
    setProvider(getPolygonWeb3Provider())
    getAprs()
  }, [])

  useEffect(() => {
    if (!connector || !connector._connected) { return }
    if (connector.chainId !== Number(POLY_CHAIN_ID)) {
      handleSnackbarOpen('Wrong network. Please connect to Polygon')
      return
    }
    setWalletIsConnected(true)
    setAddress(connector.accounts[0])
  }, [connector])

  useEffect(() => {
    if (!provider) { return }
    getContracts()
  }, [provider])

  useEffect(() => {
    if (!contracts || !address) { return }
    getBalances()
  }, [contracts])

  const getContracts = async () => {
    try {
      if (!provider) { return }
      const polyLiquidity = new provider.eth.Contract(LIQUIDITY_ABI, POLY_LIQUIDITY_REWARDS)
      const ethLiquidity = new provider.eth.Contract(LIQUIDITY_ABI, ETH_LIQUIDITY_REWARDS)
      const polyLpToken = new provider.eth.Contract(YUPETH_ABI, POLY_UNI_LP_TOKEN)
      const ethLpToken = new provider.eth.Contract(YUPETH_ABI, ETH_UNI_LP_TOKEN)
      setContracts({ polyLpToken, ethLpToken, polyLiquidity, ethLiquidity })
    } catch (err) {
      handleSnackbarOpen('An error occured. Try again later.')
      console.log('ERR getting token contracts', err)
    }
  }
  const getBalances = async (addressParam = null) => { // pass in address from child comp if function called from ConnectEth comp
    try {
      const acct = addressParam || address
      const polyBal = await contracts.polyLpToken.methods.balanceOf(acct).call({ from: acct })
      const polyStake = await contracts.polyLiquidity.methods.balanceOf(acct).call({ from: acct })
      const ethStake = await contracts.ethLiquidity.methods.balanceOf(acct).call({ from: acct })
      const ethBal = await contracts.ethLpToken.methods.balanceOf(acct).call({ from: acct })
      const polyRwrdsEarned = await contracts.polyLiquidity.methods.earned(acct).call({ from: acct })
      const ethRwrdsEarned = await contracts.polyLiquidity.methods.earned(acct).call({ from: acct })
      setPolyRwrdAmt(polyRwrdsEarned)
      setEthRwrdAmt(ethRwrdsEarned)
      setCurrentStakePoly(polyStake)
      setCurrentStakeEth(ethStake)
      setPolyLpBal(polyBal)
      setEthLpBal(ethBal)
      setWalletIsConnected(true)
    } catch (err) {
      console.log('ERR getting balances', err)
    }
  }

  const getAprs = async () => {
    try {
      const ethApr = (await axios.get(`${REWARDS_MANAGER_API}/prices/apy`)).data.APY
      setEthApr(ethApr)
      setPolyApr(500.12)
    } catch (err) {
      console.log('ERR fetching rwrds and aprs', err)
    }
  }

  const handleStakingAction = async (lpToken) => {
    if (!walletIsConnected) {
      setEthConnectorDialog(true)
      return
    }
    setIsLoading(true)
    const txBody = {
      from: address,
      gas: 800000
    }
    if (lpToken === 'eth') {
      await handleEthStakeAction(txBody)
    } else if (lpToken === 'poly') {
      await handlePolyStakeAction(txBody)
    }
    setIsLoading(false)
  }

  const toBaseNum = (num) => num / Math.pow(10, 18)
  const toGwei = (num) => num * Math.pow(10, 18)
  const formatDecimals = (num) => Number(Number(num).toFixed(3))

  const handleEthStakeAction = async (txBody) => {
    const isStake = !activeEthTab
    if (ethStakeInput === '0') {
      handleSnackbarOpen('Please enter a valid amount.')
      return
    }
    try {
      const stakeAmt = window.BigInt(toGwei(Number(ethStakeInput)))

      if (isStake) {
        const approveTx = {
          ...txBody,
          to: ETH_UNI_LP_TOKEN,
          data: contracts.polyLpToken.methods.approve(ETH_LIQUIDITY_REWARDS, stakeAmt).encodeABI()
        }
        await connector.sendTransaction(approveTx)
      }

      const stakeTx = {
        ...txBody,
        to: ETH_LIQUIDITY_REWARDS,
        data: isStake ? contracts.ethLiquidity.methods.stake(stakeAmt).encodeABI()
        : contracts.ethLiquidity.methods.withdraw(stakeAmt).encodeABI()
      }
      await connector.sendTransaction(stakeTx)
      const updatedLpBal = isStake ? toBaseNum(ethLpBal) - Number(ethStakeInput) : toBaseNum(ethLpBal) + Number(ethStakeInput)
      const updatedStake = isStake ? toBaseNum(currentStakeEth) + Number(ethStakeInput) : toBaseNum(currentStakeEth) - Number(ethStakeInput)
      setEthLpBal(toGwei(updatedLpBal)) // optimistic balance update
      setCurrentStakeEth(updatedStake * Math.pow(10, 18)) // optimistic stake update
    } catch (err) {
      handleSnackbarOpen(`There was a problem ${isStake ? 'staking' : 'unstaking'} ETH UNI-LP V2. ${err.message}`)
      console.log('ERR handling eth staking', err)
    }
  }

  const handlePolyStakeAction = async (txBody) => {
    const isStake = !activePolyTab
    if (polyStakeInput === '0') {
      handleSnackbarOpen('Please enter a valid amount.')
      return
    }
    try {
      const stakeAmt = window.BigInt(Number(polyStakeInput) * Math.pow(10, 18))
      if (isStake) {
        const approveTx = {
          ...txBody,
          to: POLY_UNI_LP_TOKEN,
          data: contracts.polyLpToken.methods.approve(POLY_LIQUIDITY_REWARDS, stakeAmt).encodeABI()
        }
        await connector.sendTransaction(approveTx)
      }
      const stakeTx = {
        ...txBody,
        to: POLY_LIQUIDITY_REWARDS,
        data: isStake ? contracts.polyLiquidity.methods.stake(stakeAmt).encodeABI()
        : contracts.polyLiquidity.methods.withdraw(stakeAmt).encodeABI()
      }
      await connector.sendTransaction(stakeTx)

      const updatedLpBal = isStake ? toBaseNum(polyLpBal) - Number(polyStakeInput) : toBaseNum(polyLpBal) + Number(polyStakeInput)
      const updatedStake = isStake ? toBaseNum(currentStakePoly) + Number(polyStakeInput) : toBaseNum(currentStakePoly) - Number(polyStakeInput)
      setPolyLpBal(toGwei(updatedLpBal)) // optimistic balance update
      setCurrentStakePoly(toGwei(updatedStake)) // optimistic stake update
    } catch (err) {
      handleSnackbarOpen(`There was a problem ${isStake ? 'staking' : 'unstaking'}. ${err.message}`)
      console.log('ERR handling polygon staking', err)
    }
  }
  const collectRewards = async () => {
    try {
      if (!connector) {
        setEthConnectorDialog(true)
        return
      }
      setIsLoading(true)
      const txBody = {
        from: address,
        gas: 800000
      }
      if (ethRwrdAmt > 0) {
        const ethCollectTx = {
          ...txBody,
          to: ETH_LIQUIDITY_REWARDS,
          data: contracts.ethLiquidity.methods.getReward().encodeABI()
        }
        await connector.sendTransaction(ethCollectTx)
        setEthRwrdAmt(0)
      }
      if (polyRwrdAmt > 0) {
        const polyCollectTx = {
          ...txBody,
          to: POLY_LIQUIDITY_REWARDS,
          data: contracts.polyLiquidity.methods.getReward().encodeABI()
        }
        await connector.sendTransaction(polyCollectTx)
        setPolyRwrdAmt(0)
      }
      setIsLoading(false)
    } catch (err) {
      handleSnackbarOpen('There was a problem collecting your rewards.')
      console.log('ERR collecting rewards', err)
    }
  }
    return (
      <ErrorBoundary>
        <Helmet>
          <meta charSet='utf-8' />
          <title> Yup Staking </title>
          <meta property='description'
            content='A page for claiming YUP and YUPETH associated with your Yup account, essentially migrating it to the Polygon blockchain.'
          />
          <meta property='image'
            content='https://app-meta-images.s3.amazonaws.com/migrationthumbnail.jpg'
          />
          <meta name='twitter:card'
            content='summary_large_image'
          />
          <meta
            name='twitter:title'
            content='Yup Polygon Migration'
          />
          <meta name='twitter:site'
            content='@yup_io'
          />
          <meta
            name='twitter:description'
            content='A page for claiming YUP and YUPETH associated with your Yup account, essentially migrating it to the Polygon blockchain.'
          />
          <meta
            name='twitter:image'
            content='https://app-meta-images.s3.amazonaws.com/migrationthumbnail.jpg'
          />
          <meta
            property='og:title'
            content='Yup Polygon Migration'
          />
          <meta
            property='og:description'
            content='A page for claiming YUP and YUPETH associated with your Yup account, essentially migrating it to the Polygon blockchain.'
          />
          <meta property='og:image'
            content='https://app-meta-images.s3.amazonaws.com/migrationthumbnail.jpg'
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
            <LoadingBar isLoading={isLoading} />
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
                      duration={3}
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
                            {`${ethApr && formatDecimals(ethApr)}% APR`}
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
                                          value={ethStakeInput}
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
                                          onClick={() => handleStakingAction('eth')}
                                        >
                                          {walletIsConnected ? activeEthTab ? 'Unstake' : 'Stake' : 'Connect'}
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
                                            {formatDecimals(toBaseNum(ethLpBal))}
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
                                              {formatDecimals(toBaseNum(currentStakeEth))}
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
                            {`${polyApr && formatDecimals(polyApr)}% APR`}
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
                                          value={polyStakeInput}
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
                                          onClick={() => handleStakingAction('poly')}
                                        >
                                          {walletIsConnected ? activePolyTab ? 'Unstake' : 'Stake' : 'Connect'}
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
                                            {formatDecimals(toBaseNum(polyLpBal))}
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
                                              {formatDecimals(toBaseNum(currentStakePoly))}
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
                                          value={formatDecimals(toBaseNum(polyRwrdAmt + ethRwrdAmt))}
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
                                          onClick={collectRewards}
                                        >
                                          {walletIsConnected ? 'Collect' : 'Connect'}
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
              getBalances={getBalances}
              setConnector={setConnector}
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
