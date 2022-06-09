/** 
 * FILE: TopAnimeResults.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/08/2022
 * 
 * PURPOSE: Function component which contains the AnimeCards and forward/back
 *          buttons to move between pages for TopAnime.
*/

// ------------------------------- IMPORTS ------------------------------------
import { Box, Center, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'
import { SearchContext } from '../../context/search'
import { useEffect, useContext, useState } from 'react'
import { BackForthButtons } from '../BackForthButtons'
import { TopAnime } from '../../containers/anime/TopAnime'

// ------------------------------ FUNCTION ------------------------------------
export function TopAnimeResults() {
  
  const search = useContext(SearchContext)

  const [dataExists, setDataExists] = useState(false) // data exists from API or localstorage
  const [hasPrev, setHasPrev] = useState(false)       // previous page exists
  const [hasNext, setHasNext] = useState(true)        // next page exists

  // Effect - check if data exists
  useEffect(() => {
    search.setIsAnime(true)
    if (search.data === undefined || search.data.length === 0) {
      try { 
        search.setItem(JSON.parse(localStorage.getItem('myData')))
        search.setSearch(localStorage.getItem('myTop'))
        search.setPageNum(localStorage.getItem('myPage'))
        checkPages()
        setDataExists(true)
      } catch (error) {
        console.log(error)
        setDataExists(false)
      }
    } else {
      checkPages()
      setDataExists(true)
    }
  }, [search])

  // Check if there are available prev and next pages
  const checkPages = () => {
    if (!search.data.Page.pageInfo.hasNextPage) { setHasNext(false) } 
    else { setHasNext(true) }
    if (parseInt(search.getPageNum()) === 1) { setHasPrev(false) } 
    else { setHasPrev(true) }
  }

  // Check if next page is available and reload next page content
  const goNextPage = () => {
    if (!hasNext) {
      return
    }

    const item = search.getSearch(),
          page = parseInt(search.getPageNum()) + 1

    localStorage.setItem('myPage', page)
    search.setPageNum(page)
    search.topSearch(true, false, 'ANIME', page, item)
    .then((data) => {
      search.setItem(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
    })
  }


  // Check if prev page is available and reload prev page content
  const goBackPage = () => {
    if (!hasPrev) {
      return
    }

    const item = search.getSearch(),
          page = parseInt(search.getPageNum()) - 1

    localStorage.setItem('myPage', page)
    search.setPageNum(page)
    search.topSearch(true, false, 'ANIME', page, item)
    .then((data) => {
      search.setItem(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
    })
  }

  // Convert from value to plain text for display
  const convertCategory = (category) => {
    if (category === 'TRENDING_DESC') {
      return 'Trending Now'
    }
    if (category === 'SCORE_DESC') {
      return 'Top Rated'
    }
    if (category === 'POPULARITY_DESC') {
      return 'Popular Now'
    }
    if (category === 'FAVOURITES_DESC') {
      return 'Top Favourites'
    }
  }

  return (
    <Box>
      <Center>
        <Box w='100%'>
          <TopAnime>
            <Heading fontSize='2xl' pt='10px' pl='20px'>
              {`Showing Results for "${convertCategory(search.getSearch())}"`}
            </Heading>
          </TopAnime>
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
                search.data.Page.media.map((item) => (
                  <AnimeCard key={item.id} anime={item} />
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
