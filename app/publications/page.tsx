'use client';

import { useState, useMemo } from 'react';
import publicationsData from '@/data/publications.json';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type PublicationType = 'all' | 'article' | 'presentation';

export default function Publications() {
  const [selectedType, setSelectedType] = useState<PublicationType>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [showCitations, setShowCitations] = useState(false);

  // Get unique years and types
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(publicationsData.publications.map(p => p.year || 'Unknown')));
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, []);

  const types = useMemo(() => {
    return Array.from(new Set(publicationsData.publications.map(p => p.type || 'article')));
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return publicationsData.publications.filter(pub => {
      const typeMatch = selectedType === 'all' || pub.type === selectedType;
      const yearMatch = selectedYear === 'all' || pub.year === selectedYear;
      const citationsMatch = !showCitations || (pub.citations && pub.citations > 0);
      return typeMatch && yearMatch && citationsMatch;
    });
  }, [selectedType, selectedYear, showCitations]);

  // Sort publications by year descending
  const sortedPublications = useMemo(() => {
    return [...filteredPublications].sort((a, b) => 
      (b.year || '').localeCompare(a.year || '')
    );
  }, [filteredPublications]);

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
            <p className="text-muted-foreground">No publications match the selected filters.</p>
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
