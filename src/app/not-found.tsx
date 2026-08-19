import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";

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
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">{translation.notFound("title")}</h1>
      <p className="text-muted-foreground">{translation.notFound("description")}</p>
      <Link href="/" className={buttonVariants()}>
        {translation.notFound("cta")}
      </Link>
    </section>
  );
}
