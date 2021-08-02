import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Fade, Grow, Card, CardContent, CardActions, Button } from '@material-ui/core'
import '../../components/Twitter/twitter.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Tilt from 'react-tilt'
import { Link } from 'react-router-dom'
import '../../pages/Discover/discover.scss'
import axios from 'axios'
import Colors from '../../utils/colors.js'
import Img from 'react-image'
import Lottie from 'react-lottie-player'

const BACKEND_API = process.env.BACKEND_API
var isUser = false
const isMobile = window.innerWidth <= 600

const styles = theme => ({
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    maxWidth: '100vw',
    [theme.breakpoints.up('md')]: {
      width: `calc(100vw - 190px)`
    },
    [theme.breakpoints.up('1600')]: {
      width: `calc(100vw - 190px)`
    },
    [theme.breakpoints.down('xs')]: {
      backgroundSize: 'contain'
    },
    display: 'flex',
    marginLeft: '0px',
    overflowX: 'hidden'
  },
  mainFeed: {
    paddingLeft: '0vw',
    paddingRight: '0',
    [theme.breakpoints.down('md')]: {
      paddingRight: '0vw'
    }
  },
  page: {
    background: 'transparent',
    width: '100%',
    overflowY: 'scroll',
    marginLeft: 0,
    paddingTop: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      backgroundSize: 'contain',
      overflowX: 'hidden',
      paddingTop: theme.spacing(0),
      padding: '0px 1rem'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 190,
      width: `calc(100% - 190px)`,
      paddingTop: theme.spacing(0)
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 190,
      width: `calc(100% - 190px)`,
      padding: '0px 17vw 0px 3vw',
      paddingTop: theme.spacing(0)
    },
    flex: 1,
    padding: '0px 2.5rem',
    zIndex: 1
  },
  gridContainer: {
    height: 'calc(100vh - 100px)',
    marginTop: '-180',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 100px)',
      width: '100%',
      margin: 0
    }
  },
  SectionHeader: {
    fontSize: '25px',
    fontFamily: 'Gilroy',
    fontWeight: '500',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px'
    }
  },
  ItemContainer: {
    '&:hover': {
      ImageCard: {
        boxShadow: `0px 0px 30px ${theme.palette.common.first}`
      },
      fontWeight: '500 !important'
    }
  },
  ItemSubHeader: {
    color: theme.palette.common.first,
    fontSize: '15px',
    marginTop: theme.spacing(1),
    fontFamily: 'Gilroy',
    fontWeight: '400',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    }
  },
  ImageCard: {
    borderRadius: '0.5rem',
    width: '100%',
    aspectRatio: '1 / 1',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: theme.spacing(1),
    backgroundSize: 'cover',
    '&:hover': {
      boxShadow: '0px 0px 40px #ffffff30'
    }
  },
  Link: {
    textDecoration: 'none'
  },
  recommendedImg: {
    height: '60px',
    width: '60px',
    objectFit: 'cover',
    marginTop: '10px',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
      height: '50px',
      width: '50px'
    },
    [theme.breakpoints.down('xs')]: {
      height: '30px',
      width: '30px'
    }
  },
  recommendedContainer: {
    borderRadius: 10,
    margin: '5px 0px',
    '&:hover': {
      background: `${theme.palette.alt.fifth}10`
    }
  },
  recommendedImgContainer: {
    flexBasis: 'unset'
  },
  banner: {
    position: 'relative',
    zIndex: -10,
    width: 'calc(120vw - 180px)',
    marginLeft: `-${theme.spacing(8)}px`,
    marginBottom: `-${theme.spacing(42)}px`,
    [theme.breakpoints.down('md')]: {
      width: '150vw',
      marginTop: `-${theme.spacing(6)}px`
    }
  },
  bannerBg: {
    width: '100%',
    height: `${theme.spacing(48)}px`,
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(to top, ${theme.palette.alt.second}, ${theme.palette.alt.second}cc),
url('images/feeds/rainbowbanner.svg')`
  },
  bannerCard: {
    height: '100%',
    backgroundImage: `${isUser === true ? `linear-gradient(to top, ${theme.palette.alt.fifth}, ${theme.palette.alt.fourth})` : "url('images/feeds/rainbowbanner.svg')"}`,
    backgroundSize: 'cover',
    backdropFilter: 'blur(10px)',
    padding: `${theme.spacing(3)}px`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(0.5)}px`
    },
    overflow: 'visible'
  },
  bannerMediaUser: {
    maxWidth: '40%',
    maxHeight: '130%',
    bottom: '16px',
    right: '16px',
    position: 'absolute'
  },
  bannerMediaNews: {
    maxWidth: '40%',
    maxHeight: '130%',
    top: '-40px',
    right: 0,
    position: 'absolute'
  },
  titlePlain: {
    paddingBottom: `${theme.spacing(1)}px`,
    fontSize: `${theme.spacing(8)}px`,
    color: Colors.W2,
    lineHeight: `${theme.spacing(8)}px`,
    textShadow: `0px 0px 40px ${theme.palette.alt.first}33`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `${theme.spacing(4)}px`,
      lineHeight: `${theme.spacing(4)}px`
    }
  },
  subtitle: {
    color: Colors.W2
  },
  cardButton: {
    padding: '16px',
    '&:hover': {
      boxShadow: `0px 0px 0px 2px ${theme.palette.alt.third}`
    }
  },
  primaryButton: {
    backgroundColor: Colors.Green,
    color: Colors.B2,
    '&:hover': {
      backgroundColor: Colors.Green,
      boxShadow: `0px 0px 0px 2px ${Colors.Green}`
    }
  }
})

class Home extends Component {
  state = {
    recommendedMenuItems: [],
    browseMenuItems: []
  }
  componentDidMount () {
    this.fetchHomeConfig()
  }

  fetchHomeConfig () {
    axios.get(`${BACKEND_API}/home-config`)
      .then(({ data }) => {
        this.setState({ recommendedMenuItems: data.slice(0, 4), browseMenuItems: data.slice(0, 8) })
      })
      .catch(err => {
        console.error(err, 'ERROR FETCHING HOME CONFIG')
      })
  }
  render () {
    const { classes } = this.props
    const { recommendedMenuItems, browseMenuItems } = this.state

    return (
      <ErrorBoundary>
        <div className={classes.container}>
          <div className={classes.page}>
            <Grid
              className={classes.gridContainer}
              container
              direction='row'
              justify='flex-start'
              spacing={5}
              alignItems='flex-start'
              alignContent='flex-start'
            >
              <Grid item
                xs={12}
              >

                <div className={classes.banner}>
                  <div className={classes.bannerBg} />
                </div>
              </Grid>
              <Grid item
                xs={12}
              >
                <Grid
                  container
                  direction='row'
                  spacing={3}
                  alignItems='stretch'
                >
                  <Grid item
                    md={12}
                    xs={12}
                  >
                    <Fade in
                      timeout={300}
                    >
                      <Card elevation={0}
                        className={classes.bannerCard}
                      >
                        <CardContent>
                          <Grid container
                            direction='row'
                            justify='space-between'
                            alignItems='center'
                          >
                            <Grid item
                              xs={isMobile ? 12 : 7}
                            >
                              <Typography variant='h1'
                                className={classes.titlePlain}
                              >
                                {isUser === true ? `Mirror Feed` : `Social Network for Curators`}

                              </Typography>
                              <Typography variant='subtitle1'
                                className={classes.subtitle}
                              >
                                {isUser === true ? `Explore Mirror articles from all publications, all in one feed` : `Curate and share content across the web. Earn money and clout for your taste`}
                              </Typography>
                            </Grid>
                            <Grid item
                              container
                              justify='center'
                              xs={5}
                              style={{ display: isMobile ? 'none' : 'inherit' }}
                            >
                              <Lottie
                                loop
                                animationData={`https://assets8.lottiefiles.com/private_files/lf30_q6eivnpo.json`}
                                play
                                background='transparent'
                                speed='1.01'
                                style={{ width: 200, height: 200, top: '84px', right: '44px', background: '#0a0a0a23', display: 'none' }}
                              />
                              <Img className={isUser === true ? (classes.bannerMediaUser) : (classes.bannerMediaNews)}
                                src={isUser === true ? 'images/graphics/mirrorgraphic.svg' : 'images/graphics/coingraphic.png'}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <Button size='large'
                            variant='contained'
                            className={classes.primaryButton}
                          >{isUser === true ? `Enter` : `Start Now`}</Button>
                          {isUser === true ? null
                            : (<Button size='large'
                              variant='contained'
                               >Learn More</Button>)}
                        </CardActions>
                      </Card>
                    </Fade>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <Grid
                      container
                      direction='row'
                      spacing={3}
                      alignItems='stretch'
                    >
                      <Grid
                        item
                        xs={6}
                        md={3}
                        style={{ height: '100%', alignContent: 'center' }}
                      >
                        <Link
                          to={`/?feed=mirror`}
                          className={classes.Link}
                        >
                          <Grow in
                            timeout={500}
                          >
                            <Card elevation={0}
                              style={{ height: '100%' }}
                              className={classes.cardButton}
                            >
                              <Grid container
                                style={{ height: '100%' }}
                                alignItems='stretch'
                              >
                                <Typography
                                  variant='body2'
                                >
                                  💐  New Collection
                                </Typography>
                              </Grid>
                            </Card>
                          </Grow>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={3}
                        style={{ height: '100%', alignContent: 'center' }}
                      >
                        <Link
                          to={`/?feed=mirror`}
                          className={classes.Link}
                        >
                          <Grow in
                            timeout={500}
                          >
                            <Card elevation={0}
                              style={{ height: '100%' }}
                              className={classes.cardButton}
                            >
                              <Grid container
                                style={{ alignContent: 'center', height: '100%' }}
                                alignItems='stretch'
                              >
                                <Typography
                                  variant='body2'
                                >
                                  📊  Analytics
                                </Typography>
                              </Grid>
                            </Card>
                          </Grow>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={3}
                        style={{ height: '100%', alignContent: 'center' }}
                      >
                        <Link
                          to='/'
                          className={classes.Link}
                        >
                          <Grow in
                            timeout={500}
                          >
                            <Card elevation={0}
                              style={{ height: '100%' }}
                              className={classes.cardButton}
                            >
                              <Grid container
                                style={{ alignContent: 'center', height: '100%' }}
                                alignItems='stretch'
                              >
                                <Typography
                                  variant='body2'
                                >
                                  📔  Tutorials
                                </Typography>
                              </Grid>
                            </Card>
                          </Grow>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={3}
                        style={{ height: '100%', alignContent: 'center' }}
                      >
                        <Link
                          to={`/?feed=mirror`}
                          className={classes.Link}
                        >
                          <Grow in
                            timeout={500}
                          >
                            <Card elevation={0}
                              style={{ height: '100%' }}
                              className={classes.cardButton}
                            >
                              <Grid container
                                style={{ alignContent: 'center', height: '100%' }}
                                alignItems='stretch'
                              >
                                <Typography
                                  variant='body2'
                                >
                                  🏆  Leaderboards
                                </Typography>
                              </Grid>
                            </Card>
                          </Grow>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item
                container
                direction='column'
                xs={12}
              >
                <Grid
                  item
                  container
                  spacing={3}
                  className={classes.ItemsContainer}
                >
                  {recommendedMenuItems.map((item, index) => {
                    return (
                      <Grid
                        item
                        className={classes.ItemContainer}
                        key={index}
                        xs={6}
                        sm={3}
                      >
                        <Link
                          to={item.relativeURL}
                          className={classes.Link}
                        >
                          <Grow in
                            timeout={500}
                          >
                            <Grid
                              container
                              direction='column'
                              spacing={1}
                              style={{ display: 'block' }}
                            >
                              <Grid item>
                                <Tilt
                                  className={classes.Tilt}
                                  options={{ max: 10, scale: 1.1, perspective: 2000 }}
                                >
                                  <Card elevation={0}
                                    style={{ backgroundImage: `url(${item.imgSrc})` }}
                                    alt={item.title}
                                    className={classes.ImageCard}
                                  >
                                    <Grid container>
                                      <Grid item>
                                        <Typography
                                          variant='h4'
                                          style={{ color: Colors.W2 }}
                                        >
                                          {item.title}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Card>
                                </Tilt>
                              </Grid>
                            </Grid>
                          </Grow>
                        </Link>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
              <Grid item
                container
                direction='column'
                xs={12}
                style={{ display: isUser === true ? 'inherit' : 'none' }}
              >
                <Grid item
                  xs={12}
                >
                  <Fade in
                    timeout={2000}
                  >
                    <Typography variant='h4'>
                      Your Collections
                    </Typography>
                  </Fade>
                </Grid>
                <Grid
                  item
                  container
                  spacing={3}
                  className={classes.ItemsContainer}
                >
                  {browseMenuItems.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        style={{ height: '100%', alignContent: 'center' }}
                      >
                        <Link
                          to={`/collections/${encodeURIComponent(item.title)}/${item.title}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='center'
                            spacing={2}
                            className={classes.recommendedContainer}
                          >
                            <Grid item
                              xs={4}
                              lg={4}
                              xl={4}
                              className={classes.recommendedImgContainer}
                            >
                              <Img
                                src={item.imgSrc}
                                alt='thumbnail'
                                className={classes.recommendedImg}
                              />
                            </Grid>
                            <Grid item
                              xs={8}
                              lg={8}
                              xl={8}
                            >
                              <Typography variant='h5'>{item.title}</Typography>
                              <Typography variant='h5'>25 posts</Typography>
                            </Grid>
                          </Grid>
                        </Link>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction='column'
                  xs={12}
                >
                  <Grid
                    item
                    container
                    spacing={3}
                    className={classes.ItemsContainer}
                  >
                    <Grid item
                      xs={12}
                    >
                      <Fade in
                        timeout={2000}
                      >
                        <Typography variant='h4'>
                          Browse
                        </Typography>
                      </Fade>
                    </Grid>
                    {browseMenuItems.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        style={{ height: '100%', alignContent: 'center' }}
                      >
                        <Link
                          to={`/collections/${encodeURIComponent(item.title)}/${item.title}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Grid
                            container
                            direction='row'
                            justify='flex-start'
                            alignItems='center'
                            spacing={2}
                            className={classes.recommendedContainer}
                          >
                            <Grid item
                              xs={4}
                              lg={4}
                              xl={4}
                              className={classes.recommendedImgContainer}
                            >
                              <Img
                                src={item.imgSrc}
                                alt='thumbnail'
                                className={classes.recommendedImg}
                              />
                            </Grid>
                            <Grid item
                              xs={8}
                              lg={8}
                              xl={8}
                            >
                              <Typography variant='h5'>{item.title}</Typography>
                              <Typography variant='h5'>{item.title}</Typography>
                            </Grid>
                          </Grid>
                        </Link>
                      </Grid>
                    )
                  })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
