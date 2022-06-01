import { createContext } from 'react'

export const SearchContext = createContext({
  setSearch: () => {},
  getSearch: () => {},
  animeData: [],
  singleAnimeData: {},
  searchAnime: () => {},
  setDataAnime: () => {},
  setSingleAnime: () => {},
  mangaData: [],
  singleMangaData: {},
  searchManga: () => {},
  setDataManga: () => {},
  setSingleManga: () => {},
  setIsAnime: () => {},
  setIsManga: () => {},
  getIsAnime: () => {}
})