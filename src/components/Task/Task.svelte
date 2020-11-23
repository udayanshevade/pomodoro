<script lang="ts">
  import classnames from 'classnames';
  import { getHoursAndMinsFromMillis } from '../../utils/timeUnits';

  export let details: {
    text: string;
    workDurations: { startAt: string; endAt: string }[];
    breakDurations: { startAt: string; endAt: string }[];
  } = {
    text: 'Foo',
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
  };
  export let className = '';

  const getText = (durations: { startAt: string; endAt: string }[]): string => {
    const timeInMillis = durations.reduce((acc, { startAt, endAt }) => {
      return acc + (new Date(endAt).valueOf() - new Date(startAt).valueOf());
    }, 0);
    const { hrs, mins } = getHoursAndMinsFromMillis(timeInMillis);
    return `${hrs ? `${hrs} hrs ` : ''}${mins ? `${mins} mins` : ''}`;
  };

  const { text, workDurations, breakDurations } = details;

  $: workTime = getText(workDurations);
  $: breakTime = getText(breakDurations);
</script>

<style>
  .task-item {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .task-text {
    width: 85%;
    font-size: 1.5rem;
  }

  .task-durations {
    width: 15%;
    display: flex;
    flex-flow: column;
  }

  .task-duration {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 500px) {
    .task-text {
      width: 60%;
    }

    .task-durations {
      width: 40%;
      flex-flow: row wrap;
    }
  }
</style>

<div class={classnames('task-item', className)} role="listitem">
  <div class="task-text">{text}</div>
  <div class="task-durations">
    <div class="task-duration task-duration--work">{workTime}</div>
    <div class="task-duration task-duration--break">{breakTime}</div>
  </div>
</div>
