import React from 'react'
import PropTypes from 'prop-types'
import { Link, Typography } from '@material-ui/core'

const DEFAULT_TWITTER_PROF = '/images/default-twitter-prof.png'

const HeaderSection = ({ classes, user, tweetType, tweetLink, hideBird }) => {
  let userAvatar
  let twitterName
  let twitterBirdIcon

  if (tweetType === 'retweet') {
    userAvatar = classes.retweetUserAvatar
    twitterName = classes.retweetTwitterName
    twitterBirdIcon = classes.retweetTwitterBirdIcon
  } else if (tweetType === 'reply') {
    userAvatar = classes.userAvatar
    twitterName = classes.replyTwitterName
    twitterBirdIcon = classes.twitterBirdIcon
  } else {
    userAvatar = classes.userAvatar
    twitterName = classes.twitterName
    if (hideBird === true) {
      twitterBirdIcon = classes.retweetTwitterBirdIcon
    } else {
      twitterBirdIcon = classes.twitterBirdIcon
    }
  }

  const accountLink = `https://twitter.com/${user.screen_name}`

  const addDefaultSrc = (e) => {
    e.target.onerror = null
    e.target.src = DEFAULT_TWITTER_PROF
  }

  return (
    <div className={classes.header}>
      <div className={classes.userAvatarContainer}>
        <img className={userAvatar}
          src={user.profile_image_url_https}
          alt='user image'
          onError={addDefaultSrc}
        />
      </div>
      <div className={classes.userTags}>
        <Link href={accountLink}
          target='_blank'
          underline='none'
        >
          <Typography className={twitterName}
            style={{ maxWidth: '300px' }}
            variant='h4'
          >
            {user && user.name && user.name.substring(0, 80)}
          </Typography>
        </Link>
        <Link href={accountLink}
          target='_blank'
          underline='none'
        ><span className={classes.twitterHandle}>@{user.screen_name}</span></Link>
      </div>
      <span className={twitterBirdIcon}>
        <Link href={tweetLink}
          target='_blank'
          underline='none'
        >
          <img
            src='/images/icons/twitter.svg'
            style={{ height: '24px', paddingLeft: '10px', paddingRight: '10px' }}
          />
        </Link>
      </span>
    </div>
 )
}

HeaderSection.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  tweetLink: PropTypes.string.isRequired,
  tweetType: PropTypes.string.isRequired,
  hideBird: PropTypes.bool.isRequired
}

export default HeaderSection
