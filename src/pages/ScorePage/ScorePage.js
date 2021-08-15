import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, InputAdornment, Icon } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import '../../components/Tour/tourstyles.css'
import isEqual from 'lodash/isEqual'
import YupInput from '../../components/Miscellaneous/YupInput'
import Colors from '../../utils/colors'

const inputEntered = true

const styles = theme => ({
  container: {
    minHeight: '100vh',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    backgroundColor: theme.palette.alt.second
  },
  page: {
    width: '100%',
    marginLeft: 0,
    overflowX: 'hidden',
    padding: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%'
    },
    [theme.breakpoints.up('1600')]: {
      width: '100%',
      marginLeft: 0
    },
    [theme.breakpoints.down('xs')]: {
      backgroundSize: 'contain'
    },
    flex: 1
  },
  sideFeed: {
    position: 'fixed',
    marginLeft: '38vw',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  feedWrapper: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      marginLeft: '0%',
      padding: '0%'
    }
  },
  hideOnMobile: {
    display: 'inherit',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  Mask: {
    outline: 'solid 0px #FAFAFA44'
  },
  Card: {
    padding: theme.spacing(3),
    height: '70%',
    width: '300px'
  }
})

class ScorePage extends Component {
  state = {
    isTourOpen: false,
    isMinimize: false,
    showTour: true
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!isEqual(nextProps, this.props) || !isEqual(nextState, this.state)) {
      return true
    }
    return false
  }

  handleScroll = e => {
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

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        showTour: false
      })
    }, 30000)
  }

  render () {
    const { classes } = this.props

    return (
      <ErrorBoundary>
        <Helmet>
          <meta charSet='utf-8' />
          <title>  </title>
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
        <div className={classes.container}>
          <Grid className={classes.page}
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Card className={classes.Card}
              elevation={0}
            >
              <Grid container
                justify='center'
                direction='column'
                spacing={2}
              >
                <Grid
                  item
                >
                  <Typography variant='h4'>
                    {inputEntered ? 'username' : 'Yup Score'}
                  </Typography>
                  <Typography variant='body2'>
                    {inputEntered ? 'Yup Score:' : 'Twitter'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  direction='row'
                >
                  <Typography variant='h1'
                    style={{ color: inputEntered ? Colors.Green : 'inherit' }}
                  >
                    {inputEntered ? 78 : '??'}
                  </Typography>
                  <Typography variant='h5'>
                    /100
                  </Typography>
                </Grid>
                <Grid item>
                  <YupInput
                    fullWidth
                    id='name'
                    maxLength={30}
                    label='Enter Twitter Handle'
                    type='text'
                    variant='outlined'
                    endAdornment={<InputAdornment position='end'>
                      <Icon fontSize='small'
                        className='fal fa-arrow-right'
                        style={{ marginRight: '20px' }}
                      /></InputAdornment>}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </div>
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = state => {
  const { router } = state
  return {
    feed: router.location.query.feed || state.homeFeed.feed,
    query: router.location.query
  }
}

ScorePage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default memo(connect(mapStateToProps)(withStyles(styles)(ScorePage)))
