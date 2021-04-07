import { Button, Code, Stack, Text, useClipboard } from '@chakra-ui/react';
import * as React from 'react';
import { FC } from 'react';

interface Props {
  title: string;
  description: string | React.ReactNode;
  code: string;
}
export const CodeShowcase: FC<Props> = ({ title, description, code }) => {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Stack spacing={2} my={5}>
      <h2>{title}</h2>
      <Text as='small'>{description}</Text>
      <Code w='full' p={1} overflow='auto' maxH={'20rem'}>
        <pre>{code}</pre>
      </Code>
      <Button onClick={onCopy}>
        {hasCopied ? 'Copied ' : 'Copy '}
        code
      </Button>
    </Stack>
  );
};
