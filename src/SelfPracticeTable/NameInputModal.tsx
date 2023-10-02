import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

interface NameInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const NameInputModal: React.FC<NameInputModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState<string>('');

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Your Template Name</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="My Template"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NameInputModal;
