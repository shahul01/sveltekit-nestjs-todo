import { json } from '@sveltejs/kit';
import { BACKEND_BASEURL } from '$env/static/private';


/**
 * @type { import('./$types').RequestHandler }
 * */
export async function GET() {
  const getTodos =  await fetch(`http://${BACKEND_BASEURL}/todos`);
  /** @type { import('$lib/types').Todo[] } */
  const resTodos = await getTodos.json();

  return json({ data: resTodos });

};

// /** @param {string} todoPayload */
export async function POST({ request }) {

  const addTodoPayloadRaw = await request.json();
  const addTodoPayload = JSON.stringify( addTodoPayloadRaw );

  const addTodos = await fetch(`http://${BACKEND_BASEURL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: addTodoPayload
  });

  const resAddTodos= await addTodos.text();
  return json({response:resAddTodos});
};
