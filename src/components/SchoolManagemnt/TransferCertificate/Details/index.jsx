import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToPdfmake from "html-to-pdfmake";
import jsPDF from "jspdf";

const TCDetails = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ data: { link: e.target.result } });
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const downloadPDF = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlContent = rawContent.blocks.map(block => block.text).join('<br>');
    const pdfContent = htmlToPdfmake(htmlContent);
    const pdfDoc = new jsPDF();
    pdfDoc?.addImage(pdfContent, 'HTML', 15, 15);
    pdfDoc?.save("document.pdf");
  };

  const printContent = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlContent = rawContent.blocks.map(block => block.text).join('<br>');
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.print();
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
        }}
      />
      <button onClick={downloadPDF}>Download PDF</button>
      <button onClick={printContent}>Print</button>
    </div>
  );
};



export default TCDetails