import homeData from '@/data/home.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Linkedin, GraduationCap, Github, Twitter, ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="container max-w-6xl">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {homeData.greeting}{' '}
            <span className="text-primary">{homeData.name}</span>
            {homeData.pronunciation && (
              <span className="text-muted-foreground font-normal text-2xl">
                {' '}({homeData.pronunciation})
              </span>
            )}
            .
          </h1>
          
          <div className="flex items-center gap-2 text-lg text-muted-foreground">
            <Badge variant="secondary" className="text-sm">
              {homeData.title}
            </Badge>
            <span>{homeData.atLabel}</span>
            <span className="font-medium">{homeData.institution}</span>
          </div>
        </div>

        <Separator />

        {/* Bio Section with Profile Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6 prose prose-slate max-w-none">
            {homeData.bio.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-base md:text-lg leading-7 text-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-4">
              {/* Profile Image */}
              <div className="w-64 h-64 mx-auto md:mx-0 overflow-hidden rounded-lg shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={homeData.images.profile}
                  alt={homeData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Social Links */}
              {homeData.social && (
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {homeData.social.email && (
                    <a
                      href={`mailto:${homeData.social.email}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                      aria-label="Email"
                      title={homeData.social.email}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {homeData.social.linkedin && (
                    <a
                      href={homeData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {homeData.social.googleScholar && (
                    <a
                      href={homeData.social.googleScholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-200 hover:scale-110"
                      aria-label="Google Scholar"
                    >
                      <GraduationCap className="w-5 h-5" />
                    </a>
                  )}
                  {homeData.social.github && (
                    <a
                      href={homeData.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/10 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:scale-110 dark:bg-gray-200/10 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {homeData.social.twitter && (
                    <a
                      href={homeData.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500/10 text-sky-600 hover:bg-sky-500 hover:text-white transition-all duration-200 hover:scale-110"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {homeData.social.orcid && (
                    <a
                      href={homeData.social.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600/10 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 hover:scale-110"
                      aria-label="ORCID"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
