import { SearchForm } from '../../components/SearchForm'
import { SearchContext } from '../../context/search'
import { useContext, useEffect } from 'react'
import { Box, Center, Heading } from '@chakra-ui/react'

export function MangaSearch() {

  const search = useContext(SearchContext)

  useEffect(() => {
    search.setIsAnime(false)
  }, [])

  return (
    <Center>
      <Box w={{base: '70vw', md: '50vw'}}>
        <Heading m='10px'>Search <span className='textPop'>Manga</span></Heading>
        <SearchForm />
      </Box>
    </Center>
  )
}
