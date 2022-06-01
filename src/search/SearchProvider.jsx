import { useState } from 'react'
import { SearchContext } from '../context/search'

export function SearchProvider({ children }) {

  const [searchInput, setSearchInput] = useState('')
  const setSearch = (data) => { setSearchInput(data) }
  const getSearch = () => { return searchInput }

  const [animeData, setAnimeData] = useState([])
  const [singleAnimeData, setSingleAnimeData] = useState({})
  const setDataAnime = (data) => { setAnimeData(data) }
  const setSingleAnime = (data) => { setSingleAnimeData(data) }

  const [mangaData, setMangaData] = useState([])
  const [singleMangaData, setSingleMangaData] = useState({})
  const setDataManga = (data) => { setMangaData(data) }
  const setSingleManga = (data) => { setSingleMangaData(data) }

  const [isAnimeSearch, setIsAnimeSearch] = useState()
  const getIsAnime = () => { return isAnimeSearch }
  const setIsAnime = (data) => { setIsAnimeSearch(data) }

  const handleResponse = (response) => {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }

  const searchAnime = (searchTerm) => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
          id
          title {
            romaji
            english
            native
          }
          episodes
          duration
          chapters
          isAdult
          genres
          seasonYear
          averageScore
          popularity
          characters(page: 1, role: MAIN) {
            edges {
              node {
                id
                name {
                  first
                  last
                }
              }
              role
              voiceActors (language: JAPANESE) {
                id
                name {
                  first
                  last
                }
              }
            }
          }
          coverImage {
            extraLarge
            large
            medium
          }
          studios {
            edges {
              id
              node {
                name
              }
            }
          }
        }
      }
    }
    `
    var variables = {
        search: searchTerm,
        page: 1,
        perPage: 20,
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    return fetch(url, options).then(handleResponse)            
  }

  const searchManga = (searchTerm) => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(search: $search, type: MANGA, sort: FAVOURITES_DESC) {
          id
          title {
            romaji
            english
            native
          }
          chapters
          isAdult
          genres
          type
          startDate {
            year
          }
          seasonYear
          averageScore
          popularity
          characters(page: 1, role: MAIN) {
            edges {
              node {
                id
                name {
                  first
                  last
                }
              }
              role
            }
          }
          coverImage {
            extraLarge
            large
            medium
          }
        }
      }
    }
    `
    var variables = {
        search: searchTerm,
        page: 1,
        perPage: 20,
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    return fetch(url, options).then(handleResponse)            
  }

  return (
    <SearchContext.Provider 
      value={{ 
        setSearch,
        getSearch,
        searchAnime, 
        animeData, 
        setDataAnime, 
        singleAnimeData, 
        setSingleAnime,
        searchManga, 
        mangaData, 
        setDataManga, 
        singleMangaData, 
        setSingleManga,
        setIsAnimeSearch,
        setIsAnime,
        getIsAnime
      }}
    >
      { children }
    </SearchContext.Provider>
  )
}
