import TipTapEditor from "@/components/editor/TipTap/Editor";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import React, { useState } from "react";
import { createJobApplication } from "@/redux/job-tracker/action";

import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const ApplyingJob = ({ handleReset }) => {
  const [title, setTitle] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const dispatch = useDispatch();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something here...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    content: "",
  });

  const handleSubmit = async (e) => {
    setIsSubmiting(true);
    e.preventDefault();

    const payload = {
      title,
      job_description: editor.getHTML(),
      user_id: 15,
    };

    console.log(payload, "==payload===");
    try {
      const response = await dispatch(createJobApplication(payload));

      console.log(response, "===response==");
      if (response) {
        setIsSubmiting(false);
        handleReset();
      } else {
        setIsSubmiting(false); 
      }

      
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pli-5 plb-4">
        <Typography variant="h5">Apply for External Job</Typography>
        <IconButton size="small" onClick={handleReset}>
          <i className="ri-close-line text-2xl" />
        </IconButton>
      </div>
      <Divider />
      <div className="p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                placeholder="Full Stack Developer"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card className="p-0 border shadow-none">
                <CardContent className="p-0">
                  <TipTapEditor editor={editor} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: "right" }}>
                <Button
                  disabled={isSubmiting}
                  variant="contained"
                  type="submit"
                >
                  {isSubmiting && (
                    <CircularProgress
                      color="success"
                        style={{
                            width:"20px",
                            height:"20px",
                            marginRight:"2px"
                        }}
                    />
                  )}
                  <span>Save</span>
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default ApplyingJob;
