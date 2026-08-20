import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const translation = {
    privacy: await getTranslations("Privacy"),
  };
  return { title: translation.privacy("title") };
}

export default async function PrivacyPolicyPage() {
  const translation = {
    privacy: await getTranslations("Privacy"),
  };
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <p className="font-mono text-xs tracking-widest text-fog uppercase">/privacy</p>
      <h1 className="mt-2 font-mono text-2xl font-semibold tracking-tight">{translation.privacy("title")}</h1>
      <p className="mt-4 text-fog">{translation.privacy("intro")}</p>
      <div className="mt-8 space-y-6 text-fog">
        <div>
          <h2 className="font-mono text-sm font-medium text-paper">{translation.privacy("collectHeading")}</h2>
          <p className="mt-2">{translation.privacy("collectText")}</p>
        </div>
        <div>
          <h2 className="font-mono text-sm font-medium text-paper">{translation.privacy("useHeading")}</h2>
          <p className="mt-2">{translation.privacy("useText")}</p>
        </div>
        <div>
          <h2 className="font-mono text-sm font-medium text-paper">{translation.privacy("cookiesHeading")}</h2>
          <p className="mt-2">{translation.privacy("cookiesText")}</p>
        </div>
        <div>
          <h2 className="font-mono text-sm font-medium text-paper">{translation.privacy("rightsHeading")}</h2>
          <p className="mt-2">
            {translation.privacy("rightsText")}{" "}
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="text-amber hover:underline">
                {contactEmail}
              </a>
            ) : (
              <Link href="/#contact" className="text-amber hover:underline">
                {translation.privacy("contactFormLink")}
              </Link>
            )}
            .
          </p>
        </div>
      </div>
    </section>
  );
}
