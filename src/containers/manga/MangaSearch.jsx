import { SearchForm } from '../../components/SearchForm'
import { SearchContext } from '../../context/search'
import { useContext, useEffect } from 'react'
import { Box, Center, Heading } from '@chakra-ui/react'

export function MangaSearch({ children }) {

  const search = useContext(SearchContext)
  useEffect(() => {
    search.setIsAnime(false)
  }, [])

  return (
    <Center>
      <Box
        w='100%'
        bg='boxGradient' 
        px='20px' py='10px'
        borderRadius='3xl'
        shadow='0px 0px 10px black'
      >
        <Heading mb='10px'>Search <span className='textPop'>Manga</span></Heading>
        <SearchForm />
        {children}
      </Box>
    </Center>
  )
}
