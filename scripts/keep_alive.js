import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
const envFile = path.resolve('c:/Users/Barbara Awuitor/Desktop/htu_dir_proj/ward/.env');
const envContent = fs.readFileSync(envFile, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  console.log(`[${new Date().toISOString()}] Pinging Supabase: ${supabaseUrl}`);
  
  try {
    // Simple query to keep the project active
    const { data, error } = await supabase
      .from('articles')
      .select('id')
      .limit(1);

    if (error) {
      console.warn('Ping completed with warning (expected if table exists):', error.message);
    } else {
      console.log('Ping successful. Project is active.');
    }
  } catch (err) {
    console.error('Ping failed:', err.message);
  }
}

keepAlive();
