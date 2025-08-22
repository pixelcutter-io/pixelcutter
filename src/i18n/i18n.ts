import en from "./langs/en.json";
import it from "./langs/it.json";

export const ui = { en, it } as const;
export const DEFAULT_LANG = "en";
export const LANGUAGES = Object.keys(ui) as Array<keyof typeof ui>;

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return DEFAULT_LANG;
}

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
	if (lang === DEFAULT_LANG) {
		return pathname;
	}
	return `/${lang}${pathname === "/" ? "" : pathname}`;
}

export function getStaticPaths() {
	return [{ params: { lang: "en" } }, { params: { lang: "it" } }];
}
