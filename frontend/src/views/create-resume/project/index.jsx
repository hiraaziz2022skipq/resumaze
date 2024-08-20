// MUI Imports
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { useState } from "react";
import ProjectAdd from "@/components/dialogs/resume-create/project";
import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";






const ProjectCard = ({proj,index,isDefaultCard,onEdit = () => {} , onDelete = () => {}}) => {
    // Props
    const {
        project_name,
        project_description,
        start_date,
        end_date,
        id
    } = proj;
  
    // States
    const [expanded, setExpanded] = useState(isDefaultCard ? true : false);
  
    // Vars
    const iconButtonProps = {
      children: <i className="ri-edit-box-line" />,
      className: "text-textSecondary",
    };
  
    // Hooks
    const theme = useTheme();
    return (
      <>
        <div className="flex flex-wrap justify-between items-center mlb-3 gap-y-2">
          <div className="flex items-center gap-2">
            <IconButton
              size="large"
              sx={{
                "& i": {
                  transition: "transform 0.3s",
                  transform: expanded
                    ? "rotate(0deg)"
                    : theme.direction === "ltr"
                    ? "rotate(-90deg)"
                    : "rotate(90deg)",
                },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              <i className="ri-arrow-down-s-line text-textPrimary" />
            </IconButton>
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center">
                <WorkHistoryIcon />
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Typography color="text.primary" className="font-medium">
                    {project_name}
                  </Typography>
                  
                </div>
             
                <Typography>
                    {start_date} - {end_date}
                  </Typography>
              </div>
            </div>
          </div>
          <div className="mis-10">
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={iconButtonProps}
              dialog={ProjectAdd}
              dialogProps={{ data: proj, isEdit:true,id:id,onFinsish:onEdit}}
            />
            <IconButton onClick={()=>{
              onDelete(id)
            }}>
              <i className="ri-delete-bin-7-line text-textSecondary" />
            </IconButton>
  
          </div>
        </div>
        <Collapse in={expanded} timeout={300}>
        <Grid container spacing={6} className="pbe-3 pis-12">
          <Grid item>
            <Grid container spacing={2}>
              <div className="flex flex-col gap-1">
                <Typography variant="body2">{project_description}</Typography>
           
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
      </>
    );
  };



const Project = ({projects , setProjects,onProjectAdd,onProjectEdit}) =>{
    // Vars
    const buttonProps = {
      variant: "outlined",
      children: "Add New Project",
      size: "small",
    };
  
    const onEdit = (id, data) => {
      onProjectEdit(id,data)
    };
  
    const onDelete = (index) => {
      // const updatedProject = projects.filter((_, i) => i !== index);
      // setProjects(updatedProject);
    };
  
  
    const onAdd = (newProject) =>{
      onProjectAdd(newProject)
    }
  
    return (
      <>
        <CardHeader
          title="Projects"
          action={
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps}
              dialog={ProjectAdd}
              dialogProps={{ isEdit:false, onFinsish: onAdd  }}
            />
          }
          className="flex-wrap gap-4"
        />
        <CardContent>
          {projects.map((proj, index) => (
            <div key={index}>
              <ProjectCard key={proj.id} proj={proj} index={index} is isDefaultCard={index===0} onEdit={onEdit} onDelete={onDelete}/>
              {index !== projects.length - 1 && <Divider />}
            </div>
          ))}
        </CardContent>
      </>
    );
  };
  

export default Project