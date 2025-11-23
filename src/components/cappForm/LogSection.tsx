import * as React from 'react';
import CappFormTextInput from './CappFormTextInput';
import { Title } from '@patternfly/react-core';
import CappFormSelect from './CappFormSelect';
import { State } from 'src/types/state';
import { Action } from 'src/types/action';
import { useState } from 'react';
import { CAPP_LOG_TYPE_OPTIONS } from '../../consts';

interface LogSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const LogSection: React.FC<LogSectionProps> = ({ state, dispatch }) => {
  const [isLogTypeSelectOpen, setIsLogTypeSelectOpen] = useState(false);
  const logTypeOptions = Array.from(CAPP_LOG_TYPE_OPTIONS);

  const onSelectLogType = (opt: string) => {
    dispatch({ type: 'setLogType', value: opt });
  };

  return (
    <>
      <Title headingLevel="h2">Log Spec</Title>

      <CappFormSelect
        id="log-type-select"
        label="Log Type"
        isOpen={isLogTypeSelectOpen}
        selected={state.log.type}
        onToggle={() => setIsLogTypeSelectOpen(!isLogTypeSelectOpen)}
        onSelect={onSelectLogType}
        options={logTypeOptions}
        ariaLabel="Log Type"
        hint="Only supported value: elastic"
      />

      <CappFormTextInput
        id="log-host"
        label="Host"
        placeholder="https://elasticsearch.example.com"
        hint="Elasticsearch host endpoint."
        value={state.log.host}
        onChange={(_, v) => dispatch({ type: 'setLogHost', value: v })}
        onError={() => dispatch({ type: 'setError', message: state.nameError })}
        error={state.nameError}
      />

      <CappFormTextInput
        id="log-index"
        label="Index"
        placeholder="capp-logs"
        hint="Index to write events to."
        value={state.log.index}
        onChange={(_, v) => dispatch({ type: 'setLogIndex', value: v })}
        onError={() => dispatch({ type: 'setError', message: state.nameError })}
        error={state.nameError}
      />

      <CappFormTextInput
        id="log-user"
        label="User"
        placeholder="elastic"
        value={state.log.user}
        onChange={(_, v) => dispatch({ type: 'setLogUser', value: v })}
        onError={() => dispatch({ type: 'setError', message: state.nameError })}
        error={state.nameError}
      />

      <CappFormTextInput
        id="log-secret"
        label="Password Secret Name"
        placeholder="es-password"
        value={state.log.passwordSecret}
        onChange={(_, v) => dispatch({ type: 'setLogPasswordSecret', value: v })}
        onError={() => dispatch({ type: 'setError', message: state.nameError })}
        error={state.nameError}
      />
    </>
  );
};

export default LogSection;
