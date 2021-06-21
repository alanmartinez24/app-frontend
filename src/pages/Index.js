import React, { Fragment, Component } from 'react'
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core'
import theme from '../utils/theme.js'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { reactReduxContext } from '../utils/history'
import { MuiThemeProvider } from '@material-ui/core/styles'
import wallet from '../eos/scatter/scatter.wallet'
import { loginScatter, signalConnection, setListOptions, updateEthAuthInfo, fetchUserCollections, fetchUserPermissions, fetchAuthInfo } from '../redux/actions'
import { accountInfoSelector } from '../redux/selectors'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
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

  componentDidMount () {
    (async () => {
      const { getLoggedUserCollections, fetchUserPerms, checkScatter, scatterInstall, accountName, fetchAuthFromState } = this.props
      wallet.detect(checkScatter, scatterInstall)
      this.checkEthAuth()
      fetchAuthFromState()
      if (pathname.startsWith('/leaderboard') || pathname.startsWith('/lists')) {
        await this.fetchListOptions()
      }
      this.setState({ isLoading: false })

      if (accountName) {
        getLoggedUserCollections(accountName)
        fetchUserPerms(accountName)
      }
    })()
  }

  componentDidUpdate (prevProps) {
    const { getLoggedUserCollections, fetchUserPerms, accountName } = this.props
    if (accountName && prevProps.accountName !== accountName) {
      getLoggedUserCollections(accountName)
      fetchUserPerms(accountName)
    }
  }

  render () {
  const history = this.props.history
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
              {this.state.alertDialogContent}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

Index.propTypes = {
  checkScatter: PropTypes.func.isRequired,
  setListOpts: PropTypes.func.isRequired,
  scatterInstall: PropTypes.func.isRequired,
  updateEthAuth: PropTypes.func.isRequired,
  getLoggedUserCollections: PropTypes.func.isRequired,
  accountName: PropTypes.string,
  history: PropTypes.object,
  fetchUserPerms: PropTypes.func.isRequired,
  fetchAuthFromState: PropTypes.func.isRequired
}

const mapActionToProps = (dispatch) => {
  return {
    checkScatter: (scatter, account, eos) => dispatch(loginScatter(scatter, account, eos)),
    scatterInstall: (bool) => dispatch(signalConnection(bool)),
    setListOpts: (listOpts) => dispatch(setListOptions(listOpts)),
    updateEthAuth: (ethAuthInfo) => dispatch(updateEthAuthInfo(ethAuthInfo)),
    fetchUserPerms: (accountName) => dispatch(fetchUserPermissions(accountName)),
    getLoggedUserCollections: (accountName) => dispatch(fetchUserCollections(accountName)),
    fetchAuthFromState: () => dispatch(fetchAuthInfo())
    }
}

const mapStateToProps = (state, ownProps) => {
  const account = accountInfoSelector(state)
  return {
    accountName: account && account.name ? account.name : null
  }
}

export default connect(mapStateToProps, mapActionToProps)(Index)
