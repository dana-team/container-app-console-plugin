import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { Timestamp } from '@openshift-console/dynamic-plugin-sdk';
import { useState } from 'react';
import { Condition } from 'src/types/condition';
import useConditionTableDataGenerator from '../../hooks/useConditionTableDataGenerator';
import { CONDITION_TABLE_COLUMNS } from '../../consts';
import { EmptyState, EmptyStateBody, EmptyStateVariant, Pagination } from '@patternfly/react-core';

const PAGE_SIZES = [5, 10, 20];

const CappConditionsSection = ({ obj }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const formatConditions = (): Condition[] => {
    const sources = [
      ['knativeObjectStatus', obj.status?.knativeObjectStatus?.conditions],
      ['loggingStatus', obj.status?.loggingStatus?.conditions],
      ['certificateObjectStatus', obj.status?.routeStatus?.certificateObjectStatus?.conditions],
      [
        'cnameRecordObjectStatus',
        obj.status?.routeStatus?.dnsRecordObjectStatus?.cnameRecordObjectStatus?.conditions,
      ],
      ['domainMappingObjectStatus', obj.status?.routeStatus?.domainMappingObjectStatus?.conditions],
    ];

    return sources.flatMap(([src, list]) =>
      (list ?? []).map((condition) => ({ ...condition, source: src })),
    );
  };

  const { sortedData, onSort, sortBy } = useConditionTableDataGenerator(
    CONDITION_TABLE_COLUMNS,
    formatConditions(),
  );

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageItems = sortedData.slice(start, end);
  const isDataExists = sortedData.length !== 0;

  return (
    <>
      <Table aria-label="Conditions" style={{ width: '80vw' }} variant="compact" isStriped>
        <Thead>
          <Tr>
            {CONDITION_TABLE_COLUMNS.map((title, index) => (
              <Th key={index} sort={{ sortBy, onSort, columnIndex: index }}>
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isDataExists ? (
            pageItems.map((condition, index) => (
              <Tr key={index}>
                <Td>{condition.source}</Td>
                <Td>{condition.type}</Td>
                <Td>{condition.status}</Td>
                <Td>
                  {condition.lastTransitionTime ? (
                    <Timestamp timestamp={condition.lastTransitionTime} />
                  ) : (
                    '-'
                  )}
                </Td>
                <Td>{condition.reason || '-'}</Td>
                <Td>{condition.message || '-'}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td textCenter colSpan={6}>
                <EmptyState variant={EmptyStateVariant.xs}>
                  <EmptyStateBody>No conditions found</EmptyStateBody>
                </EmptyState>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {isDataExists && (
        <Pagination
          itemCount={sortedData.length}
          perPage={perPage}
          page={page}
          onSetPage={(_, page) => setPage(page)}
          onPerPageSelect={(_, perPage) => {
            setPerPage(perPage);
            setPage(1);
          }}
          perPageOptions={PAGE_SIZES.map((size) => ({ title: size.toString(), value: size }))}
          variant="bottom"
        />
      )}
    </>
  );
};

export default CappConditionsSection;
