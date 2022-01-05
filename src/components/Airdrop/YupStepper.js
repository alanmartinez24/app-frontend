
import { StepLabel, Stepper, Step } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'

const YupStepper = ({ steps, activeStep }) => {
  const theme = useTheme()

  const isActive = (step) => step === steps[activeStep]

  return (
    <Stepper alternativeLabel
      activeStep={activeStep}
      style={{ backgroundColor: theme.palette.alt.second }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel style={{ opacity: isActive(label) ? 1 : 0.5 }}>
            {label}
          </StepLabel>
        </Step>
  ))}
    </Stepper>)
}

YupStepper.propTypes = {
  steps: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired
}

export default YupStepper
