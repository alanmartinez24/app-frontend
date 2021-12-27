import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/core/styles'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const styles = theme => ({
  input: {
    color: theme.palette.common.fifth,
    cssUnderline: {
      '&:after': {
        borderBottomColor: theme.palette.common.fifth
      }
    },
    fontFamily: 'Gilroy'
  },
  inputRoot: {
    color: theme.palette.common.fifth
  },
  inputInput: {
    color: theme.palette.common.fifth
  },
  inputUnderline: {
    borderBottomColor: theme.palette.common.fifth
  },
  textField: {
    color: theme.palette.common.fifth,
    flexWrap: 'none',
    fontFamily: 'Gilroy'
  }
})

const YupInput = ({ classes, maxLength, onSubmit, ...restProps }) => {
  const theme = useTheme()
  const submitBtn = onSubmit ? { startAdornment: <InputAdornment position='start'><KeyboardArrowRightIcon onClick={onSubmit} /></InputAdornment> } : null

  return (
    <TextField
      {...restProps}
      className={classes.textField}
      inputProps={{ maxLength, borderBottomColor: theme.palette.second }}
      InputProps={{
                InputAdornment: submitBtn,
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
    maxLength: PropTypes.number,
    onSubmit: PropTypes.func
  }

export default (withStyles(styles)(YupInput))
