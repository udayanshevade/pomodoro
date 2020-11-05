<script lang="ts">
  import { spring } from 'svelte/motion';
  import Display from '../../components/Timer/Display.svelte';
  import Button from '../../components/Form/Button.svelte';
  import { onMount } from 'svelte';

  let state:
    | 'working'
    | 'work-paused'
    | 'work-interval-complete'
    | 'breaking'
    | 'break-paused'
    | 'break-interval-complete' = 'working';
  let container: HTMLDivElement;
  const height = spring(100, { damping: 0.3 });

  export let workIntervals: number = 0;
  export let breakIntervals: number = 0;
  export let interruptActiveTask: () => void;
  export let activeTask: {
    text: string;
    workDuration: number;
    breakDuration: number;
  };

  let timeElapsed: number = 0;
  let timeRemaining: number = 0;

  const countdownInterval: {
    id: ReturnType<typeof setInterval>;
    duration: number;
  } = {
    id: null,
    duration: 1000,
  };

  const startInterval = () => {
    countdownInterval.id = setInterval(() => {
      timeElapsed += countdownInterval.duration;
    }, countdownInterval.duration);
  };

  onMount(() => {
    startInterval();
  });

  $: {
    if (state === 'working' && timeElapsed === workDuration) {
      clearInterval(countdownInterval.id);
      state = 'work-interval-complete';
      height.set(0);
      timeRemaining = breakDuration;
    } else if (state === 'breaking' && timeElapsed === breakDuration) {
      clearInterval(countdownInterval.id);
      state = 'break-interval-complete';
      height.set(0);
      timeRemaining = workDuration;
    } else {
      const percentElapsed = timeElapsed / workDuration;
      height.set(Math.round((1 - percentElapsed) * 100));
      timeRemaining = workDuration - timeElapsed;
    }
  }

  // TODO: add breakDuration handling
  const { text, workDuration, breakDuration } = activeTask;

  const handlePauseClick = () => {
    if (state === 'working') {
      state = 'work-paused';
    } else if (state === 'breaking') {
      state = 'break-paused';
    }
    clearInterval(countdownInterval.id);
  };

  const handleResumeClick = () => {
    state = 'working';
    startInterval();
  };

  const handleBreakClick = () => {
    timeElapsed = 0;
    state = 'breaking';
    startInterval();
    breakIntervals += 1;
  };

  const handleWorkClick = () => {
    timeElapsed = 0;
    state = 'working';
    startInterval();
    workIntervals += 1;
  };

  const handleInterruptClick = () => {
    interruptActiveTask();
  };
</script>

<style>
  .container {
    height: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    background: #fff;
  }

  .progress {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #cfcfcf;
    opacity: 0.75;
  }

  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .content-inner {
    padding: 1rem;
    overflow-y: auto;
  }

  .display-value-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 4rem;
  }

  .display-value-label {
    font-size: 36px;
    margin: 1rem 0;
  }

  .task-text-container {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .task-text-label {
    font-size: 1rem;
    text-align: center;
  }

  .task-text {
    margin: 1.25rem 0;
    font-size: 2.8rem;
    text-align: center;
    max-width: 100%;
  }

  .content .task-text-label,
  .content .task-text {
    color: #000;
  }

  .buttons-container {
    margin: 2rem 0 0;
    display: flex;
    justify-content: center;
  }

  .container :global(.interrupt-button) {
    width: 95px;
    height: 32px;
    padding: 0.25rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .container :global(.pause-button),
  .container :global(.resume-button) {
    background: #333;
    color: #fff;
    border: 2px solid #333;
  }

  .container :global(.pause-button):hover,
  .container :global(.pause-button):focus,
  .container :global(.resume-button):hover,
  .container :global(.resume-button):focus {
    background: #fff;
    color: #333;
    border: 2px solid #333;
  }

  .container :global(.stop-button) {
    background: none;
    color: #000;
    border: 2px solid transparent;
  }

  .container :global(.stop-button) {
    margin-left: 1rem;
  }

  .container :global(.stop-button):hover,
  .container :global(.stop-button):focus {
    background: #fff;
    border: 2px solid #000;
  }

  @media screen and (min-width: 500px) {
    .display-value-container {
      margin-bottom: 4rem;
    }

    .display-value-label {
      font-size: 120px;
      margin: 1rem 0;
    }

    .container :global(.time-remaining-display) {
      font-size: 4.2rem;
    }

    .task-text-label {
      font-size: 2rem;
    }

    .task-text {
      font-size: 4.8rem;
    }

    .container :global(.interrupt-button) {
      height: 38px;
      font-size: 1rem;
      border-radius: 1.6rem;
      padding: 0.5rem 1rem;
    }
  }
</style>

<section class="container" bind:this={container}>
  <div
    class="progress"
    style={`height: ${$height}%;`}
    data-testid="background-progress" />
  <div class="content">
    <div class="content-inner">
      <div class="display-value-container">
        <div class="display-value-label">
          {state === 'working' || state === 'break-interval-complete' || state === 'work-paused' ? 'Break' : 'Work'}
          in:
        </div>
        <Display className="time-remaining-display" value={timeRemaining} />
      </div>
      <div class="task-text-container">
        <div class="task-text-label">Currently focusing on:</div>
        <h3 class="task-text">{text}</h3>
      </div>
      <div class="buttons-container">
        {#if state === 'working' || state === 'breaking'}
          <Button
            className="interrupt-button pause-button"
            handleButtonClick={handlePauseClick}
            children="Pause" />
        {:else if state === 'work-paused' || state === 'break-paused'}
          <Button
            className="interrupt-button resume-button"
            handleButtonClick={handleResumeClick}
            children="Resume" />
        {:else if state === 'work-interval-complete'}
          <Button
            className="interrupt-button resume-button"
            handleButtonClick={handleBreakClick}
            children="Break" />
        {:else if state === 'break-interval-complete'}
          <Button
            className="interrupt-button resume-button"
            handleButtonClick={handleWorkClick}
            children="Work" />
        {/if}
        {#if state === 'work-interval-complete'}
          <Button
            className="interrupt-button stop-button"
            handleButtonClick={() => console.log('done')}
            children="Done" />
        {:else}
          <Button
            className="interrupt-button stop-button"
            handleButtonClick={handleInterruptClick}
            children="Exit" />
        {/if}
      </div>
    </div>
  </div>
</section>
