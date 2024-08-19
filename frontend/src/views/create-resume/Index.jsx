"use client";
import HorizontalLinearAlternativeLabelStepper from "@/components/stepper/StepperMui";
import { Button, Card, CardContent, Divider, Grid } from "@mui/material";
import PersonalDetail from "./personal-details/Index";
import Template1 from "@/components/templates/template1";
import resumeFakeData from "@/fake-data/resume-fake-data";
import { useEffect, useState } from "react";
import PersonalSummary from "./personal-summary/Index";
import EmploymentHistory from "./employment-history/Index";
import Skills from "./skills/Index";
import dynamic from "next/dynamic";
import { options } from "@/utils/create-resume/profileCompletionPercentage";
import axiosInstance from "@/utils/axiosInstance";
import Languages from "./languages";
import Education from "./education";
import Project from "./project";
import Certificates from "./certifications";
import SocialMedia from "./social-media";
import References from "./reference";

// Styled Component Imports
const AppReactApexCharts = dynamic(() =>
  import("@/libs/styles/AppReactApexCharts")
);

const CreateResume = () => {
  // STATES
  const [currentStep, setCurrentStep] = useState(0);

  const [professional_info, setProfessionalInfo] = useState({
    name: "",
    image: "/images/avatars/1.png",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    date_of_birth: "",
    job_title: "",
    professional_summary: "",
  });

  const [experience, setExperience] = useState([]);

  const [skill_set, setSkillsSet] = useState([]);

  const [projects, setProjects] = useState([]);

  const [education, setEduction] = useState([]);

  const [certifications, setCertifications] = useState([]);

  const [extra_info, setExtraInfo] = useState({
    key: "",
    value: "",
  });

  const [references, setReferences] = useState([]);

  const [social_media, setSocialmedia] = useState({
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    website: "",
  });

  const [languages, setLanguages] = useState([]);

  const [progress, setProgress] = useState(0);

  const series = [0];

  const currentContent = [
    <PersonalDetail
      professional_info={professional_info}
      setProfessionalInfo={setProfessionalInfo}
    />,
    <EmploymentHistory experience={experience} setExperience={setExperience} />,
    <Education education={education} setEduction={setEduction} />,
    <Project projects={projects} setProjects={setProjects} />,
    <Certificates
      certifications={certifications}
      setCertifications={setCertifications}
    />,
    <Skills skill_set={skill_set} setSkillsSet={setSkillsSet} />,
    <Languages languages={languages} setLanguages={setLanguages} />,
    <PersonalSummary
      professional_info={professional_info}
      setProfessionalInfo={setProfessionalInfo}
    />,
    <SocialMedia social_media={social_media} setSocialmedia={setSocialmedia} />,
    <References references={references} setReferences={setReferences} />,
  ];

  const handleNext = () => {
    // const payload = {
    //   professional_info,
    //   experience,
    //   skill_set
    // }
    // axiosInstance.post('/api/resume/create',payload).then(res =>{
    //   console.log(res,"=== API Response ===")
    // })

    if (currentStep === currentContent.length - 1) {
      return null;
    }

    setProgress(progress + 10);
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
                    series={[progress]}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider variant="middle" />
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
