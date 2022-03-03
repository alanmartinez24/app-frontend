import React from 'react'
import PropTypes from 'prop-types'
import { TextField, withStyles, useTheme } from '@material-ui/core'

const styles = theme => ({
  input: {
    color: theme.palette.M500,
    cssUnderline: {
      '&:after': {
        borderBottomColor: theme.palette.M500
      }
    },
    fontFamily: 'Gilroy'
  },
  inputRoot: {
    color: theme.palette.M500
  },
  inputInput: {
    color: theme.palette.M500
  },
  inputUnderline: {
    borderBottomColor: theme.palette.M500
  },
  textField: {
    color: theme.palette.M500,
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
                    color: theme.third
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
