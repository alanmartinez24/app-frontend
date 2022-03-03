import React from 'react'
import YupButton from './YupButton'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  tourButton: {
    color: '#aaa !important',
    backgroundColor: '#00E08E !important',
    margin: '10px 10px 0 0 !important',
    fontWeight: 400
  },
  tourResources: {
    textAlign: 'center',
    marginBottom: '1em'
  }
})

const StyledTourResources = withStyles(styles)(function TourResources ({
  classes
}) {
  return (
    <div className={classes.tourResources}>
      <YupButton
        small
        size='medium'
        variant='contained'
        className={classes.tourButton}
        href='https://docs.yup.io'
        target='_blank'
      >Docs</YupButton>
      <YupButton
        small
        size='medium'
        variant='contained'
        className={classes.tourButton}
        href='https://yup.io'
        target='_blank'
      >Website</YupButton>
      <YupButton
        small
        size='medium'
        variant='contained'
        className={classes.tourButton}
        href='https://blog.yup.io'
        target='_blank'
      >Blog</YupButton>
    </div>
  )
})

export default StyledTourResources
