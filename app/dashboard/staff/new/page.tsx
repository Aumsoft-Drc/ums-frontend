"use client"

import { GenericFormPage } from "@/components/crud/generic-form-page"
import { useTranslation } from "@/hooks/use-translation"
import { createStaff } from "@/redux/slices/staff-slice"
import type { RootState } from "@/redux/store"
import type { Staff } from "@/services/staff-service"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewStaffPage() {
  const { t } = useTranslation()

  const selector = (state: RootState) => state.staff

  const defaultValues: Partial<Staff> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: new Date().toISOString().split("T")[0],
    status: "Active",
  }

  const renderForm = (staff: Partial<Staff>, isNew: boolean) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField name="firstName">
          <FormItem>
            <FormLabel>{t("firstName")}</FormLabel>
            <FormControl>
              <Input defaultValue={staff.firstName} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="lastName">
          <FormItem>
            <FormLabel>{t("lastName")}</FormLabel>
            <FormControl>
              <Input defaultValue={staff.lastName} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email">
          <FormItem>
            <FormLabel>{t("email")}</FormLabel>
            <FormControl>
              <Input type="email" defaultValue={staff.email} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="phone">
          <FormItem>
            <FormLabel>{t("phone")}</FormLabel>
            <FormControl>
              <Input defaultValue={staff.phone} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="position">
          <FormItem>
            <FormLabel>{t("position")}</FormLabel>
            <FormControl>
              <Input defaultValue={staff.position} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="department">
          <FormItem>
            <FormLabel>{t("department")}</FormLabel>
            <FormControl>
              <Input defaultValue={staff.department} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="hireDate">
          <FormItem>
            <FormLabel>{t("hireDate")}</FormLabel>
            <FormControl>
              <Input type="date" defaultValue={staff.hireDate?.split("T")[0]} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="status">
          <FormItem>
            <FormLabel>{t("status")}</FormLabel>
            <Select defaultValue={staff.status || "Active"} name="status">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectStatus")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Active">{t("active")}</SelectItem>
                <SelectItem value="On Leave">{t("onLeave")}</SelectItem>
                <SelectItem value="Inactive">{t("inactive")}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>
  )

  return (
    <GenericFormPage
      title={t("newStaff")}
      description={t("newStaffDescription")}
      entityName={t("staffMember")}
      basePath="/dashboard/staff"
      createAction={createStaff}
      updateAction={() => {}} // Not used for new
      selector={selector}
      renderForm={renderForm}
      resourceName="staff"
      defaultValues={defaultValues}
    />
  )
}
