import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useMatches } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';
export function Breadcrumb({ translate = key => key }) {
    const matches = useMatches();
    const crumbs = matches.filter(m => m.staticData?.link ||
        m.staticData?.BreadcrumbLabel);
    const lastMatch = matches[matches.length - 1];
    const lastData = lastMatch?.staticData;
    const activeRouteHasData = !!lastData?.link || !!lastData?.BreadcrumbLabel;
    if (crumbs.length <= 1 && activeRouteHasData)
        return null;
    if (crumbs.length === 0)
        return null;
    return (_jsx("nav", { "aria-label": "breadcrumb", children: _jsx("ol", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: crumbs.map((match, index) => {
                const isLast = index === crumbs.length - 1;
                const isActive = isLast && (!activeRouteHasData || match.id === lastMatch?.id);
                const data = match.staticData;
                const { link, BreadcrumbLabel } = data ?? {};
                const params = match.params;
                const Icon = link?.Icon;
                const label = BreadcrumbLabel ? (_jsx(BreadcrumbLabel, { params: params })) : (translate(link?.label ?? ''));
                const content = (_jsxs(_Fragment, { children: [Icon && _jsx(Icon, { className: "size-5 shrink-0" }), label] }));
                return (_jsxs("li", { className: "flex items-center gap-1.5 font-bold text-lg", children: [index > 0 && _jsx(ChevronRightIcon, { className: "size-3.5 shrink-0" }), isActive ? (_jsx("span", { className: "flex items-center gap-1 text-foreground font-medium", children: content })) : (_jsx(Link, { to: match.pathname, className: "flex items-center gap-1 hover:text-foreground transition-colors", children: content }))] }, match.id));
            }) }) }));
}
