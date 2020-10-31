<script lang="ts">
  import classnames from 'classnames';
  import { millisecondsInFormattedTime } from './helpers';

  export let className: string = null;
  export let value: number = 0;
  $: displayValue = millisecondsInFormattedTime(value);
</script>

<style>
  .time-display {
    font-size: 2.8rem;
    display: inline-block;
  }
</style>

<div role="timer" class={classnames('time-display', className)}>
  {displayValue}
</div>
