<script lang="ts">
  import { fly } from 'svelte/transition';
  import CreateTaskForm from './containers/Create/Form.svelte';
  import ActiveTask from './containers/Active/Task.svelte';
  import InterruptedTask from './containers/Interrupted/Form.svelte';

  let route: 'create' | 'active' | 'interrupted' = 'create';

  let activeTask: {
    text: string;
    workDuration: number;
    breakDuration: number;
    pauses: number;
  } = null;

  const handleCreation = ({
    text,
    workDuration,
    breakDuration,
  }: {
    text: string;
    workDuration: number;
    breakDuration: number;
  }) => {
    activeTask = { text, workDuration, breakDuration, pauses: 0 };
    route = 'active';
  };

  const handlePause = () => {
    activeTask.pauses += 1;
  };

  const interruptActiveTask = () => {
    activeTask = null;
    route = 'interrupted';
  };

  const handleInterruption = (explanation: string) => {
    console.log(explanation);
    route = 'create';
  };
</script>

<style>
  :global(body) {
    padding: 0;
  }

  main {
    width: 100%;
    height: 100%;
  }

  .active-route {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<main>
  {#if route === 'active'}
    <div
      class="active-route"
      out:fly={{ y: 5, duration: 250 }}
      in:fly={{ y: 5, duration: 250, delay: 500 }}>
      <ActiveTask {activeTask} {interruptActiveTask} {handlePause} />
    </div>
  {:else if route === 'create'}
    <div
      class="active-route"
      out:fly={{ y: 5, duration: 250 }}
      in:fly={{ y: 5, duration: 250, delay: 500 }}>
      <CreateTaskForm {handleCreation} />
    </div>
  {:else if route === 'interrupted'}
    <div
      class="active-route"
      out:fly={{ y: 5, duration: 250 }}
      in:fly={{ y: 5, duration: 250, delay: 500 }}>
      <InterruptedTask {handleInterruption} />
    </div>
  {:else}<span>How did you get here?</span>{/if}
</main>
