import React from 'react'
import PropTypes from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const styles = theme => ({
  contained: {
    color: theme.palette.M900,
    backgroundColor: theme.palette.M100,
    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.M50}`,
      backgroundColor: theme.palette.M50
    },
    '&:disabled': {
      backgroundColor: theme.palette.M400
    },
    '&:selected': {
      backgroundColor: theme.palette.M150
    }
  },
  outlined: {
    color: theme.palette.M100,
    backgroundColor: theme.palette.M700,
    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.M600}`,
      color: theme.palette.M50,
      backgroundColor: theme.palette.M600
    },
    '&:disabled': {
      color: theme.palette.M200,
      backgroundColor: theme.palette.M800
    },
    '&:selected': {
      color: theme.palette.M100,
      backgroundColor: theme.palette.M600
    }
  },
  text: {
    color: theme.palette.M100,
    '&:hover': {
      color: theme.palette.M50
    },
    '&:disabled': {
      color: theme.palette.M200
    },
    '&:selected': {
      color: theme.palette.M100
    }
  },
  largeOneIconButton: {
    borderRadius: '50%',
    maxWidth: '42px',
    maxHeight: '42px',
    minWidth: '42px',
    minHeight: '42px',
    padding: 0
  },
  mediumOneIconButton: {
    borderRadius: '50%',
    maxWidth: '32px',
    maxHeight: '32px',
    minWidth: '32px',
    minHeight: '32px',
    padding: 0
  },
  smallOneIconButton: {
    borderRadius: '50%',
    maxWidth: '27px',
    maxHeight: '27px',
    minWidth: '27px',
    minHeight: '27px',
    padding: 0
  }
})

const YupButton = ({ size, color, variant, classes, children, adornment, ...restProps }) => {
  const leftAdornment = adornment === 'leftIcon' || adornment === 'bothIcons' ? <ArrowForwardIcon /> : null
  const rightAdornment = adornment === 'rightIcon' || adornment === 'bothIcons' ? <ArrowForwardIcon /> : null

  let classname
  if (color === 'mono' && variant === 'contained') classname = classes.contained
  if (color === 'mono' && variant === 'outlined') classname = classes.outlined
  if (color === 'mono' && variant === 'text') classname = classes.text

  let buttonSize
  if (size === 'large') buttonSize = classes.largeOneIconButton
  if (size === 'medium') buttonSize = classes.mediumOneIconButton
  if (size === 'small') buttonSize = classes.smallOneIconButton

  if (adornment === 'oneIcon') {
    return <Button variant={variant}
      className={`${classname} ${buttonSize}`}
      {...restProps}
           ><ArrowForwardIcon fontSize={size} /></Button>
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={classname}
      startIcon={leftAdornment}
      endIcon={rightAdornment}
      {...restProps}
      startIcon={leftAdornment}
      endIcon={rightAdornment}
    >
      {children}
    </Button>
  )
}

YupButton.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string.isRequired,
  classes: PropTypes.object,
  children: PropTypes.object.isRequired,
  adornment: PropTypes.string
}

export default (withStyles(styles)(YupButton))
