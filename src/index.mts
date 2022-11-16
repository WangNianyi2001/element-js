declare global {
	type LegacyListeners<This extends EventTarget = HTMLElement> = {
		[type in keyof HTMLElementEventMap as string]: (this: This, ev: HTMLElementEventMap[type]) => void;
	}
	interface Listeners<This extends EventTarget = HTMLElement> extends LegacyListeners<This> {
		[type: string]: (this: This, ev: Event) => void;
	}

	interface ElementOptions<This extends HTMLElement> {
		id?: string;
		classes?: string | string[];
		attributes?: {
			[key: string]: string;
		};
		rawAttributes?: any;
		html?: string;
		text?: string;
		parent?: HTMLElement;
		children?: HTMLElement | HTMLElement[];
		on?: Listeners<This>;
		once?: Listeners<This>;
		styles?: {
			[property: string]: string;
		};
		cssVars?: {
			[name: string]: string;
		};
	}
}

/** Modify element regarding custom options. */
export function Modify<Type extends HTMLElement>(
	$element: Type,
	options: ElementOptions<Type>
): Type {
	if(options.id)
		$element.id = options.id;
	if(options.classes?.length) {
		if(options.classes instanceof Array)
			$element.classList.add(...options.classes);
		else
			$element.classList.add(options.classes);
	}
	if(options.attributes) {
		for(const [key, value] of Object.entries(options.attributes))
			$element.setAttribute(key, value);
	}
	if(options.rawAttributes) {
		for(const [key, value] of Object.entries(options.rawAttributes))
			$element[key] = value;
	}
	if(options.html)
		$element.innerHTML = options.html;
	if(options.text)
		$element.innerText = options.text;
	if(options.parent)
		options.parent.appendChild($element);
	if(options.children) {
		if(options.children instanceof Array)
			$element.append(...options.children);
		else
			$element.append(options.children);
	}
	if(options.on) {
		for(const type in options.on)
			$element.addEventListener(type, options.on[type]);
	}
	if(options.once) {
		for(const type in options.once)
			$element.addEventListener(type, options.once[type]);
	}
	if(options.styles) {
		for(const [property, value] of Object.entries(options.styles))
			$element.style[property] = value;
	}
	if(options.cssVars) {
		for(const [name, value] of Object.entries(options.cssVars))
			$element.style.setProperty(name, value);
	}
	return $element;
}

/** Find element root by selector. */
export function Find<Type extends HTMLElement = HTMLElement>(
	selector: string,
	options?: ElementOptions<Type>,
	parent: HTMLElement | Document = document
): Type | null {
	const $element = (parent || document).querySelector(selector) as Type;
	if(!$element)
		return null;
	if(options)
		Modify($element, options);
	return $element;
}

/** Create element of tag with custom properties. */
export function Create(tag: string, options: ElementOptions<HTMLElement>): HTMLElement;
export function Create<K extends keyof HTMLElementTagNameMap>(
	tag: K, options?: ElementOptions<HTMLElementTagNameMap[K]>
): HTMLElementTagNameMap[K] {
	const $element = document.createElement(tag);
	if(options)
		Modify($element, options);
	return $element;
}

/** Clear all children of element. */
export function Clear(element: Node) {
	for(const child of Array.from(element.childNodes))
		element.removeChild(child);
}

/** Remove element from its parent. */
export function Remove(element: Node) {
	element.parentNode?.removeChild(element);
}
