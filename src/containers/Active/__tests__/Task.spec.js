import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ActiveTask from '../Task.svelte';

describe('Active Task', () => {
  const interruptActiveTask = jest.fn();
  const handlePause = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    interruptActiveTask.mockClear();
    handlePause.mockClear();
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
        pauses: 0,
      },
      interruptActiveTask,
      handlePause,
    });
    const timer = screen.getByRole('timer');
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('5:00');
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('Break in:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Exit' })).toBeInTheDocument();
  });

  it('timer should work', async () => {
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      interruptActiveTask,
      handlePause,
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
      interruptActiveTask,
      handlePause,
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

  it('handles the pause and resume buttons', async () => {
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      interruptActiveTask,
      handlePause,
    });
    const timer = screen.getByRole('timer');
    const pauseButton = screen.getByRole('button', { name: 'Pause' });
    userEvent.click(pauseButton);
    await waitFor(
      () => {
        expect(timer).toHaveTextContent('5:00');
      },
      { timeout: 4000 }
    );
    const resumeButton = screen.getByRole('button', { name: 'Resume' });
    expect(resumeButton).toBeInTheDocument();
    userEvent.click(resumeButton);
    await waitFor(
      () => {
        expect(timer).toHaveTextContent('4:56');
      },
      { timeout: 4000 }
    );
  });

  it('handles the stop button', () => {
    window.alert = jest.fn();
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 5 * 60 * 1000,
        breakDuration: 1 * 60 * 1000,
      },
      interruptActiveTask,
      handlePause,
    });
    const stopButton = screen.getByRole('button', { name: 'Exit' });
    userEvent.click(stopButton);
    expect(interruptActiveTask).toHaveBeenCalled();
  });

  it('handles switching between work and break timers', async () => {
    render(ActiveTask, {
      activeTask: {
        text: 'foo',
        workDuration: 4 * 1000,
        breakDuration: 1000,
      },
      interruptActiveTask,
      handlePause,
    });
    expect(screen.getByText('Break in:')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.getByText('Work in:')).toBeInTheDocument();
        const breakButton = screen.getByRole('button', { name: 'Break' });
        expect(breakButton).toBeInTheDocument();
        userEvent.click(breakButton);
      },
      { timeout: 4000 }
    );
    await waitFor(
      () => {
        expect(screen.getByText('Break in:')).toBeInTheDocument();
        const workButton = screen.getByRole('button', { name: 'Work' });
        const doneButton = screen.getByRole('button', { name: 'Exit' });
        expect(workButton).toBeInTheDocument();
        expect(doneButton).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
