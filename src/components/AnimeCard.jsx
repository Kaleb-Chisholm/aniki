import { 
  Grid, 
  Box, 
  Image, 
  Text, 
  HStack, 
  Stack 
} from '@chakra-ui/react'

export function AnimeCard(props) {

  const data = props.anime
  console.log(data)
  const setStudios = (studio) => {
    if (studio.length === 0) {
      return ['Unavailable']
    } else {
      let studios = []
      for (let i = 0; i < studio.length && i < 3; i++) {
        studios.push(studio[i].node.name)
      }
      return studios
    }
  }

  const setLength = (length) => {
    if (length.episodes === 1) {
      return ({label: 'DURATION:', len: length.duration + ' mins'})
    } else {
      return ({label: 'EPISODES:', len: length.episodes})
    }
  }

  const title = (data.title.english || data.title.romaji),
        year = (data.seasonYear || ''),
        image = (data.coverImage.large 
                || data.coverImage.extraLarge 
                || data.coverImage.medium),
        genres = (data.genres || []),
        studios = setStudios(data.studios.edges),
        length = setLength(data),
        adult = data.isAdult

  return (
    <Grid 
      bgColor='cardColor'
      color='black'
      borderRadius='lg'
      templateColumns='auto 1fr'
      gap={2}
      p='20px'
    >
      <Box>
        <Image 
          src={image}
          alt='anime-poster'
          border='2px solid black'
          h='300px' w='250px'
          borderRadius='lg'
        />
        {
          adult &&
          <Text 
            position='absolute' 
            mt='-33px' ml='5px' 
            bg='red.400' 
            w='fit-content' 
            p='2px 5px' 
            borderRadius='lg'
            opacity='75%'
            fontWeight='bold'
          >
            NSFW
          </Text>
        }
      </Box>
      <Stack justify='space-between' h='full'>
        <Box>
          <Text fontSize='xl' fontWeight='bold' letterSpacing='-1.5px'>
            {title.toUpperCase()}
            <span className='showDate'>{year}</span>
          </Text>
          <HStack wrap='wrap'>{
            genres.map((genre) => 
              <Text
                key={genre}
                bg='white'
                p='2px 5px'
                my='5px' ml='0px !important' mr='5px !important'
                borderRadius='lg'
                shadow='2px 2px 5px #949494'
              >
                {genre}
              </Text>
            )
          }</HStack>
          <Grid templateColumns='auto 1fr' columnGap={2}>
            <Text fontWeight='semibold' mt='5px'>{length.label}</Text>
            <Text mt='5px'>{length.len}</Text>
            <Text fontWeight='semibold' mt='5px'>STUDIOS:</Text>
            <Box w='full'>{ 
              studios.map((studio) => 
                <Text mt='5px' key={studio}>{studio}</Text>
              ) 
            }</Box>
            {/* <Text>STARRING:</Text>
            <Box>STARS</Box> */}
          </Grid>
        </Box>
        {/* <Text>{adult && <Text>NSFW</Text>}</Text> */}
      </Stack>
    </Grid>
  )
}
