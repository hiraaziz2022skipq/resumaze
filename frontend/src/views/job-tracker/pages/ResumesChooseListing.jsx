"use client";
import { Grid, Box, Drawer } from "@mui/material";
import ResumeChooseCard from "../ui/resumeChooseCard";
import { useState } from "react";
import ViewResume from "../ui/ViewResume";

const tabAvatars = [
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
];

const ResumeChooseListing = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewResume, setIsViewResume] = useState(false);

  const handleChoose = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Unselect if already selected
    } else {
      setSelectedCategory(category);
    }
  };

  const onView = () => {
    setIsViewResume(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allow wrapping of cards
          overflowY: "hidden", // Hide the vertical scrollbar
          height: "auto", // Adjust height automatically
          padding: "10px",
          gap: "16px", // Space between cards
        }}
      >
        <Grid container spacing={3} sx={{ p: 2 }}>
          {tabAvatars.map((item, index) => (
            <Grid item key={index}>
              <ResumeChooseCard
                data={item}
                selected={item.category === selectedCategory}
                onView={onView}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Drawer
        open={isViewResume}
        anchor="right"
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: { xs: 600, sm: 700 } } }}
        onClose={() => {
          setIsViewResume(false);
        }}
      >
        <ViewResume />
      </Drawer>
    </>
  );
};

export default ResumeChooseListing;
