import React from 'react'
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
  ListItemIcon
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MuiTimeline from '@mui/lab/Timeline'
import { TimelineConnector, TimelineDot, TimelineItem, TimelineSeparator, TimelineContent } from '@mui/lab'
import SchoolIcon from '@mui/icons-material/School'
import LanguageIcon from '@mui/icons-material/Language'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import ComputerIcon from '@mui/icons-material/Computer'

const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ResumeTemp4 = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: '1200px', margin: 'auto', backgroundColor: '#f4f4f9' }}>
      {/* Header Section */}
      <Box sx={{ backgroundColor: '#007acc', color: 'white', p: 8, mb: 2, borderRadius: '8px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3} display='flex' alignItems='center'>
            <Avatar
              alt='Profile Picture'
              src='/images/avatars/1.png'
              sx={{ width: 120, height: 120, border: '3px solid white' }}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h3' sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}>
              Frank Graham
            </Typography>
            <Typography variant='h5' sx={{ mb: 1, fontWeight: 'bold', color: '#ffcc00' }}>
              Full Stack developer
            </Typography>
            <Typography variant='body1' sx={{ color: 'white' }}>
              A passionate full stack developer with 5+ years of experience in building scalable web applications and
              optimizing user experiences.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={6} sx={{ backgroundColor: 'white', p: 3 }}>
          <Box>
            {/* Work Experience */}
            <Typography variant='h5' sx={{ color: '#333a4e', mb: 2, mt: 4 }}>
              WORK EXPERIENCE
            </Typography>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#333' }}>
                    Senior Full Stack Developer
                  </Typography>
                  <Typography variant='body2' sx={{ fontStyle: 'italic', color: '#007acc' }}>
                    Tech Innovators Inc.
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#333' }}>
                    01/2019 - Present | New York, NY
                  </Typography>
                  <List sx={{ listStyleType: 'disc', pl: 2 }}>
                    <ListItem sx={{ display: 'list-item', textAlign: 'justify', fontSize: '0.85rem' }}>
                      Led the development of a high-traffic web application using React.js, Node.js, and Express.js,
                      resulting in a 25% increase in user engagement.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', textAlign: 'justify', fontSize: '0.85rem' }}>
                      Implemented scalable microservices architecture on AWS, improving system reliability and reducing
                      downtime by 30%.
                    </ListItem>
                  </List>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='success' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#333' }}>
                    Full Stack Developer
                  </Typography>
                  <Typography variant='body2' sx={{ fontStyle: 'italic', color: '#007acc' }}>
                    Creative Solutions Ltd.
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#333' }}>
                    06/2015 - 12/2018 | San Francisco, CA
                  </Typography>
                  <List sx={{ listStyleType: 'disc', pl: 2 }}>
                    <ListItem sx={{ display: 'list-item', textAlign: 'justify', fontSize: '0.85rem' }}>
                      Developed and maintained full-stack applications using Next.js, GraphQL, and SQL, enhancing
                      application performance and scalability.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', textAlign: 'justify', fontSize: '0.85rem' }}>
                      Collaborated with cross-functional teams to design and implement new features, leading to a 20%
                      increase in customer satisfaction.
                    </ListItem>
                  </List>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
          <Divider sx={{ my: 3 }} />

          <Box>
            {/* Courses */}
            <Typography variant='h5' sx={{ color: '#333a4e' }}>
              COURSES
            </Typography>
            <List
              sx={{ color: '#333' }}
              subheader={
                <ListSubheader sx={{ backgroundColor: 'inherit', color: '#007acc' }}>Completed Courses</ListSubheader>
              }
            >
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: '#007acc' }} />
                </ListItemIcon>
                <ListItemText primary='Advanced React.js' secondary='Completed: 04/2024' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: '#007acc' }} />
                </ListItemIcon>
                <ListItemText primary='Full Stack Development with Node.js' secondary='Completed: 08/2023' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: '#007acc' }} />
                </ListItemIcon>
                <ListItemText primary='Cloud Computing with AWS' secondary='Completed: 01/2023' />
              </ListItem>
            </List>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={6} sx={{ backgroundColor: 'white', p: 3 }}>
          {/* Contact Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='h5' sx={{ color: '#333a4e', mb: 4, mt: 4 }}>
              CONTACT INFORMATION
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} display='flex' alignItems='center'>
                <EmailIcon fontSize='small' sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  frank@novoresume.com
                </Typography>
              </Grid>
              <Grid item xs={6} display='flex' alignItems='center'>
                <PhoneIcon fontSize='small' sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  123 444 555
                </Typography>
              </Grid>
              <Grid item xs={6} display='flex' alignItems='center'>
                <LocationOnIcon fontSize='small' sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  Montgomery, AL
                </Typography>
              </Grid>
              <Grid item xs={6} display='flex' alignItems='center'>
                <LinkedInIcon fontSize='small' sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  linkedin.com/in/frank.g
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 3 }} />

          {/* Skills */}
          <Box sx={{ mb: 3, mt: 4 }}>
            <Typography variant='h5' sx={{ color: '#333a4e', mb: 2 }}>
              SKILLS
            </Typography>
            <Grid container spacing={2}>
              {[
                'React.js',
                'Next.js',
                'Node.js',
                'Express.js',
                'SQL',
                'GraphQL',
                'Docker',
                'AWS',
                'Git',
                'TypeScript'
              ].map(skill => (
                <Grid item xs={6} sm={4} md={3} key={skill}>
                  <Chip
                    label={skill}
                    sx={{
                      backgroundColor: 'white',
                      color: '#007acc',
                      border: '3px solid #007acc',
                      width: '100%',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ my: 3 }} />

          {/* Languages */}
          <Box sx={{ mb: 3, mt: 4 }}>
            <Typography variant='h5' sx={{ color: '#333a4e' }}>
              LANGUAGES
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {[
                { language: 'English', proficiency: 'Fluent' },
                { language: 'Spanish', proficiency: 'Intermediate' },
                { language: 'French', proficiency: 'Basic' }
              ].map(({ language, proficiency }) => (
                <Box
                  key={language}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    p: 1,
                    width: '100%',
                    maxWidth: '300px' // Adjust the max width as needed
                  }}
                >
                  <LanguageIcon sx={{ color: '#007acc', mr: 1 }} />
                  <Box>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {language}
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#555' }}>
                      {proficiency}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Interests */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='h5' sx={{ color: '#333a4e', mb: 2 }}>
              INTERESTS
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} display='flex' alignItems='center'>
                <FlightTakeoffIcon sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  Traveling
                </Typography>
              </Grid>
              <Grid item xs={4} display='flex' alignItems='center'>
                <ComputerIcon sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  Coding
                </Typography>
              </Grid>
              <Grid item xs={4} display='flex' alignItems='center'>
                <SchoolIcon sx={{ color: '#007acc' }} />
                <Typography variant='body2' sx={{ ml: 1, color: '#333' }}>
                  Learning
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ResumeTemp4
