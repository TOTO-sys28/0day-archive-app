import { Exploit, ArchiveStats, SearchFilters } from './types';

// Load data at build time
let exploits: Exploit[] = [];
let stats: ArchiveStats | null = null;

export async function loadData() {
  if (exploits.length === 0) {
    try {
      const exploitsData = await import('../../public/data/exploits.json');
      exploits = (exploitsData.default || exploitsData) as Exploit[];
    } catch (error) {
      console.error('Failed to load exploits data:', error);
    }
  }
  return exploits;
}

export async function loadStats() {
  if (!stats) {
    try {
      const statsData = await import('../../public/data/stats.json');
      stats = (statsData.default || statsData) as ArchiveStats;
    } catch (error) {
      console.error('Failed to load stats data:', error);
    }
  }
  return stats;
}

export function searchExploits(exploits: Exploit[], filters: SearchFilters): Exploit[] {
  return exploits.filter(exploit => {
    // Text search across title, author, content, and CVE
    const searchText = filters.query.toLowerCase();
    const matchesText = !filters.query || 
      exploit.title.toLowerCase().includes(searchText) ||
      exploit.author.toLowerCase().includes(searchText) ||
      exploit.content.toLowerCase().includes(searchText) ||
      exploit.cves.some(cve => cve.toLowerCase().includes(searchText)) ||
      (exploit.cve_id && exploit.cve_id.toLowerCase().includes(searchText));

    // Category filter
    const matchesCategory = !filters.category || exploit.category === filters.category;

    // Author filter
    const matchesAuthor = !filters.author || exploit.author === filters.author;

    // CVE filter
    const matchesCve = !filters.cve || 
      exploit.cves.some(cve => cve.toLowerCase().includes(filters.cve.toLowerCase())) ||
      (exploit.cve_id && exploit.cve_id.toLowerCase().includes(filters.cve.toLowerCase()));

    // Year filter
    const matchesYear = !filters.year || 
      (exploit.date && exploit.date.includes(filters.year));

    return matchesText && matchesCategory && matchesAuthor && matchesCve && matchesYear;
  });
}

export function sortExploits(exploits: Exploit[], sortBy: keyof Exploit, sortOrder: 'asc' | 'desc' = 'desc'): Exploit[] {
  return [...exploits].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // Handle null values
    if (aVal === null || aVal === undefined) aVal = '';
    if (bVal === null || bVal === undefined) bVal = '';

    // Handle different data types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
}

export function paginateExploits(exploits: Exploit[], page: number, pageSize: number = 50) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    data: exploits.slice(startIndex, endIndex),
    totalPages: Math.ceil(exploits.length / pageSize),
    currentPage: page,
    totalItems: exploits.length
  };
}

export function getExploitById(exploits: Exploit[], id: number): Exploit | undefined {
  return exploits.find(exploit => exploit.id === id);
}
