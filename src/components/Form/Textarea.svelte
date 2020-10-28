<script lang="ts">
  import classnames from 'classnames';

  export let id: string;
  export let className: string = undefined;
  export let value: string;
  export let handleKeydown: (e: KeyboardEvent) => void;
  export let labelText: string;
  export let rows: number = 3;
  export let placeholder: string = undefined;
  export let maxCount: number = undefined;
  export let autofocus: boolean = undefined;

  $: showCount = typeof maxCount !== 'undefined';
  $: count = maxCount - value.trim().length;
</script>

<style>
  .container {
    max-width: 100%;
    position: relative;
    padding: 1rem;
  }

  .label {
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

  .count-container {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    color: #888;
    font-size: 0.8rem;
  }

  .count-overflow--exceeded {
    color: #ef476f;
  }
</style>

<div class={classnames('container', className)}>
  <label for={id} class="label">
    <div class="label-text">{labelText}</div>
    <textarea
      {id}
      class="input"
      bind:value
      on:keydown={handleKeydown}
      {placeholder}
      {rows}
      {autofocus} />
  </label>
  {#if showCount}
    <div class="count-container">
      <span
        class={classnames({
          'count-overflow': true,
          'count-overflow--exceeded': count < 0,
        })}>{count}</span>
    </div>
  {/if}
</div>
