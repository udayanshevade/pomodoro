import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from '../Button.svelte';

describe('Task input', () => {
  const handleButtonClick = jest.fn();

  const defaultMockProps = {
    className: 'test-class',
    formId: 'test-form-id',
    name: 'test-name',
    handleButtonClick,
    text: 'test-text',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(Button, defaultMockProps);
    const button = screen.getByRole('button', {
      name: 'test-text',
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('form', 'test-form-id');
    expect(button).toHaveAttribute('name', 'test-name');
    expect(button).toHaveClass('form-button test-class');
  });

  it('handles being clicked', () => {
    render(Button, defaultMockProps);
    const button = screen.getByRole('button', {
      name: 'test-text',
    });
    userEvent.click(button);
    expect(handleButtonClick).toHaveBeenCalled();
  });
});
