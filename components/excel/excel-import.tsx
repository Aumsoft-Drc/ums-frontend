"use client"

import type React from "react"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface ExcelImportProps {
  onDataImported: (data: any[]) => void
  buttonText?: string
  className?: string
}

export function ExcelImport({ onDataImported, buttonText, className }: ExcelImportProps) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsLoading(true)
    const file = files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const wb = XLSX.read(event.target?.result, { type: "binary" })
        const sheetName = wb.SheetNames[0]
        const sheet = wb.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet)
        onDataImported(data)
      } catch (error) {
        console.error("Error importing Excel file:", error)
      } finally {
        setIsLoading(false)
      }
    }

    reader.readAsBinaryString(file)
  }

  return (
    <>
      <input type="file" id="excel-import" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleImport} />
      <Button
        variant="outline"
        className={className}
        onClick={() => document.getElementById("excel-import")?.click()}
        disabled={isLoading}
      >
        <Upload className="mr-2 h-4 w-4" />
        {buttonText || t("excel.import")}
      </Button>
    </>
  )
}
