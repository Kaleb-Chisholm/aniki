import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../context/search'
import { Box, Button, Center, Grid, Heading, Text } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'
import { AnimeSearch } from '../containers/anime/AnimeSearch'

export function AnimeResults() {

  const search = useContext(SearchContext)
  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    search.setIsAnime(true)
    if (search.animeData === undefined || search.animeData.length === 0) {
      try { 
        search.setDataAnime(JSON.parse(localStorage.getItem('myData')))
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

  // const goNextPage = () => {
  //   const item = search.getSearch()
  //   const page = search.animeData.Page.pageInfo.currentPage
  //   search.searchManga(item, page, 'FAVOURITES_DESC')
  //   .then((data) => {
  //     search.setDataManga(data.data)
  //     console.log(data.data)
  //     localStorage.setItem('myData', JSON.stringify(data.data))
  //     console.log(data.data)
  //   })
  // }

  return (
    <Box>
      <Center>
        <Box w={{base: '70vw', md: '50vw'}}>
          <AnimeSearch>
            <Heading fontSize='2xl' mt='10px'>
              {`Showing Results for "${search.getSearch()}"`}
            </Heading>
          </AnimeSearch>
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
                search.animeData.Page.media.map((item) => (
                  <AnimeCard key={item.id} anime={item} />
                ))
              }
            </Grid>
            {/* <Button onClick={goNextPage()}>
              Next Page
            </Button> */}
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
