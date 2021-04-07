import { InfoIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const InformationBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        position='fixed'
        bottom={5}
        right={5}
        w={15}
        h={15}
        borderRadius='full'
        p={5}
        aria-label='Open additional information'
        icon={<InfoIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Some more info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem>
                Normal keybindings are currently suppressed throughout the whole
                page so they can be captured. There may be a workaround for
                that, but it's not necessary since the aim of the page is to
                capture pressed keys. One bad part of this is that you can't
                really use ctrl+c to copy a piece of code that's been generated,
                though the copy buttons should do that for you. You could also
                right click and copy.
              </ListItem>
              <ListItem>
                Currently the repeating keys are suppressed. It's easy enough to
                change that in the program and it makes for a more controlled
                process to do it by hand than semi randomly. Do let me know if
                it should be turned on though.
              </ListItem>
              <ListItem>
                If you delete a key from the list, its 'sibling' (ie if you
                delete 'keydown' - the 'keyup' and vice-versa) will also be
                deleted. It works by searching previous keys in order, to find
                its nearest sibling and delete it. Let me know if this is broken
              </ListItem>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InformationBtn;
