import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  /* config options here */
};

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

export default withNextIntl(nextConfig);
