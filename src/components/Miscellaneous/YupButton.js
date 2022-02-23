import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { InputAdornment } from '@mui/material'

const YupButton = ({ buttonText, variant, ...restProps }) => {
  return (
    <Button {...restProps} variant={variant}>
      {buttonText}
    </Button>
  )
}

YupButton.propTypes = {
  variant: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default YupButton
