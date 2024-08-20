// MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { CardHeader } from "@mui/material";

const SocialMedia = ({ social_media, setSocialmedia }) => {
  const handleFormChange = (field, value) => {
    setSocialmedia({
      ...social_media,
      [field]: value,
    });
  };

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
                    label="Github"
                    value={social_media.github}
                    placeholder="Github"
                    onChange={(e) => handleFormChange("github", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    value={social_media.twitter}
                    placeholder="Twitter"
                    onChange={(e) =>
                      handleFormChange("twitter", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    value={social_media.github}
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
                    value={social_media.address}
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
                    value={social_media.youtube}
                    placeholder="Website"
                    onChange={(e) =>
                      handleFormChange("website", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
};


export default SocialMedia