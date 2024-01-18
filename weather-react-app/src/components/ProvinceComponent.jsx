import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import ComuniComponent from './ComuniComponent'

export default function ProvinceComponent({regione, navigate}) {

    const [errMsg, setErrMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const [province, setProvince] = useState('')
    const [provincia, setProvincia] = useState('')

    useEffect(()=>{
        setLoading(true)
        
        fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/province/${regione}`)
        .then(response => response.json())
        .then(json => {
            setProvince(json)
            setLoading(false)
        })
        .catch(err=>{
            console.error(err)
            setErrMsg(true)
            setLoading(false)
        })
    }, [regione])

    const selezionaProvincia= (event)=>{
        setProvincia(event.target.value)
    }

    const search = ()=>{
        navigate('/result/'+regione)
    }

  return (
    <>
        {loading && <div className='spinner'><Spinner variant='dark' animation="border" /></div>}
        {errMsg && <Alert variant='danger'>Errore nel caricamento dei dati...</Alert>}
        {province!== '' && 
            <>
            <Form.Group className="mb-3">
                <Form.Label>Provincia</Form.Label>
                <Form.Select onChange={(event)=>selezionaProvincia(event)}>
                    <option value=''>Seleziona provincia</option>
                    {province.map(p => (
                        <option key={p.codice} value={p.nome}>{p.nome}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            {provincia!=='' && <ComuniComponent provincia={provincia} navigate={navigate}/>}
            </>}
            {provincia=='' && <Button variant='dark' className='mb-3' onClick={(event)=> search(event)}>Cerca regione</Button>}
    </>     
  )
}
