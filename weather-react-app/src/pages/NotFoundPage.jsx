import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }
  return (
    <Container fluid className='p-3'>
      <Button type='button' variant='dark rounded-5' onClick={goBack}>
        <i className="bi bi-arrow-left"></i>
      </Button>
        <h1>Not Found</h1>
    </Container>
  )
}
