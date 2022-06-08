import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel,
  Grid, 
  GridItem, 
  HStack, 
  Input, 
  Select,
  useToast 
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchContext } from '../context/search'
import { useNavigate } from 'react-router-dom'


const genreData = [
  'None',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Psychological',
  'Supernatural',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Thriller',
  'Sports',
  'Ecchi',
  'Hentai',
]

export function SearchForm() {

  const toast = useToast()
  const navigate = useNavigate()
  const search = useContext(SearchContext)
  const isAnime = search.getIsAnime()
  const [input, setInput] = useState([])
  const [genre, setGenre] = useState('None')
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

    search.setSearch(input)
    localStorage.setItem('myInput', input)
    search.setPageNum(1)
    var mySelect = document.getElementById('sortSelect')
    var selected = mySelect.selectedOptions[0].value

    const isAnime = search.getIsAnime(),
          isManga = !(search.getIsAnime())
    
    let animeOrManga

    if (isAnime) { animeOrManga = 'ANIME' } 
    else { animeOrManga = 'MANGA' }

    if (genre === 'None') {
      search.search(input, isAnime, isManga, animeOrManga, 1, selected)
      .then((data) => {
        search.setItem(data.data)
        console.log(data.data)
        localStorage.setItem('myData', JSON.stringify(data.data))
        setLoading(false)
        if (isAnime) { navigate('/anime-results') } 
        else { navigate('/manga-results') }
      })
    } else {
      search.searchWithGenre(input, isAnime, isManga, animeOrManga, 1, selected, genre)
      .then((data) => {
        search.setItem(data.data)
        console.log(data.data)
        localStorage.setItem('myData', JSON.stringify(data.data))
        setLoading(false)
        if (isAnime) { navigate('/anime-results') } 
        else { navigate('/manga-results') }
      })
    }
  }

  const setGenreSelection = (e) => {
    setGenre(e.target.value)
  }

  return (
    <Box>
      <Grid templateColumns='1fr auto' p='10px'>
        <GridItem>
          <Input
            id='search' 
            bg='grey.500'
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
        <GridItem colSpan={2}>
          <HStack wrap={{base: 'wrap', lg: 'nowrap'}}>
            <FormControl py='10px'>
              <FormLabel ml='10px' fontSize='xl'>Sort by:</FormLabel>
              <Select 
                id='sortSelect' 
                placeholder='' 
                borderRadius='3xl'
                border='none'
                bg='grey.500'
                shadow='0px 0px 10px black'
                color='white'
              >
                <option value='FAVOURITES_DESC'>Favourites Descending</option>
                <option value='FAVOURITES'>Favourites Ascending</option>
                <option value='TITLE_ENGLISH'>Alphabetical</option>
                <option value='SCORE_DESC'>Score Descending</option>
                <option value='SCORE'>Score Ascending</option>
                <option value='POPULARITY_DESC'>Popularity Descending</option>
                <option value='POPULARITY'>Popularity Ascending</option>
                <option value='TRENDING_DESC'>Trending Descending</option>
                <option value='TRENDING'>Trending Ascending</option>
              </Select>
            </FormControl>
            <FormControl py='10px' ml={{base: '0px !important', lg: '10px !important'}}>
              <FormLabel ml='10px' fontSize='xl'>Genre Filter:</FormLabel>
              <Select 
                id='genreSelect' 
                placeholder='' 
                borderRadius='3xl'
                border='none'
                bg='grey.500'
                shadow='0px 0px 10px black'
                color='white'
                onChange={setGenreSelection}
              >
                {
                  genreData.map((genre) => 
                    <option key={genre} value={genre}>{genre}</option>
                  )
                }
              </Select>
            </FormControl>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  )
}
