
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import Img from 'react-image'
import { withStyles } from '@material-ui/core/styles'

const AWS_DEFAULT_COLLECTION_IMG_URLS = [...Array(5)].map((_, i) => `https://app-gradients.s3.amazonaws.com/gradient${i + 1}.png`)
const getRandomGradientImg = () => `${AWS_DEFAULT_COLLECTION_IMG_URLS[Math.floor(Math.random() * AWS_DEFAULT_COLLECTION_IMG_URLS.length)]}`

const styles = theme => ({
  recommendedImg: {
    height: '60px',
    width: '60px',
    objectFit: 'cover',
    marginTop: '10px',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
      height: '50px',
      width: '50px'
    },
    [theme.breakpoints.down('xs')]: {
      height: '40px',
      width: '40px'
    }
  },
  recommendedContainer: {
    borderRadius: 10,
    margin: '5px 0px',
    '&:hover': {
      background: '#fafafa05'
    }
  },
  recommendedImgContainer: {
    flexBasis: 'unset'
  }
})

const RecommendedCollections = ({ classes, collection }) => {
  const fmtCollectionName = collection && collection.name && collection.name.replace(/\s+/g, '-').toLowerCase()

  return (
    <Link
      to={`/collections/${encodeURIComponent(fmtCollectionName)}/${collection._id}`}
      style={{ textDecoration: 'none', color: '#fff' }}
    >
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing={2}
        className={classes.recommendedContainer}
      >
        <Grid item
          xs={3}
          lg={4}
          xl={4}
          className={classes.recommendedImgContainer}
        >
          <Img
            src={[collection.imgSrcUrl, getRandomGradientImg()]}
            alt='thumbnail'
            className={classes.recommendedImg}
          />
        </Grid>
        <Grid item
          xs={9}
          lg={8}
          xl={8}
        >
          <Typography variant='h5'>{collection.name}</Typography>
          <Typography variant='body2'>{collection.owner}</Typography>
        </Grid>
      </Grid>
    </Link>
  )
}

RecommendedCollections.propTypes = {
  classes: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired
}

export default memo(withStyles(styles)(RecommendedCollections))
