"use client"

import { GenericDetailPage } from "@/components/crud/generic-detail-page"
import { useTranslation } from "@/hooks/use-translation"
import { fetchStaffById, deleteStaff } from "@/redux/slices/staff-slice"
import type { RootState } from "@/redux/store"
import type { Staff } from "@/services/staff-service"
import { Badge } from "@/components/ui/badge"

export default function StaffDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const { id } = params

  const selector = (state: RootState) => state.staff

  const renderDetails = (staff: Staff) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("firstName")}</h3>
          <p>{staff.firstName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("lastName")}</h3>
          <p>{staff.lastName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("email")}</h3>
          <p>{staff.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("phone")}</h3>
          <p>{staff.phone}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("position")}</h3>
          <p>{staff.position}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("department")}</h3>
          <p>{staff.department}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("hireDate")}</h3>
          <p>{new Date(staff.hireDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t("status")}</h3>
          <Badge
            className={
              staff.status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : staff.status === "On Leave"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }
          >
            {staff.status}
          </Badge>
        </div>
      </div>
    </div>
  )

  return (
    <GenericDetailPage
      title={t("staffDetails")}
      description={t("staffDetailsDescription")}
      entityName={t("staffMember")}
      basePath="/dashboard/staff"
      id={id}
      fetchAction={fetchStaffById}
      deleteAction={deleteStaff}
      selector={selector}
      renderDetails={renderDetails}
      resourceName="staff"
    />
  )
}
