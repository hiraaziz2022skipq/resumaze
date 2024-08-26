import TipTapEditor from "@/components/editor/TipTap/Editor";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";

const JobCoverLetter = () => {
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

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12}>
        <Card className="p-0 border shadow-none">
          <CardContent className="p-0">
            <TipTapEditor editor={editor} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Grid container spacing={2} sx={{ p: 2, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 1 }}
            onClick={() => {}}
          >
            Save
          </Button>
          <Button variant="contained" onClick={() => {}}>
            Download
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobCoverLetter;
