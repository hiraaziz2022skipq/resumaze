'use client'

// React Imports
import { useState } from 'react'

import { Autocomplete, CardContent, Chip, Grid, TextField } from "@mui/material"


const Skills = ({skill_set , setSkillsSet}) => {

  const handleChange = (event, newValue) => {
    setSkillsSet(newValue);
  };

  return (
    <CardContent>
    <Grid item mt={10} mb={10} >
      <Autocomplete
        multiple
        freeSolo
        value={skill_set}
        onChange={handleChange}
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
        options={[]}
        getOptionLabel={(option) => option}
      />
    </Grid>
    </CardContent>
  )
}

export default Skills
