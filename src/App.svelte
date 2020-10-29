<script lang="ts">
  import CreateTaskForm from './containers/Create/Form.svelte';

  const handleCreation = ({
    text,
    workDuration,
    breakDuration,
  }: {
    text: string;
    workDuration: number;
    breakDuration: number;
  }) => {
    console.log(text, workDuration, breakDuration);
  };
</script>

<style>
  main {
    max-width: 100%;
  }
</style>

<main>
  <CreateTaskForm {handleCreation} />
</main>
