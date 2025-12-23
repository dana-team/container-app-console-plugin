import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionContent,
  Title,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { useState } from 'react';
import { Action } from 'src/types/action';
import { State } from 'src/types/state';
import CappFormTextInput from './CappFormTextInput';
import CappFormKeyValueList from './CappFormKeyValueList';

interface ConfigurationSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ConfigurationSection: React.FC<ConfigurationSectionProps> = ({ state, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Accordion style={{ '--pf-c-accordion--BackgroundColor': 'transparent' } as React.CSSProperties}>
      <AccordionItem>
        <AccordionToggle
          id="capp-configuration-toggle"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{ padding: 0 }}
        >
          <Title headingLevel="h2">Configuration Spec</Title>
        </AccordionToggle>

        <AccordionContent id="capp-configuration-content" isHidden={!isExpanded} className="pf-v5-u-ml-0">
          <Stack hasGutter>
            <StackItem>
              <CappFormTextInput
                isRequired
                id="config-image"
                label="Container Image"
                placeholder="registry/image:tag"
                value={state.configuration.image}
                onChange={(_, v) => dispatch({ type: 'setConfigurationImage', value: v })}
                hint="The container image to deploy."
                error={state.configuration.containerImageError}
              />
            </StackItem>

            <StackItem>
              <CappFormTextInput
                id="config-container-name"
                label="Container Name"
                placeholder="my-container"
                value={state.configuration.name}
                onChange={(_, v) => dispatch({ type: 'setConfigurationContainerName', value: v })}
                hint="The container name."
              />
            </StackItem>

            <StackItem>
              <CappFormKeyValueList
                id="config-env"
                label="Environment Variables"
                hint="Define environment variables for the Capp."
                items={state.configuration.env}
                getKey={(item) => item.name}
                getValue={(item) => item.value}
                keyPlaceholder="name"
                valuePlaceholder="value"
                onAdd={() => dispatch({ type: 'addConfigurationEnvVar' })}
                onRemove={(index) => dispatch({ type: 'removeConfigurationEnvVar', index })}
                onKeyChange={(index, value) =>
                  dispatch({ type: 'updateConfigurationEnvKey', index, value })
                }
                onValueChange={(index, value) =>
                  dispatch({ type: 'updateConfigurationEnvValue', index, value })
                }
              />
            </StackItem>

            {/* <StackItem>
              <CappFormKeyValueList
                id="config-volume-mount"
                label="Volume Mounts"
                hint="Define volume mounts for the Capp."
                items={state.configuration.volumeMounts}
                getKey={(item) => item.name}
                getValue={(item) => item.mountPath}
                keyPlaceholder="name"
                valuePlaceholder="mountPath"
                onAdd={() => dispatch({ type: 'addConfigurationVolumeMount' })}
                onRemove={(index) => dispatch({ type: 'removeConfigurationVolumeMount', index })}
                onKeyChange={(index, value) =>
                  dispatch({ type: 'updateConfigurationVolumeMountKey', index, value })
                }
                onValueChange={(index, value) =>
                  dispatch({ type: 'updateConfigurationVolumeMountValue', index, value })
                }
              />
            </StackItem> */}
          </Stack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ConfigurationSection;
