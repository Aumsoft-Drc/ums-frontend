"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { scheduleService } from "@/services/schedule-service"

export default function ScheduleView() {
  const { t } = useTranslation()
  const [schedule, setSchedule] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await scheduleService.getStudentSchedule()
        setSchedule(data)
      } catch (error) {
        console.error("Failed to fetch schedule:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedule()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  return (
    <div>
      <Tabs defaultValue="monday">
        <TabsList className="mb-4">
          {weekdays.map((day) => (
            <TabsTrigger key={day} value={day}>
              {t(`schedule.days.${day}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {weekdays.map((day) => (
          <TabsContent key={day} value={day}>
            {schedule[day]?.length ? (
              <div className="space-y-4">
                {schedule[day].map((session: any) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{session.course.name}</CardTitle>
                      <CardDescription>{session.course.code}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{t("schedule.time")}</p>
                          <p>
                            {session.startTime} - {session.endTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t("schedule.location")}</p>
                          <p>{session.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t("schedule.instructor")}</p>
                          <p>{session.instructor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t("schedule.type")}</p>
                          <p>{session.type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">{t("schedule.noClasses")}</h3>
                <p className="text-muted-foreground mt-1">
                  {t("schedule.noClassesForDay", { day: t(`schedule.days.${day}`) })}
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
