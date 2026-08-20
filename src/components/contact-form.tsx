"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

type FormData = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof FormData, boolean>> & { form?: boolean };

const fieldClassName =
  "rounded-none border-0 border-b border-line bg-transparent px-0 py-2 font-mono text-sm text-paper placeholder:text-fog/60 focus-visible:border-amber focus-visible:ring-0 dark:bg-transparent dark:disabled:bg-transparent";

export function ContactForm() {
  const translation = {
    contact: useTranslations("Contact"),
  };
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof FormData] = true;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("idle");
      setErrors({ form: true });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name" className="font-mono text-xs tracking-wide text-fog uppercase">
          {translation.contact("name")}_
        </Label>
        <Input
          id="name"
          placeholder={translation.contact("namePlaceholder")}
          value={formData.name}
          onChange={handleChange}
          aria-invalid={errors.name}
          className={fieldClassName}
        />
        {errors.name && <p className="font-mono text-xs text-destructive">{translation.contact("errors.name")}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="font-mono text-xs tracking-wide text-fog uppercase">
          {translation.contact("email")}_
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={translation.contact("emailPlaceholder")}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={errors.email}
          className={fieldClassName}
        />
        {errors.email && <p className="font-mono text-xs text-destructive">{translation.contact("errors.email")}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message" className="font-mono text-xs tracking-wide text-fog uppercase">
          {translation.contact("message")}_
        </Label>
        <Textarea
          id="message"
          placeholder={translation.contact("messagePlaceholder")}
          className={`min-h-28 resize-none ${fieldClassName}`}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={errors.message}
        />
        {errors.message && (
          <p className="font-mono text-xs text-destructive">{translation.contact("errors.message")}</p>
        )}
      </div>
      {errors.form && <p className="font-mono text-xs text-destructive">{translation.contact("genericError")}</p>}
      {status === "success" && <p className="font-mono text-xs text-amber">{translation.contact("success")}</p>}
      <Button
        type="submit"
        disabled={status === "sending"}
        variant="outline"
        className="mt-2 h-10 w-full rounded-none border-amber bg-transparent font-mono text-sm text-amber hover:bg-amber hover:text-ink dark:border-amber dark:bg-transparent dark:hover:bg-amber dark:hover:text-ink"
      >
        {status === "sending" ? translation.contact("sending") : `> ${translation.contact("submit")}`}
      </Button>
    </form>
  );
}
