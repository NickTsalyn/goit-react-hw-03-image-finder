import { Button } from 'react-bootstrap';

export const ButtonLoadMore = ({ onLoadMore }) => {
  return (
    <Button className="mr-auto ml-auto btn" onClick={onLoadMore}>
      load more
    </Button>
  );
};
