import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const { WEB_APP_URL } = process.env

const ConditionalLinkWrapper = ({ children, href, ...restProps }) => {
  if (!href) return null
  const isNativeYupPost = href.startsWith(WEB_APP_URL) || href.startsWith('/')
  return isNativeYupPost ? (
    <Link {...restProps} to={href.replace(WEB_APP_URL, '')}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" {...restProps}>
      {children}
    </a>
  )
}

ConditionalLinkWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired
}

export default ConditionalLinkWrapper
