// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://pixelcutter.io",
	integrations: [sitemap()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use '@/styles/mixins' as *;`,
				},
			},
		},
	},
});
