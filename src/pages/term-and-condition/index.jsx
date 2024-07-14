import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Dynamically import the Editor component
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
);

const TermsAndCondition = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="bg-white flex-1 h-[100%]">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(newState) => setEditorState(newState)}
      />
    </div>
  );
};

export default TermsAndCondition;
