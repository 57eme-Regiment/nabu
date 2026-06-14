import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconFilterX } from '@tabler/icons-react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, } from 'react';
import { useTranslation } from 'react-i18next';
export const TextFloatingFilter = forwardRef((params, ref) => {
    const [currentValue, setCurrentValue] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [isLastColumn, setIsLastColumn] = useState(false);
    const { t } = useTranslation();
    const onColStateChanged = useCallback(() => {
        const allColumns = params.api.getAllDisplayedColumns();
        const lastColumn = allColumns[allColumns.length - 1];
        setIsLastColumn(params.column.getId() === lastColumn?.getId());
    }, [params.api, params.column]);
    useEffect(() => {
        params.api.addEventListener('displayedColumnsChanged', onColStateChanged);
        onColStateChanged();
        return () => {
            params.api.removeEventListener('displayedColumnsChanged', onColStateChanged);
        };
    }, [params.api, onColStateChanged]);
    useImperativeHandle(ref, () => ({
        onParentModelChanged(parentModel) {
            if (parentModel == null) {
                setInputDisabled(false);
                setCurrentValue('');
            }
            else if (parentModel.type === 'blank') {
                setInputDisabled(true);
                setCurrentValue(t('Global.Aggrid.Input.vide'));
            }
            else if (parentModel.type === 'notBlank') {
                setInputDisabled(true);
                setCurrentValue(t('Global.Aggrid.Input.nonVide'));
            }
            else {
                setInputDisabled(false);
                setCurrentValue(`${parentModel.filter}`);
            }
        },
    }));
    const onInputBoxChanged = (value) => {
        setCurrentValue(value);
        params.parentFilterInstance((instance) => {
            instance.onFloatingFilterChanged('contains', value);
        });
    };
    const clearFilters = () => {
        params.api.setFilterModel(null);
    };
    return (_jsxs("div", { className: "ag-wrapper ag-input-wrapper ag-text-field-input-wrapper", children: [_jsx("input", { value: currentValue, disabled: inputDisabled, min: 0, className: "ag-input-field-input ag-text-field-input", onChange: e => onInputBoxChanged(e.target.value) }), isLastColumn && (_jsx("button", { onClick: clearFilters, className: "mx-1 size-[22px] min-w-[22px] rounded bg-primary text-primary-foreground flex items-center justify-center", children: _jsx(IconFilterX, { size: 14 }) }))] }));
});
