'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Fragment } from 'react';
import { BREADCRUMB_LABELS } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  className?: string;
};
export function DynamicBreadcrumb({ className }: Props) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList className={cn('text-md', className)}>
          {/* Accueil */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={'/'} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;
            const label =
              BREADCRUMB_LABELS[segment] ||
              segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
