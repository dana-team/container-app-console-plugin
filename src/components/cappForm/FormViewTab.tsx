import { k8sCreate, K8sResourceKind } from '@openshift-console/dynamic-plugin-sdk';
import {
  ActionGroup,
  Alert,
  AlertVariant,
  Button,
  Divider,
  Form,
  PageSection,
  Spinner,
} from '@patternfly/react-core';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { Capp } from '../../types/capp';
import CappFormTextInput from './CappFormTextInput';
import DetailsSection from './DetailsSection';
import ConfigurationSection from './ConfigurationSection';
import LogSection from './LogSection';
import RouteSection from './RouteSection';
import { State } from 'src/types/state';
import { Action } from 'src/types/action';
import { NavigateFunction } from 'react-router-dom-v5-compat';

interface FormViewTabProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  namespace: string;
  navigate: NavigateFunction;
}

const FormViewTab: React.FC<FormViewTabProps> = ({ state, dispatch, namespace, navigate }) => {
  const saveForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      dispatch({ type: 'setProgress' });

      try {
        const resource = await k8sCreate({
          model: Capp,
          ns: namespace,
          data: state.payload,
        });

        const { apiGroup, apiVersion, kind } = Capp;

        navigate(
          `/k8s/ns/${namespace}/${apiGroup}~${apiVersion}~${kind}/${
            (resource as K8sResourceKind).metadata.name
          }`,
        );
      } catch (err) {
        dispatch({ type: 'setError', message: err?.message });
      } finally {
        dispatch({ type: 'unsetProgress' });
      }
    },
    [state.payload],
  );

  const validateForm = () => {
    if (state.nameError) {
      dispatch({ type: 'setError', message: state.nameError });
    } else if (state.configuration.containerImageError) {
      dispatch({ type: 'setError', message: state.configuration.containerImageError });
    } else {
      dispatch({ type: 'setError', message: '' });
    }
  };

  useEffect(() => {
    validateForm();
  }, [state.name, state.nameError, state.configuration.containerImageError]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    validateForm();
    if (!state.error) saveForm(e);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <PageSection style={{ backgroundColor: 'inherit' }} hasOverflowScroll isFilled>
        <Form id="create-capp-form" onSubmit={onSubmit} style={{ height: '45vh' }}>
          <CappFormTextInput
            isRequired
            id="capp-name"
            label="Name"
            onChange={(_, value) => dispatch({ type: 'setName', name: value })}
            placeholder="my-capp"
            value={state.name}
            hint="Choose a name for your Capp."
            error={state.nameError}
          />

          <DetailsSection state={state} dispatch={dispatch} />

          <Divider />

          <ConfigurationSection state={state} dispatch={dispatch} />

          <Divider />

          <LogSection state={state} dispatch={dispatch} />

          <Divider />

          <RouteSection state={state} dispatch={dispatch} />

          <Divider />
        </Form>
      </PageSection>

      <PageSection
        style={{ backgroundColor: 'inherit', display: 'flex', flexDirection: 'column-reverse' }}
      >
        <ActionGroup style={{ marginTop: 15 }}>
          <Button
            type="submit"
            variant="primary"
            form="create-capp-form"
            isDisabled={state.progress || !!state.error}
            style={{ marginRight: 15 }}
          >
            {state.progress && <Spinner size="md" />} Create
          </Button>
          <Button onClick={() => navigate(-1)} type="button" variant="secondary">
            Cancel
          </Button>
        </ActionGroup>

        {state.error && (
          <Alert variant={AlertVariant.danger} isInline title="Error">
            {state.error}
          </Alert>
        )}
      </PageSection>
    </div>
  );
};

export default FormViewTab;
