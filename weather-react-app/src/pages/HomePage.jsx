import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import RegioniComponent from '../components/RegioniComponent';

export default function HomePage() {

    const navigate = useNavigate();

    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const search = ()=>{
        navigate('/result/' + input)
    }

  return (
    <Container id='main-container'>
        <h1 id='brand'>Cielodice il Meteo</h1>
        <Form>
            <Form.Group className="py-5 d-flex " controlId="formBasicEmail">
                <Form.Control 
                    type="text" 
                    placeholder="Inserisci una località..." 
                    value={input}
                    onChange={(event)=>handleChange(event)} 
                />
                <Button 
                    variant="dark ms-2" 
                    type="button"
                    onClick={search}
                >
                    Cerca
                </Button>
            </Form.Group>
        </Form>
        <RegioniComponent/>
    </Container>
  )
}
