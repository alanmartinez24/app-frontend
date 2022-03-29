import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

const VoteLoader = (props) => (
  <CircularProgress size={30}
    style={{ marginRight: '5px' }}
  />
)

export default VoteLoader
