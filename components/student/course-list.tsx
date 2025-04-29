import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Book, Users } from "lucide-react"
import Link from "next/link"

interface CourseListProps {
  courses: any[]
}

export default function CourseList({ courses }: CourseListProps) {
  const { t } = useTranslation()

  if (!courses.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">{t("courses.noCourses")}</h3>
        <p className="text-muted-foreground mt-1">{t("courses.enrollMessage")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <Badge>{course.code}</Badge>
            </div>
            <CardDescription>{course.instructor}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Book className="mr-2 h-4 w-4" />
              <span>
                {course.credits} {t("courses.credits")}
              </span>
              <span className="mx-2">•</span>
              <Users className="mr-2 h-4 w-4" />
              <span>
                {course.enrolledStudents} {t("courses.students")}
              </span>
            </div>
            <p className="text-sm mb-4 line-clamp-2">{course.description}</p>
            <Button asChild>
              <Link href={`/student-dashboard/courses/${course.id}`}>{t("courses.viewCourse")}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
