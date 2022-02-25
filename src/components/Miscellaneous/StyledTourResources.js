import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import YupButton from './YupButton'

const styles = () => ({
  tourButton: {
    margin: '10px 10px 0 0 !important',
    backgroundColor: '#00E08E !important',
    color: '#aaa !important',
    fontWeight: 400
  },
  tourResources: {
    textAlign: 'center',
    marginBottom: '1em'
  }
})

export const StyledTourResources = withStyles(styles)(function TourResources ({
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
        buttonText={'Docs'}
      />
      <YupButton
        small
        size='medium'
        variant='contained'
        className={classes.tourButton}
        href='https://yup.io'
        target='_blank'
        buttonText={'Website'}
      />
      <YupButton
        small
        size='medium'
        variant='contained'
        className={classes.tourButton}
        href='https://blog.yup.io'
        target='_blank'
        buttonText={'Blog'}
      />
    </div>
  )
})
