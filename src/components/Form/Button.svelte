<script lang="ts">
  import classnames from 'classnames';
  export let className: string = null;
  export let formId: string = null;
  export let name: string = null;
  export let handleButtonClick: (e: MouseEvent) => void;
  export let text: string;
</script>

<button
  class={classnames('form-button', className)}
  form={formId}
  {name}
  on:click={handleButtonClick}>{text}</button>
