import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import DurationsStep from '../Durations.svelte';

describe('Task durations form step', () => {
  const handleCreate = jest.fn();
  const goToStep = jest.fn();
  const defaultMockProps = { handleCreate, goToStep };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    render(DurationsStep, defaultMockProps);
    expect(screen.getByRole('heading', { name: 'focus' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'break' })).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton', { name: 'hrs' })).toHaveLength(2);
    expect(screen.getAllByRole('spinbutton', { name: 'mins' })).toHaveLength(2);
    const startButton = await screen.findByRole('button', {
      name: 'Start timer',
    });
    expect(startButton).toBeInTheDocument();
    const editButton = await screen.findByRole('button', { name: 'Edit text' });
    expect(editButton).toBeInTheDocument();
  });

  it('should render the specified initial values', () => {
    render(DurationsStep, {
      ...defaultMockProps,
      workDuration: 10 * 60 * 1000,
      breakDuration: 1 * 60 * 1000,
    });
    const [workMinsInput, breakMinsInput] = screen.getAllByRole('spinbutton', {
      name: 'mins',
    });
    expect(workMinsInput).toHaveValue(10);
    expect(breakMinsInput).toHaveValue(1);
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

  it('should apply a recommended break duration based on an updated work duration', async () => {
    render(DurationsStep, defaultMockProps);
    const [workMinsInput, breakMinsInput] = screen.getAllByRole('spinbutton', {
      name: 'mins',
    });
    userEvent.clear(workMinsInput);
    userEvent.type(workMinsInput, '40');
    await waitFor(() => expect(breakMinsInput).toHaveValue(5));
    userEvent.clear(workMinsInput);
    userEvent.type(workMinsInput, '59');
    await waitFor(() => expect(breakMinsInput).toHaveValue(8));
    userEvent.clear(workMinsInput);
    userEvent.type(workMinsInput, '100');
    await waitFor(() => expect(breakMinsInput).toHaveValue(15));
  });
});
