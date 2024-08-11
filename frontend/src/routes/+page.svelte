<script>

let newTodo = '';
let todos = [
    { id: '1', title: 'Task 1', },
    { id: '2', title: 'Task 2', },
    { id: '3', title: 'Task 3', },
];

function handleAddTodo() {
    const todoToAdd = {
        id: (todos.length + 1).toString(),
        title: newTodo,
    };

    todos = [...todos, todoToAdd];
    newTodo = '';
};


</script>

<h1>Todo</h1>
<input bind:value={newTodo} />
<button type="button" on:click={handleAddTodo}>Add</button>

<div class="todo-list">
    {#each todos as currTodo (currTodo.id)}
        <div class="todo">
            {currTodo.title}
        </div>
    {/each}
</div>
