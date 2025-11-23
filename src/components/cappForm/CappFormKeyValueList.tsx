import * as React from 'react';
import { Button, FormGroup, InputGroup, TextInput, Title } from '@patternfly/react-core';
import { PlusCircleIcon, TrashIcon } from '@patternfly/react-icons';
import CustomHelperText from '../generic/CustomHelperText';

interface CappFormKeyValueListProps<T> {
  id: string;
  label: string;
  hint?: string;
  items: T[];

  keyPlaceholder: string;
  valuePlaceholder: string;

  getKey: (item: T) => string;
  getValue: (item: T) => string;

  onAdd: () => void;
  onRemove: (index: number) => void;
  onKeyChange: (index: number, value: string) => void;
  onValueChange: (index: number, value: string) => void;
}

function CappFormKeyValueList<T>({
  id,
  label,
  hint,
  items,
  keyPlaceholder,
  valuePlaceholder,
  getKey,
  getValue,
  onAdd,
  onRemove,
  onKeyChange,
  onValueChange,
}: CappFormKeyValueListProps<T>) {
  return (
    <FormGroup fieldId={id}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Title headingLevel="h6" size="md">
          {label}
        </Title>

        <Button
          variant="plain"
          aria-label={`Add ${label}`}
          icon={<PlusCircleIcon />}
          onClick={onAdd}
        />
      </div>

      {items.map((item, index) => (
        <InputGroup key={index} className="pf-v5-u-mt-sm">
          <TextInput
            placeholder={keyPlaceholder}
            value={getKey(item)}
            onChange={(_, v) => onKeyChange(index, v)}
          />
          <TextInput
            placeholder={valuePlaceholder}
            value={getValue(item)}
            onChange={(_, v) => onValueChange(index, v)}
          />
          <Button
            variant="plain"
            aria-label={`Remove ${label}`}
            icon={<TrashIcon />}
            isDanger
            onClick={() => onRemove(index)}
          />
        </InputGroup>
      ))}

      {hint && <CustomHelperText text={hint} />}
    </FormGroup>
  );
}

export default CappFormKeyValueList;
