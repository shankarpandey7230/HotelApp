import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twlsjmolpmesegsbiumh.supabase.co';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

//  safe to do as row security level was updated in security policies of Supabase or else prefer to process.env and key
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3bHNqbW9scG1lc2Vnc2JpdW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMTI5NzEsImV4cCI6MjAyMjY4ODk3MX0.AIzjDqp3zWAaCcOGpVqWVdMzywqC3RFA54EqQVhLSEE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
