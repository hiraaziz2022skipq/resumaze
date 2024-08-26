import { Box, Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Next Imports
import { useRouter } from "next/navigation";
const ResumeChooseCard = ({ data , onView }) => {
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
          onClick={() => {
            router.push("/edit-resume");
          }} // Replace with your edit logic
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
          onClick={onView} // Replace with your view logic
        >
          View
        </Button>
      </Stack>
    </Box>
  );
};

export default ResumeChooseCard;
