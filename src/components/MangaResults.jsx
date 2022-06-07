import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../context/search'
import { Box, Center, Grid, Heading, Text } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'
import { MangaSearch } from '../containers/manga/MangaSearch'
import { MangaCard } from './MangaCard'

export function MangaResults() {

  const search = useContext(SearchContext)
  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    if (search.mangaData === undefined || search.mangaData.length === 0) {
      try { 
        search.setDataManga(JSON.parse(localStorage.getItem('myData')))
        search.setSearch(localStorage.getItem('myInput'))
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
      <Center>
        <Box w={{base: '70vw', md: '50vw'}}>
          <MangaSearch>
            <Heading fontSize='2xl' mt='10px'>
              {`Showing Results for "${search.getSearch()}"`}
            </Heading>
          </MangaSearch>
        </Box>
      </Center>
      {
        dataExists 
        ? 
        (
          <Center>
            <Grid 
              templateColumns='repeat(auto-fill, minmax(215px, 1fr))'
              gap={2} 
              mt='50px' 
              w='full'
            >
              {
                search.mangaData.Page.media.map((item) => (
                  <MangaCard key={item.id} manga={item} />
                ))
              }
            {search.mangaData.Page.media[0].title.romaji}
            </Grid>
          </Center>
        )
        : 
        (
          <Center>
            <Text>Data does not exist</Text>
          </Center>
        )
      }
    </Box>
  )
}
