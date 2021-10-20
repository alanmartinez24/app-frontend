import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import LoaderButton from '../Miscellaneous/LoaderButton'
import {
TwitterShareButton
} from 'react-share'
import Colors from '../../utils/colors'

const styles = theme => ({
    dialog: {
        width: '100%'
    },
    twitterButton: {
        width: '100%'
    },
    loaderButton: {
        background: Colors.Green
    }
})
class ShareTwitterDialog extends Component {
    render () {
        const shareUrl = 'https://app.yup.io'
        const { handleDialogClose, dialogOpen, classes, rewards } = this.props
        console.log(rewards)
        return (
          <ErrorBoundary >
            <Dialog open={dialogOpen}
              onClose={() => {
            handleDialogClose()
          }}
              aria-labelledby='form-dialog-title'
              className={classes.dialog}
            ><DialogTitle style={{ paddingBottom: '10px' }}>
              <Typography
                align='left'
                className={classes.dialogTitleText}
                variant='h3'
              >
                You are about to receive {rewards} YUP !
              </Typography>
            </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ padding: '20px 0px' }}>
                  <Typography
                    align='left'
                    className={classes.dialogContentText}
                    variant='h5'
                  >
                    <span className={classes.desktop}>
                      To finalize, please share on Twitter.
                    </span>
                  </Typography>
                </DialogContentText>

                <TwitterShareButton
                  className={classes.twitterButton}
                  url={shareUrl}
                  title={`I just earned ${rewards} YUP!`}
                  hashtags={['YUP']}
                  windowWidth={20000}
                  windowHeight={20000}
                  onShareWindowClose={() => {
                    handleDialogClose()
                  }}
                > <Grid container
                  alignItems='center'
                  spacing={1}
                  className={classes.twitterButton}
                  >
                  <Grid item
                    className={classes.twitterButton}
                  >
                    <LoaderButton
                      className={classes.loaderButton}
                      fullWidth
                      buttonText='Share on Twitter'
                      variant='contained'

                    />
                  </Grid>
                </Grid>
                </TwitterShareButton>
              </DialogContent>
            </Dialog>
          </ErrorBoundary>
              )
    }
}

ShareTwitterDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    dialogOpen: PropTypes.bool.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    rewards: PropTypes.number
  }
  export default withStyles(styles)(ShareTwitterDialog)
