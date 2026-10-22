import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// Custom domain. base stays "/" so asset and page paths are not prefixed.
// https://infohaji.naandalist.com
export default defineConfig({
  site: "https://infohaji.naandalist.com",
  output: "static",
  trailingSlash: "always",
  integrations: [tailwind(), react()],
  redirects: {
    "/privacy-policy": "/privacy/",
  },
});
