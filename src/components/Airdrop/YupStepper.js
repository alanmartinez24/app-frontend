
import { StepLabel, Stepper, Step, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'

const YupStepper = ({ steps, activeStep }) => {
  const theme = useTheme()

  const isActive = (step) => step === steps[activeStep]

  return (
    <Stepper
      activeStep={activeStep}
      style={{ backgroundColor: theme.palette.alt.second, width: '50%' }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel style={{ opacity: isActive(label) ? 1 : 0.5 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2'>Step {index + 1}</Typography>
              <Typography variant='h4'>{label}</Typography>
            </div>
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
