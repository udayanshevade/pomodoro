import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ActiveTask from '../Task.svelte';

describe('Active Task', () => {
  const resetActiveTask = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    resetActiveTask.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      resetActiveTask,
    });
    const timer = screen.getByRole('timer');
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('5:00');
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('Break in:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Interrupt' })
    ).toBeInTheDocument();
  });

  it('timer should work', async () => {
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      resetActiveTask,
    });
    const timer = screen.getByRole('timer');
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('5:00');
    await waitFor(
      () => {
        expect(timer).toHaveTextContent('4:56');
      },
      { timeout: 4000 }
    );
  });

  it('should show a backdrop visual timer', async () => {
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      resetActiveTask,
    });
    const backgroundProgress = screen.getByTestId('background-progress');
    expect(backgroundProgress).toBeInTheDocument();
    expect(backgroundProgress).toHaveStyle({ height: '100%' });
    await waitFor(
      () => {
        expect(backgroundProgress).not.toHaveStyle({ height: '100%' });
      },
      { timeout: 4000 }
    );
  });

  it('handles interrupt button', () => {
    window.alert = jest.fn();
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      resetActiveTask,
    });
    const interruptButton = screen.getByRole('button', { name: 'Interrupt' });
    userEvent.click(interruptButton);
    expect(resetActiveTask).toHaveBeenCalled();
  });
});
