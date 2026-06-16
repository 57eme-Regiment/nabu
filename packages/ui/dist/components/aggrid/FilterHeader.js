import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@57eme-regiment/nabu-frontend-utils';
import { IconArrowDown, IconArrowUp, IconArrowsUpDown, } from '@tabler/icons-react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, } from 'react';
import { Input } from '../../ui/input';
const getFilterModel = (filter, value) => {
    if (filter === 'agNumberColumnFilter')
        return { filterType: 'number', type: 'equals', filter: Number(value) };
    return { filterType: 'text', type: 'contains', filter: value };
};
export const FilterHeader = forwardRef(({ className: classNameProp, ...params }, ref) => {
    const [sortState, setSortState] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const colDef = params.column.getColDef();
    const colFilter = colDef.filter;
    const customParams = colDef.headerComponentParams;
    const className = classNameProp ?? customParams?.className;
    const hasFilter = !!colFilter;
    const isNumber = colFilter === 'agNumberColumnFilter';
    const onSortChanged = useCallback(() => {
        setSortState(params.column.getSort() ?? null);
    }, [params.column]);
    const onFilterChanged = useCallback(() => {
        const model = params.api.getColumnFilterModel(params.column);
        if (!model)
            setFilterValue('');
    }, [params.api, params.column]);
    useEffect(() => {
        params.column.addEventListener('sortChanged', onSortChanged);
        params.api.addEventListener('filterChanged', onFilterChanged);
        onSortChanged();
        return () => {
            params.column.removeEventListener('sortChanged', onSortChanged);
            params.api.removeEventListener('filterChanged', onFilterChanged);
        };
    }, [params.column, params.api, onSortChanged, onFilterChanged]);
    useImperativeHandle(ref, () => ({ refresh: () => true }));
    const onSortClick = () => {
        const next = sortState === null ? 'asc' : sortState === 'asc' ? 'desc' : null;
        params.setSort(next, false);
    };
    const onInputChange = async (value) => {
        setFilterValue(value);
        await params.api.setColumnFilterModel(params.column, value ? getFilterModel(colFilter, value) : null);
        params.api.onFilterChanged();
    };
    const SortIcon = sortState === 'asc'
        ? IconArrowUp
        : sortState === 'desc'
            ? IconArrowDown
            : IconArrowsUpDown;
    return (_jsxs("div", { className: "flex flex-col w-full h-full justify-center gap-0.5 py-1", children: [_jsxs("div", { className: cn('flex items-center gap-1 cursor-pointer select-none', className), onClick: onSortClick, children: [_jsx("span", { className: "font-semibold truncate flex-1", children: params.displayName }), params.enableSorting && (_jsx(SortIcon, { className: cn('size-4 shrink-0', sortState ? 'text-foreground' : 'text-muted-foreground') }))] }), hasFilter && (_jsx(Input, { value: filterValue, type: isNumber ? 'number' : 'text', onChange: e => onInputChange(e.target.value), placeholder: "Filter...", className: "w-full rounded-xl border border-input bg-transparent text-xs outline-none placeholder:text-muted-foreground", onClick: e => e.stopPropagation() }))] }));
});
