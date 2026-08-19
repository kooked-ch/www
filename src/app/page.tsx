import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";

export default async function Home() {
  const tHero = await getTranslations("Hero");
  const tProjects = await getTranslations("Projects");
  const tContact = await getTranslations("Contact");

  return (
    <>
      <section className="flex flex-1 items-center justify-center px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{tHero("title")}</h1>
          <p className="text-lg text-muted-foreground text-balance">{tHero("description")}</p>
          <Link href="#projects" className={buttonVariants({ size: "lg" })}>
            {tHero("cta")}
          </Link>
        </div>
      </section>

      <section id="projects" className="border-t border-border/60 bg-muted/30 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">{tProjects("heading")}</h2>
            <p className="mt-3 text-muted-foreground">{tProjects("subheading")}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{tProjects(`items.${project.id}.description`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {tProjects("viewProject")}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border/60 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">{tContact("heading")}</h2>
          <p className="mt-3 text-muted-foreground">{tContact("subheading")}</p>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
