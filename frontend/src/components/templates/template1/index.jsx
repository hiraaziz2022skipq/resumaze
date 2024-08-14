import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import resumeFakeData from "@/fake-data/resume-fake-data";

const Template1 = ({ resumeData = resumeFakeData }) => {
  return (
    <Box
      sx={{
        maxWidth: { md: "80%" },
        position: "sticky",
        ml:"5px",
        overflowY: { md: "scroll" },
        height: { md: "100vh" },
        '&::-webkit-scrollbar': {
            display: 'none',
          },
          // Hide scrollbar for Firefox
          scrollbarWidth: 'none',
          // Hide scrollbar for Edge and Internet Explorer
          '-ms-overflow-style': 'none',
      }}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          {/* {resumeData.profilePicture.length > 0 && (
            <Avatar
              src={resumeData.profilePicture}
              alt="profile"
              sx={{
                width: 96,
                height: 96,
                border: 2,
                borderColor: "fuchsia.700",
              }}
            />
          )} */}
          <Typography variant="h4">{resumeData.name}</Typography>
          <Typography variant="h6">{resumeData.position}</Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 1 }}
          >
            {/* <MdPhone /> */}
            <Typography>{resumeData.contactInformation}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 1 }}
          >
            {/* <MdEmail /> */}
            <Typography>{resumeData.email}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 1 }}
          >
            {/* <MdLocationOn /> */}
            <Typography>{resumeData.address}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {resumeData.summary.length > 0 && (
              <Box mb={2}>
                <Typography
                  variant="h5"
                  sx={{ borderBottom: 2, borderColor: "grey.300", mb: 1 }}
                >
                  Summary
                </Typography>
                <Typography>{resumeData.summary}</Typography>
              </Box>
            )}

            {resumeData.education.length > 0 && (
              <Box mb={2}>
                <Typography
                  variant="h5"
                  sx={{ borderBottom: 2, borderColor: "grey.300", mb: 1 }}
                >
                  Education
                </Typography>
                {resumeData.education.map((item, index) => (
                  <Box key={index} mb={1}>
                    <Typography variant="body1" fontWeight="bold">
                      {item.degree}
                    </Typography>
                    <Typography variant="body2">{item.school}</Typography>
                    <Typography variant="body2">
                      {item.startYear} - {item.endYear}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            <List>
              {resumeData.skills.map((skill, index) => (
                <ListItem
                  key={index} // Ensure each ListItem has a unique key
                  sx={{
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={skill.title}
                    secondary={skill.skills.join(", ")}
                  />
                </ListItem>
              ))}
            </List>

            <Box mb={2}>
              <Typography variant="h6">Languages</Typography>
              <Typography>{resumeData.languages.join(", ")}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="h6">Certifications</Typography>
              <Typography>{resumeData.certifications.join(", ")}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            {resumeData.workExperience.length > 0 && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{ borderBottom: 2, borderColor: "grey.300", mb: 1 }}
                  contentEditable
                  suppressContentEditableWarning
                >
                  Work Experience
                </Typography>
                {resumeData.workExperience.map((item, index) => (
                  <Box
                    key={`${item.company}-${index}`}
                    sx={{
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {item.company}
                      </Typography>
                      <Typography variant="body2">
                        {item.startYear} - {item.endYear}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{item.position}</Typography>
                    <Typography variant="body2">{item.description}</Typography>

                    <List sx={{ listStyleType: "disc", pl: 2 }}>
    {item.keyAchievements.map((achievement, index) => (
      <ListItem key={index}>
        <Typography variant="body2">{achievement}</Typography>
      </ListItem>
    ))}
  </List>
              
                  </Box>
                ))}
              </Box>
            )}

            {resumeData.projects.length > 0 && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{ borderBottom: 2, borderColor: "grey.300", mb: 1 }}
                  contentEditable
                  suppressContentEditableWarning
                >
                  Projects
                </Typography>
                {resumeData.projects.map((item, index) => (
                  <Box
                    key={`${item.projectName}-${index}`}
                    sx={{
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {item.projectName}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Template1;
