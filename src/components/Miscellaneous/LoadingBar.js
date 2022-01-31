import React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import Colors from '../../utils/colors'

const LoadingBar = ({ isLoading, ...restProps }) => {
  console.log('isLoading', isLoading)
  return (
      isLoading &&
        (<LinearProgress
          {...restProps}
          sx={{ width: '100%' }}
          style={{ position: 'fixed', top: 0, zIndex: 999, width: '80%', backgroundColor: Colors.green }}
         />
        )
  )
}

LoadingBar.propTypes = {
    isLoading: PropTypes.bool.isRequired
  }

export default LoadingBar
