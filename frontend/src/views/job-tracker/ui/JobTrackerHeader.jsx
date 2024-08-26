"use client";
import { Drawer } from "@mui/material";
// MUI Imports
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ApplyingJob from "../Drawer/ApplyingJob";

const JobTrackerHeader = () => {
  const [openModalApplyJob, setOpenModalApplyJob] = useState(false);
  return (
    <>
      <div className="flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6">
        <div>
          <Typography variant="h4" className="mbe-1">
            Job Tracker
          </Typography>
          <Typography>Your Job status</Typography>
        </div>
        <div className="flex flex-wrap max-sm:flex-col gap-4">
          <Button
            startIcon={<i className="ri-add-line" />}
            onClick={() => {
              setOpenModalApplyJob(true);
            }}
            variant="contained"
          >
            Apply for Job
          </Button>
        </div>
      </div>
      <Drawer
        open={openModalApplyJob}
        anchor="right"
        variant="temporary"
        onClose={() => {
          setOpenModalApplyJob(false);
        }}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: { xs: 400, sm: 500 } } }}
      >
       <ApplyingJob handleReset={() => {
          setOpenModalApplyJob(false);
        }}/>
      </Drawer>
    </>
  );
};

export default JobTrackerHeader;
