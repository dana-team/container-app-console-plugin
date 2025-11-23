import { useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import { PageSection, Tabs, Tab, Title } from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom-v5-compat';
import { useCreateCappState } from '../../hooks/useCreateCappState';
import FormViewTab from './FormViewTab';
import YamlViewTab from './YamlViewTab';

export const CreateCappForm: React.FC = () => {
  const [namespace] = useActiveNamespace();
  const navigate = useNavigate();
  const { state, dispatch } = useCreateCappState(namespace);

  const [activeTab, setActiveTab] = useState<string>('form');

  return (
    <>
      <PageSection>
        <Title headingLevel="h1">Create Capp</Title>
      </PageSection>

      <PageSection>
        <Tabs activeKey={activeTab} onSelect={(_, key) => setActiveTab(key as string)}>
          <Tab eventKey="form" title="Form View" />
          <Tab eventKey="yaml" title="YAML View" />
        </Tabs>
      </PageSection>

      {activeTab === 'form' ? (
        <FormViewTab state={state} dispatch={dispatch} namespace={namespace} navigate={navigate} />
      ) : (
        <YamlViewTab navigate={navigate} namespace={namespace} />
      )}
    </>
  );
};

export default CreateCappForm;
