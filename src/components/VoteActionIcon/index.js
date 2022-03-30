// Import Core Libraries
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'classnames'

// Import Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

// Import Internal Dependencies
import { CAT_ICONS } from '../VoteButton/constants'
import useStyles from './styles'
import { levelColors } from '../../utils/colors'

const INTERACT_INTERVAL = 1000
const MINIMUM_RATING = -2
const MAXIMUM_RATING = 3

const VoteActionIcon = ({ category, initialRating, quantile, weight, onUpdateRating }) => {
  const classes = useStyles({
    actionBorderColor: levelColors[quantile],
    actionBorderWidth: quantile === 'none' ? 1 : 2
  })

  const [rating, setRating] = useState(initialRating)
  const [isActionClicked, setIsActionClicked] = useState(false)
  const [isMinusClicked, setIsMinusClicked] = useState(false)

  const increaseRating = () => setRating((oldRating) => oldRating === -1 ? 1 : Math.min(oldRating + 1, MAXIMUM_RATING))
  const decreaseRating = () => setRating((oldRating) => oldRating === 1 ? -1 : Math.max(oldRating - 1, MINIMUM_RATING))

  const handleMinusDown = (e) => {
    e.stopPropagation()
    setIsMinusClicked(true)
  }

  const handleMinusUp = (e) => {
    e.stopPropagation()
    setIsMinusClicked(false)
  }

  const handleUpdateRating = () => {
    if (initialRating === rating) {
      return
    }

    onUpdateRating(rating)
  }

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  // Effect to increase rating
  useEffect(() => {
    if (!isActionClicked) {
      handleUpdateRating()
      return
    }

    const intervalId = setInterval(increaseRating, INTERACT_INTERVAL)

    return () => clearInterval(intervalId)
  }, [isActionClicked])

  // Effect to decrease rating
  useEffect(() => {
    if (!isMinusClicked) {
      handleUpdateRating()
      return
    }

    const intervalId = setInterval(decreaseRating, INTERACT_INTERVAL)

    return () => clearInterval(intervalId)
  }, [isMinusClicked])

  return (
    <Box
      display='flex'
      alignItems='center'
      mx={1}
    >
      <Tooltip
        arrow
        placement='top'
        title={rating <= 0 ? rating : `+${rating}`}
        classes={{
          tooltip: classes.tooltip
        }}
      >
        <Box
          role='button'
          className={classes.action}
          onMouseDown={() => setIsActionClicked(true)}
          onMouseUp={() => setIsActionClicked(false)}
          onMouseLeave={() => setIsActionClicked(false)}
        >
          <span
            role='img'
            aria-level={category}
            className={classes.emoji}
          >
            {CAT_ICONS[category]}
          </span>
          <Box
            role='button'
            onMouseDown={handleMinusDown}
            onMouseUp={handleMinusUp}
            onMouseLeave={handleMinusUp}
            className={clsx(classes.minusButton, 'minus-button')}
          >
            <span>-</span>
          </Box>
        </Box>
      </Tooltip>
      <Box
        width={40}
      >
        <Typography
          variant='h6'
          style={{ color: levelColors[quantile] }}
        >
          {weight}
        </Typography>
      </Box>
    </Box>
  )
}

VoteActionIcon.propTypes = {
  category: PropTypes.string.isRequired,
  initialRating: PropTypes.number.isRequired,
  quantile: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  onUpdateRating: PropTypes.func.isRequired
}

export default VoteActionIcon
