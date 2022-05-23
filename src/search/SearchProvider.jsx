import { useState } from 'react'
import { SearchContext } from '../context/search'

export function SearchProvider({ children }) {

  const [animeData, setAnimeData] = useState([])
  const [singleData, setSingleData] = useState({})
  const setData = (data) => { setAnimeData(data) }
  const setSingle = (data) => { setSingleData(data) }

  const handleResponse = (response) => {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }
  
  // function handleData(data) {
  //   console.log(data.data.Page.media);
  //   setData(data.data.Page.media)
  //   localStorage.setItem('myData', JSON.stringify(data))
  // }
  
  // function handleError(error) {
  //   alert('Error, check console');
  //   console.error(error);
  // }

  const search = (searchTerm) => {
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
          type
          genres
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
  //   .then(handleData)
  //   .catch(handleError);

    // return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}`)
    // .then(response => response.json())
                      
  }
  return (
    <SearchContext.Provider 
    value={{ 
      search, 
      animeData, 
      setData, 
      singleData, 
      setSingle
    }}
  >
    { children }
    </SearchContext.Provider>
  )
}
