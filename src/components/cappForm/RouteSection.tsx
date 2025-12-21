import * as React from 'react';
import {
  Title,
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionContent,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { useState } from 'react';
import CappFormTextInput from './CappFormTextInput';
import CappFormSelect from './CappFormSelect';
import { State } from 'src/types/state';
import { Action } from 'src/types/action';
import { CAPP_ROUTE_TLS_OPTIONS } from '../../consts';

interface RouteSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const RouteSection: React.FC<RouteSectionProps> = ({ state, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTlsSelectOpen, setIsTlsSelectOpen] = useState(false);

  const tlsOptions = Array.from(CAPP_ROUTE_TLS_OPTIONS);

  const onSelectTlsOption = (opt: string) => {
    dispatch({
      type: 'setRouteTlsEnabled',
      value: opt === CAPP_ROUTE_TLS_OPTIONS[0],
    });
  };

  return (
    <Accordion>
      <AccordionItem>
        <AccordionToggle
          id="route-spec-toggle"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{ padding: 0 }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Title headingLevel="h2">Route Spec</Title> &nbsp;
            <Title headingLevel="h4">(optional)</Title>
          </div>
        </AccordionToggle>

        <AccordionContent id="route-spec-content" isHidden={!isExpanded} className="pf-v5-u-ml-0">
          <Stack hasGutter>
            <StackItem>
              <CappFormTextInput
                id="hostname"
                label="Hostname"
                hint="Custom DNS hostname for the Capp route."
                placeholder="app.example.com"
                value={state.route.hostname}
                onChange={(_, v) => dispatch({ type: 'setRouteHostname', value: v })}
              />
            </StackItem>

            <StackItem>
              <CappFormSelect
                id="tls"
                label="TLS"
                isOpen={isTlsSelectOpen}
                selected={
                  state.route.tlsEnabled ? CAPP_ROUTE_TLS_OPTIONS[0] : CAPP_ROUTE_TLS_OPTIONS[1]
                }
                onToggle={() => setIsTlsSelectOpen(!isTlsSelectOpen)}
                onSelect={onSelectTlsOption}
                options={tlsOptions}
                ariaLabel="TLS"
                hint="Enables or disables TLS."
              />
            </StackItem>

            <StackItem>
              <CappFormTextInput
                id="route-timeout"
                label="Route Timeout (seconds)"
                type="number"
                placeholder="60"
                value={state.route.routeTimeoutSeconds?.toString() || ''}
                onChange={(_, v) =>
                  dispatch({
                    type: 'setRouteTimeout',
                    value: Number(v),
                  })
                }
                hint="Maximum duration for request handling."
              />
            </StackItem>
          </Stack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RouteSection;
