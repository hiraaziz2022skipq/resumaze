import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import EducationAdd from "@/components/dialogs/resume-create/education";
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



const EducationCards = ({edu,index,isDefaultCard,onEdit = () => {} , onDelete = () => {}}) => {
    // Props
    const {
        institute_name,
        degree,
        start_date,
        end_date,
        location,
        is_current,
        id
    } = edu;
  
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
                    {degree}
                  </Typography>
                  
                </div>
                <Typography> {institute_name} . {location}</Typography>
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
              dialog={EducationAdd}
              dialogProps={{ data: edu, isEdit:true,id:id,onFinsish:onEdit}}
            />
            <IconButton onClick={()=>{
              onDelete(id)
            }}>
              <i className="ri-delete-bin-7-line text-textSecondary" />
            </IconButton>
  
          </div>
        </div>
      </>
    );
  };

  

const Education = ({education ,setEduction , onEduAdd , onEduEdit}) =>{

    const buttonProps = {
        variant: "outlined",
        children: "Add New Education",
        size: "small",
      };

      const onEdit = (id, data) => {
        onEduEdit(id,data)
      };
    
      const onDelete = (index) => {
        // const updatedEducation = education.filter((_, i) => i !== index);
        // setEduction(updatedEducation);
      };
    
    
      const onAdd = (newEducation) =>{
        onEduAdd(newEducation)
      }

    return (
        <>
          <CardHeader
            title="Education"
            action={
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={EducationAdd}
                dialogProps={{ isEdit:false, onFinsish: onAdd  }}
              />
            }
            className="flex-wrap gap-4"
          />
          <CardContent>
            {education.map((edu, index) => (
              <div key={index}>
                <EducationCards key={edu.id} edu={edu} index={index} is isDefaultCard={index===0} onEdit={onEdit} onDelete={onDelete}/>
                {index !== education.length - 1 && <Divider />}
              </div>
            ))}
          </CardContent>
        </>
      );
}

export default Education