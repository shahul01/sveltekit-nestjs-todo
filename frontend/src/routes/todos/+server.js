import { json } from '@sveltejs/kit';
import { BACKEND_BASEURL } from '$env/static/private';


/**
 * @type { import('./$types').RequestHandler }
 * */
export async function GET({ request }) {
  const getTodos =  await fetch(`http://${BACKEND_BASEURL}/todos/`, {
    headers: {'Authorization': request.headers.get('Authorization') || ''}
  });

  /** @type { import('$lib/types').Todo[] } */
  const resTodos = await getTodos.json();

  if (!getTodos.ok) console.error('Error fetching todos. ', getTodos.status);
  return json({ data: resTodos });

};

export async function POST({ request }) {

  const addTodoPayloadRaw = await request.json();
  const addTodoPayload = JSON.stringify( addTodoPayloadRaw );

  const addTodos = await fetch(`http://${BACKEND_BASEURL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': request.headers.get('Authorization') || ''
     },
    body: addTodoPayload
  });

  if (!addTodos.ok) console.error('Error fetching todos. ', addTodos.status);
  const resAddTodos= await addTodos.text();
  return json({response:resAddTodos});

};
