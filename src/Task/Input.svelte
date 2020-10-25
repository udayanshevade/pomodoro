<script lang="ts">
  import { fly } from 'svelte/transition';
  import { isNotMetaKey } from './helpers';

  let value: string = '';
  const maxCount: number = 155;
  $: trimmedValue = value.trim();
  $: valueLength = trimmedValue.length;
  $: count = maxCount - valueLength;

  let isComposing: boolean = true;
  $: shouldShowButton = !isComposing;
  const isComposingTimeoutConfig: {
    id: ReturnType<typeof setTimeout>;
    duration: number;
  } = {
    id: null,
    duration: 500,
  };

  $: {
    if (valueLength > 0) {
      clearTimeout(isComposingTimeoutConfig.id);
      isComposingTimeoutConfig.id = setTimeout(() => {
        isComposing = false;
      }, isComposingTimeoutConfig.duration);
    } else {
      clearTimeout(isComposingTimeoutConfig.id);
      isComposing = true;
    }
  }

  const handleSubmit = () => {
    if (!trimmedValue) return;
    value = '';
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (isNotMetaKey(e)) {
      isComposing = true;
    }
  };
</script>

<style>
  .input-container {
    max-width: 100%;
    width: 40rem;
    margin: 0 auto;
  }

  .input-control {
    position: relative;
    padding: 1rem;
    border-radius: 1.2rem;
    border: 2px solid #666;
  }

  .input-label {
    color: #888;
  }

  .input {
    width: 100%;
    outline: 0;
    border: 0;
    box-shadow: none;
    resize: none;
    font-size: 1.8rem;
    color: #444;
    padding: 0.5rem 0;
  }

  .input::placeholder,
  .input::-moz-placeholder {
    color: #aaa;
    font-weight: lighter;
  }

  .input-count {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    color: #888;
    font-size: 0.8rem;
  }

  .input-submit {
    margin-top: 0.5rem;
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

  @media screen and (min-width: 500px) {
  }
</style>

<div class="input-container">
  <div class="input-control">
    <label for="taskInput" class="input-label">
      Brief description of your new task
    </label>
    <textarea
      id="taskInput"
      class="input"
      bind:value
      rows={3}
      on:keydown={handleKeydown}
      placeholder="What task are you focusing on?" />
    <div class="input-count">{valueLength}/{count}</div>
  </div>
  {#if shouldShowButton}
    <button
      class="input-submit"
      on:click={handleButtonClick}
      transition:fly={{ y: 5, duration: 250 }}>Get started</button>
  {/if}
</div>
