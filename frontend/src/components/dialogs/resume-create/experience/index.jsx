"use client";

// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// Vars
const initialCardData = {
  company_name: "",
  job_title: "",
  job_description: "",
  start_date: "",
  end_date: "",
  location: "",
  is_current: true,
};

const ExperienceAdd = ({
  open,
  setOpen,
  data,
  onFinsish,
  id,
  isEdit = false,
}) => {
  // States
  const [cardData, setCardData] = useState(initialCardData);

  const handleClose = () => {
    setOpen(false);
    setCardData(initialCardData);
  };

  const onSubmit = () => {
    if (isEdit) {
      onFinsish(id, cardData);
    } else {
      onFinsish(cardData);
    }
    setOpen(false);
    setCardData(initialCardData);
  };

  useEffect(() => {
    setCardData(data ?? initialCardData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        variant="h4"
        className="flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16"
      >
        {data ? "Edit Experience" : "Add Experience"}
        <Typography component="span" className="flex flex-col text-center">
          {data
            ? "Edit your saved Experience details"
            : "Add Experience details"}
        </Typography>
      </DialogTitle>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogContent className="overflow-visible pbs-0 sm:pli-16 sm:pbe-6">
          <IconButton
            onClick={handleClose}
            className="absolute block-start-4 inline-end-4"
          >
            <i className="ri-close-line text-textSecondary" />
          </IconButton>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="company_name"
                label="Company Name"
                placeholder="resumaze"
                value={cardData.company_name}
                onChange={(e) =>
                  setCardData({ ...cardData, company_name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="job_title"
                autoComplete="off"
                label="Job Title"
                placeholder="Full Stack Developer"
                value={cardData.job_title}
                onChange={(e) =>
                  setCardData({ ...cardData, job_title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} className="sm:pbs-6">
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.is_current}
                    onChange={(e) =>
                      setCardData({ ...cardData, is_current: e.target.checked })
                    }
                  />
                }
                label="Are you working currently?"
              />
            </Grid>

            <Grid item xs={12} sm={!cardData.is_current ? 6 : 12}>
              <TextField
                fullWidth
                name="start_date"
                label="Start Date"
                placeholder="MM/DD/YY"
                value={cardData.start_date}
                onChange={(e) =>
                  setCardData({ ...cardData, start_date: e.target.value })
                }
              />
            </Grid>
            {!cardData.is_current && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="end_date"
                  label="End Date"
                  placeholder="MM/DD/YY"
                  value={cardData.end_date}
                  onChange={(e) =>
                    setCardData({ ...cardData, end_date: e.target.value })
                  }
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="location"
                label="Location"
                placeholder="Location"
                value={cardData.location}
                onChange={(e) =>
                  setCardData({ ...cardData, location: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                rows={3}
                multiline
                name="job_description"
                label="Description"
                value={cardData.job_description}
                onChange={(e) =>
                  setCardData({ ...cardData, job_description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
          <Button variant="contained" type="submit" onClick={onSubmit}>
            {data ? "Update" : "Submit"}
          </Button>
          <Button
            variant="outlined"
            type="reset"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExperienceAdd;
