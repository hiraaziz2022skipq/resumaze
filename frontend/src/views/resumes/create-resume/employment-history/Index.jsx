// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

// Component Imports
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import ExperienceAdd from "@/components/dialogs/resume-create/experience";
import {
  addExperienceService,
  deleteExperienceService,
  getExperienceService,
  updateExperienceService,
} from "@/redux/create-resume/service";
import toast, { Toaster } from "react-hot-toast";
import ExperienceCard from "../../ui/ExperienceCard";
import CircularSpinner from "@/components/spinner/Circular";
import { updateResume } from "@/redux/resumes/slice";

import { useDispatch } from "react-redux";
import { calculatePercentageOfSteps, checkReqforATSScore } from "@/utils/create-resume/functions";
import { setEligibilityofATSScore, setProfilePercentage } from "@/redux/create-resume/slice";

const EmploymentHistory = ({ resumeId }) => {
  const dispatch = useDispatch();
  const [experience, setExperience] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const buttonProps = {
    variant: "outlined",
    children: "Add New Experience",
    size: "small",
  };

  const onEdit = (expId, data) => {
    updateExperienceService(resumeId, expId, data)
      .then((res) => {
        if (res.status === 200) {
          const updatedExperience = res.data.experience;
          setExperience((prevExperience) =>
            prevExperience.map((exp) =>
              exp.id === expId ? updatedExperience : exp
            )
          );

          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: {
                experience: experience.map((exp) =>
                  exp.id === expId ? updatedExperience : exp
                ),
              },
            })
          );


          toast.success("Experience Updated Successfully!");
        } else {
          toast.error("Failed to Update Experience.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while updating experience.");
      });
  };

  const onDelete = (expId) => {
    deleteExperienceService(resumeId, expId)
      .then((res) => {
        if (res.status === 200) {

          const latestExp = experience.filter((exp) => exp.id !== expId);

          setExperience((prevExperience) =>
            prevExperience.filter((exp) => exp.id !== expId)
          );

          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { experience: latestExp },
            })
          );


          toast.success("Experience Deleted Successfully!");
        } else {
          toast.error("Failed to Delete Experience.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting experience.");
      });
  };

  const onAdd = (newExperience) => {
    addExperienceService(resumeId, newExperience)
      .then((res) => {
        if (res.status === 200) {
          const newExp = res.data.experience;
          setExperience((prevExperience) => [...prevExperience, newExp]);
          
          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { experience: [...experience, newExp] },
            })
          );


          toast.success("Experience Added Successfully!");
        } else {
          toast.error("Failed to Add Experience.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while adding experience.");
      });
  };

  useEffect(() => {
    getExperienceService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data.length > 0) {
          const allExp = resp.data;
          setExperience([...allExp]);
          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { experience: allExp },
            })
          );
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
      <CardHeader
        title="Experience"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={ExperienceAdd}
            dialogProps={{ isEdit: false, onFinsish: onAdd }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        {experience.map((exp, index) => (
          <div key={index}>
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              is
              isDefaultCard={index === 0}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {index !== experience.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
      <Toaster />
    </>
  );
};

export default EmploymentHistory;
