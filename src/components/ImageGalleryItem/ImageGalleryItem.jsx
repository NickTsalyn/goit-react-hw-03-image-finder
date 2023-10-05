
  import { Modall } from 'components/Modal/Modal';
import React, { useState } from 'react';
import { ListImg, ListItem } from './ImageGalletyItem.styled';
    


export const ImageGalleryItem = ({ url, modalUrl}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ListItem>
      <ListImg src={url} alt="" onClick={() => openModal()} />
      {modalIsOpen && <Modall imageUrl={modalUrl} alt="Image" isOpen={modalIsOpen} closeModal={closeModal} />}
    </ListItem>
  );
};

