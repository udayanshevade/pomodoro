import { render, screen } from '@testing-library/svelte';
import Display from '../Display.svelte';

describe('Timer display', () => {
  it('renders correctly', () => {
    render(Display, { className: 'test-class', value: 23 * 60 * 1000 + 34000 });
    const timer = screen.getByRole('timer');
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveClass('test-class');
    expect(timer).toHaveTextContent('23:34');
  });
});
