import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID environment variable');
}

export default createClient({
  projectId,
  dataset,
  apiVersion: '2025-06-08',
  useCdn: true,
});
