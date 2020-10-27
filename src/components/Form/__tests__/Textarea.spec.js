import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Textarea from '../Textarea.svelte';

describe('Task input', () => {
  const handleSubmit = jest.fn();
  const handleKeydown = jest.fn();

  const defaultMockProps = {
    id: 'test-input',
    className: 'test-input',
    value: '',
    handleSubmit,
    handleKeydown,
    placeholder: 'What task are you focusing on?',
    labelText: 'Brief description of your new task',
    maxCount: 155,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty', () => {
    render(Textarea, defaultMockProps);
    const textarea = screen.getByRole('textbox', {
      name: 'Brief description of your new task',
    });
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'test-input');
    expect(textarea).toHaveClass('input');
    expect(textarea).toHaveAttribute(
      'placeholder',
      'What task are you focusing on?'
    );
    expect(screen.getByText('155')).toBeInTheDocument();
  });

  describe('when text is entered', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should reflect the updated value', async () => {
      render(Textarea, defaultMockProps);
      const textarea = screen.getByRole('textbox', {
        name: 'Brief description of your new task',
      });
      userEvent.type(textarea, 'foo');
      expect(textarea).toHaveDisplayValue('foo');
      const remainingCount = await screen.findByText('152');
      expect(remainingCount).toBeInTheDocument();
    });
  });

  describe('events should be handled', () => {
    it('like Enter keydown', async () => {
      render(Textarea, defaultMockProps);
      const textarea = screen.getByRole('textbox', {
        name: 'Brief description of your new task',
      });
      userEvent.type(textarea, 'foo{enter}');
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
  });
});
