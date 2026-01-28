'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navigationData from '@/data/navigation.json';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {navigationData.links.map((link) => {
          const isActive = 
            link.url === '/' 
              ? pathname === '/' 
              : pathname.startsWith(link.url);
          
          const isExternal = link.url.startsWith('http');
          
          if (isExternal) {
            return (
              <li key={link.title}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isActive ? 'active' : ''}
                >
                  {link.title}
                </a>
              </li>
            );
          }

          return (
            <li key={link.title}>
              <Link
                href={link.url}
                className={isActive ? 'active' : ''}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
