import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../../context/search'
import { Box, Button, Center, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { MangaSearch } from '../../containers/manga/MangaSearch'
import { MangaCard } from './MangaCard'
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'
import { BackForthButtons } from '../BackForthButtons'

export function MangaResults() {

  const search = useContext(SearchContext)
  const [dataExists, setDataExists] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  useEffect(() => {
    if (search.mangaData === undefined || search.mangaData.length === 0) {
      try { 
        search.setDataManga(JSON.parse(localStorage.getItem('myData')))
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
    if (!search.mangaData.Page.pageInfo.hasNextPage) { setHasNext(false) } 
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
    search.searchManga(item, page, "FAVOURITES_DESC")
    .then((data) => {
      search.setDataManga(data.data)
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
    search.searchManga(item, page, "FAVOURITES_DESC")
    .then((data) => {
      search.setDataManga(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
    })
  }

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
        dataExists ? (
          <Stack>
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
            </Grid>
            <BackForthButtons 
              hasPrev={hasPrev}
              hasNext={hasNext} 
              pageNum={search.getPageNum()}
              goBackPage={goBackPage}
              goNextPage={goNextPage}
            />
          </Stack>
        ) : (
          <Center>
            <Text>Data does not exist</Text>
          </Center>
        )
      }
    </Box>
  )
}
