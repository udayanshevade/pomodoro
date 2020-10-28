<script lang="ts">
  import TextStep from './steps/Text.svelte';
  import DurationsStep from './steps/Durations.svelte';

  type FormStep = 'text' | 'duration';

  let step: FormStep = 'text';

  export let value: string = '';
  export let handleCreation: ({ value: string }) => void;

  const handleCreate = () => {
    handleCreation({ value });
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
      <TextStep bind:value {handleCreate} {goToStep} />
    {:else if step === 'duration'}
      <DurationsStep {handleCreate} {goToStep} />
    {:else}<span>Um, how did you get here?</span>{/if}
  </form>
</div>
