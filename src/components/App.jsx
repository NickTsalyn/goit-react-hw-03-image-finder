import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'api';
import { Container } from 'react-bootstrap';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    error: false
  };

  handleChange = evt => {
    this.setState({ query: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.query.value}`,
      images: [],
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      getImages(query, page).then(data => {
        this.setState({ images: data })
          .catch(() => this.setState({error: true}))
          .finally(() => this.setState({ loading: false }));
      });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      images: {
        ...prevState.images,
        hits: [...prevState.images.hits, ...this.state.images.hits],
      },
    }));
  };

  render() {
    const { loading , error} = this.state;
    return (
      <Container className="d-flex justify-content-center flex-column">
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={this.state.query}
        />
        {loading && Loader}
        {error && !loading && <div>Oops, something went wrong</div> }
        <ImageGallery images={this.state.images} loadMore={this.loadMore} />
      </Container>
    );
  }
}
