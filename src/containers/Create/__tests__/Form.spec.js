import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Form from '../Form.svelte';

describe('Task creation form', () => {
  const defaultMockProps = { handleCreate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not show the button at first', () => {
    render(Form, defaultMockProps);
    const button = screen.queryByRole('button', { name: 'Get started' });
    expect(button).not.toBeInTheDocument();
  });

  describe('when the user is not interacting with the input', () => {
    it('should show the button if the value is not empty', async () => {
      render(Form, defaultMockProps);
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'foo');
      const button = await screen.findByRole(
        'button',
        { name: 'Get started' },
        { timeout: 1000 }
      );
      expect(button).toBeInTheDocument();
    });

    it('but not if the input is cleared', async () => {
      render(Form, defaultMockProps);
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'foo');
      userEvent.clear(textarea);
      await waitFor(
        () => {
          expect(
            screen.queryByRole('button', { name: 'Get started' })
          ).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  it('should re-hide the button when text is cleared', async () => {
    render(Form, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'foo');
    expect(textarea).toHaveDisplayValue('foo');
    const button = await screen.findByRole('button', {
      name: 'Get started',
    });
    userEvent.clear(textarea);
    expect(textarea).toHaveDisplayValue('');
    await waitForElementToBeRemoved(button);
  });

  it('should clear the input', async () => {
    render(Form, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'foo');
    const button = await screen.findByRole('button');
    userEvent.click(button);
    await waitFor(() => {
      expect(textarea).toHaveDisplayValue('');
    });
  });

  it('should work with a valid input', () => {
    render(Form, defaultMockProps);
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, '  {enter}');
    expect(textarea).toHaveDisplayValue('  ');
  });
});
