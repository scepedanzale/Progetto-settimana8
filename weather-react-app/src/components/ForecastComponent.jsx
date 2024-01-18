import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'


export default function ForecastComponent({apikey, apiForecast, obj}) {

    const [errMsg, setErrMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const lat = obj.coord.lat
    const lon = obj.coord.lon

    const [forecast, setForecast] = useState({})
    const [getData, setGetData] = useState(false)

    // lat={lat}&lon={lon}
  useEffect( () => {
    setLoading(true)

    fetch(apiForecast + `lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
    .then(response => response.json())
    .then(json=> {
        setForecast(json);
        setGetData(true)
        setLoading(false)
    })
    .catch(error=> {
        console.error(error)
        setLoading(false)
        setErrMsg(true)
    })
  }, [])

  return (
    getData && 
    <Container id='forecast-container'>
        {forecast.list.map((day, i)=>(
            <Row className='align-items-center '>
                <Col>
                    {day.dt_txt.slice(0, 10)}
                </Col>
                <Col>
                    <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} width={50}/>
                    
                </Col>
                <Col>
                    {day.dt_txt.slice(11, day.dt_txt.length-3)}
                </Col>
                <Col className='text-info'>
                    {day.main.temp}°
                </Col>
            </Row>
        ))}
    </Container>
  )
}
