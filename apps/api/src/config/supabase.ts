import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

const isConfigured = !!(supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project'));

if (!isConfigured) {
  console.warn('⚠️  Supabase not configured. API is running in High-Fidelity Mock Mode.');
}

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null as any;

export const isDevMode = !isConfigured;
