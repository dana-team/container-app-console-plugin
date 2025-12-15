import { useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import { Button, PageSection, Title } from '@patternfly/react-core';
import * as React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_NAMESPACES, DEFAULT_NAMESPACE } from '../../consts';
import { Capp } from '../../types/capp';
import CappTable from './CappTable';

const createCappInNamespacePath = (namespace: string): string => {
  const isAllProjects = namespace === ALL_NAMESPACES;
  const { apiGroup, apiVersion, kind } = Capp;
  const reference = `${apiGroup}~${apiVersion}~${kind}`;

  return `/k8s/ns/${isAllProjects ? DEFAULT_NAMESPACE : namespace}/${reference}/~new/form`;
};

const CappPage: React.FC = () => {
  const [namespace] = useActiveNamespace();
  const createPath = useMemo(() => createCappInNamespacePath(namespace), [namespace]);

  return (
    <>
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title headingLevel="h1"> Capps </Title>
          <Link to={createPath}>
            <Button variant="primary">Create Capp</Button>
          </Link>
        </div>
      </PageSection>
      <PageSection>
        <CappTable />
      </PageSection>
    </>
  );
};

export default CappPage;
