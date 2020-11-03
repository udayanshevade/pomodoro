<script lang="ts">
  import classnames from 'classnames';
  import type { SvelteComponent } from 'svelte';

  export let className: string = null;
  export let formId: string = null;
  export let name: string = null;
  export let handleButtonClick: (e: MouseEvent) => void;
  export let children: string | number | SvelteComponent[];
</script>

<button
  class={classnames('form-button', className)}
  form={formId}
  {name}
  on:click={handleButtonClick}>{children}</button>
