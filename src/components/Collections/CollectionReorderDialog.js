import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import DraggableCollectionPostItem from './DraggableCollectionPostItem'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import LoaderButton from '../Miscellaneous/LoaderButton'

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

const CollectionReorderDialog = ({ posts, dialogOpen, handleDialogClose }) => {
  if (!posts) return null
  const [_posts, setPosts] = useState(posts)
  const [isLoading, setIsLoading] = useState(false)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = ({ destination, source }) => {
    console.log(`destination`, destination)
    console.log(`source`, source)
    if (!destination) return
    const newItems = reorder(posts, source.index, destination.index)
    setPosts(newItems)
  }
  const handleCollectionReorder = () => {
    setIsLoading(true)
    console.log('setReorder')
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable-list'>
            {(provided) => (
              <div ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {_posts.map((post, index) => {
                  return <DraggableCollectionPostItem post={post}
                    index={index}
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
  return {
    authToken: state.authInfo
  }
}

CollectionReorderDialog.propTypes = {
  posts: PropTypes.array,
  dialogOpen: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired
}

export default memo(connect(mapStateToProps)(withStyles(styles)(CollectionReorderDialog)))
