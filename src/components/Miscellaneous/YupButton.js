import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const YupButton = ({ variant, children, adornment, ...restProps }) => {
  const rightAdornment = adornment === 'rightIcon' || adornment === 'bothIcons' ? <ArrowForwardIcon /> : null
  const leftAdornment = adornment === 'leftIcon' || adornment === 'bothIcons' ? <ArrowForwardIcon /> : null

  if (adornment === 'oneIcon') {
    return <Button variant={variant}
      {...restProps}
           ><ArrowForwardIcon /></Button>
  }

  return (
    <Button
      variant={variant}
      {...restProps}
    >
      {leftAdornment}
      {children}
      {rightAdornment}
    </Button>
  )
}

YupButton.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  adornment: PropTypes.string.isRequired
}

export default YupButton
