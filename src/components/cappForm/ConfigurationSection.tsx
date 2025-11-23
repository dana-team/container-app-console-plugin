import { Button, FormGroup, InputGroup, TextInput, Title } from '@patternfly/react-core';
import { Action } from 'src/types/action';
import { EnvVar, State } from 'src/types/state';
import CappFormTextInput from './CappFormTextInput';
import * as React from 'react';
import CustomHelperText from '../generic/CustomHelperText';

interface ConfigurationSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ConfigurationSection: React.FC<ConfigurationSectionProps> = ({ state, dispatch }) => (
  <>
    <Title headingLevel="h2">Configuration Spec</Title>

    <CappFormTextInput
      isRequired
      id="config-image"
      label="Container Image"
      placeholder="registry/image:tag"
      value={state.configuration.image}
      onChange={(_, v) => dispatch({ type: 'setConfigurationImage', value: v })}
      hint="The container image to deploy."
      error=""
      onError={() => dispatch({ type: 'setError', message: state.nameError })}
    />

    <CappFormTextInput
      isRequired
      id="config-container-name"
      label="Container Name"
      placeholder="my-container"
      value={state.configuration.name}
      onChange={(_, v) => dispatch({ type: 'setConfigurationContainerName', value: v })}
      hint="The container name."
      error=""
      onError={() => dispatch({ type: 'setError', message: state.nameError })}
    />

    <FormGroup label="Environment Variables" fieldId="config-env">
      <Button
        variant="secondary"
        onClick={() => dispatch({ type: 'addEnvVar' })}
        className="pf-v5-u-mb-sm"
      >
        Add Variable
      </Button>

      {state.configuration.env.map((item: EnvVar, index: number) => (
        <InputGroup key={index} className="pf-v5-u-mb-sm">
          <TextInput
            placeholder="KEY"
            value={item.key}
            onChange={(_, v) => dispatch({ type: 'updateEnvKey', index: index, value: v })}
          />
          <TextInput
            placeholder="value"
            value={item.value}
            onChange={(_, v) => dispatch({ type: 'updateEnvValue', index: index, value: v })}
          />
          <Button variant="danger" onClick={() => dispatch({ type: 'removeEnvVar', index: index })}>
            Remove
          </Button>
        </InputGroup>
      ))}

      <CustomHelperText text="Define environment variables for the Capp." />
    </FormGroup>
  </>
);

export default ConfigurationSection;
