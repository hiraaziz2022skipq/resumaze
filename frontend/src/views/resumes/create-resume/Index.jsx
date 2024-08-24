import { Grid } from "@mui/material"
import CongratulationsCard from "../ui/CongratulationsCard"
import Statistics from "../ui/Statistics"
import CreateResumeForms from "./main/Index"
import CreateResumeProgress from "../ui/CreateResumeProgress"

const CreateResume = () =>{

    return(
        <>  
    
         <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <CongratulationsCard  />
          </Grid>
          <Grid item xs={12} md={3}>
            <Statistics/>
          </Grid>
          <Grid item xs={12} md={3}>
            <CreateResumeProgress/>
          </Grid>
          <Grid item xs={12} md={12}>
            <CreateResumeForms />
          </Grid>
        </Grid>
        
        </>
        
     
    )

}

export default CreateResume