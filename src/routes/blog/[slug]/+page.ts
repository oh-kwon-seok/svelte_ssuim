import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  if (params.slug === 'hello-world') {
    return {
      title: 'error',
     
    };
  }
 
  throw error(404, 'Not found');
}) satisfies PageLoad;