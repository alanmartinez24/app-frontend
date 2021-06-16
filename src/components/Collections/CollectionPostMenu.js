<<<<<<< HEAD
// import React, { useEffect, useState } from 'react'
import React, { useState } from 'react'
=======
import React, { Component } from 'react'
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab
import PropTypes from 'prop-types'
import { IconButton, MenuItem, Menu, Snackbar, SnackbarContent } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import axios from 'axios'
import wallet from '../../eos/scatter/scatter.wallet.js'
import CollectionPostDialog from './CollectionPostDialog.js'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { addPostToCollection, removePostFromCollection } from '../../redux/actions'

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

<<<<<<< HEAD
const CollectionPostMenu = ({ postid, accountName, classes, ethAuth }) => {
  if (!(accountName || ethAuth) || !postid) return null
  const [anchorEl, setAnchorEl] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userCollections, setUserCollections] = useState([])
  const [snackbarMsg, setSnackbarMsg] = useState('')

  const menuOpen = Boolean(anchorEl)
  const collectionsPageId = window.location.href.split('/').pop()

  const handleMenuClick = ({ currentTarget }) => setAnchorEl(currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)

  const handleSnackbarOpen = (msg) => setSnackbarMsg(msg)
  const handleSnackbarClose = () => setSnackbarMsg('')

  console.log(setUserCollections, 'SET USER COLLECTIONS')
  // const accountName = (account && account.name) || ethAuth.account.eosname

  // useEffect(() => {
  //       (async () => {
  //         try {
  //           if (userCollections.length > 0) return
  //           const userCollectionData = (await axios.get(`${BACKEND_API}/accounts/${accountName}/collections`)).data
  //           setUserCollections(userCollectionData)
  //         } catch (err) {
  //           console.error(err)
  //         }
  //       })()
  // }, [account, ethAuth])
=======
class CollectionPostMenu extends Component {
  state = {
    anchorEl: null,
    dialogOpen: false,
    snackbarMsg: ''
  }

  handleMenuClick = ({ currentTarget }) => this.setState({ anchorEl: currentTarget })
  handleMenuClose = () => this.setState({ anchorEl: null })
  handleDialogOpen = () => this.setState({ dialogOpen: true })
  handleDialogClose = () => this.setState({ dialogOpen: false })
  handleSnackbarOpen = (msg) => this.setState({ snackbarMsg: msg })
  handleSnackbarClose = () => this.setState({ snackbarMsg: '' })
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab

  fetchAuthToken = async () => {
    if (this.props.ethAuth) return this.props.ethAuth
    else {
      const { eosname, signature } = await wallet.scatter.getAuthToken()
      return { eosname, signature }
    }
  }

  addToCollection = async (collection) => {
    try {
      const { postid, addPostRedux, account } = this.props
      this.handleMenuClose()
      const authToken = await this.fetchAuthToken()
      const params = { postId: postid, ...authToken }
      await axios.put(`${BACKEND_API}/collections/${collection._id}`, params)
      this.handleSnackbarOpen(`Succesfully added to ${collection.name}`)
      addPostRedux(account && account.name, collection, postid)
    } catch (err) {
      console.error(err)
      this.handleSnackbarOpen(`An error occured. Try again later.`)
    }
  }

  removeFromCollection = async (collection) => {
    try {
      const { postid, removePostRedux, account } = this.props
      this.handleMenuClose()
      const authToken = await this.fetchAuthToken()
      const params = { postId: postid, ...authToken }
      await axios.put(`${BACKEND_API}/collections/remove/${collection._id}`, params)
      this.handleSnackbarOpen(`Succesfully removed post from ${collection.name}`)
      removePostRedux(account && account.name, collection, postid)
    } catch (err) {
      console.error(err)
      this.handleSnackbarOpen(`An error occured. Try again later.`)
    }
  }

  render () {
    const { postid, classes, ethAuth, account, collections } = this.props
    if (!postid) return null
    const { anchorEl, snackbarMsg, dialogOpen } = this.state
    const accountName = account && account.name
    const collectionsPageId = window.location.href.split('/').pop()
    const menuOpen = Boolean(anchorEl)
    return (
      <>
        <Snackbar
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
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
          onClick={this.handleMenuClick}
          className={classes.button}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='long-menu'
          anchorEl={anchorEl}
          keepMounted
          open={menuOpen}
          onClose={this.handleMenuClose}
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
            onClick={this.handleDialogOpen}
            className={classes.menuItem}
          >
            New Collection...
          </MenuItem>
          {collections && accountName && collections.length > 0 && (
            collections.map((collection) => {
              if (!collection.postIds.includes(postid) && collectionsPageId !== collection._id) {
              return (
                <MenuItem dense
                  key={collection._id}
                  className={classes.menuItem}
                  onClick={() => this.addToCollection(collection)}
                >
                  Add to {collection.name}
                </MenuItem>
<<<<<<< HEAD
              )
            }
        })
        )}
      </Menu>
      <CollectionPostDialog
        accountName={accountName}
        dialogOpen={dialogOpen}
        postid={postid}
        ethAuth={ethAuth}
        handleDialogClose={handleDialogClose}
      />
    </>
=======
            )
              } else {
                return (
                  <MenuItem dense
                    key={collection._id}
                    className={classes.menuItem}
                    onClick={() => this.removeFromCollection(collection)}
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
          handleDialogClose={this.handleDialogClose}
        />
      </>
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab
  )
      }
}

CollectionPostMenu.propTypes = {
  postid: PropTypes.string,
<<<<<<< HEAD
  accountName: PropTypes.object,
=======
>>>>>>> 630a8a412f8b861b57f76bd7449e24f879eac1ab
  classes: PropTypes.object.isRequired,
  ethAuth: PropTypes.object,
  account: PropTypes.object.isRequired,
  collections: PropTypes.array.isRequired,
  addPostRedux: PropTypes.func.isRequired,
  removePostRedux: PropTypes.func.isRequired
}

CollectionPostMenu.whyDidYouRender = true

const mapStateToProps = (state, ownProps) => {
  const ethAuth = state.ethAuth.account ? state.ethAuth : null
  const { account: ethAccount } = state.ethAuth
  const scatterIdentity = state.scatterRequest && state.scatterRequest.account
  let account = scatterIdentity || state.ethAccount
  let collections = []

  if (!scatterIdentity && ethAccount) {
    account = { name: ethAccount._id, authority: 'active' }
  }

  if (account && account.name && state.userCollections[account.name]) {
    collections = state.userCollections[account && account.name].collections
  }

  return {
    ethAuth,
    account,
    collections
  }
}
const mapActionToProps = (dispatch) => {
  return {
    addPostRedux: (eosname, collection, postid) => dispatch(addPostToCollection(eosname, collection, postid)),
    removePostRedux: (eosname, collection, postid) => dispatch(removePostFromCollection(eosname, collection, postid))
    }
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CollectionPostMenu))
