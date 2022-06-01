import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../context/search'
import { Center, Grid, Text } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'

export function MangaResults() {

  const search = useContext(SearchContext)
  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    if (search.mangaData === undefined || search.mangaData.length === 0) {
      try { 
        search.setDataManga(JSON.parse(localStorage.getItem('myData')))
        setDataExists(true)
      } catch (error) {
        console.log(error)
        setDataExists(false)
      }
    }
    else {
      setDataExists(true)
    }
  }, [search])

  return (
    <div>
      {
        dataExists 
        ? 
        (
          <Center>
            <Text>
              {
                search.mangaData.Page.media[0].title.romaji
              }
            </Text>
          </Center>
        )
        : 'Data does not exist'
      }
    </div>
  )
}
