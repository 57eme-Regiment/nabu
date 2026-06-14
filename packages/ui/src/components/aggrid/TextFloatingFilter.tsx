import { IconFilterX } from '@tabler/icons-react';
import type { IFloatingFilterParams, TextFilterModel } from 'ag-grid-community';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

export const TextFloatingFilter = forwardRef(
  (params: IFloatingFilterParams, ref) => {
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
        params.api.removeEventListener(
          'displayedColumnsChanged',
          onColStateChanged,
        );
      };
    }, [params.api, onColStateChanged]);

    useImperativeHandle(ref, () => ({
      onParentModelChanged(parentModel: TextFilterModel | null) {
        if (parentModel == null) {
          setInputDisabled(false);
          setCurrentValue('');
        } else if (parentModel.type === 'blank') {
          setInputDisabled(true);
          setCurrentValue(t('Global.Aggrid.Input.vide'));
        } else if (parentModel.type === 'notBlank') {
          setInputDisabled(true);
          setCurrentValue(t('Global.Aggrid.Input.nonVide'));
        } else {
          setInputDisabled(false);
          setCurrentValue(`${parentModel.filter}`);
        }
      },
    }));

    const onInputBoxChanged = (value: string) => {
      setCurrentValue(value);
      params.parentFilterInstance(
        (instance: {
          onFloatingFilterChanged: (type: string, value: string) => void;
        }) => {
          instance.onFloatingFilterChanged('contains', value);
        },
      );
    };

    const clearFilters = () => {
      params.api.setFilterModel(null);
    };

    return (
      <div className="ag-wrapper ag-input-wrapper ag-text-field-input-wrapper">
        <input
          value={currentValue}
          disabled={inputDisabled}
          min={0}
          className="ag-input-field-input ag-text-field-input"
          onChange={e => onInputBoxChanged(e.target.value)}
        />
        {isLastColumn && (
          <button
            onClick={clearFilters}
            className="mx-1 size-[22px] min-w-[22px] rounded bg-primary text-primary-foreground flex items-center justify-center">
            <IconFilterX size={14} />
          </button>
        )}
      </div>
    );
  },
);
