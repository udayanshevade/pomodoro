import { fly } from 'svelte/transition';
import { cubicInOut } from 'svelte/easing';

export const transitionOut = (
  node: HTMLElement,
  opts: { [key: string]: any }
) => {
  const defaultOutput = fly(node, opts);
  return {
    ...defaultOutput,
    css: (t: number, u: number) => `
      ${defaultOutput.css(t, u)}
      position: absolute;
    `,
  };
};
