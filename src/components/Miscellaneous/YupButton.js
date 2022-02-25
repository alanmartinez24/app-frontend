import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const YupButton = ({ variant, children, ...restProps }) => {
  return (
    <Button variant={variant || null}
      {...restProps}
    >
      {children}
    </Button>
  )
}

YupButton.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  adornment: PropTypes.object.isRequired
}

export default YupButton
