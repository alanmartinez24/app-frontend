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
    paddingBottom: '20px',
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
    paddingTop: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      backgroundSize: 'contain',
      overflowX: 'hidden',
      paddingTop: theme.spacing(10),
      padding: '0px 2rem'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 190,
      width: `calc(100% - 190px)`,
      paddingTop: theme.spacing(10)
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 190,
      width: `calc(100% - 190px)`,
      padding: '0px 17vw 0px 3vw',
      paddingTop: theme.spacing(10)
    },
    flex: 1,
    padding: '0px 2.5rem'
  },
  gridContainer: {
    height: 'calc(100vh - 100px)',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 100px)',
      width: '100%'
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
      height: '40px',
      width: '40px'
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
                <Fade in
                  timeout={200}
                >
                  <Typography variant='h2'
                    className={classes.Title}
                  >
                    Welcome, username
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
                    md={6}
                    xs={12}
                  >
                    <Fade in
                      timeout={300}
                    >
                      <Card elevation={0}
                        style={{ height: '100%' }}
                      >
                        <CardContent>
                          <Typography variant='body2'>Yup is a social network for curators. Use it to curate the web and earn influence.</Typography>
                        </CardContent>
                        <CardContent>
                          <Button size='large'
                            variant='contained'
                            style={{ backgroundColor: Colors.Green }}
                          >Go To Profile</Button>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Grid
                      container
                      direction='row'
                      spacing={3}
                      alignItems='stretch'
                      style={{ height: 'calc(50% + 12px)' }}
                    >
                      <Grid
                        item
                        xs={6}
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
                                  💐  Create Collection
                                </Typography>
                              </Grid>
                            </Card>
                          </Grow>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        xs={6}
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
                              xs={3}
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
                              xs={9}
                              lg={8}
                              xl={8}
                            >
                              <Typography variant='h5'>{item.title}</Typography>
                              <Typography variant='body2'>{item.title}</Typography>
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
                              xs={3}
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
                              xs={9}
                              lg={8}
                              xl={8}
                            >
                              <Typography variant='h5'>{item.title}</Typography>
                              <Typography variant='body2'>{item.title}</Typography>
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
