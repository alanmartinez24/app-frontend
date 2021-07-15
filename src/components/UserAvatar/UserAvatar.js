import React from 'react'
import PropTypes from 'prop-types'
import ImageLoader from 'react-load-image'
import { parseIpfsRef, hashToUrl } from '../../utils/ipfs.js'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { Avatar, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

const ANONYMOUS_DEFAULT_AVATAR = 'images/icons/user.svg'

function UserAvatar ({ className, src: _src, alt, style, username }) {
  const userLetter = username && username[0].toUpperCase()
  const { palette } = useTheme()
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
        <ImageLoader src={parseIpfsRef(src) || ANONYMOUS_DEFAULT_AVATAR}>
          <img alt={alt}
            className={className}
            src={hashToUrl(src)}
            style={{
          ...style, objectFit: 'cover' }}
            onError={setDefaultSrc}
          />
          <Avatar alt={alt}
            className={className}
            style={{ ...style, backgroundColor: palette.common.fifth, fontFamily: 'Gilroy', fontWeight: '600', boxShadow: 'inset 2px 2px 0px 10px #AAAAAAA10' }}
          >{userLetter && userLetter}
          </Avatar>
        </ImageLoader>
      </ErrorBoundary>
    </Fade>
  )
}

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object,
  username: PropTypes.string.isRequired
}

export default UserAvatar
