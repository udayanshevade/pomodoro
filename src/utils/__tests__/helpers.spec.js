import * as helpers from '../helpers';

describe('Helpers', () => {
  it('padNum should give appropriate 2 characters values', () => {
    const cases = [
      { input: 0, output: '00' },
      { input: 1, output: '01' },
      { input: 11, output: '11' },
      { input: 20, output: '20' },
    ];
    cases.forEach(({ input, output }) => {
      expect(helpers.padNum(input)).toBe(output);
    });
  });
});
