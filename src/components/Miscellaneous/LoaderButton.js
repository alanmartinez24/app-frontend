import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, Button } from '@material-ui/core'

const LoaderButton = ({ classes, isLoading, backgroundColor, color, buttonText, ...restProps }) => {
  return (
    <Button
      {...restProps}
      style={{ backgroundColor, color, textTransform: 'none' }}
    >
      {buttonText}
      {isLoading &&
        (<CircularProgress size={20}
          style={{ color: 'white', position: 'absolute', right: '3%' }}
         />
        )}
    </Button>
  )
}

LoaderButton.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
  }

export default LoaderButton
