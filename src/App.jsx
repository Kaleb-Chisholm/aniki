import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './containers/Landing'
import { Page } from './pages/Page'
import { Anime } from './containers/Anime'
import { Manga } from './containers/Manga'
import { Results } from './containers/Results'
import { SearchContext } from './context/search'
import './App.css';

export default function App() {

  const [animeData, setAnimeData] = useState([])
  const [singleData, setSingleData] = useState({})
  const setData = (data) => { setAnimeData(data) }
  const setSingle = (data) => { setSingleData(data) }

  const search = (searchTerm) => {
    return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}`)
    .then(response => response.json())
  }

  return (
  <SearchContext.Provider 
    value={{ 
      search, 
      animeData, 
      setData, 
      singleData, 
      setSingle
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page><Landing /></Page>}/>
        <Route path='/anime' element={<Page><Anime /></Page>}/>
        <Route path='/manga' element={<Page><Manga /></Page>}/>
        <Route path='/results' element={<Page><Results /></Page>}/>
      </Routes>
    </BrowserRouter>
  </SearchContext.Provider>
  );
}