import { Box, Button, Center, Heading, HStack } from '@chakra-ui/react'
import { useContext, useState} from 'react'
import { SearchContext } from '../../context/search'
import { useNavigate } from 'react-router-dom'

const categoryData = [
  {
    value: 'TRENDING_DESC',
    title: 'Trending Now',
  },
  {
    value: 'SCORE_DESC',
    title: 'Top Rated',
  },
  {
    value: 'POPULARITY_DESC',
    title: 'Popular Now',
  },
  {
    value: 'FAVOURITES_DESC',
    title: 'Top Favourites',
  },
]

export function TopManga({ children }) {

  const navigate = useNavigate()
  const search = useContext(SearchContext)
  const [loading, setLoading] = useState(false)      // results loading

  const handleClick = e => {
    e.preventDefault()

    setLoading(true)
    console.log(e.target.value)
    search.setSearch(e.target.value)
    localStorage.setItem('myTop', e.target.value)
    search.setPageNum(1)

    search.topSearch(false, true, 'MANGA', 1, e.target.value)
    .then((data) => {
      search.setItem(data.data)
      console.log(data.data)
      localStorage.setItem('myData', JSON.stringify(data.data))
      setLoading(false)
      navigate('/top-manga-results')
    })
  }

  return (
    <Center>
      <Box 
        w={{base: '70vw', md: '50vw'}} 
        bg='boxGradient' 
        px='20px' py='10px'
        mt='20px'
        borderRadius='3xl'
        shadow='0px 0px 10px black'
      >
        <Heading mb='10px'>Top <span className='textPop'>Manga</span></Heading>
        <HStack justify='space-evenly' wrap='wrap'>
          {
            categoryData.map((cat) =>
              <Button 
                key={cat.value}
                onClick={handleClick}
                isLoading={loading}
                value={cat.value}
                my='10px'
                variant='categoryBtn'
              >
                {cat.title}
              </Button>
            )
          }
        </HStack>
        {children}
      </Box>
    </Center>
  )
}
