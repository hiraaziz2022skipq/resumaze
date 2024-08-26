import Template1 from "@/components/templates/template1";
import EditResumeForms from "./pages/EditResumeForms";
import resumeFakeData from "@/fake-data/resume-fake-data";
import { Grid } from "@mui/material";
import HorizontalLinearAlternativeLabelStepper from "@/components/stepper/StepperMui";
import { STEPS } from "@/utils/create-resume/Steps";

const EditResumePage = () => {
  return (
    <>

      <Grid container spacing={1}>
        {/* <Grid item xs={12}>
                <HorizontalLinearAlternativeLabelStepper
                  steps={STEPS}
                  currentStep={0}
                  setCurrentStep={() => {}}
                />
        </Grid> */}
        <Grid item xs={12} md={12}>
            <EditResumeForms isEdit={true}/>
        </Grid>
        {/* <Grid item xs={12} md={12}>
        <Template1 resumeData={resumeFakeData}/>
        </Grid> */}
      </Grid>
    </>
  );
};

export default EditResumePage;
