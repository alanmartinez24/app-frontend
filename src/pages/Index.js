import React, { Component, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import theme from '../utils/theme.js'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { reactReduxContext } from '../utils/history'
import { MuiThemeProvider } from '@material-ui/core/styles'
import wallet from '../eos/scatter/scatter.wallet'
import { loginScatter, signalConnection, setListOptions, updateEthAuthInfo, fetchUserCollections } from '../redux/actions'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
// import throttle from 'lodash/throttle'
import DotSpinner from '../components/DotSpinner/DotSpinner'
import Search from './Search/Search'

import YupLists from './YupLists/YupLists'
import Discover from './Discover/Discover'
import User from './User/User'
import PostPage from './PostPage/PostPage'
import TwitterOAuth from './TwitterOAuth/TwitterOAuth'
import Collections from './Collections/Collections'
import Analytics from './Analytics/Analytics'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

const { BACKEND_API } = process.env

const pathname = document.location.pathname
const isProtectedRoute = (pathname !== '/leaderboard' && pathname !== '/analytics')

class Index extends Component {
  state = {
    alertDialogOpen: false,
    isLoading: isProtectedRoute // all protected routes require wallet to load first
  }

  state = {}
  handleAlertDialogOpen = (msg) => {
    this.setState({ alertDialogOpen: true, alertDialogContent: msg })
  }

  handleAlertDialogClose = () => {
    this.setState({ alertDialogOpen: false, alertDialogContent: '' })
  }

  async fetchListOptions () {
    const { setListOpts } = this.props
    const updatedListOpts = (await axios.get(`${BACKEND_API}/v1/lists/listInfo`)).data
    setListOpts(updatedListOpts)
  }

  async checkEthAuth () {
    try {
      const { updateEthAuth } = this.props
      const ethAuthInfo = localStorage.getItem('YUP_ETH_AUTH')

      if (!ethAuthInfo) { return }

      const { address, signature } = JSON.parse(ethAuthInfo)
      await axios.post(`${BACKEND_API}/v1/eth/challenge/verify`, { address, signature }) // Will throw if challenge is invalid

      const account = (await axios.get(`${BACKEND_API}/accounts/eth?address=${address}`)).data
      const ethAuthUpdate = { address, signature, account }
      updateEthAuth(ethAuthUpdate)
    } catch (err) {}
  }

  // async fetchExtAuthInfo () {
  //   try {
  //     const { checkScatter, scatterInstall, getExtAuthToken } = this.props

  //     await wallet.detect(checkScatter, scatterInstall)
  //     if (wallet.connected) {
  //       getExtAuthToken()
  //     }
  //   } catch (err) {
  //     console.log('Failed to fetch auth info', err)
  //   }
  // }

  componentDidMount () {
    (async () => {
<<<<<<< HEAD
      // const { fetchSocialLevels } = this.props
      // fetchSocialLevels()
=======
      const { checkScatter, scatterInstall } = this.props
      wallet.detect(checkScatter, scatterInstall)
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab
      this.checkEthAuth()
      // this.fetchExtAuthInfo()
      if (pathname.startsWith('/leaderboard') || pathname.startsWith('/lists')) {
        await this.fetchListOptions()
      }
    //  this.setState({ isLoading: false })
    })()
  }

  componentDidUpdate (prevProps) {
    const { getLoggedUserCollections, accountName } = this.props
    if (accountName && prevProps.accountName !== accountName) {
      getLoggedUserCollections(accountName)
    }
  }

  render () {
    console.log(this.props)
  const history = this.props.history
 console.log(history, 'historyyy')
    if (this.state.isLoading) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
        >
          <DotSpinner />
        </div>
      )
    }

    const metaTitle = 'Yup • Social Layer for the Internet'

    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <Helmet>
            <meta charSet='utf-8' />
            <title> {metaTitle} </title>
            <meta name='description'
              content={metaTitle}
            />
          </Helmet>
          <ConnectedRouter history={history}
            context={reactReduxContext}
          >
            <div>
              <Header />
              <Switch>
                <Route component={Discover}
                  exact
                  path='/'
                />
                <Route component={YupLists}
                  path='/leaderboard'
                />
                <Route component={Search}
                  path='/search'
                />
                <Route component={TwitterOAuth}
                  path='/twitter/:userid'
                />
                <Route component={PostPage}
                  exact
                  path='/p/:postid'
                />
                <Route component={Analytics}
                  exact
                  path='/:username/analytics'
                />
                <Route component={Collections}
                  exact
                  path='/collections/:name/:id'
                />
                <Route component={User}
                  exact
                  path='/:username'
                />
                <Redirect from='*'
                  to='/'
                />
                <Redirect from='/lists'
                  to='/leaderboard'
                />
              </Switch>
              <Footer />
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
        <Dialog
          aria-describedby='alert-dialog-description'
          aria-labelledby='alert-dialog-title'
          onClose={this.handleAlertDialogClose}
          open={this.state.alertDialogOpen}
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              { this.state.alertDialogContent }
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

Index.propTypes = {
<<<<<<< HEAD
  // fetchSocialLevels: PropTypes.func.isRequired,
  // checkScatter: PropTypes.func.isRequired,
  setListOpts: PropTypes.func.isRequired,
  history: PropTypes.object,
  // scatterInstall: PropTypes.func.isRequired,
  updateEthAuth: PropTypes.func.isRequired
  // getExtAuthToken: PropTypes.func.isRequired
=======
  checkScatter: PropTypes.func.isRequired,
  setListOpts: PropTypes.func.isRequired,
  scatterInstall: PropTypes.func.isRequired,
  updateEthAuth: PropTypes.func.isRequired,
  getLoggedUserCollections: PropTypes.func.isRequired,
  accountName: PropTypes.string
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab
}

Index.whyDidYouRender = true

const mapActionToProps = (dispatch) => {
  return {
    checkScatter: (scatter, account, eos) => dispatch(loginScatter(scatter, account, eos)),
    scatterInstall: (bool) => dispatch(signalConnection(bool)),
    setListOpts: (listOpts) => dispatch(setListOptions(listOpts)),
    updateEthAuth: (ethAuthInfo) => dispatch(updateEthAuthInfo(ethAuthInfo)),
    getLoggedUserCollections: (accountName) => dispatch(fetchUserCollections(accountName))
    }
}

<<<<<<< HEAD
const mapStateToProps = () => {}
=======
const mapStateToProps = (state, ownProps) => {
  const scatterIdentity = state.scatterRequest && state.scatterRequest.account
  const { account: ethAccount } = state.ethAuth
  let account = scatterIdentity || state.ethAccount
  try {
    const twitterIdentity = localStorage.getItem('twitterMirrorInfo')
    if (!scatterIdentity) {
      if (ethAccount) {
        account = { name: ethAccount._id, authority: 'active' }
      } else if (twitterIdentity) {
        account = { name: JSON.parse(twitterIdentity).name, authority: 'active' }
      }
    }
  } catch (err) {
    console.log(err)
  }
  return {
    accountName: account && account.name ? account.name : null
  }
}
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab

export default connect(mapStateToProps, mapActionToProps)(Index)
