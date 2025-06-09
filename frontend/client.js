import { createClient } from '@sanity/client';

export default createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2025-06-08',
  useCdn: true, // `false` if you want to ensure fresh data
});
