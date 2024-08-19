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
  project_name: "",
  project_description: "",
  start_date: "",
  end_date: "",
};

const ProjectAdd = ({
  open,
  setOpen,
  data,
  onFinsish,
  index,
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
      onFinsish(index, cardData);
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
        {data ? "Edit Project" : "Add Project"}
        <Typography component="span" className="flex flex-col text-center">
          {data
            ? "Edit your saved Project details"
            : "Add Project details"}
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
                name="project_name"
                label="Project Name"
                placeholder="resumaze"
                value={cardData.project_name}
                onChange={(e) =>
                  setCardData({ ...cardData, project_name: e.target.value })
                }
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

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                rows={3}
                multiline
                name="project_description"
                label="Description"
                value={cardData.job_description}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    project_description: e.target.value,
                  })
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

export default ProjectAdd;
