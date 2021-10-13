import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import TweetVidPlayer from './TweetVidPlayer'
import { parseText, linkMentions, fetchLinkPreviewData } from './Util/Util'
import LinkPreview from './LinkPreview'
import HeaderSection from './HeaderSection'

const DEFAULT_TWITTER_PROF = '/images/default-twitter-prof.png'

const Reply = ({ tweetData, classes }) => {
  const { user } = tweetData.tweetInfo
  const { caption } = tweetData
  const [ previewData, setPreviewData ] = useState(null)
  const entities = tweetData.tweetInfo.entities ? tweetData.tweetInfo.entities : false
  const entitiesURLS = (entities && entities.urls.length > 0)

  console.log(`tweetData`, tweetData)

  const tweetLink = (tweetData.previewData && tweetData.previewData.url) || ''

  // ORIGINAL
  const extendedEntities = tweetData.tweetInfo.extended_entities ? tweetData.tweetInfo.extended_entities : false

  useEffect(() => {
    if (entitiesURLS) {
      if (entities.urls[0].expanded_url) {
        (async () => {
          try {
            const previewData = await fetchLinkPreviewData(entities.urls[0].expanded_url)
            setPreviewData(previewData)
          } catch (e) {
            console.log(e)
          }
        })()
      }
    }
    }, [])

  let hasMedia
  if (extendedEntities) {
    hasMedia = extendedEntities.media ? extendedEntities.media.length > 0 : false
  }

  let mediaURL, mediaType, hasPhoto, hasVideo
  if (hasMedia) {
    mediaURL = extendedEntities.media[0].media_url_https ? extendedEntities.media[0].media_url_https : false
    console.log(`mediaURL`, mediaURL)
    mediaType = extendedEntities.media[0].type
    hasPhoto = Boolean(mediaType === 'photo')
    hasVideo = Boolean(mediaType === 'video' || mediaType === 'animated_gif')

    if (hasVideo) mediaURL = extendedEntities.media[0].video_info.variants[0].url
  }

  let initialText
  if (tweetData.tweetInfo.text) {
    initialText = tweetData.tweetInfo.text
  } else if (tweetData.tweetInfo.full_text) {
    initialText = tweetData.tweetInfo.full_text
  } else {
    initialText = ''
  }

  let tweetText = parseText(initialText)

  // REPLYS
  let replyExtendedEntities = (tweetData.tweetInfo.reply_status && tweetData.tweetInfo.reply_status.extended_entities) ? tweetData.tweetInfo.reply_status.extended_entities : false
  let replyHasMedia
  if (replyExtendedEntities) {
    replyHasMedia = replyExtendedEntities.media ? replyExtendedEntities.media.length > 0 : false
  }

  let replyMediaURL, replyMediaType, replyHasPhoto, replyHasVideo
  if (replyHasMedia) {
    replyMediaURL = replyExtendedEntities.media[0].media_url_https ? replyExtendedEntities.media[0].media_url_https : false
    console.log(`replyMediaURL`, replyMediaURL)
    replyMediaType = replyExtendedEntities.media[0].type
    replyHasPhoto = Boolean(replyMediaType === 'photo')
    replyHasVideo = Boolean(replyMediaType === 'video' || replyMediaType === 'animated_gif')

    if (replyHasVideo) replyMediaURL = replyExtendedEntities.media[0].video_info.variants[0].url
  }

  let replyStatusText
  if (tweetData.tweetInfo.reply_status && tweetData.tweetInfo.reply_status.text) {
    replyStatusText = tweetData.tweetInfo.reply_status.text
  } else if (tweetData.tweetInfo.reply_status && tweetData.tweetInfo.reply_status.full_text) {
    replyStatusText = tweetData.tweetInfo.reply_status.full_text
  } else {
    replyStatusText = ''
  }

  let text = parseText(replyStatusText)
  let replyTweetText = text.split(' ').map((string) => linkMentions(string))

  // REPLY CUSTOM HEADER STYLING CONFIG
  const userAvatar = classes.userAvatar
  const twitterName = classes.replyTwitterName
  const twitterBirdIcon = classes.twitterBirdIcon

  let replyScreenName, replyUserAvatar, replyName
  if (tweetData.tweetInfo.reply_status) {
    replyScreenName = tweetData.tweetInfo.reply_status.user.screen_name
    replyUserAvatar = tweetData.tweetInfo.reply_status.user.profile_image_url_https
    replyName = tweetData.tweetInfo.reply_status.user.name
  }

  const accountLink = `https://twitter.com/${replyScreenName}`
  const BothHaveMedia = (hasMedia && replyHasMedia)
  const smallImage = { maxHeight: 200, maxWidth: 550 }
  const bigImage = { maxHeight: 400 }

  const addDefaultSrc = (e) => {
    e.target.onerror = null
    e.target.src = DEFAULT_TWITTER_PROF
  }

  return (
    <div className={classes.mainReplyContainer}>
      <div className={classes.replyContainer}>
        <div className={classes.replyAvatarAndBar}>
          <div className={classes.userAvatarContainer}
            style={{ paddingRight: 0 }}
          >
            {replyUserAvatar
          ? <img className={userAvatar}
            src={replyUserAvatar}
            alt='user image'
            onError={addDefaultSrc}
            />
            : <span className={classes.letterAvatar}>
              { replyName && replyName[0] && replyName[0].toUpperCase() }
            </span>
          }
          </div>
          <div className={classes.barDiv} />
        </div>

        <div className={classes.replyHeaderAndContent}>
          <div className={classes.header}>
            <div className={classes.userTags}>
              <Link href={accountLink}
                target='_blank'
                underline='none'
              ><h4 className={twitterName}>{replyName}</h4></Link>
              <Link href={accountLink}
                target='_blank'
                underline='none'
              ><span className={classes.twitterHandle}>@{replyScreenName}</span></Link>
            </div>
            <span className={twitterBirdIcon}>
              <Link href={tweetLink}
                target='_blank'
                underline='none'
              >
                <img
                  src='/images/icons/twitter.svg'
                  style={{ height: '24px', paddingLeft: '10px', paddingRight: '10px' }}
                  alt='twitter'
                />
              </Link>
            </span>
          </div>
          <div className={classes.replyContent}
            style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}
          >
            <Link href={tweetLink}
              target='_blank'
              underline='none'
            >
              <div className={classes.tweetText}>
                {replyTweetText}
              </div>
            </Link>

            {(previewData && replyHasMedia) && (
              <div style={{ marginTop: 20 }}>
                <LinkPreview
                  classes={classes}
                  description={previewData && previewData.description}
                  image={previewData && previewData.img}
                  title={previewData && previewData.title}
                  url={previewData && previewData.url}
                  caption={caption}
                />
              </div>
            )}
            {
               (replyHasPhoto && replyMediaURL)
               ? <div className={classes.replyImageContainer}>
                 <img className={classes.tweetImg}
                   style={BothHaveMedia ? smallImage : bigImage}
                   src={tweetData.excludeTweet ? 'https://api.faviconkit.com/twitter.com/128' : replyMediaURL}
                   alt='tweet-image'
                 />
               </div>
               : (replyHasVideo && replyMediaURL) &&
                 <TweetVidPlayer
                   url={replyMediaURL}
                 />
             }
          </div>
        </div>
      </div>
      <div className={classes.replyOriginalContainer}>
        <HeaderSection classes={classes}
          user={user}
          hideBird
        />
        <Link href={tweetLink}
          target='_blank'
          underline='none'
        >
          <div className={classes.tweetText}
            style={{ marginLeft: '6px' }}
          >
            {tweetText.replace(/@\S+\s?/gm, '')}
          </div>
        </Link>
        {(previewData && !replyHasMedia && !mediaURL) && (
          <div style={{ marginTop: 20 }}>
            <LinkPreview
              size={'large'}
              classes={classes}
              description={previewData && previewData.description}
              image={previewData && previewData.img}
              title={previewData && previewData.title}
              url={previewData && previewData.url}
              caption={caption}
            />
          </div>
         )}
        {
          (hasPhoto && mediaURL)
          ? <div className={classes.tweetText}>
            <img className={classes.tweetImg}
              src={tweetData.excludeTweet ? 'https://api.faviconkit.com/twitter.com/128' : mediaURL}
              alt='tweet-image'
            />
          </div>
          : (hasVideo && mediaURL) &&
            <TweetVidPlayer
              url={mediaURL}
            />
         }

      </div>

    </div>
  )
}

Reply.propTypes = {
  classes: PropTypes.object.isRequired,
  tweetData: PropTypes.object

}
export default Reply
