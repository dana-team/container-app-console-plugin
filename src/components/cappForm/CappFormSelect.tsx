import {
  FormGroup,
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
} from '@patternfly/react-core';
import * as React from 'react';
import CustomHelperText from '../generic/CustomHelperText';

export interface CappFormSelectProps {
  id: string;
  label: string;
  isOpen: boolean;
  selected?: string;
  onToggle: (open: boolean) => void;
  onSelect: (value: string) => void;
  options: string[];
  ariaLabel?: string;
  hint?: string;
  isRequired?: boolean;
}

const CappFormSelect: React.FC<CappFormSelectProps> = ({
  id,
  label,
  isOpen,
  selected,
  onToggle,
  onSelect,
  options,
  ariaLabel,
  hint,
  isRequired = false,
}) => (
  <FormGroup label={label} isRequired={isRequired} fieldId={id}>
    <Select
      id={id}
      isOpen={isOpen}
      selected={selected}
      onSelect={(_, value) => {
        onSelect(value as string);
        onToggle(false);
      }}
      onOpenChange={(open) => onToggle(open)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle ref={toggleRef} onClick={() => onToggle(!isOpen)} isExpanded={isOpen}>
          {selected || (ariaLabel ?? 'Select')}
        </MenuToggle>
      )}
    >
      <SelectList>
        {options.map((opt) => (
          <SelectOption key={opt} value={opt}>
            {opt}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
    <CustomHelperText text={hint} />
  </FormGroup>
);

export default CappFormSelect;
