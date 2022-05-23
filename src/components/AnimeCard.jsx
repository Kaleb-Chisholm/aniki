import { GridItem, Center, Box, Image, Text } from '@chakra-ui/react'


export function AnimeCard(props) {

  let title = props.anime.abbreviatedTitles[0] 
              || props.anime.canonicalTitle
  const startDate = props.anime.startDate.substring(0,4)
  const imgURL = props.anime.posterImage.small
  const epCount = props.anime.episodeCount

  

  if (title.length > 30) {
    title = title.substring(0,30)
    title = title + " ..."
  }

  return (
    <GridItem>
    <Center>
      <Box 
        bgColor='cardColor' 
        color='black' 
        p='10px' 
        borderRadius='sm'
      >
        <Image 
          src={imgURL} 
          alt='anime-poster'
          border='2px solid black'
        />
        <Text 
          fontSize='xl' 
          fontWeight='bold' 
          letterSpacing='-1.5px' 
          maxW='288px' 
          minH='60px'
        >
          {title.toUpperCase() + ' '}
          <span className='showDate'>{startDate}</span>
        </Text>
        <Text>
          episodes {epCount}
        </Text>
      </Box>
    </Center>
  </GridItem>
  )
}
