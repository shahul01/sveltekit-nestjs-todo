<script>
  import { base } from '$app/paths'
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';


  /** @type {import('$lib/types').Todo[]} */
  $: todos = [];
  let newTodoTitle = '';

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

  /** @param {string} id*/
  async function handleDelete(id) {
    const token = localStorage.getItem('token');
    try {
      const deleteTodo = await fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const resDeleteTodo = await deleteTodo.json();
      console.log(`resDeleteTodo: `, resDeleteTodo);

      if (deleteTodo.ok) loadTodos();

    } catch (error) {
      console.error(error);
    };
  };

  onMount(() => {
    loadTodos();
  });


</script>


<div class="header-form-list">
  <h1>Todo</h1>
  {#if $authStore.isAuth && Array.isArray(todos)}
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
          <div class="todo">
            <p>{currTodo.title}</p>
            <button type="button" on:click={() => handleDelete(currTodo.id)}>
              <img src="/images/icons/trash.svg" alt="">
            </button>
          </div>
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

  .todo {
    display: flex;
    justify-content: space-between;
    height: 2rem;
    align-items: center;
  }

  .todo img {
    max-height: 1rem;
  }

</style>
