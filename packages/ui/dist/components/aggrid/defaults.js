import { FilterHeader } from './FilterHeader';
export const defaultColDef = {
    sortable: true,
    resizable: false,
    filter: true,
    floatingFilter: false,
    editable: false,
    suppressMovable: true,
    suppressHeaderMenuButton: true,
    suppressHeaderContextMenu: true,
    suppressHeaderFilterButton: true,
    headerComponent: FilterHeader,
};
export const defautGridOption = {
    defaultColDef,
    suppressMovableColumns: true,
    headerHeight: 60,
};
