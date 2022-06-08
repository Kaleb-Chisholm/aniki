import { createContext } from 'react'

export const SearchContext = createContext({
  setSearch: () => {},
  getSearch: () => {},
  data: [],
  setItem: () => {},
  setIsAnime: () => {},
  setIsManga: () => {},
  getIsAnime: () => {},
  getPageNum: () => {},
  setPageNum: () => {},
  topSearch: () => {},
  searchWithGenre: () => {},
  search: () => {},
})