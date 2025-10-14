'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchFilters } from '@/lib/types';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  categories: string[];
  authors: string[];
  years: number[];
  stats: any;
}

export function FilterPanel({ 
  filters, 
  onFilterChange, 
  categories, 
  authors, 
  years, 
  stats 
}: FilterPanelProps) {
  const clearFilters = () => {
    onFilterChange({
      query: '',
      category: '',
      author: '',
      cve: '',
      year: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {categories.map(category => (
              <Badge
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFilterChange({ 
                  category: filters.category === category ? '' : category 
                })}
              >
                {category} ({stats.category_counts[category] || 0})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Year Filter */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Year</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {years.slice(-10).reverse().map(year => (
              <Badge
                key={year}
                variant={filters.year === year.toString() ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFilterChange({ 
                  year: filters.year === year.toString() ? '' : year.toString() 
                })}
              >
                {year} ({stats.year_counts[year.toString()] || 0})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Authors */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Authors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-1">
                      {Object.entries(stats.author_counts || {})
              .slice(0, 10)
              .map(([author, count]) => (
                <Badge
                  key={author}
                  variant={filters.author === author ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => onFilterChange({ 
                    author: filters.author === author ? '' : author 
                  })}
                >
                  {author} ({count as number})
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
