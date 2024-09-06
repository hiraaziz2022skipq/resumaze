import ResumeTemp3 from "@/components/templates/template3/Index";
import ResumeTemplate2 from "@/components/templates/templates2";
import { Box } from "@mui/material";

const ViewResume = ({resumeData = {}}) => {
  return (
    <Box
      sx={{
        width: "100%", // Full width of the Drawer
        height: "100%", // Full height of the Drawer
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #4CAF50",
        position: "relative",
        overflow: "hidden", // Ensure image stays within bounds
        "&:hover": {
          "& .action-buttons": {
            opacity: 1, // Show buttons on hover
          },
        },
      }}
    >
    
      <ResumeTemplate2/>
    </Box>
  );
};






export default ViewResume;
