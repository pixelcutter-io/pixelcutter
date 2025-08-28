export function dropdown(
	dropdownSelector: string,
	buttonSelector: string,
	menuSelector: string,
	options: {
		openClass?: string;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
	} = {},
) {
	const {
		openClass = "open",
		closeOnEscape = true,
		closeOnOutsideClick = true,
	} = options;

	document.addEventListener("DOMContentLoaded", () => {
		const dropdown = document.querySelector(dropdownSelector);
		const button = dropdown?.querySelector(buttonSelector);
		const menu = dropdown?.querySelector(menuSelector);

		if (!dropdown || !button || !menu) return;

		button.addEventListener("click", (e) => {
			e.preventDefault();
			dropdown.classList.toggle(openClass);
		});

		if (closeOnOutsideClick) {
			document.addEventListener("click", (e) => {
				if (!dropdown.contains(e.target as Node)) {
					dropdown.classList.remove(openClass);
				}
			});
		}

		if (closeOnEscape) {
			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape") {
					dropdown.classList.remove(openClass);
				}
			});
		}
	});
}
