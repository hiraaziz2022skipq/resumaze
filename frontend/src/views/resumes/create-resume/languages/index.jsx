import CircularSpinner from "@/components/spinner/Circular";
import {
  addLanguagesService,
  getLanguagesService,
  updateLanguagesService,
} from "@/redux/create-resume/service";
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
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Languages = ({ resumeId }) => {
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [category, setCategory] = useState("");
  const [currentLangState, setCurrentLangState] = useState("");

  const handleAddLang = () => {
    const allLang = [
      ...languages,
      {
        language: currentLangState,
        proficieny: category,
      },
    ];
    setLanguages(allLang);
    setCurrentLangState("");
    setCategory("");
  };

  const onDelete = (index) => {
    const newLangArray = languages.filter((_, i) => i !== index);
    setLanguages(newLangArray);
  };

  const handleSave = () => {
    if (isFirstTime) {
      updateLanguagesService(resumeId, { language: languages }).then((res) => {
        if (res.status === 200) {
          toast.success("Languages Updated Successfully!");
        } else {
          toast.error("Failed to Update Languages.");
        }
      });
    } else {
      addLanguagesService(resumeId, { language: languages }).then((res) => {
        if (res.status === 200) {
          toast.success("Languages Created Successfully!");
          setIsFirstTime(true);
        } else {
          toast.error("Failed to Update Languages.");
        }
      });
    }
  };

  useEffect(() => {
    getLanguagesService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data.language?.length > 0) {
          const langs = resp.data.language;
          setLanguages([...langs]);
          setIsFirstTime(true);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [resumeId]);

  if (isLoading) return <CircularSpinner />;

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
      <Divider />
      <CardContent>
        <Grid container spacing={5}>
          {languages.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <div className="flex items-center justify-between">
                <Typography className="font-medium" color="text.primary">
                  {item.language}
                </Typography>
                <Chip
                  label={`${item.proficieny}`}
                  variant="tonal"
                  size="small"
                  color="secondary"
                />
                <IconButton
                  onClick={() => onDelete(index)}
                  className="ml-4" // Adds margin to the left of the icon
                >
                  <i className="ri-delete-bin-7-line text-textSecondary" />
                </IconButton>
              </div>
              <Divider orientation="horizontal" className="mt-2" />{" "}
              {/* Horizontal divider below each item */}
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <div style={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Grid>
      </CardContent>
      <Toaster />
    </>
  );
};

export default Languages;
