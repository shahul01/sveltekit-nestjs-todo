<script>
  import { base } from '$app/paths'
  import { nanoid } from 'nanoid';
  import { onMount } from 'svelte';

  let newTodoTitle = '';

  /** @type {import('$lib/types').Todo[]} */
  $: todos = [];

  async function loadTodos() {
    const token = localStorage.getItem('token');
    const loadingTodos = await fetch(`${base}/todos`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const resLoadingTodos = await loadingTodos.json();
    todos = await resLoadingTodos.data;
    console.log(`todos: `, Array.isArray(todos), todos);
    return todos;
  };

  async function handleAddTodo() {
    const todoToAdd = {
      id: nanoid(),
      title: newTodoTitle,
      userId: 'added in todos/+server.js'
    };

    const token = localStorage.getItem('token');

    await fetch(`${base}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(todoToAdd)
    });

    newTodoTitle = '';
    await loadTodos();
  };

  onMount(() => {
    loadTodos();

  });


</script>


<h1>Todo</h1>
<!-- {#if todos.length} {/if} -->
<input bind:value={newTodoTitle} />
<button type="button" on:click={handleAddTodo}>Add</button>

<!-- <pre>{JSON.stringify(todos, null, 2)}</pre> -->

<div class="todo-list">
  {#each todos as currTodo (currTodo.id)}
    <div class="todo">
      {currTodo.title}
    </div>
  {/each}
</div>
