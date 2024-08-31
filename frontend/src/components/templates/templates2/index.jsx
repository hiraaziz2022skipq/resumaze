import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Chip,
  styled,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
} from "@mui/lab";
import MuiTimeline from "@mui/lab/Timeline";

const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

const ResumeTemplate2 = () => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, height: "100%", maxWidth: "900px", margin: "auto" }}
    >
      <Grid container spacing={5}>
        {/* Left Section */}
        <Grid
          item
          xs={4}
          sx={{ backgroundColor: "#333a4e", color: "white", padding: 2 }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              alt="Profile Picture"
              src="/images/avatars/1.png"
              sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
            />
          </Box>

          <Divider sx={{ backgroundColor: "#555" }} />

          {/* Skills */}
          <List
            sx={{
              mt: 3,
              color: "white",
            }}
            subheader={
              <ListSubheader
                sx={{ backgroundColor: "inherit", color: "white" }}
              >
                SKILLS
              </ListSubheader>
            }
          >
            {[
              "Sales Management",
              "Revenue Growth",
              "Customer Service",
              "Customer Needs Analysis",
              "Conflict Resolution",
              "Work Ethic & Professionalism",
              "Effective Sales Process",
              "Persuasive Selling Approach",
            ].map((skill) => (
              <ListItem key={skill}>
                <Chip
                  label={skill}
                  sx={{ backgroundColor: "#4a566b", color: "white" }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ backgroundColor: "#555", mt: 2 }} />

          {/* Education */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">EDUCATION</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Associate of Arts in Business Administration
            </Typography>
            <Typography variant="body2">
              University of Alabama at Birmingham
            </Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#555", mt: 2 }} />

          {/* Languages */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">LANGUAGES</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              English - Native or Bilingual Proficiency
            </Typography>
            <Typography variant="body2">
              Spanish - Professional Working Proficiency
            </Typography>
            <Typography variant="body2">
              French - Professional Working Proficiency
            </Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#555", mt: 2 }} />

          {/* Interests */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">INTERESTS</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Blockchain Technologies
            </Typography>
            <Typography variant="body2">Sailing</Typography>
            <Typography variant="body2">Web 3.0</Typography>
            <Typography variant="body2">Sustainability</Typography>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={8} sx={{ padding: 2 }}>
          {/* Contact Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ color: "#333a4e" }}>
              Frank Graham
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#007acc", mb: 1 }}>
              Sales Associate
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body2" sx={{ textAlign: "justify", mt: 3, fontSize: "0.70rem" }}>
  Preserve up-to-date knowledge and information about the latest
  products or upcoming releases to effectively assist customers with
  various product-related concerns by providing accurate Preserve
  up-to-date knowledge and information about the latest products or
  upcoming releases to effectively assist customers with various
  product-related concerns by providing accurate details. details.
</Typography>

            <Box
              sx={{
                backgroundColor: "#333a4e",
                color: "white",
                padding: 2,
                mt: 3,
                borderRadius: 1,
              }}
            >
              <Grid container spacing={1}>
                {/* First Row */}
                <Grid item xs={6} display="flex" alignItems="center">
                  <EmailIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ ml: 1, color: "white", fontSize: "0.70rem" }}
                  >
                    frank@novoresume.com
                  </Typography>
                </Grid>
                <Grid item xs={6} display="flex" alignItems="center">
                  <PhoneIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ ml: 1, color: "white", fontSize: "0.70rem" }}
                  >
                    123 444 555
                  </Typography>
                </Grid>

                {/* Second Row */}
                <Grid item xs={6} display="flex" alignItems="center">
                  <LocationOnIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ ml: 1, color: "white" , fontSize: "0.70rem"}}
                  >
                    Montgomery, AL
                  </Typography>
                </Grid>
                <Grid item xs={6} display="flex" alignItems="center">
                  <LinkedInIcon fontSize="small" sx={{ color: "white" }} />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ ml: 1, color: "white", fontSize: "0.70rem" }}
                  >
                    linkedin.com/in/frank.g
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Work Experience */}
          <Box>
            <Typography variant="h6" sx={{ color: "#333a4e", mb: 2 }}>
              WORK EXPERIENCE
            </Typography>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Sales Associate
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    ShoPerfect Deluxe Mal
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#007acc" }}>
                    11/2018 - Present | Montgomery, AL
                  </Typography>
                  <List sx={{ listStyleType: "disc", pl: 2 }}>
                    <ListItem sx={{ display: "list-item" , textAlign: "justify" , fontSize: "0.70rem" }}>
                      Devised and implemented an effective sales process,
                      leading to consistently achieving the established sales
                      goals and surpassing the monthly sales target by 12%.
                    </ListItem>
                    
                  </List>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='success'/>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Sales Associate
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    ShoPerfect Deluxe Mal
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#007acc" }}>
                    11/2018 - Present | Montgomery, AL
                  </Typography>
                  <List sx={{  listStyleType: "disc", pl: 2 }}>
                    <ListItem sx={{ display: "list-item" , textAlign: "justify" , fontSize: "0.70rem"}}>
                      Devised and implemented an effective sales process,
                      leading to consistently achieving the established sales
                      goals and surpassing the monthly sales target by 12%.
                    </ListItem>
    
                  </List>
                </TimelineContent>
              </TimelineItem>
            </Timeline>

          
          </Box>

          <Divider sx={{ mb: 3, mt: 3 }} />

          {/* Conferences & Courses */}
          <Box>
            <Typography variant="h6" sx={{ color: "#333a4e", mb: 2 }}>
              CONFERENCES & COURSES
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>
                Sales Training for High Performing Team Specialization
              </strong>{" "}
              - Online Course - coursera.org
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Practical Sales Management Training</strong> - ShoPerfect
              Deluxe Mall
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Sales Training: Practical Sales Techniques</strong> -
              Online Course - udemy.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResumeTemplate2;
