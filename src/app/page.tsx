import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/form";
import { HeroScene } from "@/components/scene";
import { projects } from "@/data/projects";

export default async function Home() {
  const translation = {
    hero: await getTranslations("Hero"),
    projects: await getTranslations("Projects"),
    contact: await getTranslations("Contact"),
  };

  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-line">
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            maskImage: "radial-gradient(60% 60% at 65% 45%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(60% 60% at 65% 45%, black 40%, transparent 90%)",
          }}
        >
          <HeroScene />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-6">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs tracking-widest text-fog uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
              </span>
              {projects.length} services online
            </div>
            <h1 className="font-mono text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
              {translation.hero("title")}
            </h1>
            <p className="mt-5 max-w-md text-base text-fog text-balance">{translation.hero("description")}</p>
            <Link
              href="#projects"
              className="mt-8 inline-flex items-center gap-2 border border-amber px-4 py-2 font-mono text-sm text-amber transition-colors hover:bg-amber hover:text-ink"
            >
              &gt; {translation.hero("cta")}
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" className="border-b border-line px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs tracking-widest text-fog uppercase">/services</p>
          <h2 className="mt-2 font-mono text-2xl font-semibold tracking-tight">{translation.projects("heading")}</h2>
          <p className="mt-3 max-w-xl text-fog">{translation.projects("subheading")}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {projects.map((project) => {
              const host = new URL(project.link).host;
              return (
                <li key={project.id}>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 border-l-2 border-transparent px-4 py-5 transition-colors hover:border-amber hover:bg-panel/50 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <span className="flex shrink-0 items-center gap-3 sm:w-56">
                      <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                      <span className="font-mono text-sm text-paper">{project.title}</span>
                    </span>
                    <span className="flex-1 text-sm text-fog">
                      {translation.projects(`items.${project.id}.description`)}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-fog">
                      {host}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="contact" className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-lg">
          <p className="font-mono text-xs tracking-widest text-fog uppercase">/contact</p>
          <h2 className="mt-2 font-mono text-2xl font-semibold tracking-tight">{translation.contact("heading")}</h2>
          <p className="mt-3 text-fog">{translation.contact("subheading")}</p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
