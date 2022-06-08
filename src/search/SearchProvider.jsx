import { useState } from 'react'
import { SearchContext } from '../context/search'

export function SearchProvider({ children }) {

  const [searchInput, setSearchInput] = useState('')
  const setSearch = (data) => { setSearchInput(data) }
  const getSearch = () => { return searchInput }

  const [data, setData] = useState([])
  const setItem = (data) => { setData(data) }

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

  const search = (searchTerm, isAnime, isManga, mangaOrAnime, page, sort) => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort], $isAnime: Boolean!, $isManga: Boolean!, $mangaOrAnime: MediaType) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(search: $search, type: $mangaOrAnime, sort: $sort) {
          id
          episodes @include(if: $isAnime)
          volumes @include(if: $isManga)
          chapters @include(if: $isManga)
          description
          duration @include(if: $isAnime)
          isAdult
          genres
          seasonYear @include(if: $isAnime)
          averageScore
          popularity
          startDate @include(if: $isManga) {
            year
          }
          title {
            romaji
            english
          }
          staff @include(if: $isManga) {
            edges {
              role
              node {
                name {
                  first
                  last
                  full
                }
              }
            }
          }
          characters @include(if: $isAnime) {
            edges {
              node {
                name {
                  first
                  last
                }
              }
              role
              voiceActors (language: JAPANESE) {
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
          studios @include(if: $isAnime) {
            edges {
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
        sort: sort,
        perPage: 20,
        isAnime: isAnime,
        isManga: isManga,
        mangaOrAnime: mangaOrAnime
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

  const topSearch = (isAnime, isManga, mangaOrAnime, page, sort) => {
    var query = `
    query ($page: Int, $perPage: Int, $sort: [MediaSort], $isAnime: Boolean!, $isManga: Boolean!, $mangaOrAnime: MediaType) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(type: $mangaOrAnime, sort: $sort) {
          id
          episodes @include(if: $isAnime)
          volumes @include(if: $isManga)
          chapters @include(if: $isManga)
          description
          duration @include(if: $isAnime)
          isAdult
          genres
          seasonYear @include(if: $isAnime)
          averageScore
          popularity
          startDate @include(if: $isManga) {
            year
          }
          title {
            romaji
            english
          }
          staff @include(if: $isManga) {
            edges {
              role
              node {
                name {
                  first
                  last
                  full
                }
              }
            }
          }
          characters @include(if: $isAnime) {
            edges {
              node {
                name {
                  first
                  last
                }
              }
              role
              voiceActors (language: JAPANESE) {
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
          studios @include(if: $isAnime) {
            edges {
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
        page: page,
        sort: sort,
        perPage: 20,
        isAnime: isAnime,
        isManga: isManga,
        mangaOrAnime: mangaOrAnime
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

  const searchWithGenre = (searchTerm, isAnime, isManga, mangaOrAnime, page, sort, genre) => {
    var query = `
    query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort], $genre: String, $isAnime: Boolean!, $isManga: Boolean!, $mangaOrAnime: MediaType) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(search: $search, type: $mangaOrAnime, sort: $sort, genre: $genre) {
          id
          episodes @include(if: $isAnime)
          volumes @include(if: $isManga)
          chapters @include(if: $isManga)
          description
          duration @include(if: $isAnime)
          isAdult
          genres
          seasonYear @include(if: $isAnime)
          averageScore
          popularity
          startDate @include(if: $isManga) {
            year
          }
          title {
            romaji
            english
          }
          staff @include(if: $isManga) {
            edges {
              role
              node {
                name {
                  first
                  last
                  full
                }
              }
            }
          }
          characters @include(if: $isAnime) {
            edges {
              node {
                name {
                  first
                  last
                }
              }
              role
              voiceActors (language: JAPANESE) {
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
          studios @include(if: $isAnime) {
            edges {
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
        sort: sort,
        genre: genre,
        perPage: 20,
        isAnime: isAnime,
        isManga: isManga,
        mangaOrAnime: mangaOrAnime
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
        search,
        setSearch,
        getSearch,
        setIsAnimeSearch,
        setIsAnime,
        getIsAnime,
        pageNum,
        setPageNum,
        getPageNum,
        searchWithGenre,
        data,
        setItem,
        topSearch
      }}
    >
      { children }
    </SearchContext.Provider>
  )
}
