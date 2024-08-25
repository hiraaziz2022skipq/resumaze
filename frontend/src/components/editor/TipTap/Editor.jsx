import { Divider } from "@mui/material";
import EditorToolbar from "./Toolbar";
import { EditorContent } from "@tiptap/react";

// Style Imports
import "@/libs/styles/tiptapEditor.css";

const TipTapEditor = ({ editor }) => {
  return (
    <>
      <EditorToolbar editor={editor} />
      <Divider className="mli-5" />
      <EditorContent
        editor={editor}
        className="bs-[300px] overflow-y-auto flex "
      />
    </>
  );
};

export default TipTapEditor;
