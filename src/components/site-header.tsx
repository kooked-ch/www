import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/locale-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Kooked
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="#projects"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            {t("projects")}
          </Link>
          <Link
            href="#contact"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            {t("contact")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
