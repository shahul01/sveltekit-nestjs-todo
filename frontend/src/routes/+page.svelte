<script>
  import { base } from '$app/paths'
  import { nanoid } from 'nanoid';
  import { onMount } from 'svelte';

  let newTodoTitle = '';

  /** @type {import('$lib/types').Todo[]} */
  $: todos = [];
  $: isTokenStored = false;

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

  function checkToken() {
    isTokenStored = !!localStorage.getItem('token');
  };

  function handleLogout() {
    localStorage.removeItem('token');
    checkToken();
  };

  onMount(() => {
    loadTodos();
    checkToken();

  });


</script>

{#if isTokenStored}
  <button type='button' on:click={handleLogout}>Logout</button>
{:else}
  <a href='/auth/login'>Login</a>
{/if}

<div class="app">
  <h1>Todo</h1>
  {#if isTokenStored && todos.length}
    <div class="form-todo-list">
      <form on:submit|preventDefault={handleAddTodo}>

        <input
          type="text"
          bind:value={newTodoTitle}
          placeholder="Add todo"
          required
        />
        <button type="submit">Add</button>

      </form>
      <div class="todo-list">
        {#each todos as currTodo (currTodo.id)}
          <div class="todo">{currTodo.title}</div>
        {/each}

      </div>
    </div>
  {:else}
    <p>
      <em>Login to create and list todos</em>
    </p>
  {/if}

</div>

<style>

  button {
    cursor: pointer;
    user-select: none;
  }

  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90dvh;
    /* width: 10rem; */
  }

  .form-todo-list {
    width: auto;
  }

  form {
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  form > input {
    min-width: 80%;
  }

  .todo-list {
    padding: 0.5rem 0;
    overflow: auto;
    max-height: 80dvh;
    max-width: 30dvw;
  }

</style>
