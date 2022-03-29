import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { CAT_ICONS } from './constants'
import VoteLoader from './VoteLoader'

class CatIcon extends Component {
  state = {
    category: this.props.category,
    voteLoading: this.props.voteLoading
  }

  componentDidUpdate (prevProps) {
    const { quantile, category, voteLoading } = this.props
    const {
      quantile: prevQuantile,
      category: prevCategory,
      voteLoading: prevVoteLoading
    } = prevProps
    if (
      !equal(
        {
          quantile,
          category,
          voteLoading
        },
        {
          quantile: prevQuantile,
          category: prevCategory,
          voteLoading: prevVoteLoading
        }
      )
    ) {
      this.updateIconInfo({
        quantile,
        category,
        voteLoading
      })
    }
  }

  updateIconInfo ({ quantile, category, voteLoading }) {
    this.setState({ category, voteLoading })
  }

  render () {
    const { category, voteLoading } = this.state
    const { classes, handleDefaultVote } = this.props

    if (voteLoading) {
      return <VoteLoader />
    }

    return (
      <Typography className={classes.catIcon}
        onClick={handleDefaultVote}
        variant='h4'
        style={{ fontSize: window.innerWidth <= 600 ? '16px' : 'inherit' }}
      >
        {CAT_ICONS[category]}
      </Typography>
    )
  }
}

CatIcon.propTypes = {
  quantile: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleDefaultVote: PropTypes.func.isRequired,
  voteLoading: PropTypes.bool.isRequired
}

export default withStyles({
  catIcon: {
    width: 35,
    height: 35,
    margin: 0,
    marginTop: '0px',
    cursor: 'pointer'
  }
})(CatIcon)
