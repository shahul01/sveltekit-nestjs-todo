import { json } from '@sveltejs/kit';
import { BACKEND_BASEURL } from '$env/static/private';


export async function DELETE({ request, params }) {
  const authTokenWithBearerWord = request.headers.get('Authorization') || '';
  const id = params.id;

  const deleteTodo = await fetch(`http://${BACKEND_BASEURL}/todos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': authTokenWithBearerWord }
  });

  if (!deleteTodo.ok) console.error('Error deleting todo. ', deleteTodo.status);
  const resDeleteTodo = await deleteTodo.text();

  console.log(`resDeleteTodo: `, resDeleteTodo);

  return json({ response: resDeleteTodo });
};
