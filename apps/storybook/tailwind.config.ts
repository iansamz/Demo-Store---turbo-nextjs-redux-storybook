import type { Config } from "tailwindcss";
import defaultConfig from "@repo/ui/tailwind.config";

const config: Config = {
  ...defaultConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,jsx,ts,tsx}",
    "../test-store/src/components/**/*.{js,jsx,ts,tsx}",
  ],
};
export default config;
