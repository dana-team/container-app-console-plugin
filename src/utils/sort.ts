import { SortByDirection } from '@patternfly/react-table';
import { K8sResourceCommon } from 'src/types/k8sResourceCommon';

export const columnMappings = {
  Name: (obj: K8sResourceCommon) => obj.metadata.name || '',
  Namespace: (obj: K8sResourceCommon) => obj.metadata.namespace || '',
  State: (obj: K8sResourceCommon) => obj.spec?.state || '',
  'Scale Metric': (obj: K8sResourceCommon) => obj.spec?.scaleMetric || '',
  Created: (obj: K8sResourceCommon) => obj.metadata.creationTimestamp || '',
};

export const compareValues = (a: string, b: string, direction: 'asc' | 'desc'): number => {
  if (a < b) {
    return direction === SortByDirection.asc ? -1 : 1;
  }
  if (a > b) {
    return direction === SortByDirection.asc ? 1 : -1;
  }
  return 0;
};

export const getValue = (
  obj: K8sResourceCommon,
  columnKey: keyof typeof columnMappings,
): string => {
  return columnMappings[columnKey](obj);
};
