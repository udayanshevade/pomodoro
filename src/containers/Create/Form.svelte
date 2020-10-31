<script lang="ts">
  import { fly } from 'svelte/transition';
  import TextStep from './steps/Text.svelte';
  import DurationsStep from './steps/Durations.svelte';

  type FormStep = 'text' | 'duration';

  let step: FormStep = 'text';

  export let text: string = '';
  export let handleCreation: ({
    text,
    workDuration,
    breakDuration,
  }: {
    text: string;
    workDuration: number;
    breakDuration: number;
  }) => void;

  export let workDuration: number = 25 * 60 * 1000;
  export let breakDuration: number = 5 * 60 * 1000;

  const handleCreate = () => {
    handleCreation({ text, workDuration, breakDuration });
  };

  const goToStep = (targetStep: FormStep) => {
    step = targetStep;
  };
</script>

<style>
  .container {
    max-width: calc(100% - 1rem);
    width: 40rem;
    height: calc(100% - 1rem);
    margin: 0 auto;
    padding: 0.5rem;
  }

  .create-task-form {
    width: 100%;
    height: 100%;
  }

  .step-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="container">
  <form class="create-task-form">
    {#if step === 'text'}
      <div
        class="step-container text-step-container"
        out:fly={{ y: 5, duration: 250 }}
        in:fly={{ y: 5, duration: 250, delay: 500 }}>
        <TextStep bind:value={text} {handleCreate} {goToStep} />
      </div>
    {:else if step === 'duration'}
      <div
        class="step-container durations-step-container"
        out:fly={{ y: 5, duration: 250 }}
        in:fly={{ y: 5, duration: 250, delay: 500 }}>
        <DurationsStep
          bind:workDuration
          bind:breakDuration
          {handleCreate}
          {goToStep} />
      </div>
    {:else}<span>Um, how did you get here?</span>{/if}
  </form>
</div>
