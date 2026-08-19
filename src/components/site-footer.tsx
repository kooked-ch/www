import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const translation = {
    footer: await getTranslations("Footer"),
  };
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p>
          &copy; {year} Kooked.ch — {translation.footer("rights")}
        </p>
        <nav className="flex gap-4">
          <Link href="/legal-notice" className="hover:text-foreground hover:underline underline-offset-4">
            {translation.footer("legalNotice")}
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground hover:underline underline-offset-4">
            {translation.footer("privacyPolicy")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
