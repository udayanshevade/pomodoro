import App from './App.svelte';
import { render, screen } from '@testing-library/svelte';

describe('App', () => {
  it('renders properly', () => {
    render(App);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
