// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
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
