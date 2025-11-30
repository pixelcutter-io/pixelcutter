import en from "./langs/en.json";

export const ui = { en } as const;
export const DEFAULT_LANG = "en";
export const LANGUAGES = Object.keys(ui) as Array<keyof typeof ui>;

export function useTranslations(lang: keyof typeof ui) {
	return function t(
		key: keyof (typeof ui)[typeof DEFAULT_LANG],
		params?: Record<string, string | number>,
	) {
		let text = ui[lang]?.[key] || ui[DEFAULT_LANG][key];

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				text = text.replace(new RegExp(`{{${key}}}`, "g"), String(value));
			});
		}

		return text;
	};
}

export function getLocalizedUrl(
	lang: keyof typeof ui,
	pathname: string = "/",
): string {
	const cleanPathname = pathname.replace(
		new RegExp(`^/(${LANGUAGES.join("|")})`),
		"",
	);

	return `/${lang}${cleanPathname}`;
}

export function getStaticPaths() {
	return [{ params: { lang: "en" } }];
}
