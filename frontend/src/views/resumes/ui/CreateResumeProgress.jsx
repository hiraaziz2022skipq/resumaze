'use client'
import { getStepsService } from "@/redux/create-resume/service";
import { setEligibilityofATSScore, setProfilePercentage } from "@/redux/create-resume/slice";
import { calculatePercentageOfSteps, checkReqforATSScore } from "@/utils/create-resume/functions";
import { options } from "@/utils/create-resume/profileCompletionPercentage";
import { Card, CardHeader } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styled Component Imports
const AppReactApexCharts = dynamic(() =>
  import("@/libs/styles/AppReactApexCharts")
);

const CreateResumeProgress = ({id}) => {
  const {resumePercentage} = useSelector((state) => state.CreateResume);
  const dispatch = useDispatch()

  useEffect(()=>{
    getStepsService(id).then( async (resp) => {
      if (resp.status === 200) {
        if (resp.data) {
          const percentage = await calculatePercentageOfSteps(resp.data)
          dispatch(setProfilePercentage(percentage))
          const isElgForAts = checkReqforATSScore(resp.data)
          dispatch(setEligibilityofATSScore(isElgForAts))

        }
      }
    })
  },[])
  return (
    <Card className="flex flex-col justify-evenly bs-full">
        <CardHeader title='Percentage' />
      <AppReactApexCharts
        type="radialBar"
        // height={200}
        width="100%"
        options={options}
        series={[resumePercentage]}
      />
    </Card>
  );
};

export default CreateResumeProgress;
