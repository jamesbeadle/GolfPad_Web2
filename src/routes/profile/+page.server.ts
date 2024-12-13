// +page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { supabase, session } = locals;

  if (!session) {
    throw error(401, 'Not authenticated');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error(profileError);
    throw error(500, 'Error loading profile');
  }

  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, name')
    .order('name', { ascending: true });

  if (coursesError) {
    console.error(coursesError);
    throw error(500, 'Error loading courses');
  }

  // Return only serializable data:
  return {
    profile: profile ?? null,
    courses: courses ?? [],
    userId: session.user.id // if you need the userId on the client
  };
};