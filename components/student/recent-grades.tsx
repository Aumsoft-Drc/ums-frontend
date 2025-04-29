"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { gradeService } from "@/services/grade-service"

export default function RecentGrades() {
  const { t } = useTranslation()
  const [grades, setGrades] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await gradeService.getRecentGrades()
        setGrades(data)
      } catch (error) {
        console.error("Failed to fetch grades:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrades()
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!grades.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">{t("grades.noGrades")}</h3>
        <p className="text-muted-foreground mt-1">{t("grades.checkLater")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {grades.map((grade) => (
        <Card key={grade.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{grade.title}</CardTitle>
            <CardDescription>
              {grade.course.name} ({grade.course.code})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">{t("grades.score")}</span>
              <span className="font-medium">
                {grade.score}/{grade.maxScore} ({calculatePercentage(grade.score, grade.maxScore)}%)
              </span>
            </div>
            <Progress value={calculatePercentage(grade.score, grade.maxScore)} className="h-2" />
            {grade.feedback && (
              <div className="mt-4">
                <span className="text-sm text-muted-foreground">{t("grades.feedback")}</span>
                <p className="text-sm mt-1">{grade.feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function calculatePercentage(score: number, maxScore: number) {
  return Math.round((score / maxScore) * 100)
}
