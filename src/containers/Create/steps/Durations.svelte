<script lang="ts">
  import { fly } from 'svelte/transition';
  import Button from '../../../components/Form/Button.svelte';

  export let handleCreate: () => void;
  export let goToStep: (step: string) => void;

  const handleTextButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    goToStep('text');
  };

  const handleSubmitButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    handleCreate();
  };
</script>

<style>
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

  .container :global(.text-button) {
    background: #fff;
    color: #444;
    border: 2px solid transparent;
  }

  .container :global(.text-button):hover,
  .container :global(.text-button):focus {
    border: 2px solid #444;
  }
</style>

<div class="container">
  <div class="buttons-container" transition:fly={{ y: 5, duration: 250 }}>
    <Button
      className="create-form-button text-button"
      text="Edit text"
      handleButtonClick={handleTextButtonClick} />
    <Button
      className="create-form-button get-started-button"
      text="Start timer"
      handleButtonClick={handleSubmitButtonClick} />
  </div>
</div>
