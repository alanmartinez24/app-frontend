import React, { Component, memo } from 'react'
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

  fetchAuthToken = async () => {
    if (this.props.ethAuth) return this.props.ethAuth
    else {
      const { eosname, signature } = await wallet.scatter.getAuthToken()
      return { eosname, signature }
    }
  }

  addToCollection = async (collection) => {
    try {
      this.handleMenuClose()
      const authToken = await this.fetchAuthToken()
      const params = { postId: this.props.postid, ...authToken }
      await axios.put(`${BACKEND_API}/collections/${collection._id}`, params)
      this.handleSnackbarOpen(`Succesfully added to ${collection.name}`)
    } catch (err) {
      console.error(err)
      this.handleSnackbarOpen(`An error occured. Try again later.`)
    }
  }

  removeFromCollection = async (collection) => {
    try {
      this.handleMenuClose()
      const authToken = await this.fetchAuthToken()
      const params = { postId: this.props.postid, ...authToken }
      await axios.put(`${BACKEND_API}/collections/remove/${collection._id}`, params)
      this.handleSnackbarOpen(`Succesfully removed post from ${collection.name}`)
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
  )
      }
}

CollectionPostMenu.propTypes = {
  postid: PropTypes.string,
  classes: PropTypes.object.isRequired,
  ethAuth: PropTypes.object,
  account: PropTypes.object.isRequired,
  collections: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const ethAuth = state.ethAuth.account ? state.ethAuth : null
  const { account: ethAccount } = state.ethAuth
  const scatterIdentity = state.scatterRequest && state.scatterRequest.account
  let account = scatterIdentity || state.ethAccount
  let collections = []

  if (!scatterIdentity && ethAccount) {
    account = { name: ethAccount._id, authority: 'active' }
  }

  if (account.name && state.userCollections[account.name]) {
    collections = state.userCollections[account && account.name].collections
  }

  return {
    ethAuth,
    account,
    collections
  }
}

export default memo(connect(mapStateToProps)(withStyles(styles)(CollectionPostMenu)))
