import { render, screen } from '@testing-library/svelte';
import Task from '../Task.svelte';

describe('Task component', () => {
  it('renders', () => {
    render(Task, {
      details: {
        text: 'test',
        workDurations: [
          {
            startAt: '2020-11-23T07:25:00.000Z',
            endAt: '2020-11-23T07:50:00.000Z',
          },
          {
            startAt: '2020-11-23T07:55:05.000Z',
            endAt: '2020-11-23T08:20:05.000Z',
          },
        ],
        breakDurations: [
          {
            startAt: '2020-11-23T07:50:05.000Z',
            endAt: '2020-11-23T07:55:05.000Z',
          },
        ],
      },
    });
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('50 mins')).toBeInTheDocument();
    expect(screen.getByText('5 mins')).toBeInTheDocument();
  });
});
