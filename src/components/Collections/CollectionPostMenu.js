import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, MenuItem, Menu, Snackbar, SnackbarContent } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import axios from 'axios'
import wallet from '../../eos/scatter/scatter.wallet.js'
import CollectionPostDialog from './CollectionPostDialog.js'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const BACKEND_API = process.env.BACKEND_API

const styles = theme => ({
  button: {
    color: '#c4c4c4',
    marginBottom: '25px'
  },
  snack: {
    justifyContent: 'center'
  },
  menuItem: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    }
  }
})

const CollectionPostMenu = ({ postid, account, classes, ethAuth, userCollections }) => {
  if (!(account || ethAuth) || !postid) return null
  const [anchorEl, setAnchorEl] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  // const [menuCollections, setMenuCollections] = useState([])
  const [snackbarMsg, setSnackbarMsg] = useState('')
  console.log('userCollections :>> ', userCollections)

  const menuOpen = Boolean(anchorEl)
  const collectionsPageId = window.location.href.split('/').pop()

  const handleMenuClick = ({ currentTarget }) => setAnchorEl(currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)

  const handleSnackbarOpen = (msg) => setSnackbarMsg(msg)
  const handleSnackbarClose = () => setSnackbarMsg('')
  const accountName = (account && account.name) || ethAuth.account.eosname

  // function useCompare (val) {
  //   const prevVal = usePrevious(val)
  //   return prevVal !== val
  // }

  // function usePrevious (value) {
  //   const ref = useRef()
  //   useEffect(() => {
  //     ref.current = value
  //   })
  //   return ref.current
  // }
  // const needsUpdate = useCompare(userCollections)
  // console.log('userCollections :>> ', userCollections)
  // console.log('needsUpdate :>> ', needsUpdate)

  // useEffect(() => {
  //   console.log('USE EFFECT IS TRIGGERD')
  //   if (needsUpdate) {
  //   // if (userCollections[accountName].length > 0) return
  //   // const userCollectionData = (await axios.get(`${BACKEND_API}/accounts/${accountName}/collections`)).data
  //   setMenuCollections(userCollections[accountName])
  //   console.log('menuCollections :>> ', menuCollections)
  //   }
  // }, [needsUpdate])

  const fetchAuthToken = async () => {
    if (ethAuth) return ethAuth
    else {
      const { eosname, signature } = await wallet.scatter.getAuthToken()
      return { eosname, signature }
    }
  }

  const addToCollection = async (collection) => {
    try {
      handleMenuClose()
      const authToken = await fetchAuthToken()
      const params = { postId: postid, ...authToken }
      await axios.put(`${BACKEND_API}/collections/${collection._id}`, params)
      handleSnackbarOpen(`Succesfully added to ${collection.name}`)
    } catch (err) {
      console.error(err)
      handleSnackbarOpen(`An error occured. Try again later.`)
    }
  }

  const removeFromCollection = async (collection) => {
    try {
      handleMenuClose()
      const authToken = await fetchAuthToken()
      const params = { postId: postid, ...authToken }
      await axios.put(`${BACKEND_API}/collections/remove/${collection._id}`, params)
      handleSnackbarOpen(`Succesfully removed post from ${collection.name}`)
    } catch (err) {
      console.error(err)
      handleSnackbarOpen(`An error occured. Try again later.`)
    }
  }

  return (
    <>
      <Snackbar
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        open={!!snackbarMsg}
      >
        <SnackbarContent
          className={classes.snack}
          message={snackbarMsg}
        />
      </Snackbar>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleMenuClick}
        className={classes.button}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: '35ch',
            backgroundColor: 'black'
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem dense
          onClick={handleDialogOpen}
          className={classes.menuItem}
        >
          New Collection...
        </MenuItem>
        {userCollections && accountName && userCollections[accountName].length > 0 && (
          userCollections[accountName].map((collection) => {
            if (!collection.postIds.includes(postid) && collectionsPageId !== collection._id) {
            return (
              <MenuItem dense
                key={collection._id}
                className={classes.menuItem}
                onClick={() => addToCollection(collection)}
              >
                Add to {collection.name}
              </MenuItem>
          )
            } else {
              return (
                <MenuItem dense
                  key={collection._id}
                  className={classes.menuItem}
                  onClick={() => removeFromCollection(collection)}
                >
                  Remove from {collection.name}
                </MenuItem>
              )
            }
        })
        )}
      </Menu>
      <CollectionPostDialog
        account={account}
        dialogOpen={dialogOpen}
        postid={postid}
        ethAuth={ethAuth}
        handleDialogClose={handleDialogClose}
      />
    </>
  )
}

CollectionPostMenu.propTypes = {
  postid: PropTypes.string,
  account: PropTypes.object,
  classes: PropTypes.object.isRequired,
  ethAuth: PropTypes.object,
  userCollections: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  const ethAuth = state.ethAuth.account ? state.ethAuth : null
  const userCollections = state.userCollections

  return {
    ethAuth,
    userCollections: userCollections || []
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CollectionPostMenu))
