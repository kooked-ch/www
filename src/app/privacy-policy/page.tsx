import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("Privacy");
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-muted-foreground">{t("intro")}</p>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <div>
          <h2 className="font-medium text-foreground">{t("collectHeading")}</h2>
          <p className="mt-2">{t("collectText")}</p>
        </div>
        <div>
          <h2 className="font-medium text-foreground">{t("useHeading")}</h2>
          <p className="mt-2">{t("useText")}</p>
        </div>
        <div>
          <h2 className="font-medium text-foreground">{t("cookiesHeading")}</h2>
          <p className="mt-2">{t("cookiesText")}</p>
        </div>
        <div>
          <h2 className="font-medium text-foreground">{t("rightsHeading")}</h2>
          <p className="mt-2">
            {t("rightsText")}{" "}
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                {contactEmail}
              </a>
            ) : (
              <Link href="/#contact" className="text-primary hover:underline">
                {t("contactFormLink")}
              </Link>
            )}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
