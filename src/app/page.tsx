import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const t = await getTranslations("Hero");

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{t("title")}</h1>
        <p className="text-lg text-muted-foreground text-balance">{t("description")}</p>
        <Link href="#projects" className={buttonVariants({ size: "lg" })}>
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
