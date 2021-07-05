
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Img from 'react-image'

const DEFAULT_IMG = `https://app-gradients.s3.amazonaws.com/gradient${Math.floor(Math.random() * 5) + 1}.png`

const styles = theme => ({
    accountErrorHeader: {
      paddingTop: '15%',
      fontFamily: '"Gilroy", sans-serif',
      fontWeight: '600',
      fontSize: '1.5rem',
      color: '#ffffff'
    },
    accountErrorSub: {
      paddingTop: '25px',
      fontFamily: '"Gilroy", sans-serif',
      fontWeight: '500',
      fontSize: '1rem',
      color: '#ffffff'
    },
    container: {
      background: 'linear-gradient(180deg, #1B1B1B 0%, #151515 100%)',
      height: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      [theme.breakpoints.down('xs')]: {
        background: '#2a2a2a'
      }
    },
    feedPage: {
      marginLeft: '110px',
      [theme.breakpoints.down('lg')]: {
        marginLeft: '30px',
        maxWidth: '550px'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: '15px',
        maxWidth: '96%'
      }
    },
    feedLoader: {
      backgroundSize: 'cover',
      maxWidth: '625px',
      minWidth: '250px',
      minHeight: '800px',
      marginLeft: '110px',
      [theme.breakpoints.down('lg')]: {
        marginLeft: '30px',
        maxWidth: '550px'
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100vw',
        marginLeft: '15px'
      }
    },
    infiniteScroll: {
      width: '100vw'
    },
    Mask: {
      outline: 'solid 0px #FAFAFA44'
    },
    page: {
      width: '100%',
      marginLeft: 0,
      [theme.breakpoints.down('md')]: {
        width: '100%'
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 200,
        width: `calc(100% - 200px)`
      },
      [theme.breakpoints.down('xs')]: {
        background: '#1b1b1ba1',
        backgroundSize: 'contain',
        overflowX: 'hidden'
      },
      flex: 1
    },
    progress: {
      margin: theme.spacing(2),
      color: 'white'
    },
    progressContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    },
    Tour: {
      fontFamily: '"Gilroy", sans-serif',
      padding: '20px 40px 20px 30px !important'
    },
    tourFab: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(12),
      background: '#A0A0A0AA',
      color: '#FAFAFA',
      zIndex: 1000,
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    icons: {
      color: '#fff'
    },
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
    collectionContainer: {
      borderRadius: 10,
      margin: 0,
      '&:hover': {
        background: '#fafafa05'
      }
    },
    tabs: {
      color: '#fff',
      fontSize: '1.2rem',
      marginLeft: '35px',
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
        marginLeft: '15px'
      }
    },
    collections: {
      color: '#fff',
      zIndex: '999',
      marginLeft: '20px',
      maxWidth: '25%',
      [theme.breakpoints.down('md')]: {
        margin: '0px 0px 0px 50px',
        width: '100%',
        maxWidth: '100%'
      }
    },
    collection: {
      flexBasis: 'unset',
      padding: '8px 8px 8px 0px !important'
    },
    showAll: {
      color: '#fff',
      width: '100px',
      fontSize: '0.8rem',
      fontWeight: '400',
      [theme.breakpoints.down('md')]: {
        marginLeft: '-75px'
      }
    }
  })

const Collection = ({ classes, collection, username }) => {
    const fmtCollectionName = collection && collection.name.replace(/\s+/g, '-').toLowerCase()
    const collectionLength = collection.postIds.length
    const collectionSubheader =
      username === collection.owner
        ? collectionLength === 1
          ? `1 post`
          : `${collectionLength} posts`
        : collection.owner

    return (
      <Link
        to={`/collections/${encodeURIComponent(fmtCollectionName)}/${collection._id
          }`}
        style={{ textDecoration: 'none', color: '#fff' }}
      >
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
              src={[collection.imgSrcUrl, DEFAULT_IMG]}
              alt='thumbnail'
              className={classes.collectionImg}
            />
          </Grid>
          <Grid item
            xs={10}
            lg={9}
            xl={10}
          >
            <Typography variant='h5'>{collection.name}</Typography>
            <Typography variant='body2'>{collectionSubheader}</Typography>
          </Grid>
        </Grid>
      </Link>
    )
  }

  Collection.propTypes = {
    classes: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    username: PropTypes.string
  }

  export default (withStyles(styles)(CollectionPostDialog))
