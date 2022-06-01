import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../context/search'
import { Box, Center, Grid, Heading } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'
import { SearchForm } from './SearchForm'

export function AnimeResults() {

  const search = useContext(SearchContext)
  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    search.setIsAnime(true)
    if (search.animeData === undefined || search.animeData.length === 0) {
      try { 
        search.setDataAnime(JSON.parse(localStorage.getItem('myData')))
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
    <Box>
      <SearchForm />
      <Heading>{`Showing Results for "${search.getSearch()}"`}</Heading>
      {
        dataExists 
        ? 
        (
          <Center>
            <Grid 
              templateColumns='repeat(auto-fill, minmax(215px, 1fr))'
              gap={2} 
              m='50px' 
              w='full'
            >
              {
                search.animeData.Page.media.map((item) => (
                  <AnimeCard key={item.id} anime={item} />
                ))
              }
            </Grid>
          </Center>
        )
        : 'Data does not exist'
      }
    </Box>
  )
}
