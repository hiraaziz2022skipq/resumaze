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
  name: "",
  email: "",
  phone: "",
  relationship: "",
};

const ReferenceAdd = ({
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
        {data ? "Edit Reference" : "Add Reference"}
        <Typography component="span" className="flex flex-col text-center">
          {data ? "Edit your saved Reference details" : "Add Reference details"}
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
                name="name"
                label="Name"
                placeholder="John"
                value={cardData.name}
                onChange={(e) =>
                  setCardData({ ...cardData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                placeholder="email"
                value={cardData.email}
                onChange={(e) =>
                  setCardData({ ...cardData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                placeholder="+1 (234) 567-8901"
                value={cardData.phone}
                onChange={(e) =>
                  setCardData({ ...cardData, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="relationship"
                label="Relationship"
                placeholder="Brother"
                value={cardData.relationship}
                onChange={(e) =>
                  setCardData({ ...cardData, relationship: e.target.value })
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

export default ReferenceAdd;
