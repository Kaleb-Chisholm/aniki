import { createContext } from 'react'

export const SearchContext = createContext({
  setSearch: () => {},
  getSearch: () => {},
  animeData: [],
  searchAnime: () => {},
  setDataAnime: () => {},
  mangaData: [],
  searchManga: () => {},
  setDataManga: () => {},
  setIsAnime: () => {},
  setIsManga: () => {},
  getIsAnime: () => {},

})