import { K8sResourceKind } from '@openshift-console/dynamic-plugin-sdk';

export type EnvVar = {
  key: string;
  value: string;
};

export type Volume = {
  server: string;
  path: string;
  name: string;
  capacityValue: number;
  capacityUnit: string;
  nameError?: string;
  serverError?: string;
  pathError?: string;
};

export type Source = {
  name: string;
  bootstrapServers: string[];
  topic: string[];
};

export type Configuration = {
  image: string;
  name: string;
  env: EnvVar[];
};

export type Route = {
  hostname: string;
  tlsEnabled: boolean;
  routeTimeoutSeconds?: number;
};

export type LogConfig = {
  type: string;
  host: string;
  index: string;
  user: string;
  passwordSecret: string;
};

export type State = {
  name: string;
  nameError?: string;
  progress: boolean;
  error: string;
  payload: K8sResourceKind;
  scaleMetric: string;
  state: string;
  configuration: Configuration;
  route: Route;
  log: LogConfig;
  volumes: Volume[];
  sources: Source[];
};
