"use client";
import HorizontalLinearAlternativeLabelStepper from "@/components/stepper/StepperMui";
import { Button, Card, CardContent, Grid } from "@mui/material";
import PersonalDetail from "./personal-details/Index";
import Template1 from "@/components/templates/template1";
import resumeFakeData from "@/fake-data/resume-fake-data";
import { useState } from "react";
import PersonalSummary from "./personal-summary/Index";
import EmploymentHistory from "./employment-history/Index";
import Skills from "./skills/Index";

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const currentContent = [
    <PersonalDetail />,
    <PersonalSummary />,
    <EmploymentHistory />,
    <Skills />,
  ];

  const handleNext = () => {
    if (currentStep === currentContent.length - 1) {
      return null;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep === 0) {
      return null;
    }

    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Grid
        container
        sx={{
          mt: 4,
          ml: 2,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <HorizontalLinearAlternativeLabelStepper
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </CardContent>
            {currentContent[currentStep]}
            <Grid
              container
              spacing={2}
              sx={{ p: 2, justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mr: 1 }}
                onClick={handlePrev}
              >
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Grid>
          </Card>
        </Grid>
        {/* <Grid item xs={6}>
           <Template1 resumeData={resumeFakeData}/>
        </Grid> */}
      </Grid>
    </>
  );
};

export default CreateResume;
