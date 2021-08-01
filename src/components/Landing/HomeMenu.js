import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Fade, Grow, Card, CardContent, Button } from '@material-ui/core'
import '../../components/Twitter/twitter.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Tilt from 'react-tilt'
import { Link } from 'react-router-dom'
import '../../pages/Discover/discover.scss'
import axios from 'axios'
import Colors from '../../utils/colors.js'
import Img from 'react-image'
import Lottie from 'react-lottie-player'
import lottieJson from '../../animations/laugh1.json'

const BACKEND_API = process.env.BACKEND_API

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
        boxShadow: '0px 0px 30px #fff'
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
      background: '#fafafa05'
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
  bannerImg: {
    width: '100%',
    height: `${theme.spacing(48)}px`,
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(to top, ${theme.palette.alt.second}, ${theme.palette.alt.third}ee),
url('https://images.unsplash.com/photo-1533135091724-62cc5402aa20?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhbmQlMjB3aGl0ZSUyMGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`
  },
  bannerCard: {
    height: '100%',
    background: `${theme.palette.alt.third}22`,
    backdropFilter: 'blur(10px)',
    border: `3px solid ${theme.palette.common.first}01`
  },
  Title: {
    fontSize: '40px',
    lineHeight: `${theme.spacing(8)}px`,
    background: '-webkit-linear-gradient(45deg, #00e08e, #f0c909, #eb3650)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px'
    }
  },
  titleShadow: {
    paddingBottom: `${theme.spacing(1)}px`,
    fontSize: '40px',
    color: theme.palette.alt.first,
    lineHeight: `${theme.spacing(8)}px`,
    textShadow: `0px 0px 40px ${theme.palette.alt.first}`,
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px'
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
                  <div className={classes.bannerImg} />
                  <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    background='transparent'
                    speed='1.01'
                    style={{ width: 25, height: 25, position: 'absolute', top: '84px', right: '44px' }}
                  />
                </div>
              </Grid>
              <Grid item
                xs={12}
                style={{ position: 'relative' }}
              >
                <Fade in
                  timeout={200}
                >
                  <Typography variant='h1'
                    className={classes.Title}
                  >
                    Welcome, kabessa
                  </Typography>
                </Fade>
                <Fade in
                  timeout={200}
                >
                  <Typography variant='h1'
                    className={classes.titleShadow}
                  >
                    Welcome, kabessa
                  </Typography>
                </Fade>
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
                        style={{ height: '100%' }}
                        className={classes.bannerCard}
                      >
                        <CardContent>
                          <Typography variant='subtitle2'>You have a Yup Score of <strong>60/100</strong> and have you've earned <strong>253 YUP</strong></Typography>
                        </CardContent>
                        <CardContent>
                          <Button size='large'
                            variant='contained'
                            style={{ backgroundColor: Colors.Green, color: Colors.B2 }}
                          >Go To Profile</Button>
                        </CardContent>
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
                            >
                              <Grid container
                                style={{ padding: '16px', alignContent: 'center', height: '100%' }}
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
                            >
                              <Grid container
                                style={{ padding: '16px', alignContent: 'center', height: '100%' }}
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
                            >
                              <Grid container
                                style={{ padding: '16px', alignContent: 'center', height: '100%' }}
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
                            >
                              <Grid container
                                style={{ padding: '16px', alignContent: 'center', height: '100%' }}
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
                                  options={{ max: 10 }}
                                >
                                  <Card style={{ backgroundImage: `url(${item.imgSrc})` }}
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
