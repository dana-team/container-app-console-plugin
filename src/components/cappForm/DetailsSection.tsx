import { Title } from '@patternfly/react-core';
import { useState } from 'react';
import { SCALE_METRIC_OPTIONS, CAPP_STATE_OPTIONS } from '../../consts';
import CappFormSelect from './CappFormSelect';
import * as React from 'react';
import { Action } from 'src/types/action';
import { State } from 'src/types/state';

export interface DetailsSectionProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ state, dispatch }) => {
  const [isScaleMetricSelectOpen, setIsScaleMetricSelectOpen] = useState<boolean>(false);
  const [isStateSelectOpen, setIsStateSelectOpen] = useState<boolean>(false);

  const scaleMetricOptions = Array.from(SCALE_METRIC_OPTIONS);
  const stateOptions = Array.from(CAPP_STATE_OPTIONS);

  const onSelectScaleMetric = (opt: string) => {
    dispatch({ type: 'setScaleMetric', value: opt });
  };

  const onSelectState = (opt: string) => {
    dispatch({ type: 'setState', value: opt });
  };

  return (
    <>
      <Title headingLevel="h2">Capp Details</Title>

      <CappFormSelect
        id="scale-metric-select"
        label="Scale Metric"
        isOpen={isScaleMetricSelectOpen}
        selected={state.scaleMetric}
        onToggle={() => setIsScaleMetricSelectOpen(!isScaleMetricSelectOpen)}
        onSelect={onSelectScaleMetric}
        options={scaleMetricOptions}
        ariaLabel="Scale Metric"
        hint="Defines which metric the autoscaler watches."
      />

      <CappFormSelect
        id="state-select"
        label="State"
        isOpen={isStateSelectOpen}
        selected={state.state}
        onToggle={() => setIsStateSelectOpen(!isStateSelectOpen)}
        onSelect={onSelectState}
        options={stateOptions}
        ariaLabel="State"
        hint="Enables or disables the Capp."
      />
    </>
  );
};

export default DetailsSection;
