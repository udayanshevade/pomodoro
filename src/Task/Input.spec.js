import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Input from './Input.svelte';

const getTextarea = () =>
  screen.getByRole('textbox', {
    name: 'Brief description of your new task',
  });

describe('Task input', () => {
  it('should render empty', () => {
    render(Input);
    const textarea = getTextarea();
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute(
      'placeholder',
      'What task are you focusing on?'
    );
    expect(screen.getByText('0/155')).toBeInTheDocument();
  });

  describe('when text is entered', () => {
    it('should update the count and show the button', async () => {
      render(Input);
      const textarea = getTextarea();
      userEvent.type(textarea, 'foo');
      expect(textarea).toHaveDisplayValue('foo');
      const count = await screen.findByText('3/152');
      expect(count).toBeInTheDocument();
      const button = await screen.findByRole(
        'button',
        { name: 'Get started' },
        { timeout: 500 }
      );
      expect(button).toBeInTheDocument();
    });

    it('should re-hide the button when text is cleared', async () => {
      render(Input);
      const textarea = getTextarea();
      userEvent.type(textarea, 'foo');
      expect(textarea).toHaveDisplayValue('foo');
      const button = await screen.findByRole('button', { name: 'Get started' });
      userEvent.clear(textarea);
      expect(textarea).toHaveDisplayValue('');
      await waitForElementToBeRemoved(button);
    });
  });

  describe('submitting', () => {
    it('should clear the input', async () => {
      render(Input);
      const textarea = getTextarea();
      userEvent.type(textarea, 'foo');
      const button = await screen.findByRole('button', { name: 'Get started' });
      userEvent.click(button);
      await waitFor(() => {
        expect(textarea).toHaveDisplayValue('');
        expect(
          screen.queryByRole('button', { name: 'Get started' })
        ).not.toBeInTheDocument();
      });
    });

    it('should also work with Enter keydown', async () => {
      render(Input);
      const textarea = getTextarea();
      userEvent.type(textarea, 'foo{enter}');
      await waitFor(() => {
        expect(textarea).toHaveDisplayValue('');
      });
    });

    it('should work with a valid input', () => {
      render(Input);
      const textarea = getTextarea();
      userEvent.type(textarea, '  {enter}');
      expect(textarea).toHaveDisplayValue('  ');
    });
  });
});
