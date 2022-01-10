import React, { memo, Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import SyncIcon from '@material-ui/icons/Sync'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'

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

class ReFetchPreviewBtn extends Component {
  state = {
    snackbarMsg: ''
  }

  handleSnackbarOpen = (msg) => this.setState({ snackbarMsg: msg })
  handleSnackbarClose = () => this.setState({ snackbarMsg: '' })

  sendReFetchPreview = async (postid) => {
    try {
      const { postid } = this.props
      const data = (await axios.post(`${BACKEND_API}/posts/re-fetch/preview`, { postid })).data
      this.handleSnackbarOpen('message' in data ? data.message : 'Request to update preview sent')
    } catch (err) {
      this.handleSnackbarOpen('message' in err.response.data ? err.response.data.message : `An error occured. Try again later.`)
    }
  }

  render () {
    const { postid, classes } = this.props
    if (!postid) return null
    const { snackbarMsg } = this.state

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
          aria-label='sync preview'
          aria-controls='long-menu'
          aria-haspopup='false'
          onClick={this.sendReFetchPreview}
          className={classes.button}
        >
          <SyncIcon />
        </IconButton>
      </>
  )
      }
}

ReFetchPreviewBtn.propTypes = {
  postid: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default memo(withStyles(styles)(ReFetchPreviewBtn))
