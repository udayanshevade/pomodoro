import { fly } from 'svelte/transition';

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
