import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  topBar: {
    [theme.breakpoints.up('lg')]: {
      padding: '16px 316px'
    },
    [theme.breakpoints.down('lg')]: {
      padding: '16px 316px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '16px 103px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px 117px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '16px 24px'
    }
  }
})

const TopBar = withStyles(styles)(function TopBar ({
  classes, children
}) {
  return (
    <div
      className={classes.topBar}
    >
      {children}
    </div>
  )
})

export default TopBar
