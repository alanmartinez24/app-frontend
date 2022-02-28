import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const YupButton = ({ variant, children, adornment, ...restProps }) => {
  const rightAdornment = adornment === 'right icon' || adornment === 'both icons' ? <ArrowForwardIcon /> : null
  const leftAdornment = adornment === 'left icon' || adornment === 'both icons' ? <ArrowForwardIcon /> : null

  if (adornment === 'one icon') {
    return <Button variant={variant || null}
      {...restProps}
           ><ArrowForwardIcon /></Button>
  }

  return (
    <Button
      variant={variant || null}
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
  adornment: PropTypes.object.isRequired
}

export default YupButton
