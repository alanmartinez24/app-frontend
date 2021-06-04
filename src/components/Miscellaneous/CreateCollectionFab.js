import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import CollectionPostDialog from '../Collections/CollectionPostDialog.js'

const styles = theme => ({
  collectionFab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(5),
    zIndex: '1000',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
})

const CreateCollectionFab = ({ classes, account }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)

  return (
    <>
      <CollectionPostDialog
        account={account}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
      />
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleDialogOpen}
        className={classes.collectionFab}
      >
        <AddIcon />
      </IconButton>
    </>
  )
}

CreateCollectionFab.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired
}

export default (withStyles(styles)(CreateCollectionFab))
