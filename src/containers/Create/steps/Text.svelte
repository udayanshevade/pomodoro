<script lang="ts">
  import { fly } from 'svelte/transition';
  import Textarea from '../../../components/Form/Textarea.svelte';
  import Button from '../../../components/Form/Button.svelte';

  export let handleCreate: () => void;
  export let goToStep: (step: string) => void;
  export let value: string = '';

  let interaction: 'composing' | 'done' = 'composing';
  $: shouldShowButtons = interaction !== 'composing';

  const isComposingTimeoutConfig: {
    id: ReturnType<typeof setTimeout>;
    duration: number;
  } = {
    id: null,
    duration: 500,
  };

  $: {
    if (value.trim().length > 0) {
      clearTimeout(isComposingTimeoutConfig.id);
      interaction = 'composing';
      isComposingTimeoutConfig.id = setTimeout(() => {
        interaction = 'done';
      }, isComposingTimeoutConfig.duration);
    } else {
      clearTimeout(isComposingTimeoutConfig.id);
      interaction = 'composing';
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate();
    }
  };

  const handleTimerButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    goToStep('duration');
  };

  const handleSubmitButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    handleCreate();
  };
</script>

<style>
  .container {
    width: 100%;
    height: 250px;
  }

  .buttons-container {
    margin: 0.5rem 0 0 0.75rem;
  }

  .container :global(.create-form-button) {
    padding: 0.5rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .container :global(.get-started-button) {
    margin-left: 0.5rem;
    background: #444;
    border: 2px solid #444;
    color: #fff;
  }

  .container :global(.get-started-button):hover,
  .container :global(.get-started-button):focus {
    background: #fff;
    color: #444;
  }

  .container :global(.timer-button) {
    background: #fff;
    color: #444;
    border: 2px solid transparent;
  }

  .container :global(.timer-button):hover,
  .container :global(.timer-button):focus {
    border: 2px solid #444;
  }
</style>

<div class="container">
  <div>
    <Textarea
      id="create-task-input"
      bind:value
      {handleKeydown}
      placeholder="What task are you focusing on?"
      labelText="Brief description of your new task"
      autofocus
      maxCount={155} />
  </div>
  {#if shouldShowButtons}
    <div class="buttons-container" transition:fly={{ y: 5, duration: 250 }}>
      <Button
        className="create-form-button timer-button"
        text="Set duration"
        handleButtonClick={handleTimerButtonClick} />
      <Button
        className="create-form-button get-started-button"
        text="Start timer"
        handleButtonClick={handleSubmitButtonClick} />
    </div>
  {/if}
</div>
