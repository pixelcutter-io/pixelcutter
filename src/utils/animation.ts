type Transformation = {
	type: "rotate" | "scale" | "translate" | "opacity" | "background";
	start: number | number[];
	end: number | number[];
	unit?: string;
};

interface AnimationConfig {
	target: string;
	transformations: Transformation[];
	origin?: [string];
}

function getTargets(target: string): HTMLElement[] {
	if (target.startsWith("#") && !target.includes(" ")) {
		const id = target.substring(1);
		const element = document.getElementById(id);
		return element ? [element] : [];
	}

	if (target.startsWith(".") && !target.includes(" ")) {
		const className = target.substring(1);
		const elements = document.getElementsByClassName(className);
		return [...elements] as HTMLElement[];
	}

	const elements = document.querySelectorAll(target);
	return [...elements] as HTMLElement[];
}

function applyTransformations(
	element: HTMLElement,
	transformations: Transformation[],
	progress: number,
) {
	transformations.forEach((transform) => {
		const unit = transform.unit || "";

		// Converto start ed end in array una volta sola
		const startArray = Array.isArray(transform.start)
			? transform.start
			: [transform.start];
		const endArray = Array.isArray(transform.end)
			? transform.end
			: [transform.end];

		switch (transform.type) {
			case "rotate": {
				const currentValue =
					startArray[0] + (endArray[0] - startArray[0]) * progress;
				element.style.rotate = `${currentValue}${unit || "deg"}`;
				break;
			}
			case "scale": {
				const currentX =
					startArray[0] + (endArray[0] - startArray[0]) * progress;

				if (startArray.length === 1 && endArray.length === 1) {
					element.style.scale = `${currentX}`;
				} else {
					const startY = startArray.length > 1 ? startArray[1] : startArray[0];
					const endY = endArray.length > 1 ? endArray[1] : endArray[0];
					const currentY = startY + (endY - startY) * progress;
					element.style.scale = `${currentX} ${currentY}`;
				}
				break;
			}
			case "translate": {
				const currentX =
					startArray[0] + (endArray[0] - startArray[0]) * progress;

				if (startArray.length === 1 && endArray.length === 1) {
					element.style.translate = `${currentX}${unit || "px"} 0px`;
				} else {
					const startY = startArray.length > 1 ? startArray[1] : 0;
					const endY = endArray.length > 1 ? endArray[1] : 0;
					const currentY = startY + (endY - startY) * progress;
					element.style.translate = `${currentX}${unit || "px"} ${currentY}${unit || "px"}`;
				}
				break;
			}
			case "opacity": {
				const currentValue =
					startArray[0] + (endArray[0] - startArray[0]) * progress;
				element.style.opacity = `${currentValue}`;
				break;
			}
		}
	});
}

function animateOnScroll(animationConfigs: AnimationConfig[]) {
	return function initializeAnimations() {
		// Verifica che siamo nel browser
		if (typeof document === "undefined") return;

		// Aspetta che il DOM sia caricato
		document.addEventListener("DOMContentLoaded", () => {
			// Prepara tutte le animazioni
			const animations = animationConfigs
				.map((config) => {
					// Seleziona gli elementi in base al tipo di target
					const elements = getTargets(config.target);
					if (elements.length === 0) return null;

					// Prepara gli handler per ogni elemento
					return elements.map((element) => {
						// Imposta transform-origin se specificato
						if (config.origin[0] && config.origin[1]) {
							element.style.transformOrigin = `${config.origin[0]} ${config.origin[1]}`;
						}

						// Imposta i valori iniziali
						applyTransformations(element, config.transformations, 0);

						// Crea la funzione di animazione per questo target
						const animate = () => {
							const rect = element.getBoundingClientRect();
							const windowHeight = window.innerHeight;

							// Calcola il progresso in base alla posizione
							if (rect.top < windowHeight && rect.bottom > 0) {
								const progress = Math.min(
									1,
									(windowHeight - rect.top) / (windowHeight / 2),
								);
								applyTransformations(element, config.transformations, progress);
							} else if (rect.top >= windowHeight) {
								// Reset quando l'elemento è sotto la viewport
								applyTransformations(element, config.transformations, 0);
							}
						};

						// Inizializza l'animazione
						animate();

						// Ritorna l'handler di animazione per questo elemento
						return { element, animate };
					});
				})
				.filter(Boolean)
				.flat();

			// Aggiungi un singolo event listener che gestisce tutte le animazioni
			if (animations.length > 0) {
				const handleScroll = () => {
					animations.forEach((animation) => animation.animate());
				};

				window.addEventListener("scroll", handleScroll, { passive: true });
			}
		});
	};
}

export default animateOnScroll;
