"use client";
import HorizontalLinearAlternativeLabelStepper from "@/components/stepper/StepperMui";
import { Button, Card, CardContent, Divider, Grid } from "@mui/material";
import PersonalDetail from "./personal-details/Index";
import Template1 from "@/components/templates/template1";
import resumeFakeData from "@/fake-data/resume-fake-data";
import { useState } from "react";
import PersonalSummary from "./personal-summary/Index";
import EmploymentHistory from "./employment-history/Index";
import Skills from "./skills/Index";
import dynamic from "next/dynamic";

// Styled Component Imports
const AppReactApexCharts = dynamic(() =>
  import("@/libs/styles/AppReactApexCharts")
);

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Vars
  const series = [64];

  const options = {
    chart: {
      sparkline: { enabled: true },
    },
    stroke: { lineCap: "round" },
    colors: ["var(--mui-palette-primary-main)"],
    plotOptions: {
      radialBar: {
        hollow: { size: "55%" },
        track: {
          background: "var(--mui-palette-customColors-trackBg)",
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "var(--mui-palette-text-primary)",
          },
        },
      },
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
  };

  const currentContent = [
    <PersonalDetail />,
    <PersonalSummary />,
    <EmploymentHistory />,
    <Skills />,
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
        <Grid item xs={10}>
          <Card>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={10}>
                  <HorizontalLinearAlternativeLabelStepper
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                </Grid>
                <Grid item xs={2}>
                  <AppReactApexCharts
                    type="radialBar"
                    height={124}
                    width="100%"
                    options={options}
                    series={series}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider  variant="middle" />
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
