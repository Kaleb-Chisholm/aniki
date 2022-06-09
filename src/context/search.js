/** 
 * FILE: search.js
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/09/2022
 * 
 * PURPOSE: Declare the context for searching anime/manga.
*/

// ------------------------------- IMPORTS ------------------------------------
import { createContext } from 'react'

// ------------------------------- CONTEXT ------------------------------------
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