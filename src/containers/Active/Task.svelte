<script lang="ts">
  import { spring } from 'svelte/motion';
  import Display from '../../components/Timer/Display.svelte';
  import Button from '../../components/Form/Button.svelte';
  import { onMount } from 'svelte';

  let container: HTMLDivElement;
  const height = spring(100, { damping: 0.3 });

  export let resetActiveTask: () => void;
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

  onMount(() => {
    countdownInterval.id = setInterval(() => {
      timeElapsed += countdownInterval.duration;
    }, countdownInterval.duration);
  });

  $: {
    const percentElapsed = timeElapsed / workDuration;
    if (percentElapsed === 1) {
      clearInterval(countdownInterval.id);
    }
    height.set(Math.round((1 - percentElapsed) * 100));
    timeRemaining = workDuration - timeElapsed;
  }

  // TODO: add breakDuration handling
  const { text, workDuration } = activeTask;

  const handleInterruptClick = () => {
    resetActiveTask();
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
    background: #caf0f8;
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
    max-width: 50rem;
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

  .container :global(.active-task-button) {
    padding: 0.5rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .container :global(.interrupt-button) {
    background: transparent;
    border: 2px solid #000;
    color: #000;
  }

  .container :global(.interrupt-button):hover,
  .container :global(.interrupt-button):focus {
    background: #000;
    color: #fff;
  }

  @media screen and (min-width: 500px) {
    .display-value-container {
      margin-bottom: 4rem;
    }

    .display-value-label {
      font-size: 1.8rem;
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
      font-size: 1.2rem;
      border-radius: 2rem;
      padding: 0.75rem 1.5rem;
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
        <div class="display-value-label">Break in:</div>
        <Display className="time-remaining-display" value={timeRemaining} />
      </div>
      <div class="task-text-container">
        <div class="task-text-label">Currently focusing on:</div>
        <h3 class="task-text">{text}</h3>
      </div>
      <div class="buttons-container">
        <Button
          className="active-task-button interrupt-button"
          text="Interrupt"
          handleButtonClick={handleInterruptClick} />
      </div>
    </div>
  </div>
</section>
