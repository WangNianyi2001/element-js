/** Modify element regarding custom options. */
export function Modify($element, options) {
    if (options.id)
        $element.id = options.id;
    if (options.classes?.length) {
        if (options.classes instanceof Array)
            $element.classList.add(...options.classes);
        else
            $element.classList.add(options.classes);
    }
    if (options.attributes) {
        for (const [key, value] of Object.entries(options.attributes))
            $element.setAttribute(key, value);
    }
    if (options.rawAttributes) {
        for (const [key, value] of Object.entries(options.rawAttributes))
            $element[key] = value;
    }
    if (options.html)
        $element.innerHTML = options.html;
    if (options.text)
        $element.innerText = options.text;
    if (options.parent)
        options.parent.appendChild($element);
    if (options.children) {
        if (options.children instanceof Array)
            $element.append(...options.children);
        else
            $element.append(options.children);
    }
    if (options.on) {
        for (const type in options.on)
            $element.addEventListener(type, options.on[type]);
    }
    if (options.once) {
        for (const type in options.once)
            $element.addEventListener(type, options.once[type]);
    }
    if (options.styles) {
        for (const [property, value] of Object.entries(options.styles))
            $element.style[property] = value;
    }
    if (options.cssVars) {
        for (const [name, value] of Object.entries(options.cssVars))
            $element.style.setProperty(name, value);
    }
    return $element;
}
/** Find element root by selector. */
export function Find(selector, options, parent = document) {
    const $element = (parent || document).querySelector(selector);
    if (!$element)
        return null;
    if (options)
        Modify($element, options);
    return $element;
}
export function Create(tag, options) {
    const $element = document.createElement(tag);
    if (options)
        Modify($element, options);
    return $element;
}
/** Clear all children of element. */
export function Clear(element) {
    for (const child of Array.from(element.childNodes))
        element.removeChild(child);
}
/** Remove element from its parent. */
export function Remove(element) {
    element.parentNode?.removeChild(element);
}
