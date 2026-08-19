"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function RouteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const translation = {
    error: useTranslations("Error"),
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{translation.error("title")}</h1>
      <p className="text-muted-foreground">{translation.error("description")}</p>
      <div className="flex gap-3">
        <Button onClick={() => retry()}>{translation.error("retry")}</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          {translation.error("home")}
        </Link>
      </div>
    </section>
  );
}
