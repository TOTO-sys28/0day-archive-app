export function downloadExploit(exploit: {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  cves: string[];
  cve_id: string | null;
}) {
  // Create the file content
  const fileContent = `# Exploit #${exploit.id}
# Title: ${exploit.title}
# Author: ${exploit.author}
# Date: ${exploit.date}
# Category: ${exploit.category}
${exploit.cve_id ? `# CVE: ${exploit.cve_id}` : ''}
${exploit.cves.length > 0 ? `# CVEs: ${exploit.cves.join(', ')}` : ''}
# Source: 0day.sigma Archive
# Educational Use Only

${'='.repeat(50)}

${exploit.content}

${'='.repeat(50)}
# End of Exploit #${exploit.id}
# Downloaded from 0day.sigma Archive
# Educational Use Only - Use responsibly
`;

  // Create filename
  const sanitizedTitle = exploit.title
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
  
  const filename = `exploit_${exploit.id}_${sanitizedTitle}.txt`;

  // Create and trigger download
  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
}

export function downloadAllExploits(exploits: Array<{
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  cves: string[];
  cve_id: string | null;
}>) {
  // Create a zip-like structure (multiple files in one)
  const fileContent = exploits.map(exploit => {
    return `# Exploit #${exploit.id}
# Title: ${exploit.title}
# Author: ${exploit.author}
# Date: ${exploit.date}
# Category: ${exploit.category}
${exploit.cve_id ? `# CVE: ${exploit.cve_id}` : ''}
${exploit.cves.length > 0 ? `# CVEs: ${exploit.cves.join(', ')}` : ''}
# Source: 0day.sigma Archive
# Educational Use Only

${'='.repeat(50)}

${exploit.content}

${'='.repeat(50)}
# End of Exploit #${exploit.id}

${'='.repeat(80)}

`;
  }).join('\n');

  const filename = `exploits_batch_${exploits.length}_items.txt`;
  
  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
