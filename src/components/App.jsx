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
    loading: false,
    error: false,
  };

  handleChange = evt => {
    this.setState({ query: evt.target.value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    const { query } = this.state;
    const currentQuery = `${Date.now()}/${query}`;
    this.setState({
      currentQuery,
      images: [],
      page: 1,
      loading: true,
      error: false,
    });
    console.log(query)

    try {
      const data = await getImages(query, 1);
      console.log(data);
      this.setState({ images: data });
      if (data.hits.length === 0) {
        toast.error('Nothing found, try again');
      }
      else if(query.trim() === '') {
        toast.error('Please enter query');
        this.setState({images: []})
      } 
      else {
        toast.success(`Success, found ${data.totalHits} images`);
      }
    } catch {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    try {
      const data = await getImages(query, page + 1);

      this.setState(prevState => ({
        page: prevState.page + 1,
        images: {
          ...prevState.images,
          hits: [...prevState.images.hits, ...data.hits],
        },
      }));
      // if (data.hits.length >= data.totalHits) {
      //   toast.error('Reached all requests');
      // }
    } catch {
      this.setState({ error: true });
      toast.error('Oops, something went wrong');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, images } = this.state;
    const allHits = images && images.hits && images.hits.length;
    if (allHits >= images.totalHits) {
      toast.error('Reached all requests');
    }
    return (
      <Container className="d-flex justify-content-center flex-column">
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={this.state.query}
        />
        {loading && Loader}
        {allHits > 0 && (
          <>
            <ImageGallery images={this.state.images} />
            {(allHits < images.totalHits && <ButtonLoadMore loadMore={this.loadMore} />)}
          </>
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}
