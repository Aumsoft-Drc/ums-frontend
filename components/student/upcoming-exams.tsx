"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, MapPin } from "lucide-react"
import { examService } from "@/services/exam-service"

export default function UpcomingExams() {
  const { t } = useTranslation()
  const [exams, setExams] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await examService.getUpcomingExams()
        setExams(data)
      } catch (error) {
        console.error("Failed to fetch exams:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExams()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!exams.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">{t("exams.noUpcoming")}</h3>
        <p className="text-muted-foreground mt-1">{t("exams.checkLater")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <Card key={exam.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{exam.title}</CardTitle>
              <Badge variant={getExamBadgeVariant(exam.type)}>{exam.type}</Badge>
            </div>
            <CardDescription>
              {exam.course.name} ({exam.course.code})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{new Date(exam.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {exam.startTime} - {exam.endTime}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{exam.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getExamBadgeVariant(type: string) {
  switch (type.toLowerCase()) {
    case "final":
      return "destructive"
    case "midterm":
      return "warning"
    case "quiz":
      return "secondary"
    default:
      return "default"
  }
}
