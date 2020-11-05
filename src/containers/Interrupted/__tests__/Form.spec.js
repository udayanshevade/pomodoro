import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Form from '../Form.svelte';

describe('Interrupted task form', () => {
  const handleInterruption = jest.fn();
  const defaultMockProps = { handleInterruption };

  beforeEach(() => {
    handleInterruption.mockClear();
  });

  it('renders correctly', () => {
    render(Form, defaultMockProps);
    expect(
      screen.getByText('Some details to remember the interruption (optional)')
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  it('handles interruption details', () => {
    render(Form, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    userEvent.type(textarea, 'foo');
    const button = screen.getByRole('button', { name: 'Done' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(handleInterruption).toHaveBeenCalledWith('foo');
  });

  it('should also handle submission with keydown', () => {
    render(Form, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    userEvent.type(textarea, 'foo{enter}');
    expect(handleInterruption).toHaveBeenCalledWith('foo');
  });
});
