import { Grid } from "@mui/material";
import CongratulationsCard from "./ui/CongratulationsCard";
import ResumeList from "./Pages/List/Index";
import Statistics from './ui/Statistics'



const ResumesPage = () =>{

    return (
        <>
         <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <CongratulationsCard  />
          </Grid>
          <Grid item xs={12} md={3}>
            <Statistics/>
          </Grid>
          <Grid item xs={12} md={3}>
            <Statistics/>
          </Grid>
          <Grid item xs={12} md={12}>
            <ResumeList  />
          </Grid>
        </Grid>
        
        </>
        
      )
}

export default ResumesPage;