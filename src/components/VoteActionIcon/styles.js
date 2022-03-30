import { makeStyles } from '@material-ui/core'

import colors from '../../utils/colors'

const ACTION_ITEM_SIZE = 40
const MINUS_ACTION_SIZE = 15

const useStyles = makeStyles((theme) => ({
  action: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: ACTION_ITEM_SIZE,
    maxWidth: ACTION_ITEM_SIZE,
    minHeight: ACTION_ITEM_SIZE,
    maxHeight: ACTION_ITEM_SIZE,
    borderRadius: ACTION_ITEM_SIZE,
    border: (props) => `solid ${props.actionBorderWidth}px ${props.actionBorderColor || colors.DarkerGrey}`,
    cursor: 'pointer',
    userSelect: 'none',
    '& .minus-button': {
      display: 'none'
    },
    '&:hover .minus-button': {
      display: 'flex'
    }
  },
  tooltip: {
    padding: theme.spacing(0.5, 1.5),
    fontSize: 14
  },
  emoji: {
    fontSize: 18,
    marginLeft: -3
  },
  minusButton: {
    position: 'absolute',
    width: MINUS_ACTION_SIZE,
    height: MINUS_ACTION_SIZE,
    borderRadius: MINUS_ACTION_SIZE,
    backgroundColor: colors.DarkGrey,
    color: colors.White,
    left: -2,
    bottom: -2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      border: `solid 1px ${colors.DarkWhite}`
    }
  }
}))

export default useStyles
