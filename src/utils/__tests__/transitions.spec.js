import svelte from 'rollup-plugin-svelte';
import * as svelteTransitions from 'svelte/transition';
import * as transitions from '../transitions';

describe('Transitions', () => {
  const mockNode = document.createElement('div');
  it('transitionOut should modify the fly animation', () => {
    svelteTransitions.fly = jest.fn().mockImplementation((el, opts) => ({
      ...opts,
      css: jest.fn().mockImplementation((t) => `property: value`),
    }));
    const defaultOutput = svelteTransitions.fly(mockNode, {
      y: 5,
      duration: 250,
    });
    const output = transitions.transitionOut(mockNode, { y: 5, duration: 250 });
    expect(output).toHaveProperty('css');
    expect(output.css(1)).toEqual(
      expect.stringContaining('position: absolute')
    );
  });
});
