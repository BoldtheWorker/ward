import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lftpnwryizysapqvnhtu.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdHBud3J5aXp5c2FwcXZuaHR1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0MjY4NiwiZXhwIjoyMDkwNzE4Njg2fQ.KV5zOqMhCGLsylB7HDCMLakUUVUfl6abRYNB26MyQBE';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function run() {
  try {
    console.log('List before delete:');
    const { data: before } = await supabase.from('articles').select('id, title');
    console.log(before);

    console.log('Running deletions...');
    
    // Attempt 1: ID
    await supabase.from('articles').delete().eq('id', 'e809311b-cc89-49ed-9686-21820db07671');
    
    // Attempt 2: Title Match
    await supabase.from('articles').delete().ilike('title', '%Digital Frontier%');
    
    // Attempt 3: Slug Match (Approximate)
    await supabase.from('articles').delete().ilike('slug', '%digital-frontier%');

    console.log('List after delete:');
    const { data: after } = await supabase.from('articles').select('id, title');
    console.log(after);

  } catch (err) {
    console.error('Failure:', err.message);
  }
}

run();
