import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, InputAdornment, Icon, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import '../../components/Tour/tourstyles.css'
import isEqual from 'lodash/isEqual'
import YupInput from '../../components/Miscellaneous/YupInput'
import Colors from '../../utils/colors'

const inputEntered = true
const isLoading = false
const username = 'jack'
const YupScore = 33
const socialLevelColor = YupScore >= 80 && YupScore <= 1000 ? Colors.Green : YupScore >= 60 && YupScore <= 80 ? Colors.Moss : YupScore >= 40 && YupScore <= 60 ? Colors.Yellow : YupScore >= 20 && YupScore <= 40 ? Colors.Orange : Colors.Red

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
    flex: 1
  },
  sideFeed: {
    position: 'fixed',
    marginLeft: '38vw',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  Card: {
    padding: theme.spacing(2),
    height: '70%',
    width: '300px',
    marginBottom: 0,
    boxShadow:
      `0px 0px 30px 0px ${theme.palette.shadow.first}44, 0px 0px 0.75px  ${theme.palette.shadow.first}66`,
    backgroundColor: theme.palette.alt.second,
    [theme.breakpoints.down('xs')]: {
      marginBottom: '20vh',
      width: '90%'
    }
  },
  Skeleton: {
    background: `linear-gradient(90deg, ${Colors.Green}33, ${Colors.Moss}33, ${Colors.Yellow}33, ${Colors.Orange}33,  ${Colors.Red}33)`
  }
})

class ScorePage extends Component {
  state = {
    isTourOpen: false,
    isMinimize: false,
    showTour: true,
    User: []
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
              style={{ background: 'transparent', boxShadow: 'none', padding: '16px 4px' }}
            >
              <Grid container
                justify='space-between'
                alignItems='center'
                direction='row'
                spacing={3}
              >
                <Grid item>
                  <Typography style={{ opacity: 0.3 }}
                    variant='h5'
                  >
                    Yup Score
                  </Typography>
                </Grid>
                <Grid item>
                  <Button style={{ opacity: 0.2 }}
                    size='small'
                    content='text'
                  >Twitter</Button>
                </Grid>

                <Grid item
                  xs={12}
                >
                  <YupInput
                    fullWidth
                    id='name'
                    maxLength={30}
                    label='Twitter Username...'
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
            <Card className={classes.Card}
              style={{ display: inputEntered ? 'inherit' : 'none' }}
              elevation={0}
            >
              <Grid container
                justify='center'
                direction='column'
                spacing={2}
              >
                <Grid
                  item
                  container
                  direction='column'
                  spacing={1}
                >
                  <Grid
                    item
                  >
                    <Typography variant='h3'>
                      {inputEntered ? `@${username}` : 'Yup Score'}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                  >
                    <Typography variant='body2'>
                      {inputEntered ? '' : 'Twitter'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction='row'
                >
                  <Typography variant='h1'
                    style={{
                      color: inputEntered ? socialLevelColor : 'inherit',
                      background: `-webkit-linear-gradient(135deg, ${socialLevelColor}, ${socialLevelColor}66)`,
                      '-webkit-background-clip': 'text',
                      '-webkit-text-fill-color': 'transparent'
                    }}
                  >
                    { inputEntered ? isLoading
                    ? <Skeleton
                      animation='pulse'
                      className={classes.Skeleton}
                      style={{ transform: 'none' }}
                      >&nbsp;&nbsp;&nbsp;&nbsp;</Skeleton> : YupScore : '??' }
                  </Typography>
                  <Typography variant='h5'>
                    &nbsp;/100
                  </Typography>
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
