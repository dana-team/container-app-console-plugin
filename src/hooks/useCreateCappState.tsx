import { useReducer, useEffect } from 'react';
import { Capp } from '../types/capp';
import { commonReducer, defaultState } from '../utils/state';
import { CAPP_SOURCE_TYPE_OPTIONS } from '../consts';

export const useCreateCappState = (namespace: string) => {
  const [state, dispatch] = useReducer(commonReducer, defaultState);
  const { apiGroup, apiVersion, kind } = Capp;

  useEffect(() => {
    const obj = {
      apiVersion: `${apiGroup}/${apiVersion}`,
      kind,
      metadata: {
        name: state.name,
        namespace,
      },
      spec: {
        scaleMetric: state.scaleMetric,
        state: state.state,

        configurationSpec: {
          template: {
            spec: {
              containers: [
                {
                  name: state.configuration.name,
                  image: state.configuration.image,
                  env: state.configuration.env,
                  volumeMounts: state.configuration.volumeMounts,
                },
              ],
            },
          },
        },

        routeSpec: {
          hostname: state.route.hostname,
          tlsEnabled: state.route.tlsEnabled,
          routeTimeoutSeconds: state.route.routeTimeoutSeconds,
        },

        logSpec: {
          type: state.log.type,
          host: state.log.host,
          index: state.log.index,
          user: state.log.user,
          passwordSecret: state.log.passwordSecret,
        },

        volumesSpec: {
          nfsVolumes: state.volumes.map((v) => ({
            name: v.name,
            server: v.server,
            path: v.path,
            capacity: { storage: `${v.capacityValue?.toString()}${v.capacityUnit}` },
          })),
        },

        sources: state.sources.map((src) => ({
          name: src.name,
          type: CAPP_SOURCE_TYPE_OPTIONS[0],
          bootstrapServers: src.bootstrapServers,
          topic: src.topic,
        })),
      },
    };

    dispatch({ type: 'setPayload', payload: obj });
  }, [
    namespace,
    state.name,
    state.scaleMetric,
    state.state,
    state.configuration,
    state.route,
    state.log,
    state.volumes,
    state.sources,
  ]);

  return {
    state,
    dispatch,
  };
};
