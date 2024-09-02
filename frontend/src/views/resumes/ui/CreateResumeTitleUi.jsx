import { createResumeService } from "@/redux/create-resume/service";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateResume } from "@/redux/resumes/slice";
import { useDispatch } from "react-redux";

const CreateResumeTitle = () => {
  const [resumeTitle, setResumeTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateTitle = () => {
    setIsSubmit(true);
    createResumeService({ title: resumeTitle, user_id: 15 }).then((res) => {
      if (res.status === 201) {
        const { id } = res.data;
        if (id) {
          dispatch(
            updateResume({
              resumeId: id,
              singleObj: {},
            })
          );
          router.push(`/resumes/create-resume/${id}`);
        }
      }
    });
  };
  return (
    <Card
      style={{
        zIndex: 1000, // Higher z-index value to bring the card on top
        position: "relative", // Ensure the card respects z-index
        boxShadow: "0px 3px 5px rgba(0,0,0,0.2)", // Add shadow for better visibility
      }}
    >
      <CardContent className="mbe-5">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              size="small"
              label="Title"
              value={resumeTitle}
              placeholder="Doe"
              onChange={(e) => {
                setResumeTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              disabled={isSubmit || resumeTitle.trim() === ""}
              variant="contained"
              onClick={handleCreateTitle}
            >
              {isSubmit && (
                <CircularProgress
                  color="success"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "2px",
                  }}
                />
              )}
              <span>Create</span>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreateResumeTitle;
