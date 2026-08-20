import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/switcher";

export async function SiteHeader() {
  const translation = {
    nav: await getTranslations("Nav"),
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-[0.2em] text-paper uppercase">
          Kooked
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#projects"
            className="hidden font-mono text-xs tracking-wide text-fog uppercase transition-colors hover:text-amber sm:inline"
          >
            {translation.nav("projects")}
          </Link>
          <Link
            href="/#contact"
            className="hidden font-mono text-xs tracking-wide text-fog uppercase transition-colors hover:text-amber sm:inline"
          >
            {translation.nav("contact")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
