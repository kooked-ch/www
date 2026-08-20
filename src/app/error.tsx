"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function RouteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const translation = {
    error: useTranslations("Error"),
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="font-mono text-2xl font-semibold tracking-tight">{translation.error("title")}</h1>
      <p className="text-fog">{translation.error("description")}</p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="border border-amber px-4 py-2 font-mono text-sm text-amber transition-colors hover:bg-amber hover:text-ink"
        >
          &gt; {translation.error("retry")}
        </button>
        <Link
          href="/"
          className="border border-line px-4 py-2 font-mono text-sm text-fog transition-colors hover:border-fog hover:text-paper"
        >
          {translation.error("home")}
        </Link>
      </div>
    </section>
  );
}
