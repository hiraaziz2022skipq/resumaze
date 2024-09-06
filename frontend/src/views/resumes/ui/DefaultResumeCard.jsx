import { Box, Button, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BarChartIcon from "@mui/icons-material/BarChart"; // Icon representing a score or analytics
// Next Imports
import { useRouter } from "next/navigation";

const DefaultResumeOption = ({ resumeData, onViewResume, onEditResume }) => {
  const data = {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  };

  const atsScore = resumeData.ats_score !== null ? resumeData.ats_score : 0; // Display 0 if ats_score is null

  const router = useRouter();
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #4CAF50",
        width: 210,
        height: 280,
        position: "relative",
        "&:hover": {
          "& .action-buttons": {
            opacity: 1, // Show buttons on hover
          },
        },
      }}
    >
      {/* ATS Score display */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FF5722", // Brighter background color
          color: "#fff", // White font color
          borderRadius: "8px", // Rounded corners
          padding: "6px 12px", // Adjusted padding
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
        }}
      >
        <BarChartIcon sx={{ mr: 0.5 }} /> {/* Icon representing score/analytics */}
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#fff" }}> {/* White font color */}
          {atsScore}
        </Typography>
      </Box>

      <img
        src={`/images/cards/${data.category}.png`}
        alt={`${data.category}`}
        width={data.imgWidth}
        height={data.imgHeight}
      />

      <Stack
        direction="column"
        spacing={1}
        className="action-buttons"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0, // Initially hidden
          transition: "opacity 0.3s ease-in-out",
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{
            backgroundColor: "#1976D2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
          onClick={() => console.log("Download clicked")} // Replace with your download logic
        >
          Download
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            backgroundColor: "#FF9800",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#FB8C00",
            },
          }}
          onClick={onEditResume}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          sx={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#43A047",
            },
          }}
          onClick={onViewResume}
        >
          View
        </Button>
      </Stack>
    </Box>
  );
};

export default DefaultResumeOption;
