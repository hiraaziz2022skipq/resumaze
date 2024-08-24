'use client'

// React Imports
import { useState } from 'react'

// MUI Import
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'

const tabAvatars = [
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: 'resumetemp1'
  },
]

const RList = () => {
    const [value, setValue] = useState('resumetemp1')
  
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }
  
    const RenderTabAvatar = ({ data }) => (
      <Box
        sx={{
          p: 2, // Padding inside the avatar container
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px dashed grey',
          width: 210,
          height: 280,
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // More prominent background transparency
          position: 'relative', // For positioning the button
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // Even more transparent on hover
            '& .edit-button': {
              opacity: 1, // Make the button visible on hover
            }
          }
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0, // Hidden by default
            transition: 'opacity 0.3s ease-in-out',
            backgroundColor: 'gray', // Orange color
            color: '#fff', // White text color
            borderRadius: '20px', // Rounded corners
            padding: '8px 16px', // Padding for the button
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Shadow for depth
            '&:hover': {
              backgroundColor: '#E64A19', // Darker orange on hover
            }
          }}
          startIcon={<EditIcon />} 
        >
          Edit
        </Button>
      </Box>
    )
  
    return (
      <Card>
        <CardHeader
          title='Resumes'
          subheader='List of Resume'
          // action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
        />
        <Grid container spacing={3} sx={{ p: 2 }}>
          {tabAvatars.map((avatar, index) => (
            <Grid item key={index}>
              <RenderTabAvatar data={avatar} />
            </Grid>
          ))}
        </Grid>
      </Card>
    )
  }
  
  export default RList