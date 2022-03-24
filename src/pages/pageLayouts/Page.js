import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  page: {
    margin: 'auto',
    // direction: 'row',
    overflowX: 'hidden',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // backgroundSize: 'contain',
    [theme.breakpoints.up('lg')]: {
      width: '1232px'
    },
    [theme.breakpoints.down('lg')]: {
      width: '1232px'
    },
    [theme.breakpoints.down('md')]: {
      width: '994px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '668px'
    },
    [theme.breakpoints.down('xs')]: {
      width: 'auto'
    }
  }
})

const Page = withStyles(styles)(function Page ({
  classes, children
}) {
  return (
    <div
      className={classes.page}
    >
      {children}
    </div>
  )
})

export default Page
