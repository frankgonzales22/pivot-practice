import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
} from '@chakra-ui/react';

interface ButtonItem {
  id: number;
  label: string;
  onClick: () => void;
}

const ModalWithButtonList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttons: ButtonItem[] = [
    {
      id: 1,
      label: 'Button 1',
      onClick: () => {
        // Add your custom logic for Button 1 here
        console.log('Button 1 clicked');
      },
    },
    {
      id: 2,
      label: 'Button 2',
      onClick: () => {
        // Add your custom logic for Button 2 here
        console.log('Button 2 clicked');
      },
    },
    {
      id: 3,
      label: 'Button 3',
      onClick: () => {
        // Add your custom logic for Button 3 here
        console.log('Button 3 clicked');
      },
    },
  ];

  return (
    <Box padding={'10px 40px'}>
      <Button onClick={() => setIsModalOpen(true)}>Choose Chart</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Chart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              {buttons.map((button) => (
                <Button key={button.id} onClick={button.onClick}>
                  {button.label}
                </Button>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalWithButtonList;
