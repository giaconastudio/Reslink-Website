import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // /go/<campaign> is a route handler that redirects to another origin, so the lander buttons
    // must be plain anchors: client routing and prefetch would fetch the redirect as a page.
    files: [
      "src/components/two-week-trial/**",
      "src/components/try-free/**",
      "src/components/free-trial/**",
    ],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
]);

export default eslintConfig;
