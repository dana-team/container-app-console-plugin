import { Capp } from './types/capp';

export const ALL_NAMESPACES = '#ALL_NS#';
export const DEFAULT_NAMESPACE = 'default';
export const CAPP_TABLE_COLUMNS = ['Name', 'Namespace', 'State', 'Scale Metric', 'Created'];
export const DROPDOWN_CAPACITY_UNITS = { Mi: 'MiB', Gi: 'GiB', Ti: 'TiB' } as const;
export const SCALE_METRIC_OPTIONS = ['concurrency', 'cpu', 'memory', 'rps'] as const;
export const CAPP_STATE_OPTIONS = ['enabled', 'disabled'] as const;
export const CAPP_ROUTE_TLS_OPTIONS = ['enabled', 'disabled'] as const;
export const CAPP_LOG_TYPE_OPTIONS = ['elastic'] as const;
export const CAPP_SOURCE_TYPE_OPTIONS = ['kafka'] as const;
export const NAME_REGEX = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;

export const CappGroupVersionKind = {
  group: Capp.apiGroup,
  version: Capp.apiVersion,
  kind: Capp.kind,
};

export const NamespaceGroupVersionKind = {
  version: 'v1',
  kind: 'Namespace',
};
