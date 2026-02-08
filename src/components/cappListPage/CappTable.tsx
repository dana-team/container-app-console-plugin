import * as React from 'react';
import {
  Alert,
  EmptyState,
  EmptyStateBody,
  Spinner,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  SearchInput,
} from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { ResourceLink, Timestamp } from '@openshift-console/dynamic-plugin-sdk';
import useCappTableDataGenerator from '../../hooks/useCappTableDataGenerator';
import { CAPP_TABLE_COLUMNS, CappGroupVersionKind, NamespaceGroupVersionKind } from '../../consts';
import { K8sResourceCommon } from 'src/types/k8sResourceCommon';

interface TableHeadProps {
  columns: string[];
  sortBy: {
    index: number;
    direction: 'desc' | 'asc';
  };
  onSort: (event: unknown, index: number, direction: 'asc' | 'desc') => void;
}

const CappTableHead: React.FC<TableHeadProps> = ({ columns, sortBy, onSort }) => (
  <Thead>
    <Tr>
      {columns.map((title, index) => (
        <Th key={index} sort={{ sortBy, onSort, columnIndex: index }}>
          {title}
        </Th>
      ))}
    </Tr>
  </Thead>
);

interface TableBodyProps {
  data: K8sResourceCommon[];
  columns: string[];
}

const CappTableBody: React.FC<TableBodyProps> = ({ data, columns }) => (
  <Tbody>
    {data.map((obj, rowIndex) => (
      <Tr key={obj.metadata.uid ?? rowIndex}>
        <Td dataLabel={columns[0]}>
          <ResourceLink
            groupVersionKind={CappGroupVersionKind}
            name={obj.metadata.name}
            namespace={obj.metadata.namespace}
          />
        </Td>

        <Td dataLabel={columns[1]}>
          <ResourceLink
            groupVersionKind={NamespaceGroupVersionKind}
            name={obj.metadata.namespace}
          />
        </Td>

        <Td dataLabel={columns[2]}>{obj.spec?.state || '-'}</Td>

        <Td dataLabel={columns[3]}>{obj.spec?.scaleMetric || '-'}</Td>

        <Td dataLabel={columns[4]}>
          {obj.metadata.creationTimestamp ? (
            <Timestamp timestamp={obj.metadata.creationTimestamp} />
          ) : (
            '-'
          )}
        </Td>
      </Tr>
    ))}
  </Tbody>
);

const CappTable: React.FC = () => {
  const {
    capps,
    sortedData,
    searchValue,
    setSearchValue,
    handleSearchInputChange,
    onSort,
    sortBy,
    loaded,
    error,
  } = useCappTableDataGenerator(CAPP_TABLE_COLUMNS);

  if (!loaded) {
    return (
      <EmptyState>
        <Spinner size="xl" />
      </EmptyState>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" title="Error loading Capps">
        {error.message || 'Unknown error occurred.'}
      </Alert>
    );
  }

  if (capps.length === 0) {
    return (
      <EmptyState>
        <Title headingLevel="h4">No Capps found</Title>
        <EmptyStateBody>Create a Capp to get started.</EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput
              aria-label="Search Capps"
              placeholder="Search by name"
              value={searchValue}
              onChange={handleSearchInputChange}
              onClear={() => setSearchValue('')}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Table aria-label="Capp Table" variant="compact">
        <CappTableHead columns={CAPP_TABLE_COLUMNS} sortBy={sortBy} onSort={onSort} />
        <CappTableBody data={sortedData} columns={CAPP_TABLE_COLUMNS} />
      </Table>
    </>
  );
};

export default CappTable;
