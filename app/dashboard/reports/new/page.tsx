"use client"

import Quill from "quill/core";
import { Parchment } from "quill/core";
import { useEffect, useRef, useState } from "react";

import "quill/dist/quill.snow.css";

const registry = new Parchment.Registry()

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

export default function NewReportPage() {
  // const [quill, setQuill] = useState();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current === null) return;
    const quill = new Quill(editorRef.current, {
       modules: {
        toolbar: toolbarOptions
       },
       theme: "snow",
       registry: registry
    });

    return () => {
      quill.disable()
    };
  }, []);

  return (
 <>
  <div id="toolbar">
  <select className="ql-size" defaultValue="">
    <option value="small"></option>
  
    <option value="large"></option>
    <option value="huge"></option>
  </select>
  
  <button className="ql-bold"></button>
  <button className="ql-script" value="sub"></button>
  <button className="ql-script" value="super"></button>
</div>

  <div ref={editorRef}></div>
 </> 
  );
}
