// React Imports
import { useState } from "react";

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

// Component Imports
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import ExperienceAdd from "@/components/dialogs/resume-create/experience";



const ExperienceCards = ({exp,index,isDefaultCard,onEdit = () => {} , onDelete = () => {}}) => {
  // Props
  const {
    company_name,
    job_title,
    job_description,
    start_date,
    end_date,
    location,
    is_current,
  } = exp;

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
                  {job_title}
                </Typography>
                
              </div>
              <Typography> {company_name} . {location}</Typography>
              {is_current ? (
                <Typography> {start_date} - current</Typography>
              ) : (
                <Typography>
                  {" "}
                  {start_date} - {end_date}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className="mis-10">
          <OpenDialogOnElementClick
            element={IconButton}
            elementProps={iconButtonProps}
            dialog={ExperienceAdd}
            dialogProps={{ data: exp, isEdit:true,index:index,onFinsish:onEdit}}
          />
          <IconButton onClick={()=>{
            onDelete(index)
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
                <Typography variant="body2">{job_description}</Typography>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Typography variant="body1"> Skills : </Typography>
                  {["Java", "Node", "CPP", "Express", "React", "Nex.js"].map(
                    (team, index) => (
                      <Chip
                        key={index}
                        variant="tonal"
                        label={team}
                        size="small"
                      />
                    )
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

const EmploymentHistory = ({ experience, setExperience }) => {
  // Vars
  const buttonProps = {
    variant: "outlined",
    children: "Add New Experience",
    size: "small",
  };

  const onEdit = (index, data) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = data;
    setExperience(updatedExperience);
  };

  const onDelete = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };


  const onAdd = (newExperience) =>{
    const newExpArray = [...experience,newExperience]
      setExperience(newExpArray)
  }

  return (
    <>
      <CardHeader
        title="Experience"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={ExperienceAdd}
            dialogProps={{ isEdit:false, onFinsish: onAdd  }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        {experience.map((exp, index) => (
          <div key={index}>
            <ExperienceCards key={index} exp={exp} index={index} is isDefaultCard={index===0} onEdit={onEdit} onDelete={onDelete}/>
            {index !== experience.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default EmploymentHistory;
