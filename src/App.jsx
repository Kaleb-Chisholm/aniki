import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './containers/Landing'
import { Page } from './pages/Page'
import { Anime } from './containers/Anime'
import { Manga } from './containers/Manga'
import { Results } from './containers/Results'
import { SearchProvider } from './search/SearchProvider'
import './App.css';

export default function App() {
  return (
  <SearchProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page><Landing /></Page>}/>
        <Route path='/anime' element={<Page><Anime /></Page>}/>
        <Route path='/manga' element={<Page><Manga /></Page>}/>
        <Route path='/results' element={<Page><Results /></Page>}/>
      </Routes>
    </BrowserRouter>
  </SearchProvider>
  );
}