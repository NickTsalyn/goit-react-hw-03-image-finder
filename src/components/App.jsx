import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'api';
import { Container } from 'react-bootstrap';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: 0,
    loading: false,
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        const { totalHits, hits } = await getImages(query, page);

        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          this.setState({ loading: false });
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));

        this.setState({ loading: false });
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { images, totalHits, loading } = this.state;
    const { handleQuerySubmit, handleLoadMore } = this;
    return (
      <Container className="d-flex justify-content-center flex-column">
        <SearchBar onSubmit={handleQuerySubmit} />

        {loading && <Loader/>}
        {images && <ImageGallery images={images} />}
        {!!totalHits && <ButtonLoadMore onLoadMore={handleLoadMore} />}

        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}
