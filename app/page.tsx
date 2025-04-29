import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{t("home.title")}</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">{t("home.subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/login">{t("common.login")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">{t("common.learnMore")}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>{t("home.features.students.title")}</CardTitle>
            <CardDescription>{t("home.features.students.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t("home.features.students.item1")}</li>
              <li>{t("home.features.students.item2")}</li>
              <li>{t("home.features.students.item3")}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/student-portal">{t("common.explore")}</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("home.features.faculty.title")}</CardTitle>
            <CardDescription>{t("home.features.faculty.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t("home.features.faculty.item1")}</li>
              <li>{t("home.features.faculty.item2")}</li>
              <li>{t("home.features.faculty.item3")}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/faculty-portal">{t("common.explore")}</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("home.features.admin.title")}</CardTitle>
            <CardDescription>{t("home.features.admin.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t("home.features.admin.item1")}</li>
              <li>{t("home.features.admin.item2")}</li>
              <li>{t("home.features.admin.item3")}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/admin-portal">{t("common.explore")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
