"use client";
import { Grid } from "@mui/material";
import CreateResumeForms from "./main/Index";
import CreateResumeProgress from "../ui/CreateResumeProgress";
import ViewResumeCard from "../ui/ViewResumeCard";
import ATSScoreCard from "../ui/ATSScore";
import ATSTags from "../ui/ATSTags";
import { useEffect } from "react";
import { getAllResumesAction, getResumeById } from "@/redux/resumes/action";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "next/navigation";

const CreateResume = () => {
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

export default CreateResume;
