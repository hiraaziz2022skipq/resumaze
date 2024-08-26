import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  CardContent,
  Drawer,
  IconButton,
  Tab,
  Typography,
} from "@mui/material";
import { useState } from "react";
import JobCoverLetter from "../ui/coveLetter";
import ResumeChooseListing from "../pages/ResumesChooseListing";

const ResumeAndCoverLetterDetail = ({ drawerOpen, setDrawerOpen }) => {
  const [value, setValue] = useState("cover");
  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = {
    cover: <JobCoverLetter />,
    resume: <ResumeChooseListing />,
  };
  return (
    <div>
      <Drawer
        open={drawerOpen}
        anchor="right"
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: { xs: 500, sm: 600 } } }}
        onClose={handleClose}
      >
        <div className="flex justify-between items-center pli-5 plb-4 border-be">
          <Typography variant="h5">Detail</Typography>
          <IconButton onClick={handleClose} size="small">
            <i className="ri-close-line text-2xl" />
          </IconButton>
        </div>
        <div className="p-6">
          <TabContext value={value}>
            <TabList
              variant="fullWidth"
              onChange={handleChange}
              aria-label="full width tabs example"
            >
              <Tab value="cover" label="Cover Letter" />
              <Tab value="resume" label="Resume" />
            </TabList>
            <TabPanel value={value} className="pbs-0">
              <CardContent>{data[value]}</CardContent>
            </TabPanel>
          </TabContext>
        </div>
      </Drawer>
    </div>
  );
};

export default ResumeAndCoverLetterDetail;
