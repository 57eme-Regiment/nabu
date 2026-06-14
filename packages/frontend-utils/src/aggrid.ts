import { FilterHeader } from '@57eme-regiment/nabu-ui';
import { ColDef, GridOptions } from 'ag-grid-community';

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
} satisfies ColDef;

export const defautGridOption = {
  defaultColDef,
  suppressMovableColumns: true,
  headerHeight: 60,
} satisfies GridOptions;
