<script lang="ts">
  import Textarea from '../../components/Form/Textarea.svelte';
  import Button from '../../components/Form/Button.svelte';

  let explanation: string = '';
  export let handleInterruption: (explanation: string) => void;
  let handleDoneButtonClick = () => {
    handleInterruption(explanation);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInterruption(explanation);
    }
  };
</script>

<style>
  .container {
    max-width: calc(100% - 1rem);
    width: 40rem;
    height: calc(100% - 1rem);
    margin: 0 auto;
    padding: 0.5rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .container :global(.interruption-input) {
    font-size: 1.2rem;
    color: #444;
  }

  .container :global(.interruption-form-button) {
    padding: 0.5rem 1rem;
    border-radius: 1.2rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .container :global(.done-button) {
    margin-left: 0.5rem;
    background: #444;
    border: 2px solid #444;
    color: #fff;
  }

  .container :global(.done-button):hover,
  .container :global(.done-button):focus {
    background: #fff;
    color: #444;
  }
</style>

<div class="container">
  <Textarea
    id="interruption-explanation-input"
    className="interruption-input"
    {handleKeydown}
    bind:value={explanation}
    labelText="Some details to remember the interruption"
    placeholder="Did something else come up?"
    autofocus />
  <div class="buttons-container">
    <Button
      className="interruption-form-button done-button"
      handleButtonClick={handleDoneButtonClick}
      children="Done" />
  </div>
</div>
