import { useMemo, useState } from 'react';
import { useActiveNamespace, useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { K8sResourceCommon } from 'src/types/k8sResourceCommon';
import { ALL_NAMESPACES, CappGroupVersionKind } from '../consts';
import { cappTableColumnMappings, compareValues, getCappTableValues } from '../utils/sort';
import { useDebounce } from './useDebounce';

export const useCappTableDataGenerator = (columns: string[]) => {
  const [sortBy, setSortBy] = useState<{ index: number; direction: 'asc' | 'desc' }>({
    index: 0,
    direction: 'asc',
  });

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  const [ns] = useActiveNamespace();
  const namespace = ns === ALL_NAMESPACES ? undefined : ns;

  const [capps, loaded, error] = useK8sWatchResource<K8sResourceCommon[]>({
    groupVersionKind: CappGroupVersionKind,
    isList: true,
    namespace,
  });

  const onSort = (_event, columnIndex: number, direction: 'asc' | 'desc') => {
    setSortBy({ index: columnIndex, direction });
  };

  const handleSearchInputChange = (_evt, value: string) => {
    setSearchValue(value);
  };

  const filteredData = useMemo(() => {
    const search = debouncedSearch.toLowerCase();
    return (capps ?? []).filter((obj) => (obj.metadata?.name ?? '').toLowerCase().includes(search));
  }, [capps, debouncedSearch]);

  const sortedData = useMemo(() => {
    const colKey = columns[sortBy.index] as keyof typeof cappTableColumnMappings;

    return [...filteredData].sort((a, b) => {
      const aValue = getCappTableValues(a, colKey);
      const bValue = getCappTableValues(b, colKey);
      return compareValues(aValue, bValue, sortBy.direction);
    });
  }, [filteredData, columns, sortBy]);

  return {
    sortedData,
    capps,
    searchValue,
    setSearchValue,
    handleSearchInputChange,
    sortBy,
    onSort,
    loaded,
    error,
  };
};

export default useCappTableDataGenerator;
