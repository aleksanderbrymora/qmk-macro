import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Divider,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  theme,
  Tooltip,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { CodeShowcases } from './CodeShowcases';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import InformationBtn from './InformationBtn';
import { KeyShowcase } from './KeyShowcase';
import RecordingSpinner from './RecordingSpinner';
import { store } from './Store';

export const App = observer(() => {
  const {
    keys,
    addKey,
    name,
    updateName,
    toggleRecording,
    isRecording,
    reset,
    toggleTimestamps,
    showTimestamps,
  } = store;

  useHotkeys('*', addKey, { keyup: true, keydown: true });

  return (
    <ChakraProvider theme={theme}>
      <Container maxW='container.xl'>
        <Box px={10} fontSize='xl'>
          <ColorModeSwitcher justifySelf='flex-end' />
          <InformationBtn />
          <Grid templateColumns='repeat(3, 1fr)'>
            <GridItem colSpan={2}>
              <Stack bg={'gray.900'} p={3} rounded={'xl'} h='min-content'>
                <Input
                  placeholder='Title of your macro'
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                />
                <Stack isInline spacing={3}>
                  <Tooltip
                    hasArrow
                    label="Currently Meta Key is broken because browsers don't really handle them... Add it by hovering over a letter on the right column and pressing the button, after you've finished recording"
                  >
                    <Button onClick={toggleRecording} w='full'>
                      <Stack isInline align='center' spacing={5}>
                        <Text>{isRecording ? 'Stop' : 'Start'} recording</Text>
                        <RecordingSpinner />
                      </Stack>
                    </Button>
                  </Tooltip>
                  <Button onClick={reset} w='full' disabled={keys.length === 0}>
                    Clear all
                  </Button>
                  <Button onClick={toggleTimestamps} w='full'>
                    {showTimestamps ? 'Disable' : 'Enable'} timestamps
                  </Button>
                </Stack>
                <Divider my={2} />
                <CodeShowcases />
              </Stack>
            </GridItem>
            <GridItem
              colSpan={1}
              overflowY='auto'
              maxH='100vh'
              overflowX='hidden'
              p={2}
            >
              <AnimatePresence initial={false}>
                {keys.map((k, i) => (
                  <KeyShowcase key={k.id} k={k} index={i} />
                ))}
              </AnimatePresence>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </ChakraProvider>
  );
});
