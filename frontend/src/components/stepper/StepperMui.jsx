

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Personal Details',
  'Employment History',
  "Education",
  "Projects",
  'Certifications',
  'Skills',
  "Languages",
  'Professional Summary',
  'Social Media',
  'References',
  'Extra Info',
];

export default function HorizontalLinearAlternativeLabelStepper({currentStep , setCurrentStep}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
