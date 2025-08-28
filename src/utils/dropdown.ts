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
			const isOpen = dropdown.classList.toggle(openClass);

			if (isOpen) {
				// Spostare il focus sul menu quando aperto
				(menu as HTMLElement).focus();
			}
		});

		if (closeOnOutsideClick) {
			document.addEventListener("click", (e) => {
				if (!dropdown.contains(e.target as Node)) {
					if (dropdown.classList.contains(openClass)) {
						dropdown.classList.remove(openClass);
						// Riportare il focus sul pulsante quando chiuso da click esterno
						(button as HTMLElement).focus();
					}
				}
			});
		}

		if (closeOnEscape) {
			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape" && dropdown.classList.contains(openClass)) {
					dropdown.classList.remove(openClass);
					// Riportare il focus sul pulsante quando chiuso con tasto Escape
					(button as HTMLElement).focus();
				}
			});
		}
	});
}
