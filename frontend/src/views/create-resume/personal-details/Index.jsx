
'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'

// Vars
const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    phoneNumber: '',
    address: '',
    state: '',
    zipCode: '',
    country: '',
    language: '',
    timezone: '',
    currency: ''
  }


  const languageData = ['English', 'Arabic', 'French', 'German', 'Portuguese']


const PersonalDetail = () =>{

    return(
        <Grid container spacing={6}>
      <Grid item xs={12}>
        <PersonalDetailComponent />
      </Grid>
    
    </Grid>
    )
}


export default PersonalDetail


const PersonalDetailComponent  = () =>{
    const [formData, setFormData] = useState(initialData)
    const [fileInput, setFileInput] = useState('')
    const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
    const [language, setLanguage] = useState(['English'])
  
    const handleDelete = value => {
      setLanguage(current => current.filter(item => item !== value))
    }
  
    const handleChange = event => {
      setLanguage(event.target.value)
    }
  
    const handleFormChange = (field, value) => {
      setFormData({ ...formData, [field]: value })
    }
  
    const handleFileInputChange = file => {
      const reader = new FileReader()
      const { files } = file.target
  
      if (files && files.length !== 0) {
        reader.onload = () => setImgSrc(reader.result)
        reader.readAsDataURL(files[0])
  
        if (reader.result !== null) {
          setFileInput(reader.result)
        }
      }
    }
  
    const handleFileInputReset = () => {
      setFileInput('')
      setImgSrc('/images/avatars/1.png')
    }


    return(
        <>
           {/* <Card> */}
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='outlined' color='error' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='First Name'
                value={formData.firstName}
                placeholder='John'
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                value={formData.lastName}
                placeholder='Doe'
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                value={formData.email}
                placeholder='john.doe@gmail.com'
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Organization'
                value={formData.organization}
                placeholder='Pixinvent'
                onChange={e => handleFormChange('organization', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone Number'
                value={formData.phoneNumber}
                placeholder='+1 (234) 567-8901'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Address'
                value={formData.address}
                placeholder='Address'
                onChange={e => handleFormChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='State'
                value={formData.state}
                placeholder='New York'
                onChange={e => handleFormChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  label='Country'
                  value={formData.country}
                  onChange={e => handleFormChange('country', e.target.value)}
                >
                  <MenuItem value='usa'>USA</MenuItem>
                  <MenuItem value='uk'>UK</MenuItem>
                  <MenuItem value='australia'>Australia</MenuItem>
                  <MenuItem value='germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    {/* </Card> */}
        </>
    )
}

