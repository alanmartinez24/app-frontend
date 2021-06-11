import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  DialogActions,
  SnackbarContent,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import wallet from '../../eos/scatter/scatter.wallet.js'
import { connect } from 'react-redux'
import { addUserCollection } from '../../redux/actions'
import YupInput from '../Miscellaneous/YupInput'
import LoaderButton from '../Miscellaneous/LoaderButton'

const BACKEND_API = process.env.BACKEND_API
const WEB_APP_URL = process.env.WEB_APP_URL
const TITLE_LIMIT = 30
const DESC_LIMIT = 140

const styles = theme => ({
  dialog: {
    marginLeft: '200px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'inherit'
    }
  },
  dialogTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(1.5)
  },
  dialogTitleText: {
    fontSize: '1.3rem',
    fontFamily: 'Gilroy',
    fontWeight: '300',
    color: '#fafafa'
  },
  dialogContent: {
    root: {
      margin: 0,
      padding: theme.spacing(2),
      color: '#fafafa'
    }
  },
  snack: {
    justifyContent: 'center'
  }
})


const CollectionPostDialog = ({ postid, classes, dialogOpen, handleDialogClose, ethAuth, addCollectionToRedux }) => {
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [newCollectionInfo, setNewCollectionInfo] = useState({})

  const handleNameChange = ({ target }) => setName(target.value)
  const handleDescriptionChange = ({ target }) => setDescription(target.value)
  const handleSnackbarOpen = msg => setSnackbarMsg(msg)
  const handleSnackbarClose = () => setSnackbarMsg('')
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !!name) handleCreateNewCollection()
  }

  const fetchAuthToken = async () => {
    if (ethAuth) return ethAuth
    else {
      const { eosname, signature } = await wallet.scatter.getAuthToken()
      return { eosname, signature }
    }
  }

  const handleCreateNewCollection = async () => {
    try {
      if (isLoading) return
      setIsLoading(true)
      const postId = postid === 'routeFromUrl' ? undefined : postid
      const authToken = await fetchAuthToken()
      if (authToken.account && authToken.account.eosname) {
        authToken.eosname = authToken.account.eosname
      }
      const params = { name, description, postId, ...authToken }
      const { data } = await axios.post(`${BACKEND_API}/collections`, params)
      addCollectionToRedux(authToken.eosname, data)
      setNewCollectionInfo(data)
      handleSnackbarOpen(`Succesfully created ${name}`)
      handleDialogClose()
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Snackbar
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        open={!!snackbarMsg}
      >
        <Link
          href={`${WEB_APP_URL}/collections/${encodeURIComponent(
            newCollectionInfo.name
          )}/${newCollectionInfo._id}`}
        >
          <SnackbarContent className={classes.snack}
            message={snackbarMsg}
          />
        </Link>
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onKeyDown={handleKeyDown}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {
            backgroundColor: '#0A0A0A',
            borderRadius: '25px',
            boxShadow: '0px 0px 20px 6px rgba(255, 255, 255, 0.1)',
            width: '80%',
            padding: '1rem 0.5rem',
            maxWidth: '500px',
            color: '#fafafa'
          }
        }}
        BackdropProps={{
          style: {
            backdropFilter: 'blur(3px)'
          }
        }}
      >
        <DialogTitle className={classes.dialogTitleText}
          id='form-dialog-title'
        >
          <Typography variant='h3'>New Collection</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#fff' }}>
            Start here to make a new collection
          </DialogContentText>
          <YupInput
            maxLength={TITLE_LIMIT}
            fullWidth
            autoFocus
            onChange={handleNameChange}
            id='name'
            label='Name'
            type='text'
          />
          <YupInput
            color='#fafafa'
            maxLength={DESC_LIMIT}
            fullWidth
            id='description'
            onChange={handleDescriptionChange}
            label='Description'
            type='text'
          />
        </DialogContent>
        <DialogActions>
          <LoaderButton onClick={handleCreateNewCollection}
            fullWidth
            buttonText='Create Collection'
            isLoading={isLoading}
            backgroundColor='#00eab7'
            color='#0A0A0A'
          />
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const ethAuth = state.ethAuth.account ? state.ethAuth : null
  return {
    ethAuth
  }
}

const mapActionToProps = (dispatch) => {
  return {
    addCollectionToRedux: (eosname, collection) => dispatch(addUserCollection(eosname, collection))
    }
}

CollectionPostDialog.propTypes = {
  postid: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  addCollectionToRedux: PropTypes.func.isRequired,
  ethAuth: PropTypes.object
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CollectionPostDialog))
