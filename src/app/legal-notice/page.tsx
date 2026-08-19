import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Legal");
  return { title: t("title") };
}

export default async function LegalNoticePage() {
  const t = await getTranslations("Legal");
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>{t("operatedBy")}</p>
        <div>
          <h2 className="font-medium text-foreground">{t("contactHeading")}</h2>
          <p className="mt-2">
            {t("contactIntro")}{" "}
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
