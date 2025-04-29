"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GenericListPage } from "@/components/crud/generic-list-page"
import { feeTypeActions } from "@/redux/slices/fee-type-slice"
import { useTranslation } from "@/hooks/use-translation"
import { usePermissions } from "@/hooks/use-permissions"

export default function FeeTypesPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasPermission } = usePermissions()
  const { items, loading, error } = useSelector((state: any) => state.feeTypes)

  useEffect(() => {
    dispatch(feeTypeActions.fetchAll())
  }, [dispatch])

  const canCreate = hasPermission("feeTypes:create")
  const canView = hasPermission("feeTypes:view")
  const canEdit = hasPermission("feeTypes:edit")
  const canDelete = hasPermission("feeTypes:delete")

  const columns = [
    { header: t("feeType.name"), accessor: "name" },
    { header: t("feeType.code"), accessor: "code" },
    { header: t("feeType.amount"), accessor: "amount", type: "currency" },
    { header: t("feeType.description"), accessor: "description" },
    { header: t("feeType.isRecurring"), accessor: "isRecurring", type: "boolean" },
    { header: t("feeType.frequency"), accessor: "frequency" },
  ]

  const filters = [
    {
      name: "isRecurring",
      label: t("feeType.isRecurring"),
      type: "select",
      options: [
        { label: t("common.yes"), value: "true" },
        { label: t("common.no"), value: "false" },
      ],
    },
    {
      name: "frequency",
      label: t("feeType.frequency"),
      type: "select",
      options: [
        { label: t("feeType.frequency.once"), value: "once" },
        { label: t("feeType.frequency.monthly"), value: "monthly" },
        { label: t("feeType.frequency.termly"), value: "termly" },
        { label: t("feeType.frequency.yearly"), value: "yearly" },
      ],
    },
  ]

  return (
    <GenericListPage
      title={t("feeType.feeTypes")}
      items={items}
      loading={loading}
      error={error}
      columns={columns}
      filters={filters}
      onView={(id) => canView && router.push(`/dashboard/fee-types/${id}`)}
      onEdit={(id) => canEdit && router.push(`/dashboard/fee-types/${id}/edit`)}
      onDelete={(id) => canDelete && dispatch(feeTypeActions.remove(id))}
      actions={
        canCreate && (
          <Button onClick={() => router.push("/dashboard/fee-types/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("feeType.createFeeType")}
          </Button>
        )
      }
    />
  )
}
