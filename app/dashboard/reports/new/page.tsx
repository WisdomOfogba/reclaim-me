"use client"

import dynamic from "next/dynamic";
import { useCallback } from "react";

const EditorUI = dynamic(
  () => import("@/components/editor-ui").then(({ EditorUI }) => EditorUI),
  { ssr: false } // This is the key!
);

export default function NewReportPage() {
  // const onChange = useCallback(()=>{}, [])

  return 
}
