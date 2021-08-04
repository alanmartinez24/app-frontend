import React from 'react'
import PropTypes from 'prop-types'
import ImageLoader from 'react-load-image'
import { parseIpfsRef, hashToUrl } from '../../utils/ipfs.js'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { Avatar, Fade } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const ANONYMOUS_DEFAULT_AVATAR = 'images/icons/user.svg'

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.alt.first,
    fontFamily: 'Gilroy',
    fontWeight: '600',
    boxShadow: 'inset 2px 2px 0px 10px #AAAAAAA10'
  },
  Loader: {
    aspectRatio: '1 / 1',
    overflow: 'hidden'
  }
})

function UserAvatar ({ src: _src, alt, style, username, classes, className }) {
  const userLetter = username && username[0].toUpperCase()
  const src = _src === ANONYMOUS_DEFAULT_AVATAR ? '' : _src

  const setDefaultSrc = ({ target }) => {
    target.onerror = null
    target.src = ANONYMOUS_DEFAULT_AVATAR
    target.style.visibility = 'hidden'
  }

  return (
    <Fade in
      timeout={1000}
    >
      <ErrorBoundary>
        <Link style={{ textDecoration: 'none' }}
          to={'/' + username}
        >
          <ImageLoader className={classes.Loader}
            src={parseIpfsRef(src) || ANONYMOUS_DEFAULT_AVATAR}
          >
            <img alt={alt}
              src={hashToUrl(src)}
              style={style}
              onError={setDefaultSrc}
              className={className}
            />
            <Avatar alt={alt}
              className={[classes.avatar, className]}
              style={style}
            >{userLetter && userLetter}
            </Avatar>
          </ImageLoader>
        </Link>
      </ErrorBoundary>
    </Fade>
  )
}

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserAvatar)
