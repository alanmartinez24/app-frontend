import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import { Grid, Tooltip } from '@material-ui/core'
import { levelColors } from '../../utils/colors'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

class PostStats extends Component {
  state = {
    weight: this.props.weight,
    totalVoters: this.props.totalVoters
  };

  componentDidUpdate (prevProps) {
    const { weight, totalVoters } = this.props
    const { weight: prevWeight, totalVoters: prevTotalVoters } = prevProps
    if (
      !equal(
        {
          weight,
          totalVoters
        },
        {
          weight: prevWeight,
          totalVoters: prevTotalVoters
        }
      )
    ) {
      this.updatePostStats({
        weight,
        totalVoters
      })
    }
  }

  updatePostStats ({ weight, totalVoters }) {
    this.setState({ weight, totalVoters })
  }

  render () {
    const { classes, isShown, quantile, theme } = this.props
    const { totalVoters, weight } = this.state
    return (
      <Grid container
        spacing={0}
      >
        <Grid item>
          <Tooltip title='Post Yup Score'
            disableTouchListener
          >
            <p className={classes.weight}
              style={{ color: !isShown ? levelColors[quantile] : theme.palette.common.first }}
            >{weight}</p>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='Number of Voters'
            disableTouchListener
          >
            <p className={classes.totalVoters}>
              {totalVoters}
            </p>
          </Tooltip>
        </Grid>
      </Grid>
    )
  }
}

PostStats.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  totalVoters: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  isShown: PropTypes.bool.isRequired,
  quantile: PropTypes.string.isRequired
}

const postStatStyles = theme => ({
  weight: {
    marginRight: '3px',
    fontSize: '16px'
  },
  totalVoters: {
    fontSize: '16px',
    color: theme.palette.common.third,
    opacity: 0.3,
    marginLeft: '7px'
  }
})

export default withTheme(withStyles(postStatStyles)(PostStats))
