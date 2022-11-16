declare global {
    type LegacyListeners<This extends EventTarget = HTMLElement> = {
        [type in keyof HTMLElementEventMap as string]: (this: This, ev: HTMLElementEventMap[type]) => void;
    };
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
export declare function Modify<Type extends HTMLElement>($element: Type, options: ElementOptions<Type>): Type;
/** Find element root by selector. */
export declare function Find<Type extends HTMLElement = HTMLElement>(selector: string, options?: ElementOptions<Type>, parent?: HTMLElement | Document): Type | null;
/** Create element of tag with custom properties. */
export declare function Create<K extends keyof HTMLElementTagNameMap>(tag: K, options?: ElementOptions<HTMLElementTagNameMap[K]>): HTMLElementTagNameMap[K];
export declare function Create(tag: string, options: ElementOptions<HTMLElement>): HTMLElement;
/** Clear all children of element. */
export declare function Clear(element: Node): void;
/** Remove element from its parent. */
export declare function Remove(element: Node): void;
