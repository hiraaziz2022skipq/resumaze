'use client'


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'

const ResumeListCard = ({ data }) => (
  <Box
    sx={{
      p: 2, // Padding inside the avatar container
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px dashed grey",
      width: 210,
      height: 280,
      backgroundColor: "rgba(255, 255, 255, 0.85)", // More prominent background transparency
      position: "relative", // For positioning the button
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.95)", // Even more transparent on hover
        "& .edit-button": {
          opacity: 1, // Make the button visible on hover
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
    <Button
      className="edit-button"
      variant="contained"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0, // Hidden by default
        transition: "opacity 0.3s ease-in-out",
        backgroundColor: "gray", // Orange color
        color: "#fff", // White text color
        borderRadius: "20px", // Rounded corners
        padding: "8px 16px", // Padding for the button
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Shadow for depth
        "&:hover": {
          backgroundColor: "#E64A19", // Darker orange on hover
        },
      }}
      startIcon={<EditIcon />}
    >
      Default
    </Button>
  </Box>
);

export default ResumeListCard;
