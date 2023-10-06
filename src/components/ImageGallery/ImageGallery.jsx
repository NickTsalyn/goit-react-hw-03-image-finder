import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";


export const ImageGallery = ({images}) => {
    if (!Array.isArray(images.hits)) {
        return null;
      }
  return <List>
        {images.hits.map(image => {
            return(<ImageGalleryItem key={image.id} url={image.webformatURL} modalUrl={image.largeImageURL}/>)
        })}
  </List>;
};
