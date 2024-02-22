import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://gqksqpvrleidggknqarm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxa3NxcHZybGVpZGdna25xYXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzMjY3MjcsImV4cCI6MjAyMzkwMjcyN30.fJCKcyECFTjEhu09xfy11dqV-9EYr3pOt9yZNu9Lg3E';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
