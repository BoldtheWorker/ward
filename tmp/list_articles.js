import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Manual .env parsing
const envContent = fs.readFileSync('c:/Users/Barbara Awuitor/Desktop/htu_dir_proj/ward/.env', 'utf8');
const envLines = envContent.split('\n');
const env = {};
envLines.forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

console.log('Target URL:', supabaseUrl);
console.log('Using Key (first 10):', supabaseKey ? supabaseKey.substring(0, 10) : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    console.log('Fetching articles from Supabase...');
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, created_at, slug')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('Articles found:');
    data.forEach(a => {
      console.log(`[${a.id}] ${a.title} (${a.created_at})`);
    });
  } catch (err) {
    console.error('Failure:', err.message);
  }
}

run();
