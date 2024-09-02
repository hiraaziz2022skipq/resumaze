import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TemplatesList from "./List/TemplateList";
import DefaultTemplateList from "./List/DefaultTemplateList";

const ResumeList = ({ allResumeData }) => {
  const [resumeType, setResumeType] = useState("generic");
  const [title, setTitle] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentResume, setCurrentResume] = useState([]);
 

  useEffect(() => {
    // Filter titles based on resumeType
    const filteredTitles = allResumeData
      .filter((resume) => resume.type === resumeType)
      .map((resume) => resume.title);
    setTitle(filteredTitles);

    // Reset current title and resume when the type changes
    setCurrentTitle(filteredTitles.length > 0 ? filteredTitles[0] : "");
  }, [resumeType, allResumeData]);

  useEffect(() => {
    // Find the resume data based on the currentTitle
    const selectedResume = allResumeData.find(
      (resume) => resume.title === currentTitle && resume.type === resumeType
    );
    setCurrentResume(selectedResume);
  }, [currentTitle, resumeType, allResumeData]);

  console.log(title,"title",currentTitle,"currentTItle")

  if (allResumeData.length === 0) return <Typography>No Data..</Typography>;
  return (
    <>
      <Card>
        <CardHeader title="Resumes" subheader="List of Resume" />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Resume Type"
                  value={resumeType}
                  onChange={(e) => setResumeType(e.target.value)}
                >
                  <MenuItem value="generic">Generic</MenuItem>
                  <MenuItem value="job">Jobs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                  label="Resume Title"
                  value={currentTitle || ""}
                  onChange={(e) => setResumeType(e.target.value)}
                >
                  {title.map((value) => (
                     <MenuItem key={value} value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <DefaultTemplateList currentResume={currentResume}/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TemplatesList currentResume={currentResume}/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ResumeList;
