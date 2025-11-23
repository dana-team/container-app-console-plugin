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
  }, [state.nameError, state.configuration.containerImageError]);

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
      }}
    >
      <PageSection hasOverflowScroll isFilled>
        <Form id="create-capp-form" onSubmit={onSubmit} style={{ height: '55vh' }}>
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

          {state.error && (
            <Alert variant={AlertVariant.danger} isInline title="Error">
              {state.error}
            </Alert>
          )}
        </Form>
      </PageSection>

      <PageSection>
        <ActionGroup>
          <Button
            type="submit"
            variant="primary"
            form="create-capp-form"
            isDisabled={state.progress}
            style={{ marginRight: 15 }}
          >
            {state.progress && <Spinner size="md" />} Create
          </Button>
          <Button onClick={() => navigate(-1)} type="button" variant="secondary">
            Cancel
          </Button>
        </ActionGroup>
      </PageSection>
    </div>
  );
};

export default FormViewTab;
