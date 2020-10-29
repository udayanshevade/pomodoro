import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import DurationsStep from '../Durations.svelte';

describe('Task durations form step', () => {
  const handleCreate = jest.fn();
  const goToStep = jest.fn();
  const defaultMockProps = { handleCreate, goToStep };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    render(DurationsStep, defaultMockProps);
    expect(screen.getByRole('heading', { name: 'focus' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'break' })).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton', { name: 'hrs' })).toHaveLength(2);
    expect(screen.getAllByRole('spinbutton', { name: 'mins' })).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Start timer' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Edit text' })
    ).toBeInTheDocument();
  });

  it('should render the specified padded values', () => {
    render(DurationsStep, {
      ...defaultMockProps,
      workDuration: 10 * 60 * 1000,
      breakDuration: 1 * 60 * 1000,
    });
    const [workMinsInputs, breakMinsInputs] = screen.getAllByRole(
      'spinbutton',
      { name: 'mins' }
    );
    expect(workMinsInputs).toHaveValue(10);
    expect(breakMinsInputs).toHaveValue(1);
  });

  it('should hide the start button if either duration is empty', async () => {
    render(DurationsStep, defaultMockProps);
    const workMinsInput = screen.getAllByRole('spinbutton', {
      name: 'mins',
    })[0];
    userEvent.clear(workMinsInput);
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Start timer' })
      ).not.toBeInTheDocument();
    });
  });

  it('should show padded values', () => {});
});
