<script>

let newTodoTitle = '';

/**
 * @typedef { {id:string, title:string} } Todo
 */

 /**
  * @type Todo[]
  */
let todos = [
];

function handleAddTodo() {
  const todoToAdd = {
    id: (todos.length + 1).toString(),
    title: newTodoTitle,
  };

  todos = [...todos, todoToAdd];
  newTodoTitle = '';
};


</script>

<h1>Todo</h1>
<input bind:value={newTodoTitle} />
<button type="button" on:click={handleAddTodo}>Add</button>

<div class="todo-list">
  {#each todos as currTodo (currTodo.id)}
    <div class="todo">
      {currTodo.title}
    </div>
  {/each}
</div>
