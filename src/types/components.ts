export type SizeType =
	| "dc"
	| "nn"
	| "eg"
	| "sp"
	| "st"
	| "qt"
	| "qr"
	| "tr"
	| "big"
	| "db"
	| "xxl"
	| "xl"
	| "lg"
	| "df"
	| "md"
	| "sm"
	| "xs"
	| "xxs"
	| "us"
	| "uxs"
	| "uxxs";

export type ColorType = "primary" | "secondary" | "accent";

export type IconPositionType = "before" | "after";

export type AlignType = "left" | "center" | "right";

export type HtmlTagType =
	| "article"
	| "aside"
	| "div"
	| "footer"
	| "form"
	| "header"
	| "section"
	| "nav"
	| "ul";

export type MaxWidth = Extract<SizeType, "df" | "sm" | "xs" | "xxs">;

// Button
export type ButtonThemeType = "fill" | "ghost" | "text";
export type ButtonSizeType = Extract<
	SizeType,
	"tr" | "big" | "db" | "xxl" | "df"
>;

// Typo
export type TypoTagType = "h1" | "h2" | "h3" | "h4" | "p" | "label" | "span";
export type TypoSizeType = Exclude<SizeType, "us" | "uxs" | "uxxs">;
export type TypoWeightType = "regular" | "medium" | "semi" | "bold" | "black";
export type TypoLineHeightType = "default" | "paragraph";
export type TypoAlignType = AlignType;
