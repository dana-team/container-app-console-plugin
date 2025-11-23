export interface K8sResourceCommon {
  metadata: {
    name: string;
    namespace?: string;
    creationTimestamp?: string;
    [key: string]: any;
  };
  spec?: {
    state?: string;
    scaleMetric?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
