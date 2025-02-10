"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/Card"
import { Button } from "./ui/Button"
import { Textarea } from "./ui/Textarea"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { CheckCircle, XCircle, Copy } from "lucide-react"
import { validateSQL, copyToClipboard } from "../utils/helpers"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"

export default function SQLValidator() {
  const [sql, setSQL] = useState("")
  const [validationResult, setValidationResult] = useState(null)

  const handleValidate = () => {
    const result = validateSQL(sql)
    setValidationResult(result)
  }

  const handleCopy = () => {
    copyToClipboard(sql)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Textarea
          placeholder="Enter your SQL query here..."
          value={sql}
          onChange={(e) => setSQL(e.target.value)}
          className="min-h-[200px] font-mono text-sm mb-4"
          style={{ whiteSpace: "pre-wrap" }}
        />
        <div className="flex justify-between mb-4">
          <Button onClick={handleValidate} className="bg-primary text-primary-foreground">
            Validate SQL
          </Button>
          <Button onClick={handleCopy} variant="outline">
            <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
          </Button>
        </div>
        {validationResult && (
          <Alert
            variant={validationResult.isValid ? "default" : "destructive"}
            className={`mb-4 ${validationResult.isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {validationResult.isValid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{validationResult.isValid ? "Valid SQL" : "Invalid SQL"}</AlertTitle>
            <AlertDescription>{validationResult.message}</AlertDescription>
          </Alert>
        )}
        {sql && (
          <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
            <code
              className="language-sql"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(sql, Prism.languages.sql, "sql"),
              }}
            />
          </pre>
        )}
      </CardContent>
    </Card>
  )
}

