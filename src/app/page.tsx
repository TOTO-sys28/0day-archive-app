'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { ExploitTable } from '@/components/ExploitTable';
import { ParticleBackground } from '@/components/ParticleBackground';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { downloadAllExploits } from '@/lib/download';
import { useExploits } from '@/hooks/useExploits';
import { SearchFilters } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    author: '',
    cve: '',
    year: ''
  });

  const {
    exploits,
    stats,
    loading,
    error,
    pagination,
    setPage,
    setFilters: setFiltersOptimized,
    setSorting
  } = useExploits(filters);

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setFiltersOptimized({ ...filters, ...newFilters });
  };

  const handleSort = (column: keyof Exploit, order: 'asc' | 'desc') => {
    setSorting(column, order);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-8 bg-muted rounded animate-pulse"></div>
                      <div className="h-8 bg-muted rounded animate-pulse"></div>
                      <div className="h-8 bg-muted rounded animate-pulse"></div>
                      <div className="h-8 bg-muted rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content skeleton */}
            <div className="lg:col-span-3">
              <LoadingSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Data</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">0day.sigma Archive</h1>
              <p className="text-muted-foreground mt-1">
                Historical exploits and vulnerability research from the underground security community
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Powered by FullHunt</div>
              <div>Educational Use Only</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <StatsPanel stats={stats} filteredCount={pagination.totalItems} />
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={stats.categories}
              authors={stats.authors}
              years={stats.years}
              stats={stats}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Search Exploits</CardTitle>
              </CardHeader>
              <CardContent>
                <SearchBar
                  value={filters.query}
                  onChange={(value) => handleFilterChange({ query: value })}
                  placeholder="Search by title, author, CVE, or content..."
                />
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Exploits ({pagination.totalItems.toLocaleString()})
                </h2>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAllExploits(exploits)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Page ({exploits.length})
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                </div>
        </div>

              <ExploitTable
                exploits={exploits}
                onSort={handleSort}
                className="card-glow"
              />

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, pagination.page - 1))}
                    disabled={!pagination.hasPrev}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {/* Show first page */}
                    {pagination.page > 3 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(1)}
                        >
                          1
                        </Button>
                        {pagination.page > 4 && <span className="text-muted-foreground">...</span>}
                      </>
                    )}
                    
                    {/* Show pages around current page */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let page;
                      if (pagination.totalPages <= 5) {
                        page = i + 1;
                      } else if (pagination.page <= 3) {
                        page = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        page = pagination.totalPages - 4 + i;
                      } else {
                        page = pagination.page - 2 + i;
                      }
                      
                      if (page < 1 || page > pagination.totalPages) return null;
                      
                      return (
                        <Button
                          key={page}
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    {/* Show last page */}
                    {pagination.page < pagination.totalPages - 2 && (
                      <>
                        {pagination.page < pagination.totalPages - 3 && <span className="text-muted-foreground">...</span>}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(pagination.totalPages)}
                        >
                          {pagination.totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(pagination.totalPages, pagination.page + 1))}
                    disabled={!pagination.hasNext}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}