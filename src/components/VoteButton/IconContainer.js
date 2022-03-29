import React, { memo } from 'react'
import { useTheme, withStyles } from '@material-ui/core/styles'
import { levelColors } from '../../utils/colors'
import { Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import { convertRating } from './helpers'
import { labels, quantileToRating, ratingToQuantile } from './constants'
import IconWithRef from './IconWithRef'

const IconContainer = memo((props) => {
  const { value, ratingAvg, quantile, vote, handleRatingChange, hoverValue } = props
  const { palette } = useTheme()
  const quantileColor = levelColors[quantile]
  const convertedVoterRating = vote
    ? convertRating(vote.like, vote.rating)
    : null

  const ratingQuantile = quantileToRating[quantile]
  const ratingQuantileStyle = (ratingQuantile >= value) ? { color: quantileColor } : { color: palette.alt.third }
  const voteStyle = (convertedVoterRating >= value) ? { stroke: palette.common.third } : {}
  const marginStyle = (window.innerWidth <= 440)
    ? { marginTop: '-3px', marginRight: '-5px', marginLeft: '-6px' }
    : { marginTop: '-3px', marginRight: '-9px', marginLeft: '-1.5px' }

  const defaultQuantileColor = levelColors[ratingToQuantile[hoverValue]]
  const hoverStyle = (defaultQuantileColor && hoverValue && hoverValue) >= value
    ? { color: defaultQuantileColor }
    : {}

  const style = {
    ...marginStyle,
    ...ratingQuantileStyle,
    ...voteStyle,
    ...hoverStyle // will override the ratingQuantileStyle if defined
  }

  return (
    <StyledTooltip title={labels[value] || ''}
      enterDelay={1500}
    >
      <IconWithRef
        {...props}
        value={value}
        ratingAvg={ratingAvg}
        quantile={quantile}
        handleRatingChange={handleRatingChange}
        style={style}
      />
    </StyledTooltip>
  )
})

const StyledTooltip = memo(
  withStyles({
    popper: {
      marginTop: '-10px',
      marginLeft: '14px'
    }
  })((props) => (
    <Tooltip
      {...props}
      disableTouchListener
      classes={{
        popper: props.classes.popper
      }}
    />
  ))
)

StyledTooltip.propTypes = {
  classes: PropTypes.object.isRequired
}

IconContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  ratingAvg: PropTypes.number.isRequired,
  hoverValue: PropTypes.number.isRequired,
  quantile: PropTypes.string.isRequired,
  vote: PropTypes.object
}

export default IconContainer
