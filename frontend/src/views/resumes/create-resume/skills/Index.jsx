"use client";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  CardContent,
  Chip,
  Grid,
  TextField,
} from "@mui/material";
import {
  getSkillsService,
  postSkillsService,
  updateSkillsService,
} from "@/redux/create-resume/service";
import CircularSpinner from "@/components/spinner/Circular";
import { updateResume } from "@/redux/resumes/slice";

import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  calculatePercentageOfSteps,
  checkReqforATSScore,
} from "@/utils/create-resume/functions";
import {
  setEligibilityofATSScore,
  setProfilePercentage,
} from "@/redux/create-resume/slice";
const Skills = ({ resumeId }) => {
  const dispatch = useDispatch();
  const [skill_set, setSkillsSet] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleChange = (event, newValue) => {
    setSkillsSet(newValue);
  };

  const handleSave = () => {
    if (isFirstTime) {
      updateSkillsService(resumeId, skill_set).then((res) => {
        if (res.status === 200) {
          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { skill_set: res.data.resume.skill_set },
            })
          );

          toast.success("Skills Updated Successfully!");
        }
      });
    } else {
      postSkillsService(resumeId, skill_set).then((res) => {
        if (res.status === 200) {
          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { skill_set: res.data.resume.skill_set },
            })
          );

          toast.success("Skills Created Successfully!");
          setIsFirstTime(true);
        }
      });
    }
  };

  useEffect(() => {
    getSkillsService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data.skills?.length > 0) {
          const skills = resp.data.skills;
          setSkillsSet([...skills]);

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { skill_set: skills },
            })
          );

          setIsFirstTime(true);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [resumeId]);

  if (isLoading) return <CircularSpinner />;

  return (
    <>
      <CardContent>
        <Grid item mt={10} mb={10}>
          <Autocomplete
            multiple
            freeSolo
            value={skill_set}
            onChange={handleChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  className="capitalize"
                  size="small"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skills"
                placeholder="Add Skills"
              />
            )}
            options={[]}
            getOptionLabel={(option) => option}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Grid>
      </CardContent>
      <Toaster />
    </>
  );
};

export default Skills;
