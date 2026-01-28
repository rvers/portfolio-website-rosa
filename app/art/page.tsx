'use client';

import { useState } from 'react';
import artData from '@/data/art.json';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Image as ImageIcon, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Art() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = artData.categories;
  const selectedCategoryData = selectedCategory
    ? categories.find((cat) => cat.name === selectedCategory)
    : null;

  const imageCount = selectedCategoryData?.images.length || 0;

  return (
    <div className="container max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {artData.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {artData.description}
          </p>
        </div>

        <Separator />

        {/* Category Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">{artData.labels.categories}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              const categoryImageCount = category.images.length;
              return (
                <button
                  key={category.name}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    )
                  }
                  className={cn(
                    'relative px-4 py-2 rounded-lg border transition-all duration-200',
                    'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <span className="font-medium">{category.name}</span>
                  {categoryImageCount > 0 && (
                    <Badge
                      variant={isActive ? 'secondary' : 'outline'}
                      className={cn(
                        'ml-2',
                        isActive && 'bg-primary-foreground/20 text-primary-foreground'
                      )}
                    >
                      {categoryImageCount}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Gallery Content */}
        {selectedCategoryData ? (
          selectedCategoryData.images.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-2xl font-bold">{selectedCategoryData.name}</h2>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {imageCount} {imageCount === 1 ? artData.labels.image : artData.labels.images}
                </Badge>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedCategoryData.images.map((img: { src: string; alt?: string }, index: number) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border border-border bg-muted/30 hover:shadow-lg transition-all duration-300"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt || `${selectedCategoryData.name} image ${index + 1}`}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    {img.alt && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {img.alt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground text-lg">
                {artData.labels.noImages}
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-12 space-y-4">
            <Filter className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground text-lg">
              {artData.labels.selectCategory}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
