// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import CustomIconButton from '@/@core/components/mui/IconButton'
import { Grid } from '@mui/material'
import { useState } from 'react'

const CreateCoverLetter = ({ onSubmit }) => {
  const [JobTitle, setJobTitle] = useState('')

  return (
    <Card>
      <CardHeader title='Generate' />
      <CardContent>
        <div className='flex items-center gap-4'>
          <TextField
            fullWidth
            label='Job Title'
            value={JobTitle}
            onChange={e => {
              setJobTitle(e.target.value)
            }}
            placeholder='Full Stack Developer'
            multiline // Enables multiline
            rows={7}
          />

          <CustomIconButton
            onClick={() => {
              onSubmit(JobTitle)
            }}
            size='large'
            variant='outlined'
            color='primary'
            className='min-is-fit'
          >
            <i className='ri-add-line' />
          </CustomIconButton>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreateCoverLetter
