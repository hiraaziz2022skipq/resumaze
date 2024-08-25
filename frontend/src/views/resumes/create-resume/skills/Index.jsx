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

const Skills = ({ resumeId }) => {
  const [skill_set, setSkillsSet] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleChange = (event, newValue) => {
    setSkillsSet(newValue);
  };

  const handleSave = () => {
    if (isFirstTime) {
      updateSkillsService(resumeId, professional_info).then((res) => {
        if (res.status === 200) {
          toast.success("Skills Updated Successfully!");
        }
      });
    } else {
      postSkillsService(resumeId, professional_info).then((res) => {
        if (res.status === 200) {
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
  );
};

export default Skills;
