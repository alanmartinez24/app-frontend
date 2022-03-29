import React, { Component, Fragment } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { levelColors } from '../../utils/colors'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import Grid from '@material-ui/core/Grid'
import UserAvatar from '../UserAvatar/UserAvatar'
import moment from 'moment'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { fetchSocialLevel } from '../../redux/actions'
import { accountInfoSelector } from '../../redux/selectors'
import { Link } from 'react-router-dom'

const BACKEND_API = process.env.BACKEND_API

const ICONS = process.env.ICONS.split(',')

const CAT_ICONS = {
  popularity: ICONS[0],
  intelligence: ICONS[1],
  funny: ICONS[2],
  useful: ICONS[3],
  knowledgeable: ICONS[4],
  interesting: ICONS[5],
  expensive: ICONS[6],
  engaging: ICONS[7],
  easy: ICONS[8],
  chill: ICONS[9],
  beautiful: ICONS[10],
  affordable: ICONS[11],
  trustworthy: ICONS[12],
  wouldelect: ICONS[13],
  agreewith: ICONS[14],
  original: ICONS[15],
  fire: ICONS[16]
}

const YUP_CREATOR = process.env.YUP_CREATOR

const styles = theme => ({
  interactionBar: {
    padding: '1% 1% 0% 0%',
    opacity: '0.7',
    minHeight: '40px',
    height: '40px',
    marginBottom: -5,
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      padding: '0px 3%'
    }
  },
  keyUser: {
    opacity: '80%'
  },
  time: {
    paddingRight: '2px',
    marginLeft: 'auto',
    color: theme.palette.common.fifth,
    fontSize: '14px',
    lineHeight: '14px',
    paddingTop: '0px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    }
  },
  voterOpacity: {
    opacity: '80%'
  },
  avatarImage: {
    fontSize: '14px',
    display: 'grid',
    border: '2px solid',
    borderRadius: '100%',
    width: '22px',
    marginRight: '7px',
    height: '22px'
  },
  arrow: {
    color: theme.palette.common.first
  }
})

class PostHeader extends Component {
  state = {
    postInteractions: [],
    isLoading: true
  }

  componentDidMount () {
    (async () => {
      try {
        const { postid, hideInteractions, username, account } = this.props

        let postInteractions = (await axios.post(`${BACKEND_API}/posts/interactions/${postid}`)).data
        if (hideInteractions && postInteractions.length > 0 && username) {
          postInteractions = postInteractions.filter(curr => curr.voter === account._id)
        }
        this.setState({ postInteractions, isLoading: false })
      } catch (err) {
        this.setState({ isLoading: false })
      }
    })()
  }

  render () {
    const { isLoading, postInteractions } = this.state
    const { levels, author, classes, hideInteractions, dispatch, query } = this.props

    if (!isLoading && !postInteractions.length) {
      return <div style={{ height: '25px' }} />
    }

    if (isLoading || !postInteractions.length) {
      return <div className={classes.interactionBar} />
    }

    const vote = postInteractions[0]
    if (!levels[vote.voter]) {
       dispatch(fetchSocialLevel(vote.voter))
       return <div />
    }
    if (levels[vote.voter].isLoading || hideInteractions) {
      return <div />
    }
    const formattedVoteTime = moment(vote.timestamp, 'x').fromNow(true)

    const voterQuantile = levels[vote.voter] && levels[vote.voter].levelInfo.quantile
    const voterLevelColor = voterQuantile ? levelColors[voterQuantile] : levelColors.sixth

    const voterAvatar = levels[vote.voter] && levels[vote.voter].levelInfo.avatar
    const voterUsername = levels[vote.voter] && levels[vote.voter].levelInfo.username

    const voterInfo = levels[vote.voter] && levels[vote.voter].levelInfo
    const voterIsMirror = voterInfo && voterInfo.twitterInfo && voterInfo.twitterInfo.isMirror
    const voterIsAuth = voterInfo && voterInfo.twitterInfo && voterInfo.twitterInfo.isAuthUser

    const authorQuantile = levels[author] && levels[author].levelInfo.quantile
    const authorAvatar = levels[author] && levels[author].levelInfo.avatar
    const authorUsername = levels[author] && levels[author].levelInfo.username
    const authorLevelColor = authorQuantile ? levelColors[authorQuantile] : levelColors.sixth
    const voterTwitterUsername = voterInfo && voterInfo.twitterInfo ? voterInfo.twitterInfo.username : ''
    const headerDisplayName = (voterIsMirror && voterInfo.twitterInfo.isTracked &&
      voterInfo.twitterInfo.isMirror) ? voterTwitterUsername
      : voterUsername || vote.voter

    const VoterHeader = (props) => (
      <Grid container
        direction='row'
        alignItems='center'
      >
        <Grid item
          className={classes.voterOpacity}
        >
          <UserAvatar alt={voterUsername}
            className={classes.avatarImage}
            src={voterAvatar}
            style={{
            borderColor: voterLevelColor
          }}
            username={voterUsername}
          />
        </Grid>
        <Grid className={classes.keyUser}
          item
        >
          <Link
            style={{ textDecoration: 'none', color: '#fff' }}
            to={`/${voterUsername || vote.voter}`}
          >
            <Typography variant='body2'>
              {query.feed && headerDisplayName}
            </Typography>
          </Link>

        </Grid>
        <Grid item>
          { (voterIsMirror && !voterIsAuth)
          ? <img
              src='/images/icons/twitter.svg'
              style={{ height: '0.5rem', paddingLeft: '8px', paddingRight: '8px', display: 'grid' }}
              alt='twitter'
            />
        : null}
        </Grid>
      </Grid>)

    const AuthorHeader = (props) => (
      author === YUP_CREATOR
      ? null
      : <Grid container
          direction='row'
        >
        <Grid item>
          <UserAvatar alt={authorUsername}
            className={classes.avatarImage}
            src={authorAvatar}
            style={{
              border: '2px solid',
              borderColor: authorLevelColor,
              borderRadius: '100%',
              width: '22px',
              marginRight: '7px',
              height: '22px'
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            className={classes.username}
            gutterBottom
            inline
            style={{
                fontFamily: '"Gilroy", sans-serif',
                marginRight: '7px'
              }}
          > { authorUsername || author }
          </Typography>
        </Grid>
      </Grid >
    )

    return (
      <ErrorBoundary>
        <div className={classes.interactionBar}
          style={hideInteractions ? { marginBottom: '-9px' } : {}}
        >
          <Grid
            container
            direction='row'
            alignItems='center'
          >
            <Grid item>
              <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='center'
              > { hideInteractions ? null
            : <Fragment>
              <Grid item>
                <div style={{ marginTop: '2px' }}>
                  <AuthorHeader />
                </div>
              </Grid>
              <Grid item>
                <Grid container
                  direction='row'
                  alignItems='center'
                >
                  <Grid item
                    className={classes.voterOpacity}
                  >
                    <VoterHeader />
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          }
                <Grid item
                  className={classes.arrow}
                  style={{ zoom: '50%', opacity: '80%' }}
                >
                  {
                vote.like
                  ? <KeyboardArrowUp />
                  : <KeyboardArrowDown />
              }
                </Grid>
                <Grid item>
                  <Typography variant='body2'
                    style={{ zoom: 0.8 }}
                  >
                    {CAT_ICONS[vote.category]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              className={classes.time}
            >
              {formattedVoteTime}
            </Grid>
          </Grid>
        </div>

      </ErrorBoundary>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const account = accountInfoSelector(state)
  const { query } = state.router.location
  return {
    ...ownProps,
    query,
    account,
    username: account && account.name,
    levels: state.socialLevels.levels || {
      isLoading: true,
      levels: {}
    }
  }
}

PostHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  levels: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
  hideInteractions: PropTypes.bool,
  author: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  username: PropTypes.string,
  account: PropTypes.object,
  query: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(PostHeader)))
