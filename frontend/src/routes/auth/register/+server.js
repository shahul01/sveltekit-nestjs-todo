import { supabase } from '$lib/supabase/index';
import { json } from '@sveltejs/kit';


export async function POST({ request }) {

  const { email, password } = await request.json();
  let statusMessage = '';

  const { data, error } = await supabase.auth
    .signUp({ email, password });

  console.log(`data: `, data.user?.email);

  if (error) {
    console.error('Error registering: ', error.message);
    statusMessage = `Failed to register user. ${error.message}`;
  } else {
    statusMessage = `Successfully registered user with email ${data.user?.email}`;
  };

  console.log(`${statusMessage}: `, data);

  return json({ message: statusMessage });
};
