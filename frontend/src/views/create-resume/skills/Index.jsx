'use client'

// React Imports
import { useState } from 'react'

import { Autocomplete, CardContent, Chip, Grid, TextField } from "@mui/material"

// Vars
const languages = []

const Skills = () => {
  const initialData = {
    language: ['english'],
  }

  const [userData, setUserData] = useState(initialData)

  return (
    <CardContent>
    <Grid item mt={10} mb={10} >
      <Autocomplete
        multiple
        freeSolo
        value={userData.language}
        onChange={(event, newValue) => setUserData({ ...userData, language: newValue })}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              key={option}
              className='capitalize'
              size='small'
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Skills"
            placeholder="Add Skills"
          />
        )}
        options={languages}
        getOptionLabel={(option) => option}
      />
    </Grid>
    </CardContent>
  )
}

export default Skills
