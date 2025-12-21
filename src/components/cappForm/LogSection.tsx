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
import { CAPP_LOG_TYPE_OPTIONS } from '../../consts';

interface LogSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const LogSection: React.FC<LogSectionProps> = ({ state, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLogTypeSelectOpen, setIsLogTypeSelectOpen] = useState(false);

  const logTypeOptions = Array.from(CAPP_LOG_TYPE_OPTIONS);

  const onSelectLogType = (opt: string) => {
    dispatch({ type: 'setLogType', value: opt });
  };

  return (
    <Accordion>
      <AccordionItem>
        <AccordionToggle
          id="capp-log-toggle"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{ padding: 0 }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Title headingLevel="h2">Log Spec</Title> &nbsp;
            <Title headingLevel="h4">(optional)</Title>
          </div>
        </AccordionToggle>

        <AccordionContent id="capp-log-content" isHidden={!isExpanded} className="pf-v5-u-ml-0">
          <Stack hasGutter>
            <StackItem>
              <CappFormSelect
                id="log-type-select"
                label="Log Type"
                isOpen={isLogTypeSelectOpen}
                selected={state.log.type}
                onToggle={() => setIsLogTypeSelectOpen(!isLogTypeSelectOpen)}
                onSelect={onSelectLogType}
                options={logTypeOptions}
                ariaLabel="Log Type"
                hint="Supported values: elastic."
              />
            </StackItem>

            <StackItem>
              <CappFormTextInput
                id="log-host"
                label="Host"
                placeholder="https://elasticsearch.example.com"
                hint="Elasticsearch host endpoint."
                value={state.log.host}
                onChange={(_, v) => dispatch({ type: 'setLogHost', value: v })}
              />
            </StackItem>

            <StackItem>
              <CappFormTextInput
                id="log-index"
                label="Index"
                placeholder="capp-logs"
                hint="Index to write events to."
                value={state.log.index}
                onChange={(_, v) => dispatch({ type: 'setLogIndex', value: v })}
              />
            </StackItem>

            <StackItem>
              <CappFormTextInput
                id="log-user"
                label="User"
                hint="Elasticsearch user."
                placeholder="elastic"
                value={state.log.user}
                onChange={(_, v) => dispatch({ type: 'setLogUser', value: v })}
              />
            </StackItem>

            <StackItem>
              <CappFormTextInput
                id="log-secret"
                label="Password Secret Name"
                hint="Elasticsearch user password."
                placeholder="es-password"
                value={state.log.passwordSecret}
                onChange={(_, v) => dispatch({ type: 'setLogPasswordSecret', value: v })}
              />
            </StackItem>
          </Stack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LogSection;
