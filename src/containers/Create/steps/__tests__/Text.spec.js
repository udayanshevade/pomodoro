import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TextStep from '../Text.svelte';

describe('Task text form step', () => {
  const handleCreate = jest.fn();
  const goToStep = jest.fn();
  const defaultMockProps = { handleCreate, goToStep };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not show the button at first', () => {
    render(TextStep, defaultMockProps);
    const button = screen.queryByRole('button', { name: 'Start timer' });
    expect(button).not.toBeInTheDocument();
  });

  describe('when the user is not interacting with the input', () => {
    it('should show the button if the value is not empty', async () => {
      render(TextStep, defaultMockProps);
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'foo');
      const button = await screen.findByRole(
        'button',
        { name: 'Start timer' },
        { timeout: 1000 }
      );
      expect(button).toBeInTheDocument();
    });

    it('but not if the input is cleared', async () => {
      render(TextStep, defaultMockProps);
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'foo');
      userEvent.clear(textarea);
      await waitFor(
        () => {
          expect(
            screen.queryByRole('button', { name: 'Start timer' })
          ).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  it('should re-hide the button when text is cleared', async () => {
    render(TextStep, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'foo');
    expect(textarea).toHaveDisplayValue('foo');
    const button = await screen.findByRole('button', {
      name: 'Start timer',
    });
    userEvent.clear(textarea);
    expect(textarea).toHaveDisplayValue('');
    await waitForElementToBeRemoved(button);
  });

  it('should clear the input', async () => {
    render(TextStep, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'foo');
    const button = await screen.findByRole('button', { name: 'Start timer' });
    userEvent.click(button);
    await waitFor(() => {
      expect(textarea).toHaveDisplayValue('');
    });
  });

  it('should work with a valid input', () => {
    render(TextStep, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, '  {enter}');
    expect(textarea).toHaveDisplayValue('  ');
  });
});
