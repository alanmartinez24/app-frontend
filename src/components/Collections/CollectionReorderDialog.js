import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import CollectionPostItem from './CollectionPostItem'

// const BACKEND_API = process.env.BACKEND_API
// const WEB_APP_URL = process.env.WEB_APP_URL

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

const CollectionReorderDialog = ({ collection, dialogOpen, handleReorderDialogClose }) => {
  if (!collection) return null

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleReorderDialogClose}
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
        {collection.posts.map(post => <CollectionPostItem previewData={post.previewData} />)}
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state, ownProps) => {
  const authToken = state.authInfo
  return {
    authToken
  }
}

CollectionReorderDialog.propTypes = {
  collection: PropTypes.object,
  dialogOpen: PropTypes.bool,
  handleReorderDialogClose: PropTypes.func.isRequired
}

export default memo(connect(mapStateToProps)(withStyles(styles)(CollectionReorderDialog)))
