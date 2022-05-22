import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Page } from './pages/Page'
import { Anime } from './pages/Anime'
import { Manga } from './pages/Manga'
import './App.css';

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page><Landing /></Page>}/>
      <Route path='/anime' element={<Page><Anime /></Page>}/>
      <Route path='/manga' element={<Page><Manga /></Page>}/>
    </Routes>
  </BrowserRouter>
  );
}