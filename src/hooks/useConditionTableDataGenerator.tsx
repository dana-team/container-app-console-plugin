import { useMemo, useState } from 'react';
import {
  conditionTableColumnMappings,
  compareValues,
  getConditionTableValues,
} from '../utils/sort';
import { Condition } from 'src/types/condition';

export const useConditionTableDataGenerator = (columns: string[], conditions: Condition[]) => {
  const [sortBy, setSortBy] = useState<{ index: number; direction: 'asc' | 'desc' }>({
    index: 0,
    direction: 'asc',
  });

  const onSort = (_event, columnIndex: number, direction: 'asc' | 'desc') => {
    setSortBy({ index: columnIndex, direction });
  };

  const sortedData = useMemo(() => {
    const colKey = columns[sortBy.index] as keyof typeof conditionTableColumnMappings;

    return [...conditions].sort((a, b) => {
      const aValue = getConditionTableValues(a, colKey);
      const bValue = getConditionTableValues(b, colKey);
      return compareValues(aValue, bValue, sortBy.direction);
    });
  }, [conditions, columns, sortBy]);

  return {
    sortedData,
    conditions,
    sortBy,
    onSort,
  };
};

export default useConditionTableDataGenerator;
