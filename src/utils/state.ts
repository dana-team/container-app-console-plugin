import {
  CAPP_LOG_TYPE_OPTIONS,
  CAPP_STATE_OPTIONS,
  NAME_REGEX,
  SCALE_METRIC_OPTIONS,
} from '../consts';
import { Action } from 'src/types/action';
import { State } from 'src/types/state';

export const defaultState: State = {
  name: '',
  progress: false,
  error: '',
  payload: {},

  scaleMetric: SCALE_METRIC_OPTIONS[0],
  state: CAPP_STATE_OPTIONS[0],

  configuration: {
    image: '',
    name: '',
    env: [],
    volumeMounts: [],
    containerImageError: 'Container Image must not be empty.',
  },

  route: {
    hostname: '',
    tlsEnabled: false,
    routeTimeoutSeconds: 60,
  },

  log: {
    type: CAPP_LOG_TYPE_OPTIONS[0],
    host: '',
    index: '',
    user: '',
    passwordSecret: '',
  },

  volumes: [],

  sources: [],
};

export const commonReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setName': {
      const isValidName = NAME_REGEX.test(action.name) && action.name.length <= 63;

      return {
        ...state,
        name: action.name,
        nameError: isValidName
          ? ''
          : 'Name must consist of lowercase letters, numbers, and dashes and must not start/end with a dash (max 63 chars).',
      };
    }

    case 'setProgress':
      return { ...state, progress: true };

    case 'unsetProgress':
      return { ...state, progress: false };

    case 'setError':
      return { ...state, error: action.message };

    case 'setPayload':
      return { ...state, payload: action.payload };

    case 'setScaleMetric':
      return { ...state, scaleMetric: action.value };

    case 'setState':
      return { ...state, state: action.value };

    case 'setConfigurationImage':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          image: action.value,
          containerImageError: action.value ? '' : 'Container Image must not be empty.',
        },
      };

    case 'setConfigurationContainerName':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          name: action.value,
        },
      };

    case 'addConfigurationEnvVar':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          env: [...state.configuration.env, { name: '', value: '' }],
        },
      };

    case 'addConfigurationVolumeMount':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          volumeMounts: [...state.configuration.volumeMounts, { name: '', mountPath: '' }],
        },
      };

    case 'updateConfigurationEnvKey':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          env: state.configuration.env.map((env, idx) =>
            idx === action.index ? { ...env, name: action.value } : env,
          ),
        },
      };

    case 'updateConfigurationEnvValue':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          env: state.configuration.env.map((env, idx) =>
            idx === action.index ? { ...env, value: action.value } : env,
          ),
        },
      };

    case 'updateConfigurationVolumeMountKey':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          volumeMounts: state.configuration.volumeMounts.map((volumeMount, idx) =>
            idx === action.index ? { ...volumeMount, name: action.value } : volumeMount,
          ),
        },
      };

    case 'updateConfigurationVolumeMountValue':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          volumeMounts: state.configuration.volumeMounts.map((volumeMount, idx) =>
            idx === action.index ? { ...volumeMount, mountPath: action.value } : volumeMount,
          ),
        },
      };

    case 'removeConfigurationEnvVar':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          env: state.configuration.env.filter((_, idx) => idx !== action.index),
        },
      };

    case 'removeConfigurationVolumeMount':
      return {
        ...state,
        configuration: {
          ...state.configuration,
          volumeMounts: state.configuration.volumeMounts.filter((_, idx) => idx !== action.index),
        },
      };

    case 'setRouteHostname':
      return {
        ...state,
        route: { ...state.route, hostname: action.value },
      };

    case 'setRouteTlsEnabled':
      return {
        ...state,
        route: { ...state.route, tlsEnabled: action.value },
      };

    case 'setRouteTimeout':
      return {
        ...state,
        route: { ...state.route, routeTimeoutSeconds: action.value },
      };

    case 'setLogType':
      return { ...state, log: { ...state.log, type: action.value } };

    case 'setLogHost':
      return { ...state, log: { ...state.log, host: action.value } };

    case 'setLogIndex':
      return { ...state, log: { ...state.log, index: action.value } };

    case 'setLogUser':
      return { ...state, log: { ...state.log, user: action.value } };

    case 'setLogPasswordSecret':
      return { ...state, log: { ...state.log, passwordSecret: action.value } };

    case 'addVolume':
      return {
        ...state,
        volumes: [
          ...state.volumes,
          {
            server: '',
            path: '',
            name: '',
            capacityValue: 0,
            capacityUnit: 'Gi',
          },
        ],
      };

    case 'setVolumeServer':
      return {
        ...state,
        volumes: state.volumes.map((v, i) =>
          i === action.index
            ? {
                ...v,
                server: action.value,
                serverError: action.value.trim() !== '' ? '' : 'Server must not be empty.',
              }
            : v,
        ),
      };

    case 'setVolumePath':
      const isValidPath = action.value.startsWith('/');
      return {
        ...state,
        volumes: state.volumes.map((v, i) =>
          i === action.index
            ? { ...v, path: action.value, pathError: isValidPath ? '' : 'Path must start with "/"' }
            : v,
        ),
      };

    case 'setVolumeName':
      const isValidName = NAME_REGEX.test(action.value) && action.value?.length <= 63;
      return {
        ...state,
        volumes: state.volumes.map((v, i) =>
          i === action.index
            ? {
                ...v,
                name: action.value,
                nameError: isValidName
                  ? ''
                  : 'Name must consist of lowercase letters, numbers, and dashes and must not start/end with a dash (max 63 chars).',
              }
            : v,
        ),
      };

    case 'setVolumeCapacityUnit':
      return {
        ...state,
        volumes: state.volumes.map((v, i) =>
          i === action.index ? { ...v, capacityUnit: action.capacityUnits } : v,
        ),
      };

    case 'setVolumeCapacityValue':
      return {
        ...state,
        volumes: state.volumes.map((v, i) =>
          i === action.index ? { ...v, capacityValue: action.capacityValue } : v,
        ),
      };

    case 'removeVolume':
      return {
        ...state,
        volumes: state.volumes.filter((_, i) => i !== action.index),
      };

    case 'addSource':
      return {
        ...state,
        sources: [...state.sources, { name: '', bootstrapServers: [], topic: [] }],
      };

    case 'setSourceName':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index ? { ...src, name: action.value } : src,
        ),
      };

    case 'addBootstrapServer':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index ? { ...src, bootstrapServers: [...src.bootstrapServers, ''] } : src,
        ),
      };

    case 'updateBootstrapServer':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index
            ? {
                ...src,
                bootstrapServers: src.bootstrapServers.map((b, j) =>
                  j === action.serverIndex ? action.value : b,
                ),
              }
            : src,
        ),
      };

    case 'removeBootstrapServer':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index
            ? {
                ...src,
                bootstrapServers: src.bootstrapServers.filter((_, j) => j !== action.serverIndex),
              }
            : src,
        ),
      };

    case 'addSourceTopic':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index ? { ...src, topic: [...src.topic, ''] } : src,
        ),
      };

    case 'updateSourceTopic':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index
            ? {
                ...src,
                topic: src.topic.map((t, j) => (j === action.topicIndex ? action.value : t)),
              }
            : src,
        ),
      };

    case 'removeSourceTopic':
      return {
        ...state,
        sources: state.sources.map((src, i) =>
          i === action.index
            ? {
                ...src,
                topic: src.topic.filter((_, j) => j !== action.topicIndex),
              }
            : src,
        ),
      };

    default:
      return state;
  }
};
