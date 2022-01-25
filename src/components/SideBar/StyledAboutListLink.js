import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  ListItem,
  ListItemText,
  Icon,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import ListLink from '@material-ui/core/Link'

const styles = theme => ({
  ListItem: {
    borderRadius: '0.4rem'
  }
})

export const StyledAboutListLink = withStyles(styles)(function AboutListLink ({ classes }) {
  return (
    <ListItem className={classes.ListItem}
      button
      component={ListLink}
      href='https://yup.io'
      style={{ textDecoration: 'none', display: 'none' }}
    >
      <ListItemIcon style={{ minWidth: '20px' }}>
        <Icon className='fal fa-globe' />
      </ListItemIcon>
      <ListItemText>
        <Typography variant='body2'
          className={classes.typography}
        >
          About
        </Typography>
      </ListItemText>
    </ListItem>
  )
})
