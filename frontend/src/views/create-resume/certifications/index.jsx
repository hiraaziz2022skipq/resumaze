
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

import CertificationsAdd from "@/components/dialogs/resume-create/certification";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";



const CertificationCards = ({cert,index,isDefaultCard,onEdit = () => {} , onDelete = () => {}}) => {
    // Props
    const {
        certification_name,
    certification_link,
    start_date,
    end_date,
    } = cert;
  
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
                    {certification_name}
                  </Typography>
                  
                </div>
                <Typography> Link : {certification_link}</Typography>
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
              dialog={CertificationsAdd}
              dialogProps={{ data: cert, isEdit:true,index:index,onFinsish:onEdit}}
            />
            <IconButton onClick={()=>{
              onDelete(index)
            }}>
              <i className="ri-delete-bin-7-line text-textSecondary" />
            </IconButton>
  
          </div>
        </div>
      </>
    );
  };


const Certificates = ({certifications , setCertifications}) =>{

    const buttonProps = {
        variant: "outlined",
        children: "Add New Certificate",
        size: "small",
      };
    
      const onEdit = (index, data) => {
        const updatedCertifications = [...certifications];
        updatedCertifications[index] = data;
        setCertifications(updatedCertifications);
      };
    
      const onDelete = (index) => {
        const updatedCertifications = certifications.filter((_, i) => i !== index);
        setCertifications(updatedCertifications);
      };
    
    
      const onAdd = (newCertificate) =>{
        const newCertArray = [...certifications,newCertificate]
        setCertifications(newCertArray)
      }
    
      return (
        <>
          <CardHeader
            title="Certifications"
            action={
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={CertificationsAdd}
                dialogProps={{ isEdit:false, onFinsish: onAdd  }}
              />
            }
            className="flex-wrap gap-4"
          />
          <CardContent>
            {certifications.map((cert, index) => (
              <div key={index}>
                <CertificationCards key={index} cert={cert} index={index} is isDefaultCard={index===0} onEdit={onEdit} onDelete={onDelete}/>
                {index !== certifications.length - 1 && <Divider />}
              </div>
            ))}
          </CardContent>
        </>
      );
}

export default Certificates