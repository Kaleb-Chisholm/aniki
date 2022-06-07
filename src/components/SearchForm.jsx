import { Box, Button, Grid, GridItem, Input, useToast } from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchContext } from '../context/search'
import { useNavigate } from 'react-router-dom'

export function SearchForm() {

  const toast = useToast()
  const navigate = useNavigate()
  const search = useContext(SearchContext)
  const isAnime = search.getIsAnime()
  const [input, setInput] = useState([])
  const [loading, setLoading] = useState(false)      // results loading

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()

    if (!input || /^\s*$/.test(input)) {
      toast({
        title: 'Invalid Input',
        description: "Prompt is Required",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    if (input.length > 100) {
      toast({
        title: 'Invalid Input',
        description: "Prompt exceeded maximum length of 100 characters",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setLoading(true)

    if (search.getIsAnime() === true) {
      search.setSearch(input)
      localStorage.setItem('myInput', input)
      search.setPageNum(1)
      search.searchAnime(input)
      .then((data) => {
        search.setDataAnime(data.data)
        console.log(data.data)
        localStorage.setItem('myData', JSON.stringify(data.data))
        setLoading(false)
        navigate('/anime-results')
      })
    } else {
      search.setSearch(input)
      localStorage.setItem('myInput', input)
      search.setPageNum(1)
      search.searchManga(input, 1, 'FAVOURITES_DESC')
      .then((data) => {
        search.setDataManga(data.data)
        console.log(data.data)
        localStorage.setItem('myData', JSON.stringify(data.data))
        setLoading(false)
        navigate('/manga-results')
      })
    }

  }

  return (
    <Box>
      <Grid templateColumns='1fr auto'>
        <GridItem>
          <Input
            id='search' 
            bg='grey.300'
            type='search'
            borderRadius='full'
            border='0pt'
            shadow='0px 0px 10px black'
            placeholder={`Search for ${isAnime ? 'Anime' : 'Manga'}`}
            value={input}
            onChange={handleChange}
            onKeyDown={e => {if (e.key === 'Enter') { handleSearch(e) }}}
          />
        </GridItem>
        <GridItem>
          <Button
            type='submit'
            onClick={handleSearch}
            ml={{md: '10px'}}
            variant='searchButton'
            isLoading={loading}
          >
            <AiOutlineSearch fontSize='20pt'/>
          </Button>
        </GridItem>
      </Grid>
    </Box>
  )
}
