import { FormGroup, TextInput, TextInputProps } from '@patternfly/react-core';
import * as React from 'react';
import CustomHelperText from '../generic/CustomHelperText';

type CappFormTextInputProps = {
  id: string;
  label: string;
  onChange: (event: React.FormEvent<HTMLInputElement>, value: string) => void;
  placeholder: string;
  hint?: string;
  value: string;
  error?: string;
  type?: TextInputProps['type'];
  isRequired?: boolean;
};

const CappFormTextInput: React.FC<CappFormTextInputProps> = ({
  id,
  label,
  onChange,
  placeholder,
  hint,
  value,
  error,
  type,
  isRequired = false,
}) => (
  <FormGroup label={label} isRequired={isRequired} fieldId={id}>
    <TextInput
      isRequired={isRequired}
      type={type ? type : 'text'}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      validated={error ? 'error' : 'default'}
      placeholder={placeholder}
    />
    <CustomHelperText text={hint} />
  </FormGroup>
);

export default CappFormTextInput;
