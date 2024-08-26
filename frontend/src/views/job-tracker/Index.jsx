import { Divider, Grid } from "@mui/material";
import JobTrackerBoard from "./pages/JobTrackerBoard";
import JobTrackerHeader from "./ui/JobTrackerHeader";

const JobTracker = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <JobTrackerHeader />
      </Grid>
      <Divider  orientation="horizontal" className="mt-2" /> 
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <JobTrackerBoard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobTracker;
