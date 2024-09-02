'use client'
import HorizontalLinearAlternativeLabelStepper from '@/components/stepper/StepperMui'
import { STEPS } from '@/utils/create-resume/Steps'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { useState } from 'react'
import PersonalDetail from '../personal-details/Index'
import EmploymentHistory from '../employment-history/Index'
import Education from '../education'
import Project from '../project'
import Certificates from '../certifications'
import Skills from '../skills/Index'
import Languages from '../languages'
import PersonalSummary from '../personal-summary/Index'
import SocialMedia from '../social-media'
import References from '../reference'
import ExtraInfo from '../extra-info'
const CreateResumeForms = ({id}) => {
  const [currentStep, setCurrentStep] = useState(0)

 
  const currentContent = [
    <PersonalDetail resumeId={id} />,
    <EmploymentHistory resumeId={id} />,
    <Education resumeId={id} />,
    <Project resumeId={id} />,
    <Certificates resumeId={id} />,
    <Skills resumeId={id} />,
    <Languages resumeId={id} />,
    <PersonalSummary resumeId={id} />,
    <SocialMedia resumeId={id} />,
    <References resumeId={id} />,
    <ExtraInfo resumeId={id} />
  ]

  const handleNext = () => {
    if (currentStep === currentContent.length - 1) {
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Create Your Resume' />
          <CardContent>
            <Grid container alignItems='center' spacing={2}>
              <Grid item xs={12}>
                <HorizontalLinearAlternativeLabelStepper
                  steps={STEPS}
                  currentStep={currentStep}
                  setCurrentStep={() => {}}
                />
              </Grid>
              <Divider variant='middle' />
              <Grid
                item
                xs={12}
                sx={{
                  border: '2px dotted gray',
                  borderRadius: '20px',
                  marginTop: '20px',
                  marginBottom: '10px',
                  height: '540px',
                  overflowY: 'auto'
                }}
              >
                {currentContent[currentStep]}
              </Grid>
              <Grid container spacing={2} sx={{ p: 2, justifyContent: 'flex-end' }}>
                <Button variant='outlined' color='secondary' sx={{ mr: 1 }} onClick={handlePrev}>
                  Back
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleNext}>
                  {currentStep !== currentContent.length - 1 ? 'Next' : 'Finish'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
export default CreateResumeForms
