import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

// Standard Postgres fallback for local Docker
const postgresUrl = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/clawpm';

const isConfigured = !!(supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project'));

if (!isConfigured) {
  console.warn('⚠️  Supabase Cloud not configured. API is running in local/hybrid mode.');
}

// In a real scenario, we might use a dedicated Postgres driver here, 
// but for the sake of the Supabase-centric monorepo showcase, we'll maintain the client structure.
// If not configured, we might use a mock or a different library.
export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null as any;

export const isDevMode = !isConfigured;
