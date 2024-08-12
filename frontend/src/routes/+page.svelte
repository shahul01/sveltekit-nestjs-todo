<script>
  import { base } from '$app/paths'
  import { onMount } from 'svelte';

  let newTodoTitle = '';

  /** @type {import('$lib/types').Todo[]} */
  $: todos = [];
  let isTokenStored = false;

  async function loadTodos() {
    try {
      const token = localStorage.getItem('token');
      const loadingTodos = await fetch(`${base}/todos`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const resLoadingTodos = await loadingTodos.json();
      todos = await resLoadingTodos.data;
      console.log(`todos: `, Array.isArray(todos), todos);
    }  catch (error) {
      console.error(error);
    };
  };

  async function handleAddTodo() {
    try {

      const todoToAdd = { title: newTodoTitle };

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
    } catch (error) {
      console.error(error);
    };

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

<div class="header-form-list">
  <h1>Todo</h1>
  {#if isTokenStored && Array.isArray(todos)}
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

  .header-form-list {
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
