import React, { useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { Card, CardContent } from "@mui/material";

const RichTextEditor = ({data , setData}) => {

  const [state, setState] = useState({ editorState: null });


  console.log(state,"----state==")
  const save = (data) => {
    console.log(data)
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
