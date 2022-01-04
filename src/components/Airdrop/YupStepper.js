
import { StepLabel, Stepper, Step } from '@material-ui/core'
// import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
// import { styled } from '@mui/material/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'

// const ColorlibConnector = styled(StepConnector)(() => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
//     }
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
//     }
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor: 'red',
//     borderRadius: 1
//   }
// }))

const YupStepper = ({ steps, activeStep }) => {
  const theme = useTheme()
  return (
    <Stepper alternativeLabel
      activeStep={activeStep}
      style={{ backgroundColor: theme.palette.alt.second }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
  ))}
    </Stepper>)
}

YupStepper.propTypes = {
  steps: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired
}

export default YupStepper
