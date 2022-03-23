import React from 'react'
import { Grid, Box, withStyles } from '@material-ui/core'

const styles = theme => ({
  page: {
    margin: 'auto',
    overflowX: 'hidden',
    backgroundSize: 'contain',
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
    <Box className={classes.page}>
      <Grid container
        direction='column'
        justifyContent='center'
      >
        {children}
      </Grid>
    </Box>
  )
})

export default Page
