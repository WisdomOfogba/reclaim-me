// components/QuillEditorClient.jsx
"use client"; // This directive is crucial!

import { useEffect, useRef, useState } from "react";
import Quill from "quill"; // Import Quill directly
import "quill/dist/quill.snow.css"; // Import Quill's CSS (choose your theme)

 export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export function EditorUI({
  value,
  onChange,
}: {
  value: string;
  onChange(curValue: string): void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill>(null);
  const [isQuillInitialized, setIsQuillInitialized] = useState(false);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      // Ensure this code only runs on the client
      if (typeof window !== "undefined") {
        quillInstance.current = new Quill(editorRef.current, {
          theme: "snow", // or 'bubble' or your custom theme
          placeholder: "Start typing...",
          modules: {
            // toolbar: toolbarOptions,
          },
        });

        // Set initial content
        if (value) {
          quillInstance.current.setContents(
            quillInstance.current.clipboard.convert({ html: value })
          );
        }

        // Handle content changes
        quillInstance.current.on("text-change", () => {
          onChange(quillInstance.current!.root.innerHTML);
        });

        setIsQuillInitialized(true);
      }
    }

    // Cleanup function
    return () => {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        setIsQuillInitialized(false);
        const editorContainer = editorRef.current;
        if (editorContainer) {
          // Remove Quill's classes if they persist
          editorContainer.classList.forEach((cls) => {
            if (cls.startsWith("ql-")) {
              editorContainer.classList.remove(cls);
            }
          });
          // Optionally, clear the inner HTML to ensure nothing is left
          editorContainer.innerHTML = "";

          // Remove toolbar and other Quill-created elements if they are siblings
          // This is often not necessary if the entire editorRef.current is unmounted by React
          // but can be useful if Quill places elements outside the main ref.
          // For the 'snow' theme, the toolbar is a sibling of the editor div.
          const toolbar = editorContainer.previousElementSibling;
          if (toolbar && toolbar.classList.contains("ql-toolbar")) {
            toolbar.remove();
          }
        }
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Update Quill content if 'value' prop changes, but only after initialization
  useEffect(() => {
    if (
      isQuillInitialized &&
      quillInstance.current &&
      value !== quillInstance.current.root.innerHTML
    ) {
      const selection = quillInstance.current.getSelection(); // Save selection
      quillInstance.current.setContents(
        quillInstance.current.clipboard.convert({ html: value })
      );
      if (selection) {
        // Restore selection
        quillInstance.current.setSelection(selection.index, selection.length);
      }
    }
  }, [value, isQuillInitialized]);

  return (
    <div>
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
}
