export interface Exploit {
  id: number;
  title: string;
  author: string;
  date: string;
  date_parsed: number;
  cves: string[];
  cve_id: string | null;
  category: string;
  platform: string | null;
  source: string;
  content: string;
  content_preview: string;
}

export interface ArchiveStats {
  total_exploits: number;
  categories: string[];
  authors: string[];
  cves: string[];
  years: number[];
  category_counts: Record<string, number>;
  year_counts: Record<string, number>;
  author_counts: Record<string, number>;
}

export interface SearchFilters {
  query: string;
  category: string;
  author: string;
  cve: string;
  year: string;
}

export interface TableColumn {
  key: keyof Exploit;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
}
