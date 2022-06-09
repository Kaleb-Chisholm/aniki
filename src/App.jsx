/** 
 * FILE: App.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/09/2022
 * 
 * PURPOSE: APP
*/

// ------------------------------- IMPORTS ------------------------------------
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './containers/Landing'
import { Page } from './pages/Page'
import { AnimeSearch } from './containers/anime/AnimeSearch'
import { TopAnime } from './containers/anime/TopAnime'
import { MangaSearch } from './containers/manga/MangaSearch'
import { TopManga } from './containers/manga/TopManga'
import { AnimeResults } from './components/anime/AnimeResults'
import { MangaResults } from './components/manga/MangaResults'
import { SearchProvider } from './search/SearchProvider'
import './App.css'
import { TopAnimeResults } from './components/anime/TopAnimeResults'
import { TopMangaResults } from './components/manga/TopMangaResults'
import { NoResults } from './components/NoResults'

// ------------------------------ FUNCTION ------------------------------------
export default function App() {
  return (
  <SearchProvider>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/' 
          element={<Page><Landing /></Page>}
        />

        {/* ANIME ROUTES */}
        <Route 
          path='/anime-search' 
          element={<Page><AnimeSearch><NoResults/></AnimeSearch></Page>}
        />
        <Route 
          path='/top-anime' 
          element={<Page><TopAnime><NoResults/></TopAnime></Page>}
        />
        
        {/* MANGA ROUTES */}
        <Route 
          path='/manga-search' 
          element={<Page><MangaSearch><NoResults/></MangaSearch></Page>}
        />
        <Route 
          path='/top-manga' 
          element={<Page><TopManga><NoResults/></TopManga></Page>}
        />

        {/* RESULTS ROUTES */}
        <Route 
          path='/anime-results' 
          element={<Page><AnimeResults /></Page>}
        />
        <Route 
          path='/top-anime-results' 
          element={<Page><TopAnimeResults /></Page>}
        />
        <Route 
          path='/manga-results' 
          element={<Page><MangaResults /></Page>}
        />
        <Route 
          path='/top-manga-results' 
          element={<Page><TopMangaResults /></Page>}
        />

      </Routes>
    </BrowserRouter>
  </SearchProvider>
  );
}