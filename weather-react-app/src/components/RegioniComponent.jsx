import React, { useState } from 'react'
import { Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ProvinceComponent from './ProvinceComponent';

export default function RegioniComponent() {

    const navigate = useNavigate();

    const regioni = [
        "Abruzzo",
        "Basilicata",
        "Calabria",
        "Campania",
        "Emilia Romagna",
        "Friuli Venezia Giulia",
        "Lazio",
        "Liguria",
        "Lombardia",
        "Marche",
        "Molise",
        "Piemonte",
        "Puglia",
        "Sardegna",
        "Sicilia",
        "Toscana",
        "Trentino Alto Adige",
        "Umbria",
        "Valle d'Aosta",
        "Veneto"
      ]
    const [regione, setRegione] = useState('')

    const selezionaRegione= (event)=>{
        setRegione(event.target.value)
    }
    
  return (
    <Container>
        <h2 className='text-secondary fw-light'>Cerca in Italia...</h2>
        <Form id='seleziona-luogo'>
            <Form.Group className="mb-3">
            <Form.Label>Regione</Form.Label>
                <Form.Select onChange={(event)=>selezionaRegione(event)}>
                    <option value=''>Seleziona regione</option>
                    {regioni.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                    ))}
                </Form.Select>
            </Form.Group>

           {regione !== '' && <ProvinceComponent regione={regione} navigate={navigate}/>}
        </Form>
    </Container>
  )
}
