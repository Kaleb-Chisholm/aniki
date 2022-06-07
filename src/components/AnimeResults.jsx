import { 
  Box, 
  Button, 
  Center, 
  Grid, 
  Heading, 
  HStack, 
  Stack, 
  Text 
} from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../context/search'
import { AnimeCard } from './AnimeCard'
import { AnimeSearch } from '../containers/anime/AnimeSearch'
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'

export function AnimeResults() {
  const search = useContext(SearchContext)              // Context
  const [dataExists, setDataExists] = useState(false)   // States
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  // Effect
  useEffect(() => {
    search.setIsAnime(true)
    if (search.animeData === undefined || search.animeData.length === 0) {
      try { 
        search.setDataAnime(JSON.parse(localStorage.getItem('myData')))
        search.setSearch(localStorage.getItem('myInput'))
        search.setPageNum(localStorage.getItem('myPage'))
        checkPages()
        setDataExists(true)
      } catch (error) {
        console.log(error)
        setDataExists(false)
      }
    }
    else {
      checkPages()
      setDataExists(true)
    }
  }, [search])

  // Check if there are available prev and next pages
  const checkPages = () => {
    if (!search.animeData.Page.pageInfo.hasNextPage) { setHasNext(false) } 
    else { setHasNext(true) }
    if (parseInt(search.getPageNum()) === 1) { setHasPrev(false) } 
    else { setHasPrev(true) }
  }

  // Check if next page is available and reload next page content
  const goNextPage = () => {
    if (!hasNext) {
      return
    }

    const item = search.getSearch()
    const page = parseInt(search.getPageNum()) + 1

    localStorage.setItem('myPage', page)
    search.setPageNum(page)
    search.searchAnime(item, page, "FAVOURITES_DESC")
    .then((data) => {
      search.setDataAnime(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
    })
  }


  // Check if prev page is available and reload prev page content
  const goBackPage = () => {
    if (!hasPrev) {
      return
    }

    const item = search.getSearch()
    const page = parseInt(search.getPageNum()) - 1

    localStorage.setItem('myPage', page)
    search.setPageNum(page)
    search.searchAnime(item, page, "FAVOURITES_DESC")
    .then((data) => {
      search.setDataAnime(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
    })
  }


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
          <Stack>
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
            <HStack justify='space-between'>
              <Box>
                {
                  hasPrev ? (
                    <Button 
                      variant='backForthBtn' 
                      onClick={goBackPage}
                    >
                      <IoArrowBackSharp />
                    </Button>
                  ) :
                  (
                    <Button 
                      variant='backForthBtnDim' 
                      onClick={goBackPage}
                    >
                      <IoArrowBackSharp />
                    </Button>
                  )
                }
              </Box>
              <Text>{search.getPageNum()}</Text>
              <Box>
                {
                  hasNext ? (
                    <Button 
                      variant='backForthBtn' 
                      onClick={goNextPage}
                    >
                      <IoArrowForwardSharp />
                    </Button>
                  ) :
                  (
                    <Button 
                      variant='backForthBtnDim' 
                      onClick={goNextPage}
                    >
                      <IoArrowForwardSharp />
                    </Button>
                  )
                }
              </Box>
            </HStack>
          </Stack>
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