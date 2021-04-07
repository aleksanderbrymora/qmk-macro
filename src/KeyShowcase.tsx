import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { IconButton, Kbd, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import * as React from 'react';
import { FC, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Key, store } from './Store';

export const KeyShowcase: FC<{
  k: Instance<typeof Key>;
  index: number;
}> = observer(({ k, index }) => {
  const { showTimestamps, isRecording } = store;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Stack
        align={'center'}
        zIndex={-1}
        justify='start'
        my={3}
        spacing={3}
        isInline
        h='3rem'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Text>{index + 1}. </Text>
        <Kbd p={2}>
          <Stack spacing={2} isInline align='center'>
            <Text>{k.key}</Text>
            {k.keydown ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </Stack>
        </Kbd>
        {showTimestamps && <Text fontSize='md'>{k.timestamp}</Text>}
        {hovered && !isRecording && (
          <Stack isInline align='center' justify='start'>
            <IconButton
              aria-label='Delete key'
              icon={<FaTrash />}
              onClick={() => k.delete()}
            />
          </Stack>
        )}
      </Stack>
    </motion.div>
  );
});
