import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    color: theme.palette.MONO.500,
    cssUnderline: {
      '&:after': {
        borderBottomColor: theme.palette.MONO.500
      }
    },
    fontFamily: 'Gilroy'
  },
  inputRoot: {
    color: theme.palette.MONO.500
  },
  inputInput: {
    color: theme.palette.MONO.500
  },
  inputUnderline: {
    borderBottomColor: theme.palette.MONO.500
  },
  textField: {
    color: theme.palette.MONO.500,
    flexWrap: 'none',
    fontFamily: 'Gilroy'
  }
})

const YupInput = ({ classes, maxLength, ...restProps }) => {
  const theme = useTheme()
  return (
    <TextField
      {...restProps}
      className={classes.textField}
      inputProps={{ maxLength, borderBottomColor: theme.palette.second }}
      InputProps={{
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    underline: classes.inputUnderline
                },
                className: classes.input }}
      InputLabelProps={{
                style: {
                    color: theme.palette.third
                }
            }}
    />
  )
}

YupInput.propTypes = {
    classes: PropTypes.object.isRequired,
    maxLength: PropTypes.number
  }

export default (withStyles(styles)(YupInput))
