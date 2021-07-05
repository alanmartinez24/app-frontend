import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { accountInfoSelector } from '../../redux/selectors'

const BACKEND_API = process.env.BACKEND_API
const WEB_APP_URL = process.env.WEB_APP_URL

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
  dialogContentText: {
    root: {
      paddingBottom: '2rem',
      paddingTop: '2rem'
    }
  },
  snack: {
    justifyContent: 'center'
  }
})

const CollectionReorderDialog = ({ authToken, collections }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const handleDialogClose = () => setOpenDialog(false)

  return (
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      aria-labelledby='form-dialog-title'
      PaperProps={{
            style: {
              backgroundColor: '#0A0A0A',
              borderRadius: '25px',
              boxShadow: '0px 0px 20px 6px rgba(255, 255, 255, 0.1)',
              width: '80%',
              padding: '1rem 0.5rem',
              maxWidth: '500px',
              color: '#fafafa',
              maxHeight: '50vh'
            }
          }}
      BackdropProps={{
            style: {
              backdropFilter: 'blur(3px)'
            }
          }}
    >
      <DialogTitle id='form-dialog-title'>
        <Typography variant='h3'>Reorder Collections </Typography>
      </DialogTitle>
      <DialogContent>
        {collections.map(collection => {
              return (
                <Collection
                  classes={classes}
                  collection={collection}
                  username={username}
                />
              )
            })}
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state, ownProps) => {
  const authToken = state.authInfo
  const account = accountInfoSelector(state)
  return {
    authToken,
    account
    collections: state.collections
  }
}

CollectionReorderDialog.propTypes = {
  authToken: PropTypes.object,
  collections: PropTypes.object
}

export default connect(mapStateToProps)(withStyles(styles)(CollectionReorderDialog))
