import { useState } from 'react'
import { SearchContext } from '../context/search'

export function SearchProvider({ children }) {

  const [searchInput, setSearchInput] = useState('')
  const setSearch = (data) => { setSearchInput(data) }
  const getSearch = () => { return searchInput }

  const [animeData, setAnimeData] = useState([])
  const setDataAnime = (data) => { setAnimeData(data) }

  const [mangaData, setMangaData] = useState([])
  const setDataManga = (data) => { setMangaData(data) }

  const [isAnimeSearch, setIsAnimeSearch] = useState()
  const getIsAnime = () => { return isAnimeSearch }
  const setIsAnime = (data) => { setIsAnimeSearch(data) }

  const [pageNum, setPage] = useState(1)
  const setPageNum = (num) => { setPage(num) }
  const getPageNum = () => { return pageNum }

  const handleResponse = (response) => {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }

  const searchAnime = (searchTerm, page, sort, filter) => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
        }
        media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
          id
          title {
            romaji
            english
            native
          }
          episodes
          description
          duration
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
          tags {
            name
          }
        }
      }
    }
    `
    var variables = {
        search: searchTerm,
        page: page,
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

  const searchManga = (searchTerm, page, sort, filter) => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          currentPage
          hasNextPage
        }
        media(search: $search, type: MANGA, sort: $sort) {
          id
          title {
            romaji
            english
            native
          }
          volumes
          chapters
          description
          isAdult
          tags {
            name
          }
          genres
          type
          startDate {
            year
          }
          averageScore
          popularity
          staff {
            edges {
              role
              node {
                name {
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
                }
              }
            }
          }
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
        page: page,
        sort: sort,
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
        searchManga, 
        mangaData, 
        setDataManga, 
        setIsAnimeSearch,
        setIsAnime,
        getIsAnime,
        pageNum,
        setPageNum,
        getPageNum
      }}
    >
      { children }
    </SearchContext.Provider>
  )
}
