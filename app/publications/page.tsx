'use client';

import { useState, useMemo } from 'react';
import publicationsData from '@/data/publications.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Filter, TrendingUp, FileText, Calendar } from 'lucide-react';

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

  // Group by year for display
  const publicationsByYear = useMemo(() => {
    const grouped: Record<string, typeof filteredPublications> = {};
    filteredPublications.forEach(pub => {
      const year = pub.year || 'Unknown';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(pub);
    });
    return grouped;
  }, [filteredPublications]);

  const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b.localeCompare(a));

  // Calculate statistics for charts
  const stats = useMemo(() => {
    const allPubs = publicationsData.publications;
    
    // Citations by year
    const citationsByYear: Record<string, number> = {};
    allPubs.forEach(pub => {
      const year = pub.year || 'Unknown';
      citationsByYear[year] = (citationsByYear[year] || 0) + (pub.citations || 0);
    });

    // Publications by year
    const pubsByYear: Record<string, number> = {};
    allPubs.forEach(pub => {
      const year = pub.year || 'Unknown';
      pubsByYear[year] = (pubsByYear[year] || 0) + 1;
    });

    // Publications by type
    const pubsByType: Record<string, number> = {};
    allPubs.forEach(pub => {
      const type = pub.type || 'article';
      pubsByType[type] = (pubsByType[type] || 0) + 1;
    });

    const totalCitations = allPubs.reduce((sum, pub) => sum + (pub.citations || 0), 0);
    const averageCitations = allPubs.length > 0 ? totalCitations / allPubs.length : 0;

    return {
      citationsByYear,
      pubsByYear,
      pubsByType,
      totalCitations,
      averageCitations: Math.round(averageCitations * 10) / 10,
      totalPublications: allPubs.length,
    };
  }, []);

  // Chart helpers
  const maxCitations = Math.max(...Object.values(stats.citationsByYear), 1);
  const maxPubs = Math.max(...Object.values(stats.pubsByYear), 1);
  const maxPubsByType = Math.max(...Object.values(stats.pubsByType), 1);

  const sortedYearsForChart = Object.keys(stats.citationsByYear).sort((a, b) => a.localeCompare(b));

  return (
    <div className="container max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {publicationsData.title}
          </h1>
          {publicationsData.description && (
            <p className="text-muted-foreground text-lg">{publicationsData.description}</p>
          )}
        </div>

        <Separator />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{publicationsData.labels.statistics.totalPublications}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalPublications}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{publicationsData.labels.statistics.totalCitations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCitations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{publicationsData.labels.statistics.avgCitations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.averageCitations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{publicationsData.labels.statistics.yearsActive}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Object.keys(stats.pubsByYear).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Citations by Year Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {publicationsData.labels.charts.citationsByYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                  {sortedYearsForChart.map((year, index) => {
                    const citations = stats.citationsByYear[year] || 0;
                    const height = (citations / maxCitations) * 200;
                    const x = (index / (sortedYearsForChart.length - 1 || 1)) * 350 + 25;
                    const barWidth = 350 / sortedYearsForChart.length - 10;
                    const y = 220 - height;
                    
                    return (
                      <g key={year}>
                        <rect
                          x={x - barWidth / 2}
                          y={y}
                          width={barWidth}
                          height={height}
                          fill="hsl(var(--primary))"
                          className="hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x}
                          y={235}
                          textAnchor="middle"
                          className="text-xs fill-muted-foreground"
                          fontSize="12"
                        >
                          {year}
                        </text>
                        <text
                          x={x}
                          y={y - 5}
                          textAnchor="middle"
                          className="text-xs fill-foreground font-medium"
                          fontSize="11"
                        >
                          {citations}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Publications by Type Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {publicationsData.labels.charts.publicationsByType}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                  {Object.entries(stats.pubsByType).map(([type, count], index) => {
                    const height = (count / maxPubsByType) * 180;
                    const x = (index / (Object.keys(stats.pubsByType).length - 1 || 1)) * 350 + 25;
                    const barWidth = 350 / Object.keys(stats.pubsByType).length - 20;
                    const y = 220 - height;
                    
                    return (
                      <g key={type}>
                        <rect
                          x={x - barWidth / 2}
                          y={y}
                          width={barWidth}
                          height={height}
                          fill="hsl(var(--chart-2))"
                          className="hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x}
                          y={235}
                          textAnchor="middle"
                          className="text-xs fill-muted-foreground capitalize"
                          fontSize="12"
                        >
                          {type}
                        </text>
                        <text
                          x={x}
                          y={y - 5}
                          textAnchor="middle"
                          className="text-xs fill-foreground font-medium"
                          fontSize="11"
                        >
                          {count}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {publicationsData.labels.filters.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{publicationsData.labels.filters.type}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedType === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {publicationsData.labels.filters.all}
                  </button>
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type as PublicationType)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                        selectedType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {publicationsData.labels.filters.year}
                </span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-1.5 rounded-md text-sm border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">{publicationsData.labels.filters.allYears}</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Citations Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCitations(!showCitations)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    showCitations
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {publicationsData.labels.filters.withCitationsOnly}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Publications List */}
        <div className="space-y-8">
          {sortedYears.length === 0 ? (
            <p className="text-muted-foreground">No publications match the selected filters.</p>
          ) : (
            sortedYears.map((year) => (
              <div key={year} className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                  {year}
                  <Badge variant="secondary" className="text-sm">
                    {publicationsByYear[year].length} {publicationsByYear[year].length === 1 ? publicationsData.labels.list.publication : publicationsData.labels.list.publications}
                  </Badge>
                </h2>
                
                <div className="space-y-4">
                  {publicationsByYear[year].map((pub, index) => (
                    <Card key={index} className="transition-all hover:shadow-md">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start gap-2 flex-wrap">
                              {pub.type === 'presentation' && (
                                <Badge variant="outline" className="text-xs">
                                  Presentation
                                </Badge>
                              )}
                              {pub.citations !== undefined && (
                                <Badge variant="secondary" className="text-xs">
                                  {pub.citations} {pub.citations === 1 ? 'citation' : 'citations'}
                                </Badge>
                              )}
                            </div>
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
                            <p className="text-muted-foreground">
                              <span className="font-medium">{pub.venue}</span>
                              {pub.location && (
                                <> · <span>{pub.location}</span></>
                              )}
                            </p>
                            {pub.authors && (
                              <p className="text-sm text-muted-foreground">{pub.authors}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
