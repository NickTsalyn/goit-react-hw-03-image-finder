// import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import 'bootstrap/dist/css/bootstrap.min.css'

export const SearchBar = ({handleChange, handleSubmit, value}) => {
    
  return (
    <Stack direction="horizontal" className='justify-content-center mt-5'>
  <Form className='d-flex'  onSubmit={(e) => {handleSubmit(e)}}>
  <Form.Control
      className="me-auto"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={(e) => {handleChange(e)}}
      value={value}
    />
    <Button type="submit"> 
      <span>Search</span>
    </Button>
  </Form>
</Stack>
  );
};
