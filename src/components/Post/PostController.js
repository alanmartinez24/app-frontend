import React, { memo, Component } from 'react'
import Post from '../Post/Post'
import PostHOC from './PostHOC'
import TextPost from './TextPost'
import LinkPreviewPost from './LinkPreviewPost'
import CoursePost from '../Post/CoursePost'
import ProfPost from '../Post/ProfPost'
import TweetPost from './TweetPost'
import VideoPost from './VideoPost'
import SoundPost from './SoundPost'
import SpotifyPost from './SpotifyPost'
import MusicPost from './MusicPost'
import TallPreviewPost from './TallPreviewPost'
import ObjectPost from './ObjectPost'
import NFTPost from './NFTPost'
import TwitchPost from './TwitchPost'
import InstagramPost from './InstagramPost'
import AudiusPost from './AudiusPost'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPostInfo } from '../../redux/actions'
import isEqual from 'lodash/isEqual'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const COLUMBIA_PROF_TAG = 'columbia-course-registration/professor'
const COLUMBIA_COURSE_TAG = 'columbia-course-registration/course'

const COLUMBIA_PROF_POST_TYPE = 'columbia-course-registration:professors'
const COLUMBIA_COURSE_POST_TYPE = 'columbia-course-registration:courses'

const MAPS_POST_TYPE = 'maps.google.com'

const US_PRES_ELECTIONS_TAG = 'politics'

// TODO: Simplify regular expression patterns

function genRegEx (arrOfURLs) {
  return new RegExp(`^((http:|https:)([/][/]))?(www.)?(${arrOfURLs.join('|')})`)
}

function isAudiusTrackPost (caption) {
  const audiusPattern = genRegEx(['audius.co/*'])
  return audiusPattern.test(caption)
}

function isObjectPost (caption) {
  const objPattern = genRegEx(['wikipedia.org/wiki/*', 'wikipedia.com/*', 'en.wikipedia.org/*', 'amazon.com', 'twitter.com/[^/]*$', 'reddit.com/r/[^/]*[/]?$', 'youtube.com/channel/[^/]*[/]?$', 'youtube.com/user/[^/]*[/]?$'])
  return objPattern.test(caption)
}

function isYoutubePost (caption) {
  const ytPattern = genRegEx(['youtube.com/watch?*'])
  return ytPattern.test(caption)
}

function isChannelPost (caption) {
  const ytPattern = genRegEx(['youtube.com/c?*', 'youtube.com/user?*', 'youtube.com/channel?*'])
  return ytPattern.test(caption)
}

function isSoundPost (caption) {
  const scPattern = genRegEx(['soundcloud.com/*/'])
  return scPattern.test(caption)
}

function isSpotifyPost (caption) {
  const spPattern = genRegEx(['open.spotify.com/*/'])
  return spPattern.test(caption)
}

function isMusicPost (caption) {
  const appleMusicRe = genRegEx(['music.apple.com/us/(artist|album)/(.)*/(.)*?i=(.)*)$'])
  return appleMusicRe.test(caption)
}

function isTallPost (caption) {
  const tallPattern = genRegEx(['giphy.com/*/', 'app.yup.io/collections/*/'])
  return tallPattern.test(caption)
}

function isInstagramPost (caption) {
  const igPattern = genRegEx(['instagram.com/*/'])
  return igPattern.test(caption)
}

function isTwitchPost (caption) {
  const twPattern = genRegEx(['twitch.tv/*'])
  return twPattern.test(caption)
}

function isTwitterStatusPost (caption) {
  const twitterPattern = genRegEx(['twitter.com/.*/status/', 'mobile.twitter.com/.*/status/'])
  return twitterPattern.test(caption)
}

function isNftPost (caption) {
  const nftPattern = genRegEx(['app.rarible.com/*/', 'opensea.io/assets/*', 'superrare.co/*', 'superrare.co/*', 'foundation.app/*/', 'zora.co/*', 'knownorigin.io/gallery/*'])
  return nftPattern.test(caption)
}

class PostController extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (!isEqual(nextProps, this.props) || !isEqual(nextState, this.state)) {
      return true
    }
    return false
  }

  render () {
    const { classes, dispatch, post, hideInteractions, renderObjects } = this.props
    if (!post) return null

    dispatch(setPostInfo(post._id.postid, post))
    switch (post) {
      case (post.tag === COLUMBIA_PROF_TAG):
        return (<ErrorBoundary>
          <ProfPost
            caption={post.caption}
            comment={post.comment}
            author={post.author}
            postid={post._id.postid}
            quantiles={post.quantiles}
            previewData={post.previewData}
            votes={post.upvotes - post.downvotes}
            weights={post.weights}
            postHOC={PostHOC}
            rating={post.rating}
            postType={COLUMBIA_PROF_POST_TYPE}
            hideInteractions={hideInteractions}
          />
        </ErrorBoundary>)
      case (post.tag === COLUMBIA_COURSE_TAG):
        return (<ErrorBoundary>
          <CoursePost
            caption={post.caption}
            comment={post.comment}
            author={post.author}
            postid={post._id.postid}
            quantiles={post.quantiles}
            previewData={post.previewData}
            votes={post.upvotes - post.downvotes}
            weights={post.weights}
            rating={post.rating}
            postHOC={PostHOC}
            postType={COLUMBIA_COURSE_POST_TYPE}
            hideInteractions={hideInteractions}
          />
        </ErrorBoundary>
        )
      case (post.tag === US_PRES_ELECTIONS_TAG):
        return (<ErrorBoundary>
          <TweetPost caption={post.caption}
            comment={post.comment}
            author={post.author}
            postid={post._id.postid}
            quantiles={post.quantiles}
            previewData={post.previewData}
            votes={post.upvotes - post.downvotes}
            weights={post.weights}
            postHOC={PostHOC}
            tweetObject={post}
            postType={US_PRES_ELECTIONS_TAG}
            rating={post.rating}
            hideInteractions={hideInteractions}
            classes={classes}
          />
        </ErrorBoundary>
        )
     case (isTwitterStatusPost(post.caption)):
      return (<ErrorBoundary>
        <TweetPost caption={post.caption}
          comment={post.comment}
          author={post.author}
          postid={post._id.postid}
          quantiles={post.quantiles}
          previewData={post.previewData}
          tweetObject={post}
          votes={post.upvotes - post.downvotes}
          weights={post.weights}
          postHOC={PostHOC}
          rating={post.rating}
          hideInteractions={hideInteractions}
          classes={classes}
        />
      </ErrorBoundary>)
    case (isYoutubePost(post.caption)):
      return (<ErrorBoundary>
        <VideoPost caption={post.caption}
          comment={post.comment}
          author={post.author}
          postid={post._id.postid}
          quantiles={post.quantiles}
          votes={post.upvotes - post.downvotes}
          weights={post.weights}
          postHOC={PostHOC}
          rating={post.rating}
          hideInteractions={hideInteractions}
          classes={classes}
        />
      </ErrorBoundary>
      )
        case (isSoundPost(post.caption)):
        return (<ErrorBoundary>
          <SoundPost caption={post.caption}
            comment={post.comment}
            author={post.author}
            postid={post._id.postid}
            quantiles={post.quantiles}
            votes={post.upvotes - post.downvotes}
            weights={post.weights}
            postHOC={PostHOC}
            rating={post.rating}
            hideInteractions={hideInteractions}
            classes={classes}
          />
        </ErrorBoundary>
              )
        case (isSpotifyPost(post.caption)):
        return (<ErrorBoundary>
          <SpotifyPost caption={post.caption}
            comment={post.comment}
            author={post.author}
            postid={post._id.postid}
            quantiles={post.quantiles}
            votes={post.upvotes - post.downvotes}
            weights={post.weights}
            postHOC={PostHOC}
            hideInteractions={hideInteractions}
            classes={classes}
          />
        </ErrorBoundary>
        )
        case (isMusicPost(post.caption)):
          return (<ErrorBoundary>
            <MusicPost caption={post.caption}
              comment={post.comment}
              author={post.author}
              postid={post._id.postid}
              quantiles={post.quantiles}
              votes={post.upvotes - post.downvotes}
              weights={post.weights}
              postHOC={PostHOC}
              hideInteractions={hideInteractions}
              classes={classes}
            />
          </ErrorBoundary>
          )
        case (isTwitchPost(post.caption)):
          return (<ErrorBoundary>
            <TwitchPost caption={post.caption}
              comment={post.comment}
              author={post.author}
              postid={post._id.postid}
              quantiles={post.quantiles}
              votes={post.upvotes - post.downvotes}
              weights={post.weights}
              postHOC={PostHOC}
              rating={post.rating}
              hideInteractions={hideInteractions}
              classes={classes}
            />
          </ErrorBoundary>)
        case (isInstagramPost(post.caption)):
          return (<ErrorBoundary>
            <InstagramPost caption={post.caption}
              comment={post.comment}
              author={post.author}
              postid={post._id.postid}
              previewData={post.previewData}
              quantiles={post.quantiles}
              votes={post.upvotes - post.downvotes}
              weights={post.weights}
              postHOC={PostHOC}
              rating={post.rating}
              hideInteractions={hideInteractions}
              classes={classes}
            />
          </ErrorBoundary>)
        case (isNftPost(post.caption)):
  return (<ErrorBoundary>
    <NFTPost
      comment={post.comment}
      key={post._id.postid}
      postid={post._id.postid}
      author={post.author}
      caption={post.caption}
      previewData={post.previewData}
      quantiles={post.quantiles}
      votes={post.upvotes - post.downvotes}
      weights={post.weights}
      postHOC={PostHOC}
      hideInteractions={hideInteractions}
      classes={classes}
    />
  </ErrorBoundary>
        )
       case (isTallPost(post.caption)):
  return (<ErrorBoundary>
    <TallPreviewPost
      comment={post.comment}
      key={post._id.postid}
      postid={post._id.postid}
      author={post.author}
      caption={post.caption}
      previewData={post.previewData}
      quantiles={post.quantiles}
      votes={post.upvotes - post.downvotes}
      weights={post.weights}
      postHOC={PostHOC}
      hideInteractions={hideInteractions}
      classes={classes}
    />
  </ErrorBoundary>
        )
    case (isObjectPost(post.caption) || isChannelPost(post.caption)):
      if (renderObjects) {
        return (
          <ErrorBoundary>
            <ObjectPost
              comment={post.comment}
              key={post._id.postid}
              postid={post._id.postid}
              author={post.author}
              caption={post.caption}
              previewData={post.previewData}
              quantiles={post.quantiles}
              votes={post.upvotes - post.downvotes}
              weights={post.weights}
              postHOC={PostHOC}
              rating={post.rating}
              hideInteractions={hideInteractions}
              classes={classes}
            />
          </ErrorBoundary>
        )
      }
      return null
      case (post.imgHash == null || post.imgHash.trim() === '') && (post.videoHash == null || post.videoHash.trim() === '' || post.previewData == null): // isTextPost
        return (
          <ErrorBoundary>
            <TextPost
              caption={post.caption}
              comment={post.comment}
              key={post._id.postid}
              author={post.author}
              postid={post._id.postid}
              previewData={post.previewData}
              quantiles={post.quantiles}
              votes={post.upvotes - post.downvotes}
              weights={post.weights}
              postHOC={PostHOC}
              rating={post.rating}
              postType={post.tag === MAPS_POST_TYPE ? MAPS_POST_TYPE : null}
              hideInteractions={hideInteractions}
              classes={classes}
            />
          </ErrorBoundary>
        )
        case isAudiusTrackPost(post.caption):
          return (
            <ErrorBoundary>
              <AudiusPost
                caption={post.caption}
                comment={post.comment}
                key={post._id.postid}
                author={post.author}
                postid={post._id.postid}
                previewData={post.previewData}
                quantiles={post.quantiles}
                votes={post.upvotes - post.downvotes}
                weights={post.weights}
                postHOC={PostHOC}
                rating={post.rating}
                hideInteractions={hideInteractions}
                classes={classes}
              />
            </ErrorBoundary>
            )
            default:
              return (<ErrorBoundary>
                <LinkPreviewPost
                  comment={post.comment}
                  key={post._id.postid}
                  postid={post._id.postid}
                  author={post.author}
                  caption={post.caption}
                  previewData={post.previewData}
                  quantiles={post.quantiles}
                  votes={post.upvotes - post.downvotes}
                  weights={post.weights}
                  postHOC={PostHOC}
                  rating={post.rating}
                  hideInteractions={hideInteractions}
                  classes={classes}
                />
              </ErrorBoundary>
              )
    }
      }
}

PostController.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  hideInteractions: PropTypes.bool,
  renderObjects: PropTypes.bool,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = () => { return {} }
export default memo(connect(mapStateToProps)(PostController))

// const isTextPost = (post.imgHash == null || post.imgHash.trim() === '') && (post.videoHash == null || post.videoHash.trim() === '')
// const isVideoPost = isYoutubePost(post.caption)
// const isChannelPost = isChannelPost(post.caption)
// const isObjectPost = isObjPost(post.caption)
// const isNFTPost = isNftPost(post.caption)
// const isSoundPost = isSCPost(post.caption)
// const isSpotifyPost = isSpotifyPost(post.caption)
// const isMusPost = isMusicPost(post.caption)
// const isTallPost = isTallPreviewPost(post.caption)
// const isTwitchPost = isTwitchChannelPost(post.caption)
// const isTwitterPost = isTwitterStatusPost(post.caption)
// const isInstagramPost = isIGPost(post.caption)
// const isAudiusPost = isAudiusTrackPost(post.caption)
