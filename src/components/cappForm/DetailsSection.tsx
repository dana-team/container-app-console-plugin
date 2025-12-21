import * as React from 'react';
import {
  Title,
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionContent,
  StackItem,
  Stack,
} from '@patternfly/react-core';
import { useState } from 'react';
import { SCALE_METRIC_OPTIONS, CAPP_STATE_OPTIONS } from '../../consts';
import CappFormSelect from './CappFormSelect';
import { Action } from 'src/types/action';
import { State } from 'src/types/state';

export interface DetailsSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ state, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isScaleMetricSelectOpen, setIsScaleMetricSelectOpen] = useState(false);
  const [isStateSelectOpen, setIsStateSelectOpen] = useState(false);

  const onSelectScaleMetric = (opt: string) => {
    dispatch({ type: 'setScaleMetric', value: opt });
  };

  const onSelectState = (opt: string) => {
    dispatch({ type: 'setState', value: opt });
  };

  return (
    <Accordion style={{ '--pf-c-accordion--BackgroundColor': 'transparent' } as React.CSSProperties}>
      <AccordionItem>
        <AccordionToggle
          id="capp-details-toggle"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{ padding: 0 }}
        >
          <Title headingLevel="h2">Capp details</Title>
        </AccordionToggle>

        <AccordionContent id="capp-details-content" isHidden={!isExpanded} className="pf-v5-u-ml-0">
          <Stack hasGutter>
            <StackItem>
              <CappFormSelect
                id="scale-metric-select"
                label="Scale Metric"
                isOpen={isScaleMetricSelectOpen}
                selected={state.scaleMetric}
                onToggle={() => setIsScaleMetricSelectOpen(!isScaleMetricSelectOpen)}
                onSelect={onSelectScaleMetric}
                options={Array.from(SCALE_METRIC_OPTIONS)}
                ariaLabel="Scale Metric"
                hint="Defines which metric the autoscaler watches."
              />
            </StackItem>

            <StackItem>
              <CappFormSelect
                id="state-select"
                label="State"
                isOpen={isStateSelectOpen}
                selected={state.state}
                onToggle={() => setIsStateSelectOpen(!isStateSelectOpen)}
                onSelect={onSelectState}
                options={Array.from(CAPP_STATE_OPTIONS)}
                ariaLabel="State"
                hint="Enables or disables the Capp."
              />
            </StackItem>
          </Stack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailsSection;
