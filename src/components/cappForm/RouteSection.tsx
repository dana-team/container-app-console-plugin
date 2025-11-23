import { Title } from '@patternfly/react-core';
import CappFormTextInput from './CappFormTextInput';
import * as React from 'react';
import { State } from 'src/types/state';
import { Action } from 'src/types/action';
import CappFormSelect from './CappFormSelect';
import { useState } from 'react';
import { CAPP_ROUTE_TLS_OPTIONS } from '../../consts';

interface RouteSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const RouteSection: React.FC<RouteSectionProps> = ({ state, dispatch }) => {
  const [isTlsSelectOpen, setIsTlsSelectOpen] = useState<boolean>(false);

  const tlsOptions = Array.from(CAPP_ROUTE_TLS_OPTIONS);

  const onSelectTlsOption = (opt: string) => {
    dispatch({ type: 'setRouteTlsEnabled', value: opt === CAPP_ROUTE_TLS_OPTIONS[0] });
  };
  return (
    <>
      <Title headingLevel="h2">Route Spec</Title>

      <CappFormTextInput
        id="hostname"
        label="Hostname"
        hint="Custom DNS hostname for the Capp route."
        placeholder="app.example.com"
        value={state.route.hostname}
        onChange={(_, v) => dispatch({ type: 'setRouteHostname', value: v })}
        onError={() => dispatch({ type: 'setError', message: state.nameError })}
        error={state.nameError}
      />

      <CappFormSelect
        id="tls"
        label="TLS"
        isOpen={isTlsSelectOpen}
        selected={state.route.tlsEnabled ? CAPP_ROUTE_TLS_OPTIONS[0] : CAPP_ROUTE_TLS_OPTIONS[1]}
        onToggle={() => setIsTlsSelectOpen(!isTlsSelectOpen)}
        onSelect={onSelectTlsOption}
        options={tlsOptions}
        ariaLabel="TLS"
        hint="Enables or disables TLS."
      />

      <CappFormTextInput
        id="route-timeout"
        label="Route Timeout (seconds)"
        type="number"
        placeholder="60"
        value={state.route.routeTimeoutSeconds?.toString() || ''}
        onChange={(_, v) => dispatch({ type: 'setRouteTimeout', value: Number(v) })}
        hint="Maximum duration for request handling. Optional."
        error=""
        onError={() => dispatch({ type: 'setError', message: state.nameError })}
      />
    </>
  );
};

export default RouteSection;
