import { HelperText, HelperTextItem } from '@patternfly/react-core';
import * as React from 'react';

interface CustomHelperTextProps {
  text?: string;
}

const CustomHelperText: React.FC<CustomHelperTextProps> = ({ text }) => (
  <HelperText>
    <HelperTextItem>{text || ''}</HelperTextItem>
  </HelperText>
);

export default CustomHelperText;
