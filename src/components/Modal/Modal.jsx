import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Image, ModalContainer } from './Modal.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const Modall = ({ imageUrl, alt, isOpen, closeModal }) => {
  const subtitleRef = useRef();

  useEffect(() => {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = '#f00';
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <ModalContainer>
        <Image src={imageUrl} alt={alt} />
      </ModalContainer>
    </Modal>
  );
};
