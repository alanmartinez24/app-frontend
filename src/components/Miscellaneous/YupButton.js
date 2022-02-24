import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const YupButton = ({ buttonText, variant, ...restProps }) => {
  return (
    <Button variant={variant}
      {...restProps}
    >
      {buttonText}
    </Button>
  )
}

YupButton.propTypes = {
  variant: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default YupButton
