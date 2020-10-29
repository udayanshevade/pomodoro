<script lang="ts">
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
    max-width: 100%;
    width: 40rem;
    margin: 0 auto;
  }
</style>

<div class="container">
  <form class="create-task-form">
    {#if step === 'text'}
      <TextStep bind:value={text} {handleCreate} {goToStep} />
    {:else if step === 'duration'}
      <DurationsStep
        bind:workDuration
        bind:breakDuration
        {handleCreate}
        {goToStep} />
    {:else}<span>Um, how did you get here?</span>{/if}
  </form>
</div>
