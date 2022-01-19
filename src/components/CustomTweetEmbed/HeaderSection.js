import React from 'react'
import { Link, Typography } from '@material-ui/core/'
import PropTypes from 'prop-types'

const DEFAULT_TWITTER_PROF = '/images/default-twitter-prof.png'

const HeaderSection = ({ classes, user, tweetType, tweetLink, hideBird }) => {
  let userAvatar
  let twitterBirdIcon

  if (tweetType === 'retweet') {
    userAvatar = classes.retweetUserAvatar
    twitterBirdIcon = classes.retweetTwitterBirdIcon
  } else if (tweetType === 'reply') {
    userAvatar = classes.userAvatar
    twitterBirdIcon = classes.twitterBirdIcon
  } else {
    userAvatar = classes.userAvatar
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
          <Typography variant='h6'
            style={{ maxWidth: '300px' }}
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
            alt='twitter'
          />
        </Link>
      </span>
    </div>
 )
}
HeaderSection.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  tweetType: PropTypes.string.isRequired,
  tweetLink: PropTypes.string.isRequired,
  hideBird: PropTypes.bool.isRequired
}

export default HeaderSection
