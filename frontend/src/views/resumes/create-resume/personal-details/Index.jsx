"use client";

// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getFirstAndLastName } from "@/utils/helpers";
import {
  getProfessionalInfoService,
  postProfessionalInfoService,
  updateProfessionalInfoService,
} from "@/redux/create-resume/service";
import toast, { Toaster } from "react-hot-toast";
import CircularSpinner from "@/components/spinner/Circular";
import { CircularProgress } from "@mui/material";
import {
  setEligibilityofATSScore,
  setProfilePercentage,
} from "@/redux/create-resume/slice";
import {
  calculatePercentageOfSteps,
  checkReqforATSScore,
} from "@/utils/create-resume/functions";
import { useDispatch } from "react-redux";
import { updateResume } from "@/redux/resumes/slice";

const PersonalDetail = ({ resumeId }) => {
  const dispatch = useDispatch();
  const [isSavingLoader, setisSavingLoader] = useState(false);
  const [professional_info, setProfessionalInfo] = useState({
    name: "",
    image: "/images/avatars/1.png",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    date_of_birth: "",
    job_title: "",
    professional_summary: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const [fileInput, setFileInput] = useState("");

  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  const handleFormChange = (field, value) => {
    setProfessionalInfo({
      ...professional_info,
      [field]: value,
    });
  };

  const handleFileInputChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;

    if (files && files.length !== 0) {
      reader.onload = () => handleFormChange("image", reader.result);
      reader.readAsDataURL(files[0]);

      if (reader.result !== null) {
        setFileInput(reader.result);
      }
    }
  };

  const handleFileInputReset = () => {
    setFileInput("");
    handleFormChange("image", "/images/avatars/1.png");
  };

  const handleSave = () => {
    setisSavingLoader(true);
    if (isFirstTime) {
      updateProfessionalInfoService(resumeId, professional_info).then(
        async (res) => {
          if (res.status === 200) {
            const percentage = await calculatePercentageOfSteps(res.data.steps);
            dispatch(setProfilePercentage(percentage));

            const isElgForAts = checkReqforATSScore(res.data.steps);
            dispatch(setEligibilityofATSScore(isElgForAts));

            dispatch(
              updateResume({
                resumeId: resumeId,
                singleObj: { professional_info: res.data.professional_info },
              })
            );

            setisSavingLoader(false);
            toast.success("Updated Successfully!");

          } else {
            setisSavingLoader(false);
          }
        }
      );
    } else {
      postProfessionalInfoService(resumeId, professional_info).then(
        async (res) => {
          if (res.status === 200) {
            const percentage = await calculatePercentageOfSteps(res.data.steps);
            dispatch(setProfilePercentage(percentage));

            const isElgForAts = checkReqforATSScore(res.data.steps);
            dispatch(setEligibilityofATSScore(isElgForAts));

            dispatch(
              updateResume({
                resumeId: resumeId,
                singleObj: { professional_info: professional_info },
              })
            );
            toast.success("Created Successfully!");
            setIsFirstTime(true);
            setisSavingLoader(false);
          } else {
            setisSavingLoader(false);
          }
        }
      );
    }
  };

  useEffect(() => {
    getProfessionalInfoService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data?.professional_info) {
          setProfessionalInfo({
            ...resp.data.professional_info,
          });
          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { professional_info: resp.data.professional_info },
            })
          );
          setIsFirstTime(true);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [resumeId]);

  useEffect(() => {
    if (professional_info.name) {
      const { firstName, lastName } = getFirstAndLastName(
        professional_info.name
      );
      setName({
        firstName: firstName,
        lastName: lastName,
      });
    }
  }, [professional_info.name]);

  if (isLoading) return <CircularSpinner />;

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardContent className="mbe-5">
            <div className="flex max-sm:flex-col items-center gap-6">
              <img
                height={100}
                width={100}
                className="rounded"
                src={professional_info.image}
                alt="Profile"
              />
              <div className="flex flex-grow flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                  >
                    Upload New Photo
                    <input
                      hidden
                      type="file"
                      value={fileInput}
                      accept="image/png, image/jpeg"
                      onChange={handleFileInputChange}
                      id="account-settings-upload-image"
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleFileInputReset}
                  >
                    Reset
                  </Button>
                </div>
                {/* <Typography>
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography> */}
              </div>
            </div>
          </CardContent>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={name.firstName}
                    placeholder="John"
                    onChange={(e) => {
                      setName({
                        ...name,
                        firstName: e.target.value,
                      });
                      const value = e.target.value + " " + name.lastName;
                      handleFormChange("name", value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={name.lastName}
                    placeholder="Doe"
                    onChange={(e) => {
                      setName({
                        ...name,
                        lastName: e.target.value,
                      });
                      const value = name.firstName + " " + e.target.value;
                      handleFormChange("name", value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={professional_info.email}
                    placeholder="john.doe@gmail.com"
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={professional_info.job_title}
                    placeholder="Full Stack Developer"
                    onChange={(e) =>
                      handleFormChange("job_title", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={professional_info.phone}
                    placeholder="+1 (234) 567-8901"
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={professional_info.address}
                    placeholder="Address"
                    onChange={(e) =>
                      handleFormChange("address", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="DOB"
                    value={professional_info.date_of_birth}
                    placeholder="MM/DD/YYYY"
                    onChange={(e) =>
                      handleFormChange("date_of_birth", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Nationality</InputLabel>
                    <Select
                      label="Nationality"
                      value={professional_info.nationality}
                      onChange={(e) =>
                        handleFormChange("nationality", e.target.value)
                      }
                    >
                      <MenuItem value="usa">USA</MenuItem>
                      <MenuItem value="uk">UK</MenuItem>
                      <MenuItem value="australia">Australia</MenuItem>
                      <MenuItem value="germany">Germany</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      disabled={isSavingLoader}
                      variant="contained"
                      onClick={handleSave}
                    >
                      {isSavingLoader && (
                        <CircularProgress
                          color="success"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "2px",
                          }}
                        />
                      )}
                      <span>Save</span>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Grid>
      <Toaster />
      {/* </Card> */}
    </>
  );
};

export default PersonalDetail;
