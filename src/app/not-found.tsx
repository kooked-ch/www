import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const translation = {
    notFound: await getTranslations("NotFound"),
  };
  return { title: translation.notFound("title") };
}

export default async function NotFound() {
  const translation = {
    notFound: await getTranslations("NotFound"),
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="font-mono text-sm text-amber">404</p>
      <h1 className="font-mono text-2xl font-semibold tracking-tight">{translation.notFound("title")}</h1>
      <p className="text-fog">{translation.notFound("description")}</p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 border border-amber px-4 py-2 font-mono text-sm text-amber transition-colors hover:bg-amber hover:text-ink"
      >
        &gt; {translation.notFound("cta")}
      </Link>
    </section>
  );
}
