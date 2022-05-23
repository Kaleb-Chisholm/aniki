import { Box, Button, Grid, Input, useToast } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchContext } from '../context/search'
import { useNavigate } from 'react-router-dom'

export function SearchForm() {

  // const toast = useToast()
  const navigate = useNavigate()
  const search = useContext(SearchContext)
  const [input, setInput] = useState([])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()
    console.log(input)
    search.search(input)
    // navigate('/results')
    .then((data) => {
      search.setData(data.data)
      console.log(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
      navigate('/results')
    })
  }

  return (
    <Box>
      <Grid templateColumns={{base: '1fr', md: '1fr auto auto'}}>
        <Input
          id='search' 
          type='search' 
          bg='white'
          borderRadius='full'
          placeholder='Search for Anime'
          value={input}
          onChange={handleChange}
        />
          <Button
            type='submit'
            onClick={handleSearch}
            ml={{md: '10px'}}
            mt={{base: '10px', md: '0'}}
            variant='ghost'
          >
            <AiOutlineSearch fontSize='20pt'/>
          </Button>
      </Grid>
    </Box>
  )
}
