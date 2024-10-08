import { supabase } from '$lib/supabase/index.js';
import { json } from '@sveltejs/kit';


export async function POST({ request }) {

  const { email, password } = await request.json();
  let statusMessage = '';
  let accessToken = '';

  const { data, error } = await supabase.auth
    .signInWithPassword({ email, password });

  console.log(`data: `, data);

  if (error) {
    console.error('Error logging in: ', error.message);
    statusMessage = `Failed to log in user. ${error.message}`;
    accessToken = '';
  } else {
    statusMessage = `Successfully logged in user`;
    accessToken = data.session?.access_token;
  };

  console.log(`${statusMessage}: `, data.user?.email);
  // console.log(data.session.access_token);
  // console.log(data.session.refresh_token);

  return json({ message: statusMessage, accessToken });
};
