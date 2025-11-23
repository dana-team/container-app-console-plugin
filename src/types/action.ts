export type Action =
  | { type: 'setPath'; path: string }
  | { type: 'setName'; name: string }
  | { type: 'setServer'; server: string }
  | { type: 'setProgress' }
  | { type: 'unsetProgress' }
  | { type: 'setError'; message: string }
  | { type: 'setPayload'; payload: Record<string, unknown> }
  | { type: 'setScaleMetric'; value: string }
  | { type: 'setState'; value: string }
  | { type: 'setConfigurationImage'; value: string }
  | { type: 'setConfigurationPort'; value: number }
  | { type: 'setConfigurationTimeout'; value: number }
  | { type: 'setConfigurationContainerName'; value: string }
  | { type: 'addConfigurationEnvVar' }
  | { type: 'addConfigurationVolumeMount' }
  | { type: 'updateConfigurationEnvKey'; index: number; value: string }
  | { type: 'updateConfigurationEnvValue'; index: number; value: string }
  | { type: 'updateConfigurationVolumeMountKey'; index: number; value: string }
  | { type: 'updateConfigurationVolumeMountValue'; index: number; value: string }
  | { type: 'removeConfigurationEnvVar'; index: number }
  | { type: 'removeConfigurationVolumeMount'; index: number }
  | { type: 'setRouteHostname'; value: string }
  | { type: 'setRouteTlsEnabled'; value: boolean }
  | { type: 'setRouteTimeout'; value: number | undefined }
  | { type: 'setLogType'; value: string }
  | { type: 'setLogHost'; value: string }
  | { type: 'setLogIndex'; value: string }
  | { type: 'setLogUser'; value: string }
  | { type: 'setLogPasswordSecret'; value: string }
  | { type: 'addVolume' }
  | { type: 'setVolumeServer'; index: number; value: string }
  | { type: 'setVolumePath'; index: number; value: string }
  | { type: 'setVolumeName'; index: number; value: string }
  | { type: 'setVolumeCapacityValue'; index: number; capacityValue: number }
  | { type: 'setVolumeCapacityUnit'; index: number; capacityUnits: string }
  | { type: 'removeVolume'; index: number }
  | { type: 'addSource' }
  | { type: 'setSourceName'; index: number; value: string }
  | { type: 'addBootstrapServer'; index: number }
  | {
      type: 'updateBootstrapServer';
      index: number;
      serverIndex: number;
      value: string;
    }
  | {
      type: 'removeBootstrapServer';
      index: number;
      serverIndex: number;
    }
  | { type: 'addSourceTopic'; index: number }
  | {
      type: 'updateSourceTopic';
      index: number;
      topicIndex: number;
      value: string;
    }
  | {
      type: 'removeSourceTopic';
      index: number;
      topicIndex: number;
    };
