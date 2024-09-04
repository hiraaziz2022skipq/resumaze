import React from 'react';
import { Paper, Box, Typography, Grid, List, ListItem, ListItemText, Divider, LinearProgress } from '@mui/material';
import { Phone, Email, LocationOn, School, Language, Work, Star } from '@mui/icons-material';

const ResumeTemp3 = () => {
  return (
    <Paper
      sx={{
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        margin: 'auto',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          borderBottom: '2px solid #333',
          paddingBottom: '10px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: '2px' }}>
          Jonathan Patterson
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#777' }}>
          Graphic Designer
        </Typography>
      </Box>

      {/* Body */}
      <Grid container spacing={4}>
        {/* Left Side */}
        <Grid item xs={12} md={4}>
          {/* Contact Information */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              CONTACT
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <Phone sx={{ color: '#bbb', marginRight: '10px' }} />
              <Typography sx={{ color: '#777' }}>+1 234-567-8901</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <Email sx={{ color: '#bbb', marginRight: '10px' }} />
              <Typography sx={{ color: '#777' }}>jonath@example.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ color: '#bbb', marginRight: '10px' }} />
              <Typography sx={{ color: '#777' }}>123 Main Street, New York, NY</Typography>
            </Box>
          </Box>

          {/* Skills */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              SKILLS
            </Typography>
            <List>
              {['Adobe Photoshop', 'Illustrator', 'InDesign', 'Sketch', 'UI/UX Design'].map((skill) => (
                <ListItem
                  key={skill}
                  sx={{
                    paddingLeft: 0,
                    backgroundColor: '#f5f5f5',
                    marginBottom: '5px',
                    borderRadius: '5px',
                    padding: '5px 10px',
                  }}
                >
                  <ListItemText primary={skill} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Languages */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              LANGUAGES
            </Typography>
            <List>
              {[
                { name: 'English', level: 90, color: 'primary' },
                { name: 'Spanish', level: 70, color: 'secondary' },
                { name: 'French', level: 50, color: 'error' },
              ].map((language) => (
                <ListItem key={language.name} sx={{ paddingLeft: 0 }}>
                  <Language sx={{ color: '#bbb', marginRight: '10px' }} />
                  <Box sx={{ width: '100%' }}>
                    <Typography sx={{ color: '#555', marginBottom: '5px' }}>{language.name}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={language.level}
                      color={language.color}
                      sx={{ height: '8px', borderRadius: '5px' }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Interests */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              INTERESTS
            </Typography>
            <List>
              {['Photography', 'Typography', 'Traveling', 'Art'].map((interest) => (
                <ListItem key={interest} sx={{ paddingLeft: 0 }}>
                  <Star sx={{ color: '#bbb', marginRight: '10px' }} />
                  <ListItemText primary={interest} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={8}>
          {/* Profile */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              PROFILE
            </Typography>
            <Typography sx={{ color: '#555' }}>
              Creative and detail-oriented graphic designer with over 5 years of experience in visual design, branding,
              and digital media. Adept at collaborating with cross-functional teams to deliver high-quality design solutions
              that align with business goals and client requirements.
            </Typography>
          </Box>

          {/* Education */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              EDUCATION
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <School sx={{ color: '#bbb', marginRight: '10px' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Bachelor of Fine Arts in Graphic Design
              </Typography>
            </Box>
            <Typography sx={{ color: '#777', marginLeft: '30px' }}>School of Visual Arts, New York</Typography>
            <Typography sx={{ color: '#777', marginLeft: '30px' }}>2015 - 2019</Typography>
          </Box>

          {/* Work Experience */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              WORK EXPERIENCE
            </Typography>
            <Box sx={{ marginBottom: '15px' }}>
              <Work sx={{ color: '#bbb', marginRight: '10px', verticalAlign: 'middle' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'inline' }}>
                Senior Graphic Designer
              </Typography>
            </Box>
            <Typography sx={{ color: '#777' }}>Creative Agency, New York, NY</Typography>
            <Typography sx={{ color: '#777' }}>Jan 2020 - Present</Typography>
            <Typography sx={{ color: '#555', marginTop: '10px' }}>
              - Led the design team in developing branding strategies and visual identities for various clients.
              <br />
              - Designed marketing materials, including brochures, posters, and social media graphics.
              <br />
              - Collaborated with copywriters and marketing teams to ensure design consistency across all platforms.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: '20px' }}>
            <Box sx={{ marginBottom: '15px' }}>
              <Work sx={{ color: '#bbb', marginRight: '10px', verticalAlign: 'middle' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', display: 'inline' }}>
                Junior Graphic Designer
              </Typography>
            </Box>
            <Typography sx={{ color: '#777' }}>XYZ Design Studio, New York, NY</Typography>
            <Typography sx={{ color: '#777' }}>Jul 2018 - Dec 2019</Typography>
            <Typography sx={{ color: '#555', marginTop: '10px' }}>
              - Assisted in the creation of design concepts for branding and advertising campaigns.
              <br />
              - Developed logos, brochures, and web design elements for clients in various industries.
              <br />
              - Worked closely with senior designers to refine concepts and ensure design quality.
            </Typography>
          </Box>

          {/* Courses */}
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              COURSES
            </Typography>
            <List>
              {[
                { name: 'Advanced Typography', details: 'Coursera, Completed on Mar 2021' },
                { name: 'Digital Illustration', details: 'Udemy, Completed on Jun 2020' },
                { name: 'UI/UX Design Principles', details: 'LinkedIn Learning, Completed on Nov 2019' },
              ].map((course) => (
                <ListItem key={course.name} sx={{ paddingLeft: 0 }}>
                  <ListItemText
                    primary={course.name}
                    secondary={course.details}
                    sx={{ color: '#555' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResumeTemp3;
