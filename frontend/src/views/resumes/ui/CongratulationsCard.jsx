"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Drawer,
  Grid,
  Popper,
  Typography,
} from "@mui/material";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { useState } from "react";
import CreateResumeTitle from "./CreateResumeTitleUi";

const CongratulationsCard = () => {
  const darkImg = "/images/cards/user-john-dark.png";
  const lightImg = "/images/cards/user-john-light.png";

  // Hooks
  const image = lightImg;

  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Card className="relative p-10 ">
        <CardContent className="sm:pbe-0">
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              md={8}
              className="flex flex-col items-start gap-4"
            >
              <Typography variant="h4">
                Congratulations <span className="font-bold">John!</span> 🎉
              </Typography>
              <div>
                <Typography>You have done 68% 😎.</Typography>
                <Typography>Check your resume in your profile.</Typography>
              </div>
              <Button variant="contained" onClick={handleClick}>
                Create Resume
              </Button>
              <Popper
                id={id}
                open={open}
                anchorEl={anchor}
                placement="bottom"
                disablePortal
                // modifiers={[
                //   {
                //     name: "offset",
                //     options: {
                //       offset: [0, 8], // Adjust this to control the vertical distance from the button
                //     },
                //   },
                // ]}
                // style={{ transformOrigin: "center top" }}
              >
                <CreateResumeTitle />
              </Popper>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className="max-sm:-order-1 max-sm:flex max-sm:justify-center"
            >
              <img
                alt="Upgrade Account"
                src={image}
                className="max-bs-[186px] sm:absolute block-end-0 inline-end-0 max-is-full"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CongratulationsCard;
