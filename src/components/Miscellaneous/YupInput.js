import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    color: '#fafafa',
    cssUnderline: {
      '&:after': {
        borderBottomColor: '#fafafa'
      }
    },
    marginBottom: '20px',
    fontFamily: 'Gilroy'
  },
  inputRoot: {
    color: '#fafafa'
  },
  inputInput: {
    color: '#fafafa'
  },
  inputUnderline: {
    borderBottomColor: '#fafafa'
  },
  textField: {
    color: '#fafafa',
    flexWrap: 'none',
    fontFamily: 'Gilroy'
  }
})

const YupInput = ({ classes, ...restProps }) => {
  return (
    <TextField
      {...restProps}
      className={classes.textField}
      inputProps={{ maxLength: 24, borderBottomColor: '#fafafa' }}
      InputProps={{
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    underline: classes.inputUnderline
                },
                className: classes.input }}
      InputLabelProps={{
                style: {
                    color: '#a0a0a0'
                }
            }}
    />
  )
}

YupInput.propTypes = {
    classes: PropTypes.object.isRequired
  }

export default (withStyles(styles)(YupInput))
