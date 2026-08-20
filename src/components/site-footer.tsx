import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const translation = {
    footer: await getTranslations("Footer"),
  };
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 font-mono text-xs text-fog sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p>
          &copy; {year} kooked.ch — {translation.footer("rights")}
        </p>
        <nav className="flex gap-4 uppercase">
          <Link href="/legal-notice" className="transition-colors hover:text-amber">
            {translation.footer("legalNotice")}
          </Link>
          <Link href="/privacy-policy" className="transition-colors hover:text-amber">
            {translation.footer("privacyPolicy")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
