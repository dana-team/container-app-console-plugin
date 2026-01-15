import { CodeEditor, k8sCreate, K8sResourceKind } from '@openshift-console/dynamic-plugin-sdk';
import * as jsYaml from 'js-yaml';
import * as React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom-v5-compat';
import { Capp } from '../../types/capp';
import { State } from 'src/types/state';
import { ActionGroup, Alert, AlertVariant, Button, PageSection } from '@patternfly/react-core';

interface YamlViewTabProps {
  state: State;
  namespace: string;
  navigate: NavigateFunction;
}

const YamlViewTab: React.FC<YamlViewTabProps> = ({ state, namespace, navigate }) => {
  const DEFAULT_YAML_VALUE = `apiVersion: rcs.dana.io/v1alpha1
kind: Capp
metadata:
  name: capp-example
  namespace: ${namespace}
spec:
  configurationSpec:
    template:
      spec:
        containers:
          - env:
              - name: APP_NAME
                value: capp-env-var
            image: 'ghcr.io/dana-team/capp-example-app:v0.1.0'
            name: capp-example
            volumeMounts:
              - name: test-nfspvc
                mountPath: /data
  scaleMetric: concurrency
  state: enabled
  `;

  const [yamlValue, setYamlValue] = useState<string>(DEFAULT_YAML_VALUE);
  const [yamlError, setYamlError] = useState<string>('');

  useEffect(() => {
    setYamlValue(
      jsYaml.dump(state.payload, {
        noRefs: true,
        lineWidth: -1,
      }),
    );
  }, [state.payload]);

  const saveYaml = async () => {
    setYamlError('');

    try {
      const obj = jsYaml.load(yamlValue);

      const resource = await k8sCreate({
        model: Capp,
        ns: namespace,
        data: obj,
      });

      const { apiGroup, apiVersion, kind } = Capp;

      navigate(
        `/k8s/ns/${namespace}/${apiGroup}~${apiVersion}~${kind}/${
          (resource as K8sResourceKind).metadata.name
        }`,
      );
    } catch (err) {
      setYamlError(err?.message || 'Invalid YAML');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <PageSection
        style={{ backgroundColor: 'inherit', flex: 10, display: 'flex', flexDirection: 'column' }}
        isFilled
      >
        <Suspense fallback={<div>Loading editor…</div>}>
          <CodeEditor
            value={yamlValue}
            language="yaml"
            minHeight="100%"
            onChange={(v) => setYamlValue(v || '')}
            onSave={saveYaml}
            showMiniMap
            showShortcuts
          />
        </Suspense>
      </PageSection>

      <PageSection
        style={{
          backgroundColor: 'inherit',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
        }}
      >
        <ActionGroup style={{ marginTop: 15 }}>
          <Button variant="primary" onClick={saveYaml} style={{ marginRight: 15 }}>
            Create
          </Button>
          <Button onClick={() => navigate(-1)} type="button" variant="secondary">
            Cancel
          </Button>
        </ActionGroup>

        {yamlError && (
          <Alert variant={AlertVariant.danger} isInline title="YAML Error">
            {yamlError}
          </Alert>
        )}
      </PageSection>
    </div>
  );
};

export default YamlViewTab;
