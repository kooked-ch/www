import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const translation = {
    legal: await getTranslations("Legal"),
  };
  return { title: translation.legal("title") };
}

export default async function LegalNoticePage() {
  const translation = {
    legal: await getTranslations("Legal"),
  };
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <p className="font-mono text-xs tracking-widest text-fog uppercase">/legal</p>
      <h1 className="mt-2 font-mono text-2xl font-semibold tracking-tight">{translation.legal("title")}</h1>
      <div className="mt-8 space-y-6 text-fog">
        <p>{translation.legal("operatedBy")}</p>
        <div>
          <h2 className="font-mono text-sm font-medium text-paper">{translation.legal("contactHeading")}</h2>
          <p className="mt-2">
            {translation.legal("contactIntro")}{" "}
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="text-amber hover:underline">
                {contactEmail}
              </a>
            ) : (
              <Link href="/#contact" className="text-amber hover:underline">
                {translation.legal("contactFormLink")}
              </Link>
            )}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
