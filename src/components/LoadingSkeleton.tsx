'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>

      {/* Table skeleton */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-0">
            {/* Header skeleton */}
            <div className="border-b p-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse hidden lg:block"></div>
                <div className="h-4 bg-muted rounded animate-pulse hidden xl:block"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Rows skeleton */}
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="border-b p-4">
                <div className="grid grid-cols-6 gap-4">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="h-4 bg-muted rounded animate-pulse hidden lg:block"></div>
                  <div className="h-4 bg-muted rounded animate-pulse hidden xl:block"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
