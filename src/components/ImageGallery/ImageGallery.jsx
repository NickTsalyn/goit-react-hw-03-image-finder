import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";
import { Button } from "react-bootstrap";


export const ImageGallery = ({images, loadMore}) => {
    if (!Array.isArray(images.hits)) {
        return null;
      }
  return <List>
        {images.hits.map(image => {
            return(<ImageGalleryItem key={image.id} url={image.webformatURL} modalUrl={image.largeImageURL}/>)
        })}
         <Button className="mr-auto ml-auto btn" onClick={loadMore}>load more</Button>
  </List>;
};
