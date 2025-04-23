"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, FileText, Download, Upload, Copy, Trash } from "lucide-react"
import { Toaster, toast } from "sonner"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>("")
  const [fileName, setFileName] = useState<string>("untitled.md")
  const [files, setFiles] = useState<{ name: string; content: string }[]>([])
  const { theme } = useTheme()

  // Load files from localStorage on initial render
  useEffect(() => {
    const savedFiles = localStorage.getItem("markdown-files")
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles))
    }

    // Load last edited file if available
    const lastEdited = localStorage.getItem("last-edited-markdown")
    if (lastEdited) {
      setMarkdown(lastEdited)
    } else {
      setMarkdown(
        "# Welcome to Markdown Editor\n\nThis is a simple markdown editor. Start typing to see the preview.\n\n## Features\n\n- **Bold text**\n- *Italic text*\n- ~~Strikethrough~~\n- [Links](https://example.com)\n- Lists\n  - Nested lists\n- Code blocks\n\n```js\nconsole.log('Hello, world!');\n```\n\n> Blockquotes\n\n| Tables | Are | Cool |\n| ------------- |:-------------:| -----:|\n| col 1 is | left-aligned | $1600 |\n| col 2 is | centered | $12 |\n| col 3 is | right-aligned | $1 |",
      )
    }
  }, [])

  // Save current markdown to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("last-edited-markdown", markdown)
  }, [markdown])

  const saveFile = () => {
    const existingFileIndex = files.findIndex((file) => file.name === fileName)

    if (existingFileIndex >= 0) {
      // Update existing file
      const updatedFiles = [...files]
      updatedFiles[existingFileIndex] = { name: fileName, content: markdown }
      setFiles(updatedFiles)
      localStorage.setItem("markdown-files", JSON.stringify(updatedFiles))
      toast.success("File updated", {
        description: `${fileName} has been updated.`,
      })
    } else {
      // Create new file
      const newFiles = [...files, { name: fileName, content: markdown }]
      setFiles(newFiles)
      localStorage.setItem("markdown-files", JSON.stringify(newFiles))
      toast.success("File saved", {
        description: `${fileName} has been saved.`,
      })
    }
  }

  const loadFile = (index: number) => {
    setFileName(files[index].name)
    setMarkdown(files[index].content)
    toast.info("File loaded", {
      description: `${files[index].name} has been loaded.`,
    })
  }

  const deleteFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    localStorage.setItem("markdown-files", JSON.stringify(newFiles))
    toast.error("File deleted", {
      description: `File has been deleted.`,
    })
  }

  const downloadMarkdown = () => {
    const element = document.createElement("a")
    const file = new Blob([markdown], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = fileName
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown)
    toast.success("Copied to clipboard", {
      description: "Markdown content has been copied to clipboard.",
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setFileName(file.name)
      setMarkdown(content)
      toast.success("File uploaded", {
        description: `${file.name} has been loaded.`,
      })
    }
    reader.readAsText(file)
  }

  return (
    <>
      <div className={`container mx-auto p-4 mt-12 min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Edit Document</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full md:w-48"
                placeholder="Filename.md"
              />
              <Button onClick={saveFile} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={downloadMarkdown} size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={copyToClipboard} size="sm" variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <div className="relative">
                <Button size="sm" variant="outline" asChild>
                  <label>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                    <input type="file" accept=".md,.markdown,.txt" className="sr-only" onChange={handleFileUpload} />
                  </label>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="h-[calc(100vh-250px)]">
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="h-full font-mono resize-none"
                    placeholder="Type your markdown here..."
                  />
                </TabsContent>
                <TabsContent value="preview" className="h-[calc(100vh-250px)] overflow-auto">
                  <div
                    className={`prose max-w-none p-4 border rounded-md h-full ${theme === "dark" ? "prose-invert" : ""}`}
                  >
                    <MarkdownPreview content={markdown} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className={`p-4 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle>Files</CardTitle>
                  <CardDescription>Your saved markdown files</CardDescription>
                </CardHeader>
                <CardContent>
                  {files.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved files yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start w-full"
                            onClick={() => loadFile(index)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            <span className="truncate">{file.name}</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteFile(index)} className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Files are stored in your browser&apos;s local storage.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <Toaster position="top-right" expand={true} richColors />
      </div>
    </>
  )
}

function MarkdownPreview({ content }: { content: string }) {
  const [ReactMarkdown, setReactMarkdown] = useState<any>(null)
  const [remarkGfm, setRemarkGfm] = useState<any>(null)
  const [rehypeHighlight, setRehypeHighlight] = useState<any>(null)

  useEffect(() => {
    // Import the markdown parser dynamically to avoid SSR issues
    const loadDependencies = async () => {
      const [ReactMarkdownModule, remarkGfmModule, rehypeHighlightModule] = await Promise.all([
        import("react-markdown"),
        import("remark-gfm"),
        import("rehype-highlight"),
      ])

      setReactMarkdown(() => ReactMarkdownModule.default)
      setRemarkGfm(() => remarkGfmModule.default)
      setRehypeHighlight(() => rehypeHighlightModule.default)
    }

    loadDependencies()
  }, [])

  if (!ReactMarkdown) {
    return <div className="animate-pulse">Loading markdown renderer...</div>
  }

  return (
    <ReactMarkdown
      remarkPlugins={remarkGfm ? [remarkGfm] : []}
      rehypePlugins={rehypeHighlight ? [rehypeHighlight] : []}
    >
      {content}
    </ReactMarkdown>
  )
}
