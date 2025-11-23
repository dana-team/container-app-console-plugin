import { k8sCreate, K8sResourceKind } from '@openshift-console/dynamic-plugin-sdk';
import * as jsYaml from 'js-yaml';
import { ActionGroup, Alert, AlertVariant, Button, PageSection } from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom-v5-compat';
import { Capp } from '../../types/capp';
import { CodeEditor, Language } from '@patternfly/react-code-editor';

interface YamlViewTabProps {
  namespace: string;
  navigate: NavigateFunction;
}

const YamlViewTab: React.FC<YamlViewTabProps> = ({ namespace, navigate }) => {
  const [yamlValue, setYamlValue] = useState<string>('');
  const [yamlError, setYamlError] = useState<string>('');

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
        justifyContent: 'space-between',
      }}
    >
      <PageSection isFilled hasOverflowScroll>
        <div style={{ height: '55vh' }}>
          <CodeEditor
            isDarkTheme
            isLineNumbersVisible
            isMinimapVisible
            code={yamlValue}
            onChange={(v) => setYamlValue(v || '')}
            language={Language.yaml}
            height="100%"
          />

          {yamlError && (
            <Alert variant={AlertVariant.danger} isInline title="YAML Error">
              {yamlError}
            </Alert>
          )}
        </div>
      </PageSection>

      <PageSection>
        <ActionGroup>
          <Button variant="primary" onClick={saveYaml} style={{ marginRight: 15 }}>
            Create
          </Button>
          <Button onClick={() => navigate(-1)} type="button" variant="secondary">
            Cancel
          </Button>
        </ActionGroup>
      </PageSection>
    </div>
  );
};

export default YamlViewTab;
