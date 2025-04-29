import { useTranslation } from "@/hooks/use-translation"

export default function TermsPage() {
  const { t } = useTranslation()

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">{t("terms.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("terms.lastUpdated")}: January 1, 2025</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>{t("terms.introduction.title")}</h2>
        <p>{t("terms.introduction.content1")}</p>
        <p>{t("terms.introduction.content2")}</p>

        <h2>{t("terms.definitions.title")}</h2>
        <p>{t("terms.definitions.content")}</p>
        <ul>
          <li>
            <strong>{t("terms.definitions.service")}:</strong> {t("terms.definitions.serviceDefinition")}
          </li>
          <li>
            <strong>{t("terms.definitions.user")}:</strong> {t("terms.definitions.userDefinition")}
          </li>
          <li>
            <strong>{t("terms.definitions.account")}:</strong> {t("terms.definitions.accountDefinition")}
          </li>
        </ul>

        <h2>{t("terms.acceptance.title")}</h2>
        <p>{t("terms.acceptance.content1")}</p>
        <p>{t("terms.acceptance.content2")}</p>

        <h2>{t("terms.userAccounts.title")}</h2>
        <p>{t("terms.userAccounts.content1")}</p>
        <p>{t("terms.userAccounts.content2")}</p>
        <p>{t("terms.userAccounts.content3")}</p>

        <h2>{t("terms.intellectualProperty.title")}</h2>
        <p>{t("terms.intellectualProperty.content1")}</p>
        <p>{t("terms.intellectualProperty.content2")}</p>

        <h2>{t("terms.userContent.title")}</h2>
        <p>{t("terms.userContent.content1")}</p>
        <p>{t("terms.userContent.content2")}</p>

        <h2>{t("terms.prohibited.title")}</h2>
        <p>{t("terms.prohibited.content")}</p>
        <ul>
          <li>{t("terms.prohibited.item1")}</li>
          <li>{t("terms.prohibited.item2")}</li>
          <li>{t("terms.prohibited.item3")}</li>
          <li>{t("terms.prohibited.item4")}</li>
          <li>{t("terms.prohibited.item5")}</li>
        </ul>

        <h2>{t("terms.termination.title")}</h2>
        <p>{t("terms.termination.content1")}</p>
        <p>{t("terms.termination.content2")}</p>

        <h2>{t("terms.disclaimer.title")}</h2>
        <p>{t("terms.disclaimer.content1")}</p>
        <p>{t("terms.disclaimer.content2")}</p>

        <h2>{t("terms.limitation.title")}</h2>
        <p>{t("terms.limitation.content1")}</p>
        <p>{t("terms.limitation.content2")}</p>

        <h2>{t("terms.governing.title")}</h2>
        <p>{t("terms.governing.content")}</p>

        <h2>{t("terms.changes.title")}</h2>
        <p>{t("terms.changes.content")}</p>

        <h2>{t("terms.contact.title")}</h2>
        <p>{t("terms.contact.content")}</p>
      </div>
    </div>
  )
}
