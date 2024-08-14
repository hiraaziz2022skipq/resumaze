import React, { useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { Card, CardContent } from "@mui/material";

const RichTextEditor = (props) => {
  const [state, setState] = useState({ editorState: null });

  const save = (data) => {
    console.log(state.getCurrentContent());
  };

  return (
    <>
     
        <CardContent  style={{ height: 500 }} >
          <MUIRichTextEditor
            label="Type something here..."
            onChange={setState}
            onSave={save}
            inlineToolbar={true}
            style={{
            
                fontFamily: "monospace",
                fontSize: 10,
                padding: 10 
              }}
          />
        </CardContent>
      
     
    </>
  );
};


export default RichTextEditor;
