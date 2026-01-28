import projectsData from '@/data/projects.json';
import pageConfig from '@/data/page-config.json';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Calendar, Building2, FileText, Presentation, Link as LinkIcon } from 'lucide-react';

export default function ResearchProjects() {
  return (
    <div className="container max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {pageConfig.projects.title}
          </h1>
          
        </div>

        <Separator />

        {/* Projects List */}
        <div className="space-y-12">
          {projectsData.map((project, projectIndex) => (
            <article key={project.id} id={project.id} className="scroll-mt-20">
              <Card className="overflow-hidden">
                <CardHeader className="space-y-4 pb-4">
                  {/* Period Badge */}
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.period}
                    </Badge>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                    {project.title}
                  </CardTitle>

                  {/* Institution */}
                  {project.institution && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm md:text-base">{project.institution}</span>
                    </div>
                  )}
                </CardHeader>

                <Separator />

                <CardContent className="pt-6 space-y-6">
                  {/* Description */}
                  {project.description && (
                    <div className="prose prose-slate max-w-none">
                      <div className="text-base md:text-lg leading-7 text-foreground whitespace-pre-line">
                        {project.description}
                      </div>
                    </div>
                  )}

                  {/* Funding */}
                  {project.funding && (
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.funding}
                      </p>
                    </div>
                  )}

                  {/* Images */}
                  {project.image && (
                    <div className="rounded-lg overflow-hidden border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                      />
                    </div>
                  )}

                  {(project as any).images && (project as any).images.length > 0 && (
                    <div className="space-y-4">
                      {(project as any).images.map((img: { src: string; alt?: string; caption?: string }, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="rounded-lg overflow-hidden border border-border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.src}
                              alt={img.alt || project.title}
                              className="w-full h-auto"
                            />
                          </div>
                          {img.caption && (
                            <p className="text-sm text-muted-foreground italic text-center">
                              {img.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Publications Section */}
                  {project.publications && project.publications.length > 0 && (
                    <div className="space-y-4">
                      <Separator />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5" />
                          {pageConfig.projects.sections.presentationsArticles}
                        </h3>
                        <div className="space-y-3">
                          {project.publications.map((pub, index) => {
                            if (pub.type === 'link') {
                              return (
                                <Card key={index} className="transition-all hover:shadow-md">
                                  <CardContent className="pt-4">
                                    <Link
                                      href={pub.url}
                                      className="text-primary hover:underline font-medium inline-flex items-center gap-2"
                                    >
                                      <LinkIcon className="w-4 h-4" />
                                      {pub.title}
                                    </Link>
                                  </CardContent>
                                </Card>
                              );
                            } else if (pub.type === 'presentation') {
                              return (
                                <Card key={index} className="transition-all hover:shadow-md">
                                  <CardContent className="pt-4">
                                    <div className="flex items-start gap-2 mb-2">
                                      <Badge variant="outline" className="flex items-center gap-1">
                                        <Presentation className="w-3 h-3" />
                                        Presentation
                                      </Badge>
                                    </div>
                                    <a
                                      href={pub.url || '#'}
                                      className="text-primary hover:underline font-semibold text-base block mb-2"
                                      target={pub.url?.startsWith('http') ? '_blank' : undefined}
                                      rel={pub.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                      {pub.title}
                                    </a>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                      <div className="font-medium">{(pub as any).venue}</div>
                                      {(pub as any).location && (
                                        <div>{(pub as any).location}</div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            } else {
                              return (
                                <Card key={index} className="transition-all hover:shadow-md">
                                  <CardContent className="pt-4">
                                    <a
                                      href={pub.url || '#'}
                                      className="text-primary hover:underline font-semibold text-base block mb-2"
                                      target={pub.url?.startsWith('http') ? '_blank' : undefined}
                                      rel={pub.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                      {pub.title}
                                    </a>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                      <div className="font-medium">{(pub as any).venue}</div>
                                      <div className="flex flex-wrap gap-2 items-center">
                                        {(pub as any).location && (
                                          <span>{(pub as any).location}</span>
                                        )}
                                        {(pub as any).year && (
                                          <>
                                            {(pub as any).location && <span>·</span>}
                                            <span>{(pub as any).year}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
