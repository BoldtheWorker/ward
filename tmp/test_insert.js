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
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    const articleData = {
      title: "Africa's Real Estate Evolution: A $347 Billion Opportunity by 2034",
      slug: "africa-real-estate-market-growth-2034",
      category: "Market Analysis",
      published_date: new Date().toISOString().split('T')[0],
      excerpt: "Explore the rapid urbanization and investment trends driving Africa's real estate market toward a projected $347.31 billion valuation by 2034.",
      content: `# The Rise of African Real Estate: A Strategic Outlook\n\nThe African real estate market is standing at a pivotal crossroads. After reaching a valuation of **USD 233.51 billion in 2025**, the sector is projected to soar to **USD 347.31 billion by 2034**, maintaining a steady Compound Annual Growth Rate (CAGR) of **4.51%**. This growth isn't just about numbers; it's a reflection of a continent in rapid transformation.\n\n## Key Drivers of the Transformation\n\n### 1. Unprecedented Urbanization\nAfrica is home to some of the world's fastest-growing cities. Lagos, Nigeria, for instance, absorbs approximately **300,000 new residents every year**. This influx is creating a massive, sustained demand for:\n* Affordable and middle-income housing.\n* Modern commercial office spaces.\n* Scaled retail infrastructure.\n\n### 2. The Influx of FDI\nForeign Direct Investment (FDI) is a major catalyst. Investors from China, the Gulf States, and Europe are increasingly targeting luxury residential projects and high-end commercial real estate in hubs like Johannesburg, Cape Town, and Nairobi.\n\n### 3. Pioneering Smart Cities\nVisionary projects are redefining the urban landscape. **Egypt’s New Administrative Capital** and **Kenya’s Konza Technopolis** are not just developments; they are blueprints for a sustainable, tech-integrated future in African urban planning.\n\n## Navigating the Challenges\n\nDespite the immense potential, the market faces significant structural hurdles:\n* **Financing Gaps:** Less than 5% of the adult population in Sub-Saharan Africa has access to formal mortgages.\n* **Credit Costs:** In markets like Ghana, mortgage rates often exceed 20%, limiting long-term affordability.\n* **Regulatory Complexity:** Fragmented land tenure systems and varying regulatory maturity across borders remain primary considerations for institutional investors.\n\n## The Bottom Line\n\nFor investors and developers, Africa represents one of the final frontiers of high-yield real estate. While challenges in financing and regulation persist, the underlying fundamentals—population growth and urbanization—make the $347 billion projection not just a forecast, but an inevitability.\n\n*Source: Market Data Forecast*`,
      image_url: "https://images.unsplash.com/photo-1541888941259-7b3b9b47e27e?auto=format&fit=crop&q=80&w=2000"
    };

    console.log('Inserting into articles table...');
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select();

    if (error) throw error;

    console.log('Success! Created article ID:', data[0].id);
  } catch (err) {
    console.error('Failure:', err.message);
  }
}

run();
