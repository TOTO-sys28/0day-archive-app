'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArchiveStats } from '@/lib/types';
import { Calendar, User, Shield, Code } from 'lucide-react';

interface StatsPanelProps {
  stats: ArchiveStats;
  filteredCount: number;
}

export function StatsPanel({ stats, filteredCount }: StatsPanelProps) {
  const totalExploits = stats.total_exploits;
  const isFiltered = filteredCount !== totalExploits;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Archive Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {isFiltered ? filteredCount.toLocaleString() : totalExploits.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {isFiltered ? 'Filtered' : 'Total'} Exploits
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.categories.length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.authors.length.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Authors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.cves.length.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">CVEs</div>
            </div>
          </div>

          {isFiltered && (
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground text-center">
                Showing {filteredCount.toLocaleString()} of {totalExploits.toLocaleString()} exploits
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.category_counts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm">{category}</span>
                  <Badge variant="secondary">{count.toLocaleString()}</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Year Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <Calendar className="inline h-4 w-4 mr-1" />
            {Math.min(...stats.years)} - {Math.max(...stats.years)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
