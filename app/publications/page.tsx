'use client';

import { useMemo } from 'react';
import publicationsData from '@/data/publications.json';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Publications() {
  // Sort publications by year descending
  const sortedPublications = useMemo(() => {
    return [...publicationsData.publications].sort((a, b) => 
      (b.year || '').localeCompare(a.year || '')
    );
  }, []);

  return (
    <div className="container max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {publicationsData.title}
          </h1>
        </div>

        <Separator />

        {/* Publications List */}
        <div className="space-y-4">
          {sortedPublications.length === 0 ? (
            <p className="text-muted-foreground">No publications found.</p>
          ) : (
            sortedPublications.map((pub, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      <a
                        href={pub.url || '#'}
                        className="text-primary hover:underline"
                        target={pub.url?.startsWith('http') ? '_blank' : undefined}
                        rel={pub.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {pub.title}
                      </a>
                    </h3>
                    {pub.authors && (
                      <p className="text-sm text-muted-foreground">{pub.authors}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {pub.venue}, {pub.year}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
