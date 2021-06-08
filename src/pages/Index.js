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
// import wallet from '../eos/scatter/scatter.wallet'
import { fetchAllSocialLevels, loginScatter, signalConnection, setListOptions, updateEthAuthInfo } from '../redux/actions'
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
      // const { fetchSocialLevels } = this.props
      // fetchSocialLevels()
      this.checkEthAuth()
      // this.fetchExtAuthInfo()
      if (pathname.startsWith('/leaderboard') || pathname.startsWith('/lists')) {
        await this.fetchListOptions()
      }
    //  this.setState({ isLoading: false })
    })()
  }

  // componentDidUpdate (prevProps) {
  //   if (!wallet.scatter && !wallet.connected) {
  //     this.fetchExtAuthInfo()
  //   }
  // }

  render () {
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
  // fetchSocialLevels: PropTypes.func.isRequired,
  // checkScatter: PropTypes.func.isRequired,
  setListOpts: PropTypes.func.isRequired,
  history: PropTypes.object,
  // scatterInstall: PropTypes.func.isRequired,
  updateEthAuth: PropTypes.func.isRequired
  // getExtAuthToken: PropTypes.func.isRequired
}

Index.whyDidYouRender = true

const mapActionToProps = (dispatch) => {
  return {
    checkScatter: (scatter, account, eos) => dispatch(loginScatter(scatter, account, eos)),
    scatterInstall: (bool) => dispatch(signalConnection(bool)),
    fetchSocialLevels: () => dispatch(fetchAllSocialLevels()),
    setListOpts: (listOpts) => dispatch(setListOptions(listOpts)),
    updateEthAuth: (ethAuthInfo) => dispatch(updateEthAuthInfo(ethAuthInfo))
    // getExtAuthToken: throttle(() => dispatch(fetchExtAuthToken(), 5000))
  }
}

const mapStateToProps = () => {}

export default connect(mapStateToProps, mapActionToProps)(Index)
