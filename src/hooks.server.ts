import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
    cookieOptions: {
      domain: 'www.golfpad.xyz',  // match your domain exactly
      sameSite: 'none',
      secure: true
    }
  });

  const { data: { session } } = await event.locals.supabase.auth.getSession();
  event.locals.session = session;

  //TODO: Example route protection:
  if (!session && event.url.pathname.startsWith('/private')) {
    throw redirect(303, '/auth');
  }

  if (session && event.url.pathname === '/auth') {
    throw redirect(303, '/private');
  }

  return resolve(event);
};