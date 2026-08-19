# kooked.ch

The [kooked.ch](https://kooked.ch) landing page — a bilingual (FR/EN) showcase of the apps and services Kooked designs and self-hosts, plus a contact form.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, [Base UI](https://base-ui.com) primitives)
- [next-intl](https://next-intl.dev) for French/English content, cookie-based (no URL locale prefix)
- [Biome](https://biomejs.dev) for linting and formatting
- [Bun](https://bun.sh) for package management
- Docker, built and published to GHCR on every push to `main` (see `.github/workflows`)

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env` and fill in the SMTP credentials to test the contact form locally:

```bash
cp .env.example .env
```

## Scripts

- `bun run dev` — start the dev server
- `bun run build` — production build
- `bun run lint` — Biome check
- `bun run format` — Biome format (writes)

## Docker

```bash
docker build -t kooked-www .
docker run -p 3000:3000 --env-file .env kooked-www
```

Dependencies are installed with Bun, but the Next.js build and the standalone server both run under Node.js — Bun's CommonJS loader currently can't load Next 16's Turbopack-compiled server runtime.
