<script lang="ts">
  import CreateTaskForm from './containers/Create/Form.svelte';

  const handleCreate = (value: string) => {
    console.log(value);
  };
</script>

<style>
  main {
    max-width: 100%;
  }
</style>

<main>
  <CreateTaskForm {handleCreate} />
</main>
