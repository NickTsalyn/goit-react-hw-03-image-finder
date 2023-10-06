import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  
  return (
    <List>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            url={image.webformatURL}
            modalUrl={image.largeImageURL}
          />
        );
      })}
    </List>
  );
};
