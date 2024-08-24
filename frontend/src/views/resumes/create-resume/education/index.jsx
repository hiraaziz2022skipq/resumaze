"use client";
import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import EducationAdd from "@/components/dialogs/resume-create/education";
// MUI Imports
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  addEducationService,
  deleteEducationService,
  getEducationService,
  updateEducationService,
} from "@/redux/create-resume/service";
import CircularSpinner from "@/components/spinner/Circular";
import EducationCard from "../../ui/EducationCard";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

const Education = ({ resumeId }) => {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const buttonProps = {
    variant: "outlined",
    children: "Add New Education",
    size: "small",
  };

  const onEdit = (eduId, data) => {
    updateEducationService(resumeId, eduId, data)
      .then((res) => {
        if (res.status === 200) {
          const updatedEdu = res.data.education;
          setEducation((prevEdu) =>
            prevEdu.map((edu) => (edu.id === eduId ? updatedEdu : edu))
          );
          toast.success("Education Updated Successfully!");
        } else {
          toast.error("Failed to Update Education.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while updating education.");
      });
  };

  const onDelete = (eduId) => {
    deleteEducationService(resumeId, eduId)
      .then((res) => {
        if (res.status === 200) {
          setEducation((prevEdu) => prevEdu.filter((edu) => edu.id !== eduId));
          toast.success("Education Deleted Successfully!");
        } else {
          toast.error("Failed to Delete Education.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting education.");
      });
  };

  const onAdd = (newEducation) => {
    addEducationService(resumeId, newEducation)
      .then((res) => {
        if (res.status === 200) {
          const newEdu = res.data.education;
          setEducation((prevEducation) => [...prevEducation, newEdu]);
          toast.success("Education Added Successfully!");
        } else {
          toast.error("Failed to Add Education.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while adding education.");
      });
  };

  useEffect(() => {
    getEducationService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data.length > 0) {
          const allEdu = resp.data;
          setEducation([...allEdu]);
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
        title="Education"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={EducationAdd}
            dialogProps={{ isEdit: false, onFinsish: onAdd }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        {education.map((edu, index) => (
          <div key={index}>
            <EducationCard
              key={edu.id}
              edu={edu}
              index={index}
              is
              isDefaultCard={index === 0}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {index !== education.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
      <Toaster />
    </>
  );
};

export default Education;
