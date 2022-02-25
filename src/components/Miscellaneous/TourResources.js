import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import YupButton from '../../components/Miscellaneous/YupButton'

const styles = () => ({
  tourButton: {
    fontWeight: 400
  }
})

export const StyledTourResources = withStyles(styles)(function TourResources ({
  classes
}) {
  return (
    <div className='tourResources'>
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
