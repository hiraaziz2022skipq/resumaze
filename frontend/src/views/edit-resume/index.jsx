'use client';
import { Grid } from "@mui/material";
import HorizontalLinearAlternativeLabelStepper from "@/components/stepper/StepperMui";
import { STEPS } from "@/utils/create-resume/Steps";
import ATSTags from "../resumes/ui/ATSTags";
import CreateResumeProgress from "../resumes/ui/CreateResumeProgress";
import CreateResumeForms from "../resumes/create-resume/main/Index";
import { getResumeById } from "@/redux/resumes/action";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditResumePage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResumeById(id));
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={10}>
          <ATSTags id={id} />
        </Grid>
        <Grid item xs={12} md={2}>
          <CreateResumeProgress id={id} />
        </Grid>
        <Grid item xs={12} md={12}>
          <CreateResumeForms id={id} />
        </Grid>
      </Grid>
    </>
  );
};

export default EditResumePage;
