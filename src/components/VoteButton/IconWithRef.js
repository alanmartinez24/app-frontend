import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PropTypes from 'prop-types'

class IconWithRef extends Component {
  iconRef = React.createRef();

  shouldComponentUpdate (nextProps, nextState) {
    if (!isEqual(nextProps.value, this.props.value) || !isEqual(nextProps.style, this.props.style) || !isEqual(nextState, this.state)) {
      return true
    }
    return false
  }

  render () {
    const { value, handleRatingChange } = this.props

    return (
      <ErrorBoundary>
        <div
          ref={this.iconRef} // Refs and props for tooltip + vote mouse events
          onTouchStart={(e) => {
            handleRatingChange(e, value)
          }}
          onClick={(e) => {
            handleRatingChange(e, value)
          }}
        >
          <div {...this.props} />
        </div>
      </ErrorBoundary>
    )
  }
}

IconWithRef.propTypes = {
  handleRatingChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
}

export default IconWithRef
