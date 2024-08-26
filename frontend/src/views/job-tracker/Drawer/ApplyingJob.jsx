import TipTapEditor from "@/components/editor/TipTap/Editor";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import Carousel from "react-carousel-mui";
import React from "react";
import theme from "@/@core/theme";
import ResumeChooseCard from "../ui/resumeChooseCard";

const tabAvatars = [
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
  {
    imgWidth: 200,
    imgHeight: 270,
    category: "resumetemp1",
  },
];

const ApplyingJob = ({ handleReset }) => {
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
    content: `
             
            `,
  });

  const srcList = "https://cdn.pixabay.com/photo/2022/01/25/04/42/bird-6965228_1280.jpg "
    .repeat(10)
    .split(" ")
    .slice(0, 10);

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
        <form onSubmit={() => {}} className="flex flex-col gap-5">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Title"
                value={""}
                placeholder="Full Stack Developer"
                onChange={(e) => {}}
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
                <Button variant="contained" onClick={() => {}}>
                  Generate
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default ApplyingJob;
