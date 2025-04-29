import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="font-bold text-lg">
            UMS
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
        <div className="flex gap-4 md:gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            {t("footer.terms")}
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            {t("footer.privacy")}
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            {t("footer.contact")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
