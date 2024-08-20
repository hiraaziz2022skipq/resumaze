import {
    Button,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Languages = ({ languages, setLanguages }) => {
  const [category, setCategory] = useState("");
  const [currentLangState, setCurrentLangState] = useState("");

  const handleAddLang = () =>{
    const allLang = [...languages , {
        langauge:currentLangState,
        proficiency:category
    }]
    setLanguages(allLang)
    setCurrentLangState('')
    setCategory('')
  }

  const onDelete = (index) => {
    const newLangArray = languages.filter((_, i) => i !== index);
    setLanguages(newLangArray);
  };


  return (
    <>
      <CardHeader title="Languages" />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Language"
              value={currentLangState}
              placeholder="Enter Language"
              onChange={(e) => {
                setCurrentLangState(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Proficiency</InputLabel>
              <Select
                label="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Proficient">Proficient</MenuItem>
                <MenuItem value="Native">Native</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={1}>
          <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={handleAddLang}
              >
                Add
              </Button>
          </Grid>     
        </Grid>
      
      </CardContent>
      <CardContent>
  <Grid container spacing={5}>
    {languages.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <div className='flex items-center justify-between'>
          <Typography className='font-medium' color='text.primary'>
            {item.langauge}
          </Typography>
          <Chip label={`${item.proficiency}`} variant='tonal' size='small' color='secondary' />
          <IconButton
            onClick={() => onDelete(index)} 
            className='ml-4' // Adds margin to the left of the icon
          >
            <i className="ri-delete-bin-7-line text-textSecondary" />
          </IconButton>
        </div>
        <Divider  orientation="horizontal" className="mt-2" /> {/* Horizontal divider below each item */}
      
      </Grid>
    ))}
  </Grid>
</CardContent>

    </>
  );
};

export default Languages;
