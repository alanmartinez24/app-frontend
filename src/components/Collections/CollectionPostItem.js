
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Img from 'react-image'

const DEFAULT_IMG = `https://app-gradients.s3.amazonaws.com/gradient${Math.floor(Math.random() * 5) + 1}.png`

const styles = theme => ({
    collectionImg: {
      height: '60px',
      width: '60px',
      objectFit: 'cover',
      borderRadius: '5px',
      [theme.breakpoints.down('md')]: {
        height: '50px',
        width: '50px'
      },
      [theme.breakpoints.down('xs')]: {
        height: '40px',
        width: '40px',
        marginTop: '5px'
      }
    },
    collection: {
        flexBasis: 'unset',
        padding: '8px 8px 8px 0px !important'
      },
    collectionContainer: {
      borderRadius: 10,
      margin: 0,
      '&:hover': {
        background: '#fafafa05'
      }
    }
  })

const CollectionPostItem = ({ classes, previewData }) => {
  const { img, title } = previewData

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing={3}
        className={classes.collectionContainer}
      >
        <Grid item
          xs={2}
          lg={3}
          xl={2}
          className={classes.collection}
        >
          <Img
            src={[img, DEFAULT_IMG]}
            alt='thumbnail'
            className={classes.collectionImg}
          />
        </Grid>
        <Grid item
          xs={10}
          lg={9}
          xl={10}
        >
          <Typography variant='h4'>{title}</Typography>
        </Grid>
      </Grid>
    )
  }

  CollectionPostItem.propTypes = {
    classes: PropTypes.object.isRequired,
    previewData: PropTypes.object.isRequired
  }

  export default (withStyles(styles)(CollectionPostItem))
