import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'

export default function ComuniComponent({provincia, navigate, finalPlace}) {

    const [errMsg, setErrMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const [comuni, setComuni] = useState('')
    const [comune, setComune] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/provincia/${provincia}`)
        .then(response => response.json())
        .then(json => {
            setComuni(json)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
            setErrMsg(true)
        })
    }, [provincia])

    const selezionaComune= (event)=>{
        setComune(event.target.value)
    }

    const cercaProvincia = ()=>{
        navigate('/result/' + provincia)
    }
    const cercaComune = ()=>{
        navigate('/result/' + comune)
    }

  return (
    <>
        {loading && <div className='spinner'><Spinner variant='dark' animation="border" /></div>}
        {errMsg && <Alert variant='danger'>Errore nel caricamento dei dati...</Alert>}

        {comuni!=='' &&
        <>
        <Form.Group className="mb-3">
            <Form.Label>Comune</Form.Label>
            <Form.Select onChange={(event) => selezionaComune(event)}>
                <option value=''>Seleziona comune</option>
                {comuni.map(c => (
                    <option key={c.codice} value={c.nome}>{c.nome}</option>
                    ))}
            </Form.Select>
        </Form.Group>
        </>}
        {comune!== '' && <Button variant='dark' onClick={(event)=> cercaComune(event)}>Cerca comune</Button>}
        {comune == '' && <Button variant='dark' onClick={(event)=> cercaProvincia(event)}>Cerca Provincia</Button>}
    </>
  )
}
