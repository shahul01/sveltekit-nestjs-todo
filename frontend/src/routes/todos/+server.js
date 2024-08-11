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
