"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Edit3, Eye, Copy, Download, Check } from "lucide-react"
import { useToast } from "@/lib/hooks/use-toast"

export interface Document {
  id: string
  type: string
  title: string
  content: string
  createdAt: Date
}

export default function ComplainLetter({ SAMPLE_DOCUMENTS }: { SAMPLE_DOCUMENTS: Document[] }) {
  const [documents] = useState<Document[]>(SAMPLE_DOCUMENTS)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [editorContent, setEditorContent] = useState<string>(documents[0]?.content || "")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const selectDocument = (document: Document) => {
    setSelectedDocument(document)
    setEditorContent(document.content)
  }

  const updateEditorContent = (content: string) => {
    setEditorContent(content)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editorContent)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Document content has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadDocument = () => {
    const blob = new Blob([editorContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedDocument?.title.replace(/\s+/g, "_").toLowerCase() || "document"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download started",
      description: "Your document is being downloaded.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-900">Complaint Generated</h1>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
            Documents ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedDocument?.id === document.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => selectDocument(document)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">{document.title}</h3>
                        {/* <p className="text-sm text-gray-500">
                          Created {document.createdAt.toLocaleDateString()} at {document.createdAt.toLocaleTimeString()}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
         {/* Editor and Preview Section */}
        {selectedDocument && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    Editor
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard} className="flex items-center gap-2">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={downloadDocument} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editorContent}
                  onChange={(e) => updateEditorContent(e.target.value)}
                  placeholder="Start editing your document..."
                  className="min-h-[500px] text-sm break-words"
                />
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 min-h-[500px] shadow-sm">
                  <ScrollArea className="h-[500px]">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {editorContent || "Select a document to preview..."}
                    </pre>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
