import { AgColumn, KeyCode, } from 'ag-grid-community';
export const suppressHeaderKeyboardEvent = (params) => {
    if (params.event.key == KeyCode.DOWN) {
        params.event.preventDefault();
        const firstRow = params.api.getDisplayedRowAtIndex(0);
        if (firstRow?.rowIndex != null) {
            if (params.column instanceof AgColumn) {
                params.api?.ensureColumnVisible(params.column);
                params.api?.setFocusedCell(firstRow.rowIndex, params.column);
                return true;
            }
        }
    }
    return false;
};
export const defaultColDef = {
    sortable: true,
    resizable: false,
    filter: true,
    floatingFilter: true,
    editable: false,
    suppressFloatingFilterButton: true,
    headerClass: ['AgGridNoPadding', 'ag-rounded'],
    menuTabs: ['filterMenuTab'],
    suppressHeaderKeyboardEvent: suppressHeaderKeyboardEvent,
};
