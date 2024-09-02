"use client";
import { useImageVariant } from "@/@core/hooks/useImageVariant";
import Template1 from "@/components/templates/template1";
import resumeFakeData from "@/fake-data/resume-fake-data";
import { Button, Card, CardContent, Drawer, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [open , setOpen] = useState(false)
  

  const darkImg = '/images/cards/user-john-dark.png'
  const lightImg = '/images/cards/user-john-light.png'

  // Hooks
  const image = lightImg 

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
              <Button variant="contained" onClick={()=>{
                
              }}>View Resume</Button>
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
      {/* <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={()=>{
        setOpen(false)
      }}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 700 } } }}
    > 
    <Template1 resumeData={resumeFakeData}/>
    </Drawer> */}
    </>
  );
};

export default HomePage;
