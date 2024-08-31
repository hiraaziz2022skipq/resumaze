import Template1 from "@/components/templates/template1";
import ResumeTemplate2 from "@/components/templates/templates2";
import resumeFakeData from "@/fake-data/resume-fake-data";
import { Box } from "@mui/material";

const ViewResume = () => {
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
      {/* <img
        src={`/images/cards/resumetemp1.png`}
        alt="Resume Template"
        style={{
          maxWidth: "100%", // Scale image to fit within the Box
          maxHeight: "100%", // Scale image to fit within the Box
          objectFit: "contain", // Maintain aspect ratio
        }}
      /> */}
      <ResumeTemplate2/>
      {/* <Template1 resumeData={resumeFakeData}/> */}
    </Box>
  );
};






export default ViewResume;
