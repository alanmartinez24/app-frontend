import React, { Component, memo } from 'react'
import Header from '../../components/Header/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Feed from '../../components/Feed/Feed'
import { withStyles } from '@material-ui/core/styles'
import Img from 'react-image'
import { Fab, Typography, Grid, Button, IconButton, Icon, SnackbarContent, Snackbar, Hidden, Fade } from '@material-ui/core'
import SideDrawer from '../../components/SideDrawer/SideDrawer'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Tour from 'reactour'
import '../../components/Tour/tourstyles.css'
import '../../styles.css'
import axios from 'axios'
import DotSpinner from '../../components/DotSpinner/DotSpinner'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import CollectionEditDialog from '../../components/Collections/CollectionEditDialog.js'
import RecommendedCollections from '../../components/Collections/RecommendedCollections.js'
import { Helmet } from 'react-helmet'
import { levelColors } from '../../utils/colors'
import { fetchCollectionById } from '../../redux/actions'

const BACKEND_API = process.env.BACKEND_API
const DEFAULT_IMG = `https://app-gradients.s3.amazonaws.com/gradient${Math.floor(Math.random() * 5) + 1}.png`

const styles = theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      display: 'none'
    }
  },
  accountErrorHeader: {
    paddingTop: '15%',
    fontFamily: '"Gilroy", sans-serif',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#ffffff'
  },
  noPostsFound: {
    paddingTop: '9%',
    fontFamily: '"Gilroy", sans-serif',
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#ffffff',
    textAlign: 'center'
  },
  accountErrorSub: {
    paddingTop: '25px',
    fontFamily: '"Gilroy", sans-serif',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#ffffff'
  },
  container: {
    background: 'linear-gradient(180deg, #1B1B1B 0%, #151515 100%)',
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    overflowY: 'scroll'
  },
  feedContainer: {
    width: '100%',
    overflow: 'hidden',
    maxWidth: '650px',
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      padding: '0px !important'
    }
  },
  feedLoader: {
    margin: '0px',
    maxWidth: '650px'
  },
  collectionHeader: {
    position: 'sticky',
    top: '60px',
    background: 'linear-gradient(0deg,#1a1a1a,#1b1b1b)',
    borderRadius: '5px',
    zIndex: 1000,
    marginBottom: '25px',
    [theme.breakpoints.down('xs')]: {
      top: 0,
      marginBottom: '0px'
    }
  },
  collectionContainer: {
    width: '100vw',
    position: 'relative',
    marginLeft: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0px !important'
    }
  },
  Mask: {
    outline: 'solid 0px #FAFAFA44'
  },
  page: {
    width: '100vw',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100vw'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 50
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '200px',
      width: `calc(100vw - 200px)`,
      marginTop: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '200px',
      width: `calc(100vw - 200px)`
    },
    [theme.breakpoints.down('xs')]: {
      background: '#1b1b1ba1',
      backgroundSize: 'contain',
      overflowX: 'hidden'
    },
    flex: 1
  },
  Tour: {
    fontFamily: '"Gilroy", sans-serif',
    padding: '20px 40px 20px 30px !important'
  },
  tourFab: {
    position: 'absolute',
    bottom: theme.spacing(7),
    right: theme.spacing(12),
    background: '#A0A0A0AA',
    color: '#FAFAFA',
    zIndex: 1000,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  headerText: {
    marginBottom: '10px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0px'
    }
  },
  recommended: {
    position: 'sticky',
    top: 200,
    margin: 0,
    opacity: 0.7,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    '&:hover': {
      opacity: 1
    }
  },
  headerImg: {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0px'
    }
  },
  icons: {
    color: '#fff'
  },
  hidden: {
    display: 'none'
  },
  minimize: {
    height: '50px',
    width: '50px',
    [theme.breakpoints.down('xs')]: {
      height: '30px',
      width: '30px'
    }
  },
  minimizeHeader: {
    padding: '0px 16px',
    transition: 'max-height 0.2s linear',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '60px',
      padding: '5px !important'
    }
  },
  snack: {
    justifyContent: 'center'
  }
})

class Collections extends Component {
  state = {
    isLoading: true,
    isMinimize: false,
    snackbarMsg: '',
    recommended: [],
    dialogOpen: false,
    isTourOpen: false,
    socialLevelColor: '',
    collectionId: ''
  }

  async componentDidMount () {
    const { fetchCollById } = this.props
    const url = window.location.href.split('/')
    const id = url[5]

    let recommended
    try {
      await fetchCollById(id)
      recommended = (await axios.get(`${BACKEND_API}/collections/recommended`)).data
    } catch (err) {
      this.setState({ isLoading: false })
      return
    }

    this.setState({
      isLoading: false,
      recommended,
      collectionId: id
    })
  }

  shareCollection = e => {
    e.preventDefault()
    navigator.clipboard.writeText(window.location.href)
    this.handleSnackbarOpen('Copied collection to clipboard')
  }

  handleScroll = e => {
    if (this.state.posts.length < 3) return
    const { isMinimize } = this.state
    let element = e.target

    if (element.scrollTop > this.prev && !isMinimize) {
      this.setState({ isMinimize: true })
    }
    if (element.scrollTop === 0 && isMinimize) {
      this.setState({ isMinimize: false })
    }

    this.prev = element.scrollTop
  }

  handleSnackbarOpen = snackbarMsg => {
    this.setState({ snackbarMsg })
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarMsg: '' })
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }

  getSocialLevel = async id => {
    const res = (await axios.get(`${BACKEND_API}/levels/user/${id}`)).data
    this.setState({
      socialLevelColor: levelColors[res.quantile]
    })
  }

  closeTour = () => {
    this.setState({ isTourOpen: false })
  }

  openTour = () => {
    this.setState({ isTourOpen: true })
  }

  render () {
    const { classes, account, collectionsById } = this.props
    const { isLoading, isMinimize, snackbarMsg, recommended, dialogOpen, socialLevelColor, collectionId } = this.state
    const collection = collectionsById && collectionsById[collectionId]
    const posts = collection && collection.posts
    const hidden = isMinimize ? classes.hidden : null
    const minimize = isMinimize ? classes.minimize : null
    const minimizeHeader = isMinimize ? classes.minimizeHeader : null
    const isLoggedUserCollection = (account && account.name) === (collection && collection.ownerId)

    let headerImgSrc =
      posts &&
      ((posts[0] && posts[0].previewData.img) ||
        (posts[1] && posts[1].previewData.img))

    if (!isLoading && !collection) {
      return (
        <ErrorBoundary>
          <div className={classes.container}>
            <div className={classes.page}>
              <Header isTourOpen={this.state.isTourOpen} />
              <div align='center'>
                <Typography
                  className={classes.accountErrorHeader}
                  color='#ffffff'
                  variant='h3'
                >
                  <strong>Sorry this page is not available.</strong>
                </Typography>
                <Typography
                  className={classes.accountErrorSub}
                  color='#ffffff'
                  variant='h4'
                >
                  The page you're looking for does not exist.
                </Typography>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      )
    }

    if (isLoading) {
      return (
        <div
          style={{
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

    return (
      <ErrorBoundary>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{`${collection.name} | ${collection.owner}`}</title>
          <meta name='description'
            content={`${collection.description}`}
          />
          <meta
            property='og:title'
            content={`${collection.name} | ${collection.owner}`}
          />
          <meta
            property='og:description'
            content={`${collection.description}`}
          />
          <meta property='og:image'
            content={`${collection.coverImgSrc}`}
          />
          <meta
            property='twitter:card'
            content='summary_large_image'
          />
          <meta
            property='twitter:site'
            content='@yup_io'
          />
          <meta
            property='twitter:title'
            content={`${collection.name} | ${collection.owner}`}
          />
          <meta property='twitter:image'
            content={`${collection.coverImgSrc}`}
          />
          <meta
            property='twitter:description'
            content={`${collection.description}`}
          />

        </Helmet>
        <Snackbar
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          open={!!snackbarMsg}
        >
          <SnackbarContent className={classes.snack}
            message={snackbarMsg}
          />
        </Snackbar>
        <CollectionEditDialog
          collection={collection}
          account={account}
          dialogOpen={dialogOpen}
          handleDialogClose={this.handleDialogClose}
        />
        <div className={classes.container}
          onScroll={this.handleScroll}
        >
          <div className={classes.page}>
            <Header />
            <SideDrawer />
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='flex-start'
              spacing={4}
              className={classes.collectionContainer}
            >
              <Grid
                item
                container
                direction='row'
                justify='flex-start'
                alignItems='flex-start'
                spacing={4}
                className={classes.collectionContainer}
              >
                <Grid
                  item
                  xl={9}
                  lg={9}
                  md={10}
                  xs={12}
                  className={[minimizeHeader, classes.collectionHeader]}
                >
                  <Grid
                    container
                    direction='row'
                    justify='left'
                    alignItems='center'
                    spacing={3}
                  >
                    <Grid
                      item
                      xl={1}
                      md={isMinimize ? 1 : 2}
                      xs={2}
                    >
                      <Fade in
                        timeout={1000}
                      >
                        <Img
                          src={[headerImgSrc, DEFAULT_IMG]}
                          alt='thumbnail'
                          loader={<div />}
                          className={`${classes.headerImg} ${minimize}`}
                        />
                      </Fade>
                    </Grid>
                    <Grid item
                      lg={8}
                      md={7}
                      sm={8}
                      xs={6}
                    >
                      <Fade in
                        timeout={400}
                      >
                        <Typography variant='h2'
                          className={classes.headerText}
                        >
                          {collection.name}
                        </Typography>
                      </Fade>
                      <Fade in
                        timeout={800}
                      >
                        <Typography
                          variant='h5'
                          className={[classes.headerText, hidden]}
                        >
                          Curated by{' '}
                          <Link
                            to={`/${collection.owner}`}
                            style={{
                              color: '#fff',
                              textDecoration: socialLevelColor
                                ? `1px solid underline ${socialLevelColor}`
                                : 'none'
                            }}
                          >
                            {collection.owner}
                          </Link>
                        </Typography>
                      </Fade>
                      <Typography
                        variant='subtitle2'
                        className={[classes.headerText, hidden]}
                      >
                        {collection.description}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      lg={2}
                      sm={3}
                      xs={4}
                      justify='flex-end'
                    >
                      <Fade in
                        timeout={1500}
                      >
                        <IconButton
                          aria-label='more'
                          aria-controls='long-menu'
                          aria-haspopup='true'
                          onClick={this.shareCollection}
                        >
                          <Icon
                            className='fa fa-share'
                            style={{ color: '#c0c0c0' }}
                          />
                        </IconButton>
                      </Fade>
                      {isLoggedUserCollection && (
                        <IconButton
                          aria-label='more'
                          aria-controls='long-menu'
                          aria-haspopup='true'
                          onClick={this.handleDialogOpen}
                          className={classes.icons}
                        >
                          <MenuIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Hidden smDown
                  lgUp
                >
                  <Grid item
                    xl={3}
                    lg={3}
                    md={2}
                  />
                </Hidden>
                <Grid item
                  lg={6}
                  md={10}
                  xs={12}
                  className={classes.feedContainer}
                  tourname='CollectionPosts'
                >
                  {(posts.length === 0) ? (
                    <Typography className={classes.noPostsFound}>
                      No posts found in this collection
                    </Typography>
                  ) : (
                    <Feed
                      isLoading={isLoading}
                      hasMore
                      classes={classes}
                      posts={posts}
                      hideInteractions
                      renderObjects
                    />
                  )}
                </Grid>
                <Hidden smDown>
                  <Grid
                    item
                    container
                    column
                    lg={4}
                    md={2}
                    sm={0}
                    spacing={2}
                    tourname='RecommendedCollections'
                    className={classes.recommended}
                  >
                    <Grid item>
                      <Typography variant='h4'>Recommended</Typography>
                    </Grid>
                    <Grid item
                      xs={12}
                    >
                      {recommended.map(rec => {
                        if (rec.name !== collection.name) {
                          return (
                            <RecommendedCollections
                              classes={classes}
                              collection={rec}
                            />
                          )
                        }
                      })}
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>

            <Tour
              steps={steps}
              isOpen={this.state.isTourOpen}
              onRequestClose={this.closeTour}
              className={classes.Tour}
              accentColor='#00eab7'
              rounded={10}
              disableInteraction
              highlightedMaskClassName={classes.Mask}
              nextButton={
                <Button
                  size='small'
                  variant='outlined'
                  style={{ fontWeight: 400 }}
                  small
                >
                  Next
                </Button>
              }
              prevButton={
                <Button
                  size='small'
                  variant='outlined'
                  style={{ fontWeight: 400 }}
                >
                  Back
                </Button>
              }
              lastStepNextButton={<div style={{ display: 'none' }} />}
            />
            <Fab
              className={classes.tourFab}
              variant='ext fcomended'
              onClick={this.openTour}
            >
              10-Second Tutorial
            </Fab>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}

const steps = [
  {
    selector: '[tourName="CollectionPosts"]',
    content: (
      <div>
        <h4 className='tourHeader'>📰 Collection Posts</h4>
        <p>These are the curated posts in this collection.</p>
      </div>
    )
  },
  {
    selector: '[tourName="RecommendedCollections"]',
    content: (
      <div>
        <h4 className='tourHeader'>📖 Recommended Collections</h4>
        <p>These are some other collections you should check out!</p>
      </div>
    )
  },
  {
    selector: '[tourName="FeedsDrawer"]',
    content: (
      <div>
        <h4 className='tourHeader'>📡 Feeds</h4>
        <p>These are your feeds.</p>
        <a
          href='https://docs.yup.io/products/app#feed'
          target='_blank'
          className='tourLink'
        >
          Learn more
        </a>
      </div>
    )
  },
  {
    selector: '[tourName="LeaderboardButton"]',
    content: (
      <div>
        <h4 className='tourHeader'>📈 Leaderboard</h4>
        <p>Find content and users ranked by category and platform.</p>
        <a
          href='https://docs.yup.io/products/app#lists'
          target='_blank'
          className='tourLink'
        >
          Learn more
        </a>
      </div>
    )
  },
  {
    content: (
      <div>
        <h3 className='tourHeader'>👏 That's it!</h3>
        <p>That's all for now. Learn more with some of these resources:</p>
        <div className='tourResources'>
          <Button
            size='medium'
            variant='contained'
            style={{ fontWeight: 400 }}
            small
            className='tourButton'
            href='https://docs.yup.io'
            target='_blank'
          >
            Docs
          </Button>
          <Button
            size='medium'
            variant='contained'
            style={{ fontWeight: 400 }}
            small
            className='tourButton'
            href='https://yup.io'
            target='_blank'
          >
            Website
          </Button>
          <Button
            size='medium'
            variant='contained'
            style={{ fontWeight: 400 }}
            small
            className='tourButton'
            href='https://blog.yup.io'
            target='_blank'
          >
            Blog
          </Button>
        </div>
      </div>
    )
  }
]

const mapStateToProps = (state, ownProps) => {
  const { account: ethAccount } = state.ethAuth
  const scatterIdentity = state.scatterRequest && state.scatterRequest.account
  let account = scatterIdentity || state.ethAccount
  const levels = state.socialLevels.levels

  if (!scatterIdentity && ethAccount) {
    account = { name: ethAccount._id, authority: 'active' }
  }

  return {
    account,
    levels,
    push: state.scatterInstallation.push,
    collectionsById: state.collectionsById
  }
}

Collections.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  collectionsById: PropTypes.object.isRequired,
  fetchCollById: PropTypes.func.isRequired
}

const mapActionToProps = (dispatch) => {
  return {
    fetchCollById: (collectionId) => dispatch(fetchCollectionById(collectionId))
    }
}

export default memo(connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Collections)))
