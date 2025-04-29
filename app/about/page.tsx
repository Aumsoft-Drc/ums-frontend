import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("about.title")}</h1>
      <p className="text-xl text-muted-foreground mb-10">{t("about.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>{t("about.mission.title")}</CardTitle>
            <CardDescription>{t("about.mission.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t("about.mission.description1")}</p>
            <p>{t("about.mission.description2")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("about.vision.title")}</CardTitle>
            <CardDescription>{t("about.vision.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t("about.vision.description1")}</p>
            <p>{t("about.vision.description2")}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mb-6">{t("about.history.title")}</h2>
      <div className="mb-12">
        <p className="mb-4">{t("about.history.description1")}</p>
        <p className="mb-4">{t("about.history.description2")}</p>
        <p>{t("about.history.description3")}</p>
      </div>

      <h2 className="text-3xl font-bold mb-6">{t("about.leadership.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{t(`about.leadership.member${i}.name`)}</CardTitle>
              <CardDescription>{t(`about.leadership.member${i}.position`)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t(`about.leadership.member${i}.bio`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6">{t("about.contact.title")}</h2>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("about.contact.address.title")}</h3>
              <p className="mb-1">{t("about.contact.address.line1")}</p>
              <p className="mb-1">{t("about.contact.address.line2")}</p>
              <p>{t("about.contact.address.line3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("about.contact.connect.title")}</h3>
              <p className="mb-1">
                <strong>{t("about.contact.connect.email")}:</strong> info@university.edu
              </p>
              <p className="mb-1">
                <strong>{t("about.contact.connect.phone")}:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>{t("about.contact.connect.fax")}:</strong> +1 (555) 123-4568
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
