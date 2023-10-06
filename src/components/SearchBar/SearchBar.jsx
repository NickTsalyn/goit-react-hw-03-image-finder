// import { Container } from "react-bootstrap";
import { Component } from 'react';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';

export class SearchBar extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSearchQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query.trim() === '') {
      toast.error('Please enter a search value');
      return;
    }

    onSubmit(query);
  };

  render() {
    const { handleSubmit, handleSearchQueryChange } = this;
    const { query } = this.state;

    return (
      <Stack direction="horizontal" className="justify-content-center mt-5">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            name="query"
            className="me-auto"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchQueryChange}
            value={query}
          />
          <Button type="submit">
            <span>Search</span>
          </Button>
        </Form>
      </Stack>
    );
  }
}
