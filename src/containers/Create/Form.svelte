<script lang="ts">
  import { fly } from 'svelte/transition';
  import Textarea from '../../components/Form/Textarea.svelte';

  export let handleCreate: (value: string) => void;

  let value: string = '';

  let interaction: 'composing' | 'done' = 'composing';
  $: shouldShowButton = interaction !== 'composing';

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

  const handleSubmit = (value: string) => {
    if (!value) return;
    handleCreate(value);
  };

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    handleSubmit(value.trim());
  };
</script>

<style>
  .container {
    max-width: 100%;
    width: 40rem;
    margin: 0 auto;
  }

  .input-submit {
    margin: 0.5rem 0 0 0.75rem;
    padding: 0.5rem 1rem;
    background: #fff;
    border-radius: 1.2rem;
    border: 2px solid #444;
    color: #444;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .input-submit:hover {
    background: #444;
    color: #fff;
  }
</style>

<div class="container">
  <form class="create-task-form">
    <Textarea
      id="create-task-input"
      bind:value
      {handleSubmit}
      placeholder="What task are you focusing on?"
      labelText="Brief description of your new task"
      autofocus
      maxCount={155}
      transitionConfig={{ y: 5, duration: 150 }} />
    {#if shouldShowButton}
      <button
        class="input-submit"
        on:click={handleButtonClick}
        transition:fly={{ y: 5, duration: 250 }}>Get started</button>
    {/if}
  </form>
</div>
