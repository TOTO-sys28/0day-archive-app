const fs = require('fs');
const path = require('path');

// Configuration
const DATA_DIR = '../../0day-today-archive-main/data';
const OUTPUT_FILE = '../public/data/exploits.json';
const STATS_FILE = '../public/data/stats.json';

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Starting data aggregation...');

// Get all JSON files
const dataDir = path.resolve(__dirname, DATA_DIR);
const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

console.log(`Found ${files.length} JSON files`);

const exploits = [];
const categories = new Set();
const authors = new Set();
const cves = new Set();
const years = new Set();

let processed = 0;
const batchSize = 1000;

// Process files in batches to avoid memory issues
for (let i = 0; i < files.length; i += batchSize) {
  const batch = files.slice(i, i + batchSize);
  
  for (const file of batch) {
    try {
      const filePath = path.join(dataDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Clean and validate data
      const exploit = {
        id: data.id || parseInt(file.replace('.json', '')),
        title: data.title || 'Untitled',
        author: data.author || 'Unknown',
        date: data.date || 'Unknown',
        date_parsed: data.date_parsed || 0,
        cves: data.cves || [],
        cve_id: data.cve_id || null,
        category: data.category || 'other',
        platform: data.platform || null,
        source: data.source || '0day.today',
        content: data.content || '',
        // Add truncated content for table display
        content_preview: data.content ? data.content.substring(0, 200) + '...' : ''
      };
      
      exploits.push(exploit);
      
      // Collect unique values for filters
      if (exploit.category) categories.add(exploit.category);
      if (exploit.author) authors.add(exploit.author);
      if (exploit.cves && Array.isArray(exploit.cves)) {
        exploit.cves.forEach(cve => cves.add(cve));
      }
      if (exploit.cve_id) cves.add(exploit.cve_id);
      
      // Extract year from date
      if (exploit.date && exploit.date.includes('/')) {
        const year = exploit.date.split('/')[2];
        if (year && year.length === 4) {
          years.add(parseInt(year));
        }
      }
      
      processed++;
      
      if (processed % 1000 === 0) {
        console.log(`Processed ${processed}/${files.length} files...`);
      }
      
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }
}

// Sort exploits by ID
exploits.sort((a, b) => a.id - b.id);

console.log(`Successfully processed ${exploits.length} exploits`);

// Generate statistics
const stats = {
  total_exploits: exploits.length,
  categories: Array.from(categories).sort(),
  authors: Array.from(authors).sort(),
  cves: Array.from(cves).sort(),
  years: Array.from(years).sort(),
  category_counts: {},
  year_counts: {},
  author_counts: {}
};

// Count by category
exploits.forEach(exploit => {
  const cat = exploit.category || 'other';
  stats.category_counts[cat] = (stats.category_counts[cat] || 0) + 1;
});

// Count by year
exploits.forEach(exploit => {
  if (exploit.date && exploit.date.includes('/')) {
    const year = exploit.date.split('/')[2];
    if (year && year.length === 4) {
      stats.year_counts[year] = (stats.year_counts[year] || 0) + 1;
    }
  }
});

// Count by author (top 50)
const authorCounts = {};
exploits.forEach(exploit => {
  const author = exploit.author || 'Unknown';
  authorCounts[author] = (authorCounts[author] || 0) + 1;
});

stats.author_counts = Object.entries(authorCounts)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 50)
  .reduce((acc, [author, count]) => {
    acc[author] = count;
    return acc;
  }, {});

// Write aggregated data
fs.writeFileSync(path.resolve(__dirname, OUTPUT_FILE), JSON.stringify(exploits, null, 2));
fs.writeFileSync(path.resolve(__dirname, STATS_FILE), JSON.stringify(stats, null, 2));

console.log(`Data aggregation complete!`);
console.log(`- Total exploits: ${stats.total_exploits}`);
console.log(`- Categories: ${stats.categories.length}`);
console.log(`- Authors: ${stats.authors.length}`);
console.log(`- CVEs: ${stats.cves.length}`);
console.log(`- Years: ${stats.years.length}`);
console.log(`- Output: ${path.resolve(__dirname, OUTPUT_FILE)}`);
console.log(`- Stats: ${path.resolve(__dirname, STATS_FILE)}`);
