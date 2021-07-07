import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import DraggableCollectionPostItem from './DraggableCollectionPostItem'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import LoaderButton from '../Miscellaneous/LoaderButton'
import axios from 'axios'

const BACKEND_API = process.env.BACKEND_API

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

const CollectionReorderDialog = ({ collection, dialogOpen, handleDialogClose, authToken }) => {
  if (!collection.posts) return null
  const [posts, setPosts] = useState(collection.posts)
  const [isLoading, setIsLoading] = useState(false)

  const onDragEndHandler = ({ destination, source }) => {
    if (!destination) return
    const [removed] = posts.splice(source.index, 1)
    posts.splice(destination.index, 0, removed)
    setPosts(posts)
  }

  const handleCollectionReorder = async () => {
    try {
      setIsLoading(true)
      if (authToken.account && authToken.account.eosname) {
        authToken.eosname = authToken.account.eosname
      }
      const params = { postIds: posts.map(({ _id }) => _id.postid), ...authToken }
      await axios.put(`${BACKEND_API}/collections/${collection._id}`, params)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      aria-labelledby='form-dialog-title'
      PaperProps={{
        style: {
          backgroundColor: '#0A0A0A',
          borderRadius: '25px',
          boxShadow: '0px 0px 20px 6px rgba(255, 255, 255, 0.1)',
          width: '80%',
          padding: '1rem 0.5rem',
          maxWidth: '700px',
          color: '#fafafa',
          maxHeight: '80vh'
        }
      }}
      BackdropProps={{
        style: {
          backdropFilter: 'blur(3px)'
        }
      }}
    >
      <DialogTitle id='form-dialog-title'>
        <Typography variant='h3'>Reorder Collection</Typography>
      </DialogTitle>
      <DialogContent>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId='droppable-list'>
            {(provided) => (
              <div ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {posts.map((post, index) => {
                  return <DraggableCollectionPostItem post={post}
                    index={index}
                    key={post._id.postid}
                         />
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions>
        <LoaderButton
          onClick={handleCollectionReorder}
          fullWidth
          backgroundColor='#1a1a1a'
          buttonText='Save'
          color='#00eab7'
          isLoading={isLoading}
        />
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(`state`, state)
  return {
    authToken: state.authInfo
  }
}

CollectionReorderDialog.propTypes = {
  collection: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  authToken: PropTypes.object.isRequired
}

export default memo(connect(mapStateToProps)(withStyles(styles)(CollectionReorderDialog)))
