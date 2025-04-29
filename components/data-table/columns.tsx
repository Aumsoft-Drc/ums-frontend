"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/hooks/use-translation"

// Helper function to create sortable header
export function createSortableHeader(label: string, column: string) {
  return ({ column }: { column: any }) => {
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  }
}

// Helper function to create actions column
export function createActionsColumn<T>({
  onView,
  onEdit,
  onDelete,
}: {
  onView?: (data: T) => void
  onEdit?: (data: T) => void
  onDelete?: (data: T) => void
}): ColumnDef<T> {
  const { t } = useTranslation()

  return {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{t("dataTable.openMenu")}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("dataTable.actions")}</DropdownMenuLabel>
            {onView && <DropdownMenuItem onClick={() => onView(data)}>{t("dataTable.view")}</DropdownMenuItem>}
            {onEdit && <DropdownMenuItem onClick={() => onEdit(data)}>{t("dataTable.edit")}</DropdownMenuItem>}
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(data)}>
                  {t("dataTable.delete")}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}

// Helper function to create selection column
export function createSelectionColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}
