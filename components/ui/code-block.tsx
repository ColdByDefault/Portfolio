"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from 'next-themes'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export default function CodeBlock({ code, language = "tsx", showLineNumbers = true, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const copyToClipboard = async () => {
    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      }
      // Fallback for mobile browsers
      const textArea = document.createElement("textarea")
      textArea.value = code
      textArea.style.position = "fixed" // Avoid scrolling to bottom
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        console.error("Fallback: Unable to copy")
      }
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }
  const lines = code.trim().split("\n")
  const lineNumbersWidth = String(lines.length).length * 0.6 + 1.2 + "rem"

  return (
        <div className={`p-3 rounded-md mt-2 overflow-x-auto w-[75vw] border-b-1 border-zinc-600 ${theme === 'dark' ? 'dark' : 'light'}`}>
            <div className={`flex items-center justify-between px-4 py-2 ${theme === 'dark' ? 'bg-gray-400/20' : 'bg-gray-200'}`}>
                <div className="text-xs font-medium">{language}</div>
                <button
                onClick={copyToClipboard}
                className="flex items-center justify-center h-8 w-8 rounded-md"
                aria-label="Copy code to clipboard"
                >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>
            <pre className={cn("p-4 overflow-x-auto text-sm", showLineNumbers && "pl-0")}>
                {showLineNumbers ? (
                <div className="table min-w-full">
                    {lines.map((line, i) => (
                    <div key={i} className="table-row">
                        <span
                        className="table-cell text-right pr-4 select-none "
                        style={{ width: lineNumbersWidth }}
                        >
                        {i + 1}
                        </span>
                        <code className="table-cell text-[12px] lg:text-sm">{line}</code>
                    </div>
                    ))}
                </div>
                ) : (
                <code>{code}</code>
                )}
            </pre>
        </div>
  )
}

