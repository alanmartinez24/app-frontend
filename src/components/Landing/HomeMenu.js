import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Fade, Grow } from '@material-ui/core'
import '../../components/Twitter/twitter.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Tilt from 'react-tilt'
import { Link } from 'react-router-dom'
import '../../pages/Discover/discover.scss'
import axios from 'axios'
import CldImg from '../Miscellaneous/CldImg'

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
    color: '#f0f0f0',
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
    height: '100%',
    '&:hover': {
      boxShadow: '0px 0px 40px #ffffff30'
    }
  },
  Link: {
    textDecoration: 'none'
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
        this.setState({ recommendedMenuItems: data.slice(0, 4), browseMenuItems: data.slice(4, 8) })
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
                    Welcome to Yup
                  </Typography>
                </Fade>
              </Grid>

              <Grid item
                container
                direction='column'
                xs={12}
              >
                <Grid item>
                  <Fade in
                    timeout={300}
                  >
                    <Typography variant='h2'
                      className={classes.SectionHeader}
                    >Recommended</Typography>
                  </Fade>
                </Grid>
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
                                  options={{ max: 20 }}
                                >
                                  <CldImg
                                    className={classes.ImageCard}
                                    src={item.imgSrc}
                                    alt={item.title}
                                  />
                                </Tilt>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant='h4'
                                >
                                  {item.title}
                                </Typography>
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
                container
                direction='column'
              >
                <Grid item>
                  <Typography variant='h2'
                    className={classes.SectionHeader}
                  >Browse</Typography>
                </Grid>
                <Grid
                  item
                  className={classes.ItemsContainer}
                  justifycontent='space-between'
                  container
                  spacing={3}
                >
                  {browseMenuItems.map((item, index) => {
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
                          <Fade in
                            timeout={800}
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
                                  options={{ max: 20 }}
                                >
                                  <CldImg
                                    className={classes.ImageCard}
                                    src={item.imgSrc}
                                    alt={item.title}
                                  />
                                </Tilt>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant='h4'
                                >
                                  {item.title}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Fade>
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
