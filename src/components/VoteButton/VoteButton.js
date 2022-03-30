import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Portal, Snackbar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import polly from 'polly-js'
import numeral from 'numeral'
import SubscribeDialog from '../SubscribeDialog/SubscribeDialog'
import axios from 'axios'
import { parseError } from '../../eos/error'
import { connect } from 'react-redux'
import { setPostInfo, updateInitialVote, updateVoteLoading } from '../../redux/actions'
import WelcomeDialog from '../WelcomeDialog/WelcomeDialog'
import scatter from '../../eos/scatter/scatter.wallet'
import rollbar from '../../utils/rollbar'
import isEqual from 'lodash/isEqual'
import { accountInfoSelector, ethAuthSelector } from '../../redux/selectors'
import { deletevote, editvote, createvotev4, postvotev4, postvotev3, createvote } from '../../eos/actions/vote'
import {
  CREATE_VOTE_LIMIT,
  DEFAULT_WAIT_AND_RETRY
} from './constants'
import styles from './styles'
import VoteActionIcon from '../VoteActionIcon'

const { BACKEND_API } = process.env

class VoteButton extends Component {
  state = {
    voteLoading: false,
    currWeight: this.props.catWeight || 0,
    hoverValue: 0,
    currRating: this.props.currRating,
    currTotalVoters: this.calcTotalVoters(),
    currPostCatQuantile: this.getPostCatQuantile()
  };

  componentDidUpdate (prevProps) {
    const updatedPostCatQuantile = this.getPostCatQuantile()
    if (this.state.currPostCatQuantile !== updatedPostCatQuantile) {
      this.updatePostCatQuantile(updatedPostCatQuantile)
    }
  }

  updatePostCatQuantile (updatedPostCatQuantile) {
    this.setState({ currPostCatQuantile: updatedPostCatQuantile })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!isEqual(nextProps, this.props) || !isEqual(nextState, this.state)) {
      return true
    }
    return false
  }

  async fetchUpdatedPostInfo () {
    try {
      return polly()
        .waitAndRetry(DEFAULT_WAIT_AND_RETRY)
        .executeForPromise(() => {
          return new Promise(async (resolve, reject) => {
            try {
              const { postid, dispatch, listType, category } = this.props
              const listQuery = listType ? `?list=${listType}` : ''

              const postData = (
                await axios.get(
                  `${BACKEND_API}/posts/post/${postid}${listQuery}`
                )
              ).data
              const quantile = postData.quantiles[category]

              const prevWeight = this.state.currWeight
              const currWeight = postData.weights[category] || 0

              if (prevWeight === currWeight) {
                throw new Error('Vote or post has not been found')
              }

              await dispatch(setPostInfo(postid, postData))
              this.updatePostCatQuantile(quantile)
              this.setState({ currWeight })
              resolve(postData)
            } catch (error) {
              reject(error)
            }
          })
        })
    } catch (error) {
      console.error('Failed to fetch quantiles', error)
    }
  }

  async fetchInitialVote () {
    const { postid, account, category, dispatch } = this.props
    if (account == null) {
      return
    }

    await polly()
      .waitAndRetry([
        250,
        250,
        250,
        250,
        250,
        300,
        350,
        400,
        400,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500,
        500
      ])
      .executeForPromise(() => {
        return new Promise(async (resolve, reject) => {
          const data = (
            await axios.get(
              `${BACKEND_API}/votes/post/${postid}/voter/${account.name}`
            )
          ).data
          for (let vote of data) {
            if (vote && vote.like === this.state.like && vote.category === category) {
              reject(
                Error('Fetched pre-existing vote instead of updated vote')
              )
              return
            }
              dispatch(updateInitialVote(postid, account.name, category, vote))
              resolve(vote)
              return
          }
          reject(Error('Vote not found'))
        })
      })
  }

  handleSnackbarOpen = (msg) => {
    this.setState({ snackbarOpen: true, snackbarContent: msg })
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false, snackbarContent: '' })
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true })
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  };

  formatWeight = (weight) => {
    const _weight = Math.round(weight)
    if (weight < 1000) {
      return numeral(_weight).format('0a')
    } else if (weight < 10000) {
      return numeral(_weight).format('0.00a')
    } else {
      return numeral(_weight).format('0.0a')
    }
  };

  deletevvote = async (voteid) => {
    const { signature } = await scatter.scatter.getAuthToken()
    await axios.delete(`${BACKEND_API}/votes/${voteid}`, { data: { signature } })
  }

  handleDefaultVote = async () => {
    const { currRating } = this.state
    const defaultRating = 3
    const prevRating = currRating || this.props.currRating
    await this.handleVote(prevRating, defaultRating)
  };

  submitVote = async (prevRating, newRating, ignoreLoading) => {
    const { account, postid, postInfo, category, vote, dispatch, ethAuth } = this.props
    const { post } = postInfo
    const { caption, imgHash, videoHash, tag } = post

    const { currTotalVoters } = this.state

    if (account == null) {
      this.handleDialogOpen()
      return
    }

    const signedInWithEth = !scatter.connected && !!ethAuth
    const signedInWithTwitter = !scatter.connected && !!localStorage.getItem('twitterMirrorInfo')

    // Converts -2 ~ 3 rating to like/dislike range
    const rating = Math.abs(newRating)
    const like = newRating > 0
    const oldRating = Math.abs(prevRating)

    this.setState({ voteLoading: true })
    dispatch(updateVoteLoading(postid, account.name, category, true))
    let stateUpdate = {}
    if (vote == null || vote._id == null) {
      if (post.onchain === false) {
        if (signedInWithEth) {
          await postvotev3(account, { postid, caption, imgHash, videoHash, tag, like, category, rating }, ethAuth)
        } else if (signedInWithTwitter) {
          await postvotev3(account, { postid, caption, imgHash, videoHash, tag, like, category, rating })
        } else {
          await scatter.scatter.postvotev3({ data: { postid, caption, imgHash, videoHash, tag, like, category, rating } })
        }
      } else {
        if (signedInWithEth) {
          await createvote(account, { postid, like, category, rating }, ethAuth)
        } else if (signedInWithTwitter) {
          await createvote(account, { postid, like, category, rating })
        } else {
          const txStatus = await scatter.scatter.createVote({ data: { postid, like, category, rating } })
          if (txStatus === 'Action limit exceeded for create vote') {
            this.handleSnackbarOpen("You've run out of votes for the day")
            this.setState({ voteLoading: false })
            dispatch(updateVoteLoading(postid, account.name, category, false))
            return
          }
        }
      }
      await this.fetchInitialVote()
      stateUpdate = { currTotalVoters: currTotalVoters + 1 }
    } else if (vote && prevRating === newRating) {
      if (vote.onchain === false && !signedInWithEth && !signedInWithTwitter) {
          await this.deletevvote(vote._id.voteid)
          dispatch(updateInitialVote(postid, account.name, category, null))
          stateUpdate = { currTotalVoters: currTotalVoters - 1 }
      } else {
        if (signedInWithEth) {
          await deletevote(account, { voteid: vote._id.voteid }, ethAuth)
        } else if (signedInWithTwitter) {
          console.log(vote)
          await deletevote(account, { voteid: vote._id.voteid })
        } else {
          await scatter.scatter.deleteVote({ data: { voteid: vote._id.voteid } })
        }
        dispatch(updateInitialVote(postid, account.name, category, null))
        stateUpdate = { currTotalVoters: currTotalVoters - 1 }
      }
    } else {
      let voteid = vote._id.voteid
      if (post.onchain === false) {
        if (vote.onchain === false) {
          if (signedInWithEth) {
            await postvotev4(account, { postid, voteid, caption, imgHash, videoHash, tag, like, category, rating }, ethAuth)
          } else if (signedInWithTwitter) {
            await postvotev4(account, { postid, voteid, caption, imgHash, videoHash, tag, like, category, rating })
          } else {
            await scatter.scatter.postvotev4({ data: { postid, voteid, caption, imgHash, videoHash, tag, like, category, rating } })
          }
        } else {
          if (signedInWithEth) {
            await postvotev3(account, { postid, caption, imgHash, videoHash, tag, like, category, rating }, ethAuth)
          } else if (signedInWithTwitter) {
            await postvotev3(account, { postid, caption, imgHash, videoHash, tag, like, category, rating })
          } else {
            await scatter.scatter.postvotev3({ data: { postid, caption, imgHash, videoHash, tag, like, category, rating } })
          }
        }
      } else {
        if (vote.onchain === false) {
          if (signedInWithEth) {
            await createvotev4(account, { postid, voteid, like, category, rating }, ethAuth)
          } else if (signedInWithTwitter) {
            await createvotev4(account, { postid, voteid, like, category, rating })
          } else {
            await scatter.scatter.createvotev4({ data: { postid, voteid, like, category, rating } })
          }
        } else {
          if (signedInWithEth) {
            await editvote(account, { voteid: vote._id.voteid, like, rating, category }, ethAuth)
          } else if (signedInWithTwitter) {
            await editvote(account, { voteid: vote._id.voteid, like, rating, category })
          } else {
            await scatter.scatter.editVote({ data: { voteid: vote._id.voteid, like, rating, category } })
          }
        }
      }

      const voteInfluence = Math.round(vote.influence)
      const updatedVoteInfluence = Math.round((rating / oldRating) * voteInfluence)

      const newVote = {
        ...vote,
        like,
        rating,
        influence: updatedVoteInfluence
      }
      dispatch(updateInitialVote(postid, account.name, category, newVote))
    }

    this.fetchUpdatedPostInfo()
    this.setState({ ...stateUpdate, voteLoading: false })
    dispatch(updateVoteLoading(postid, account.name, category, false))
  }

  submitForcedVote = async (prevRating, newRating) => {
    const { account, postid, category, dispatch } = this.props
    try {
      const actionUsage = await this.fetchActionUsage(account.name)
      const lastReset = new Date(actionUsage.lastReset).getTime()
      const dayInMs = 24 * 60 * 60 * 1000
      const now = new Date().getTime()

      // Check if there are votes remaining for current period
      if (
        actionUsage == null ||
        now >= lastReset + dayInMs ||
        CREATE_VOTE_LIMIT > actionUsage.createVoteCount
      ) {
        let forcedVoteRating
        const remainingVotes = CREATE_VOTE_LIMIT - actionUsage.createVoteCount
        if (newRating > 0) {
          // If it's `like`
          // TODO: Throw if the remaining votes is 0
          forcedVoteRating = Math.min(
            Math.floor(Math.sqrt(remainingVotes)),
            3
          )
        } else {
          // If it's `dislike`
          forcedVoteRating = -Math.min(
            Math.floor(Math.sqrt(remainingVotes)),
            2
          )
        }
        await this.submitVote(prevRating, forcedVoteRating, true)
        return
      }
      this.handleSnackbarOpen("You've run out of votes for the day")
      this.setState({ voteLoading: false })
      dispatch(updateVoteLoading(postid, account.name, category, false))
    } catch (error) {
      this.handleSnackbarOpen(parseError(error, 'vote'))
      this.setState({ voteLoading: false })
      dispatch(updateVoteLoading(postid, account.name, category, false))
    }
  }

  handleVote = async (prevRating, newRating) => {
    const { account, postid, category, dispatch } = this.props
    try {
      if (account == null) {
        this.handleDialogOpen()
        return
      }

      await this.submitVote(prevRating, newRating)
    } catch (error) {
      const actionLimitExc = /Action limit exceeded/gm
      const jsonStr = typeof error === 'string' ? error : JSON.stringify(error)

      // Submit forced vote if action limit will be exceeded
      if (jsonStr.match(actionLimitExc)) {
        await this.submitForcedVote(prevRating, newRating)
        return
      }
      this.handleSnackbarOpen(parseError(error, 'vote'))
      this.setState({ voteLoading: false })
      dispatch(updateVoteLoading(postid, account.name, category, false))
      rollbar.error(
        'WEB APP VoteButton handleVote() ' +
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2) +
          ':\n' +
          'Post ID: ' +
          postid +
          ', Account: ' +
          account.name +
          ', Category: ' +
          category
      )
      console.error(
        'WEB APP VoteButton handleVote() ' +
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2) +
          ':\n' +
          'Post ID: ' +
          postid +
          ', Account: ' +
          account.name +
          ', Category: ' +
          category
      )
    }
  }

  calcTotalVoters () {
    const { postInfo, category } = this.props
    const { post } = postInfo
    if (post == null) {
      return 0
    }
    const catUpvotes = (post.catVotes[category] && post.catVotes[category].up)
        ? post.catVotes[category].up
        : 0
    const catDownvotes = (post.catVotes[category] && post.catVotes[category].down)
        ? post.catVotes[category].down
        : 0
    const totalVoters = catUpvotes + catDownvotes

    return totalVoters
  }

  getPostCatQuantile () {
    const { postInfo, category } = this.props
    const { post } = postInfo
    const ups = (post.catVotes[category] && post.catVotes[category].up) || 0
    const downs = (post.catVotes[category] && post.catVotes[category].down) || 0
    const totalVotes = ups + downs
    if (
      totalVotes === 0 ||
      post == null ||
      post.quantiles == null ||
      post.quantiles[category] == null
    ) {
      return 'none'
    }

    return post.quantiles[category]
  }

  onChangeActive = (e, value) => {
    this.setState({ hoverValue: value })
  }

  fetchActionUsage = async (eosname) => {
    try {
      const resData = (await axios.get(`${BACKEND_API}/accounts/actionusage/${eosname}`)).data
      return resData
    } catch (err) {
      console.error('Failed to fetch action usage', err)
    }
  }

  otherVotesLoading = () => {
    const { votesForPost } = this.props
    if (isEmpty(votesForPost)) { return }
    const voteKeys = Object.keys(votesForPost.votes)
    for (let cat of voteKeys) {
      const vote = votesForPost.votes[cat]
      if (vote && vote.isLoading) return true
    }
    return false
  }

  handleRatingChange = async (newRating) => {
    const { currRating } = this.state
    const prevRating = currRating || this.props.currRating
    await this.handleVote(prevRating, newRating)
    this.setState({ currRating: newRating })
  }

  render () {
    const { classes, category, postInfo } = this.props
    const { currWeight, currRating } = this.state
    let currPostCatQuantile = this.state.currPostCatQuantile
    const { post } = postInfo

    const ups = (post.catVotes[category] && post.catVotes[category].up) || 0
    const downs = (post.catVotes[category] && post.catVotes[category].down) || 0
    const totalVotes = ups + downs
    const formattedWeight = totalVotes === 0 ? 0 : this.formatWeight(currWeight)

    const cachedTwitterMirrorInfo = localStorage.getItem('twitterMirrorInfo')
    const twitterInfo = cachedTwitterMirrorInfo && JSON.parse(cachedTwitterMirrorInfo)

    return (
      <>
        <VoteActionIcon
          category={category}
          quantile={currPostCatQuantile}
          initialRating={currRating || this.props.currRating}
          weight={formattedWeight}
          onUpdateRating={this.handleRatingChange}
        />
        <Portal>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={4000}
            className={classes.snackUpper}
            onClose={this.handleSnackbarClose}
            open={this.state.snackbarOpen}
          >
            <SnackbarContent
              className={classes.snack}
              message={this.state.snackbarContent}
            />
          </Snackbar>
        </Portal>
        {twitterInfo ? (
          <WelcomeDialog
            dialogOpen={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose}
          />
        ) : (
          <SubscribeDialog
            account={this.props.account}
            dialogOpen={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let initialVote = null
  let currRating = 0
  const { category, postid } = ownProps
  const account = accountInfoSelector(state)
  const ethAuth = ethAuthSelector(state)

  let userVotesForPost = {}

  if (account) {
    const userVotes = state.initialVotes[account.name]
    userVotesForPost = userVotes && userVotes[postid]
    if (state.userPermissions && state.userPermissions[account.name]) {
      account.authority = state.userPermissions[account.name].perm
    }
    if (userVotesForPost) {
      initialVote = userVotesForPost.votes[category]
      if (initialVote?.rating) {
        currRating = initialVote.like ? initialVote.rating : -initialVote.rating
      }
    }
  }

  const postInfo = state.postInfo[postid]

  return {
    postInfo,
    account,
    currRating,
    ethAuth,
    vote: initialVote,
    votesForPost: userVotesForPost || {}
  }
}

VoteButton.propTypes = {
  account: PropTypes.object.isRequired,
  postid: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  catWeight: PropTypes.number.isRequired,
  currRating: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  vote: PropTypes.object.isRequired,
  listType: PropTypes.string,
  votesForPost: PropTypes.object.isRequired,
  postInfo: PropTypes.object.isRequired,
  ethAuth: PropTypes.object
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(VoteButton))
)
