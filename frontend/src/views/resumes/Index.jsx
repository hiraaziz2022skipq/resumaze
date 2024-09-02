'use client'
import { Grid } from "@mui/material";
import CongratulationsCard from "./ui/CongratulationsCard";
import ResumeList from "./Pages/Index";
import Statistics from "./ui/Statistics";
import { useDispatch, useSelector } from "react-redux";
import { getAllResumesAction } from "@/redux/resumes/action";
import { useEffect } from "react";
import CircularSpinner from "@/components/spinner/Circular";

const ResumesPage = () => {

  const { isAllResumeDataLoading, allResumeData } = useSelector((state) => state.resumesSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllResumesAction(13));

    return  () =>{
        
    }
  }, [dispatch]);


  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <CongratulationsCard />
        </Grid>
        <Grid item xs={12} md={3}>
          <Statistics />
        </Grid>
        <Grid item xs={12} md={3}>
          <Statistics />
        </Grid>
        <Grid item xs={12} md={12}>
          {isAllResumeDataLoading ? <CircularSpinner /> : <ResumeList allResumeData={allResumeData} /> }
          
        </Grid>
      </Grid>
    </>
  );
};

export default ResumesPage;
