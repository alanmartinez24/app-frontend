import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  pageHeader: {
    top: 0,
    zIndex: 500,
    width: '100vw',
    position: 'sticky',
    borderRadius: '5px',
    backgroundColor: theme.palette.M800,
    [theme.breakpoints.up('lg')]: {
      padding: '24px 316px 0px'
    },
    [theme.breakpoints.down('lg')]: {
      padding: '24px 316px 0px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '24px 103px 0px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '23px 117px 0px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '23px 24px 0px'
    }
  }
})

const PageHeader = withStyles(styles)(function PageHeader ({
  classes, children
}) {
  return (
    <div className={classes.pageHeader} >
      {children}
    </div>
  )
})

export default PageHeader
