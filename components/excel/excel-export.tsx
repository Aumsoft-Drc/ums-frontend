"use client"

import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface ExcelExportProps<T> {
  data: T[]
  filename?: string
  sheetName?: string
  buttonText?: string
  className?: string
}

export function ExcelExport<T>({
  data,
  filename = "export",
  sheetName = "Sheet1",
  buttonText,
  className,
}: ExcelExportProps<T>) {
  const { t } = useTranslation()

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  return (
    <Button onClick={handleExport} variant="outline" className={className}>
      <Download className="mr-2 h-4 w-4" />
      {buttonText || t("excel.export")}
    </Button>
  )
}
