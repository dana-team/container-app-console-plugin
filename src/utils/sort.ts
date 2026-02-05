import { SortByDirection } from '@patternfly/react-table';
import { Condition } from 'src/types/condition';
import { K8sResourceCommon } from 'src/types/k8sResourceCommon';

export const cappTableColumnMappings = {
  Name: (obj: K8sResourceCommon) => obj.metadata.name || '',
  Namespace: (obj: K8sResourceCommon) => obj.metadata.namespace || '',
  State: (obj: K8sResourceCommon) => obj.spec?.state || '',
  'Scale Metric': (obj: K8sResourceCommon) => obj.spec?.scaleMetric || '',
  Created: (obj: K8sResourceCommon) => obj.metadata.creationTimestamp || '',
};

export const conditionTableColumnMappings = {
  Source: (obj: Condition) => obj.source || '',
  Type: (obj: Condition) => obj.type || '',
  Status: (obj: Condition) => obj.status || '',
  Updated: (obj: Condition) => obj?.lastTransitionTime || '',
  Reason: (obj: Condition) => obj?.reason || '',
  Message: (obj: Condition) => obj?.message || '',
};

export const getCappTableValues = (
  obj: K8sResourceCommon,
  columnKey: keyof typeof cappTableColumnMappings,
): string => {
  return cappTableColumnMappings[columnKey](obj);
};

export const getConditionTableValues = (
  obj: Condition,
  columnKey: keyof typeof conditionTableColumnMappings,
): string => {
  return conditionTableColumnMappings[columnKey](obj);
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
