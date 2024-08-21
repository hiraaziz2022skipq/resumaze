import React, { useEffect, useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { CardContent } from "@mui/material";
import { convertFromHTML, convertToRaw, ContentState, EditorState } from 'draft-js';

const RichTextEditor = ({ data }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  useEffect(() => {
    if (data) {
      // Convert HTML or plain text to editor state
      let contentState;
      if (data.includes('<')) { // Assuming HTML if the data contains tags
        const blocksFromHTML = convertFromHTML(data);
        contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
      } else {
        contentState = ContentState.createFromText(data);
      }
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [data]);

  const simulateTyping = (content) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setEditorState(EditorState.push(
          editorState,
          ContentState.createFromText(content.slice(0, currentIndex + 1)),
          'insert-characters'
        ));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust typing speed here
  };

  useEffect(() => {
    if (data && !data.includes('<')) {
      simulateTyping(data);
    }
  }, [data]);

  console.log(data,"sdfdsd")
  console.log(editorState,"sdfsd")
  return (
    <CardContent style={{ height: 500 }}>
      <MUIRichTextEditor
        label="Type something here..."
        onChange={(state) => setEditorState(state)}
        editorState={editorState}
        inlineToolbar={true}
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          padding: 10
        }}
      />
    </CardContent>
  );
};

export default RichTextEditor;
