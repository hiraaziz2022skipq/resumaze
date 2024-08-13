import HorizontalLinearAlternativeLabelStepper from "@/components/stepper/StepperMui";
import { Card, CardContent, Grid } from "@mui/material";
import PersonalDetail from "./personal-details/Index";


const CreateResume = () => {
  return (
    <>
      <Grid container sx={{ mt: 4 , ml:2}}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <HorizontalLinearAlternativeLabelStepper />
            </CardContent>
          <PersonalDetail />
          </Card>
        </Grid>
        <Grid item xs={6}>
           
        </Grid>
      </Grid>
    </>
  );
};

export default CreateResume;
