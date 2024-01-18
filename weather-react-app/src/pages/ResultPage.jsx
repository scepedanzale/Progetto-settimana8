import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Container, Row, Image, Spinner, Alert } from 'react-bootstrap'

import ForecastComponent from '../components/ForecastComponent';

export default function ResultPage({api, apikey, apiForecast}) {

  const { city } = useParams();
  const [obj, setObj] = useState({})

  const [errMsg, setErrMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [objExist, setObjExist] = useState(false)
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1)
  }

  useEffect( () => {
    setLoading(true)

    fetch(api + city + '&appid=' + apikey + '&units=metric&lang=it')
    .then(response => response.json())
    .then(json=> {
        setObj(json);
        setObjExist(true)
        setLoading(false)
    })
    .catch(error=>{
      console.error(error)
      setLoading(false)
      setErrMsg(true)
    })
  }, [city])
 
  return (
    <>
    {loading && <div className='spinner'><Spinner variant='info' animation="border" /></div>}
    {errMsg && <Alert variant='danger'>Errore nel caricamento dei dati...</Alert>}
      {objExist && 

      <main className='p-4'>
        
        <Button type='button' variant='secondary rounded-5' className='sticky-top top-0' onClick={goBack}>
          <i className="bi bi-arrow-left"></i>
        </Button>
        <section className='my-3 d-flex flex-column justify-content-center align-items-center'>
        
          <Container fluid className='text-center temperatura p-4'>
            <Row className='align-items-center'>
              <Col xs={12} sm={6}>
                  <h1 className='m-0'>{obj.name}</h1>
                  <p className='m-0'>{obj.sys.country}</p>
                  <div className='d-flex justify-content-center'>
                    <picture>
                      <Image src={`https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`}/>
                      <figcaption>{obj.weather[0].description}</figcaption>
                    </picture>
                    {obj.weather.length>1 && 
                    <picture>
                      <Image src={`https://openweathermap.org/img/wn/${obj.weather[1].icon}@2x.png`}/>
                      <figcaption>{obj.weather[1].description}</figcaption>
                    </picture>
                    }
                  </div>
              </Col>
              <Col xs={12} sm={6}>
                <Col><i class="bi bi-droplet"></i>{obj.main.humidity}%</Col>
                <Col className='temp text-info'>{obj.main.temp}°</Col>
                <Col className='temp-min-max'>MIN: {obj.main.temp_min}° - MAX: {obj.main.temp_max}°</Col>
              </Col>
            </Row>
            <Row className='align-items-center'>
            </Row>
          </Container>

        <ForecastComponent apikey={apikey} apiForecast={apiForecast} obj={obj}/>

        </section>
      </main>
      }
    
    </>
      
    
  )
}
