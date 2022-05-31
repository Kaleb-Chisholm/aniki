import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../context/search'
import { Center, Grid } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'

export function AnimeResults() {

  const search = useContext(SearchContext)
  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    if (search.animeData === undefined || search.animeData.length === 0) {
      try { 
        search.setData(JSON.parse(localStorage.getItem('myData')))
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
    // <div>
    //   {console.log(search.animeData)}
    // </div>
    <div>
      {
        dataExists 
        ? 
        (
          <Center>
            <Grid templateColumns='repeat(4, 1fr)' gap={5} m='50px' w='fit-content'>
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
    </div>
  )
}
