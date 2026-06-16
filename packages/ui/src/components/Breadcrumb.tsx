import type { NavigationLink } from '@57eme-regiment/nabu-frontend-utils';
import { Link, useMatches } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
import type React from 'react';

type BreadcrumbStaticData = {
  link?: NavigationLink;
  BreadcrumbLabel?: React.ComponentType<{ params: Record<string, string> }>;
};

type BreadcrumbProps = {
  translate?: (key: string) => string;
};

export function Breadcrumb({ translate = key => key }: BreadcrumbProps) {
  const matches = useMatches();

  const crumbs = matches.filter(
    m => (m.staticData as BreadcrumbStaticData)?.link ||
         (m.staticData as BreadcrumbStaticData)?.BreadcrumbLabel,
  );

  const lastMatch = matches[matches.length - 1];
  const lastData = lastMatch?.staticData as BreadcrumbStaticData | undefined;
  const activeRouteHasData = !!lastData?.link || !!lastData?.BreadcrumbLabel;

  if (crumbs.length <= 1 && activeRouteHasData) return null;
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {crumbs.map((match, index) => {
          const isLast = index === crumbs.length - 1;
          const isActive =
            isLast && (!activeRouteHasData || match.id === lastMatch?.id);
          const data = match.staticData as BreadcrumbStaticData;
          const { link, BreadcrumbLabel } = data ?? {};
          const params = match.params as Record<string, string>;
          const Icon = link?.Icon;

          const label = BreadcrumbLabel ? (
            <BreadcrumbLabel params={params} />
          ) : (
            translate(link?.label ?? '')
          );

          const content = (
            <>
              {Icon && <Icon className="size-5 shrink-0" />}
              {label}
            </>
          );

          return (
            <li
              key={match.id}
              className="flex items-center gap-1.5 font-bold text-lg">
              {index > 0 && <ChevronRightIcon className="size-3.5 shrink-0" />}
              {isActive ? (
                <span className="flex items-center gap-1 text-foreground font-medium">
                  {content}
                </span>
              ) : (
                <Link
                  to={match.pathname as never}
                  className="flex items-center gap-1 hover:text-foreground transition-colors">
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
