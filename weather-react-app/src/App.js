import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import FooterPage from './pages/FooterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import ResultPage from './pages/ResultPage';
import { api, apikey, apiForecast } from './config/config.js'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/result/:city' element={<ResultPage api={api} apikey={apikey} apiForecast={apiForecast}/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
        <FooterPage/>
      </BrowserRouter>
  );
}

export default App;
