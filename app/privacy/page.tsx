import { useTranslation } from "@/hooks/use-translation"

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("privacy.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("privacy.lastUpdated")}: January 1, 2025</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>{t("privacy.introduction.title")}</h2>
        <p>{t("privacy.introduction.content1")}</p>
        <p>{t("privacy.introduction.content2")}</p>

        <h2>{t("privacy.information.title")}</h2>
        <p>{t("privacy.information.content")}</p>
        <h3>{t("privacy.information.personal.title")}</h3>
        <p>{t("privacy.information.personal.content")}</p>
        <ul>
          <li>{t("privacy.information.personal.item1")}</li>
          <li>{t("privacy.information.personal.item2")}</li>
          <li>{t("privacy.information.personal.item3")}</li>
          <li>{t("privacy.information.personal.item4")}</li>
        </ul>

        <h3>{t("privacy.information.usage.title")}</h3>
        <p>{t("privacy.information.usage.content")}</p>
        <ul>
          <li>{t("privacy.information.usage.item1")}</li>
          <li>{t("privacy.information.usage.item2")}</li>
          <li>{t("privacy.information.usage.item3")}</li>
        </ul>

        <h2>{t("privacy.howWeUse.title")}</h2>
        <p>{t("privacy.howWeUse.content")}</p>
        <ul>
          <li>{t("privacy.howWeUse.item1")}</li>
          <li>{t("privacy.howWeUse.item2")}</li>
          <li>{t("privacy.howWeUse.item3")}</li>
          <li>{t("privacy.howWeUse.item4")}</li>
          <li>{t("privacy.howWeUse.item5")}</li>
        </ul>

        <h2>{t("privacy.sharing.title")}</h2>
        <p>{t("privacy.sharing.content")}</p>
        <ul>
          <li>{t("privacy.sharing.item1")}</li>
          <li>{t("privacy.sharing.item2")}</li>
          <li>{t("privacy.sharing.item3")}</li>
        </ul>

        <h2>{t("privacy.cookies.title")}</h2>
        <p>{t("privacy.cookies.content1")}</p>
        <p>{t("privacy.cookies.content2")}</p>

        <h2>{t("privacy.security.title")}</h2>
        <p>{t("privacy.security.content1")}</p>
        <p>{t("privacy.security.content2")}</p>

        <h2>{t("privacy.dataRetention.title")}</h2>
        <p>{t("privacy.dataRetention.content")}</p>

        <h2>{t("privacy.yourRights.title")}</h2>
        <p>{t("privacy.yourRights.content")}</p>
        <ul>
          <li>{t("privacy.yourRights.item1")}</li>
          <li>{t("privacy.yourRights.item2")}</li>
          <li>{t("privacy.yourRights.item3")}</li>
          <li>{t("privacy.yourRights.item4")}</li>
        </ul>

        <h2>{t("privacy.thirdParty.title")}</h2>
        <p>{t("privacy.thirdParty.content")}</p>

        <h2>{t("privacy.children.title")}</h2>
        <p>{t("privacy.children.content")}</p>

        <h2>{t("privacy.changes.title")}</h2>
        <p>{t("privacy.changes.content")}</p>

        <h2>{t("privacy.contact.title")}</h2>
        <p>{t("privacy.contact.content")}</p>
      </div>
    </div>
  )
}
