/** 
 * FILE: SearchProvider.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/09/2022
 * 
 * PURPOSE: Function component the search provider context.
 * 
 * PROPS:
 *   { children } - Any children function components.
 * 
 * NOTES: Ideally, there would only be one GraphQL function titled "search".
 *        However, due to API limitations and limited experience with GraphQL,
 *        there are three labelled: "search", "topSearch", and "searchWithGenre".
 *        Each of them are identical with only small variable changes between them.
 *        If a variable is declared in the query, then it cannot be null or
 *        undefined. Therefore, optional variables are not allowed as the API
 *        doesn't handle them (E.g. if $genre is a variable, then it must be used
 *        and it cannot be null or undefined). Therefore, since there is no 
 *        default value used for genre filtering, "search" is used when no genre 
 *        is specified and "searchWithGenre" is used when genre is specified.
 *        The same applies to "search" and "topSearch" where "search" takes
 *        a value to search for, whereas "topSearch" gets any titles.
*/

// ------------------------------- IMPORTS ------------------------------------
import { useState } from 'react'
import { SearchContext } from '../context/search'

// ------------------------------ FUNCTION ------------------------------------
export function SearchProvider({ children }) {

  // Term being searched for in the search/topSearch query
  const [searchInput, setSearchInput] = useState('')
  const setSearch = (data) => { setSearchInput(data) }
  const getSearch = () => { return searchInput }

  // Anime/manga data from the query response.
  const [data, setData] = useState([])
  const setItem = (data) => { setData(data) }

  // Flag for whether or not a search was for anime or manga.
  const [isAnimeSearch, setIsAnimeSearch] = useState()
  const setIsAnime = (data) => { setIsAnimeSearch(data) }
  const getIsAnime = () => { return isAnimeSearch }

  // Page number for the current page of the results.
  const [pageNum, setPage] = useState(1)
  const setPageNum = (num) => { setPage(num) }
  const getPageNum = () => { return pageNum }

  // Handle the response from the API.
  const handleResponse = (response) => {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }


  // Search for anime/manga without genre.
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


  // Search for top anime/manga.
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


  // Search for anime/manga with genre.
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
