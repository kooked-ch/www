"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { type Locale, locales } from "@/constants/i18n";
import { cn } from "@/lib/utils";
import { setUserLocale } from "@/services/locale";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSelect(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setUserLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onSelect(l)}
          disabled={isPending}
          aria-current={l === locale}
          className={cn(
            "rounded-md px-1.5 py-1 uppercase transition-colors hover:text-foreground disabled:opacity-50",
            l === locale && "text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
