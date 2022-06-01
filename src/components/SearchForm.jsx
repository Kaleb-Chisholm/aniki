import { Box, Button, Grid, GridItem, Input, useToast } from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchContext } from '../context/search'
import { useNavigate } from 'react-router-dom'

export function SearchForm() {

  // const toast = useToast()
  const navigate = useNavigate()
  const search = useContext(SearchContext)
  const isAnime = search.getIsAnime()
  const [input, setInput] = useState([])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()

    if (search.getIsAnime() === true) {
      search.setSearch(input)
      search.searchAnime(input)
      .then((data) => {
        search.setDataAnime(data.data)
        console.log(data.data)
        localStorage.setItem('myData', JSON.stringify(data.data))
        navigate('/anime-results')
      })
    } else {
      search.searchManga(input)
      .then((data) => {
        search.setDataManga(data.data)
        console.log(data.data)
        localStorage.setItem('myData', JSON.stringify(data.data))
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
            type='search' 
            bg='white'
            borderRadius='full'
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
            variant='ghost'
          >
            <AiOutlineSearch fontSize='20pt'/>
          </Button>
        </GridItem>
      </Grid>
    </Box>
  )
}
