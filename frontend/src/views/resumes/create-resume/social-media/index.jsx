// MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import { getSocialMediaService, postSocialMediaService, updateSocialMediaService } from "@/redux/create-resume/service";
import toast, { Toaster } from "react-hot-toast";
import CircularSpinner from "@/components/spinner/Circular";

const SocialMedia = ({ resumeId }) => {

  const [social_media, setSocialmedia] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    website: ''
  })

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);



  const handleFormChange = (field, value) => {
    setSocialmedia({
      ...social_media,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (isFirstTime) {
      updateSocialMediaService(resumeId, {social_media : social_media}).then((res) => {
        if (res.status === 200) {
          toast.success("Updated Successfully!");
        }
      });
    } else {
      postSocialMediaService(resumeId, {social_media : social_media}).then((res) => {
        if (res.status === 200) {
          toast.success("Created Successfully!");
          setIsFirstTime(true);
        }
      });
    }
  };



  useEffect(()=>{
    getSocialMediaService(resumeId).then(resp => {
      if (resp.status === 200) {
        const newData = resp.data.social_media
        setSocialmedia({
          ...newData
        })
        setIsFirstTime(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })
  },[])

  
  if (isLoading) return <CircularSpinner />;

  return (
    <>
      <CardHeader title="Social Media" />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    value={social_media.linkedin}
                    placeholder="LinkedIn"
                    onChange={(e) =>
                      handleFormChange("linkedin", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Github"
                    value={social_media.github}
                    placeholder="Github"
                    onChange={(e) => handleFormChange("github", e.target.value)}
                  />
                </Grid>
          
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    value={social_media.facebook}
                    placeholder="Facebook"
                    onChange={(e) =>
                      handleFormChange("facebook", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    value={social_media.instagram}
                    placeholder="Instagram"
                    onChange={(e) =>
                      handleFormChange("instagram", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Youtube"
                    value={social_media.youtube}
                    placeholder="Youtube"
                    onChange={(e) =>
                      handleFormChange("youtube", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={social_media.website}
                    placeholder="Website"
                    onChange={(e) =>
                      handleFormChange("website", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ textAlign: "right" }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Grid>
      <Toaster />
    </>
  );
};


export default SocialMedia