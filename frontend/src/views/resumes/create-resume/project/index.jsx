import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import ProjectAdd from "@/components/dialogs/resume-create/project";
import Button from "@mui/material/Button";
import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  addProjectsService,
  deleteProjectsService,
  getProjectsService,
  updateProjectsService,
} from "@/redux/create-resume/service";
import toast, { Toaster } from "react-hot-toast";
import CircularSpinner from "@/components/spinner/Circular";
import ProjectCard from "../../ui/ProjectCard";

const Project = ({ resumeId }) => {
  // Vars

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const buttonProps = {
    variant: "outlined",
    children: "Add New Project",
    size: "small",
  };

  const onEdit = (projId, data) => {
    updateProjectsService(resumeId, projId, data)
      .then((res) => {
        if (res.status === 200) {
          const updatedProjects = res.data.projects;
          setProjects((prevProj) =>
            prevProj.map((pro) => (pro.id === projId ? updatedProjects : pro))
          );
          toast.success("Project Updated Successfully!");
        } else {
          toast.error("Failed to Update Project.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while Updating Project.");
      });
  };

  const onDelete = (projId) => {
    deleteProjectsService(resumeId, projId)
      .then((res) => {
        if (res.status === 200) {
          setProjects((prevProj) =>
            prevProj.filter((prj) => prj.id !== projId)
          );
          toast.success("Project Deleted Successfully!");
        } else {
          toast.error("Failed to Delete Project.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting Project.");
      });
  };

  const onAdd = (newProj) => {
    addProjectsService(resumeId, newProj)
      .then((res) => {
        if (res.status === 200) {
          const newProject = res.data.projects;
          setProjects([...projects, newProject]);
          toast.success("Project Added Successfully!");
        } else {
          toast.error("Failed to Add Project.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while Adding Project.");
      });
  };

  useEffect(() => {
    getProjectsService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data.length > 0) {
          const projects = resp.data;
          setProjects([...projects]);
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
        title="Projects"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={ProjectAdd}
            dialogProps={{ isEdit: false, onFinsish: onAdd }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        {projects.map((proj, index) => (
          <div key={index}>
            <ProjectCard
              key={proj.id}
              proj={proj}
              index={index}
              is
              isDefaultCard={index === 0}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {index !== projects.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
      <Toaster />
    </>
  );
};

export default Project;
