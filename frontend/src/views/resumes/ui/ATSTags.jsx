"use client";
import { useImageVariant } from "@/@core/hooks/useImageVariant";
import Template1 from "@/components/templates/template1";
import resumeFakeData from "@/fake-data/resume-fake-data";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const ATSTags = () => {
  const darkImg = "/images/cards/user-john-dark.png";
  const lightImg = "/images/cards/user-john-light.png";
  const [tags, setTags] = useState([]);
  const [score, setScore] = useState(0);
  // Hooks
  const image = lightImg;

  const { currentResumeData } = useSelector((state) => state.resumesSlice);
  const { iselgforAtsScore } = useSelector((state) => state.CreateResume);

  const generateATSScore = async () => {
    const response = await fetch("/api/atsCalculation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        experiences: currentResumeData?.experience,
        skills: currentResumeData?.skill_set,
        Projects: currentResumeData?.projects,
        Certifications: currentResumeData?.certifications,
      }),
    });

    const data = await response.json();
    try {
      console.log("data : ", data);
      setTags(data?.tags);
      setScore(data?.atsScore)
    } catch (error) {
      console.error("Failed to parse summaries:", error);
    }
  };

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
                Hello <span className="font-bold">John!</span> 🎉
              </Typography>
              <div>
                <Typography>You Got {score}% 😎.</Typography>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Typography variant="body1"> Weak Points : </Typography>
                    {tags.map((team, index) => (
                      <Chip
                        key={index}
                        variant="tonal"
                        label={team}
                        size="small"
                      />
                    ))}
                  </div>
                )}
              </div>

              <Button
                disabled={!iselgforAtsScore}
                variant="contained"
                onClick={() => {
                  generateATSScore();
                }}
              >
                Generate ATS
              </Button>
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

export default ATSTags;
