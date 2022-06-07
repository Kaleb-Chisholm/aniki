import {
  Box,
  Grid, 
  GridItem, 
  Heading, 
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'

export function SingleAnime(props) {

  const setStudios = (studio) => {
    if (studio.length === 0) {
      return ['Unavailable']
    } else {
      let studios = []
      for (let i = 0; i < studio.length && i < 2; i++) {
        if (i === 0 && studio.length > 1) {
          studios.push(studio[i].node.name + ', ')
        } else {
          studios.push(studio[i].node.name)
        }
      }
      return studios
    }
  }

  const setDescription = (description) => {
    if (description != null && !(/^\s*$/.test(description))) {
      return ((description).replaceAll('<br>', ''))
    } else {
      return 'No description available'
    }
  }

  const setStars = (stars) => {
    if (stars.length === 0) {
      return ['Stars unavailable']
    } else {
      let starring = []
      for (let i = 0; i < stars.length && i < 3; i++) {
        if (stars[i].voiceActors.length === 0) {
          return ['Stars unavailable']
        } else {
          if (stars[i].voiceActors[0].name.last === null) {
            if (stars[i].voiceActors[0].name.first != null) {
              starring.push(stars[i].voiceActors[0].name.first)
            }
          } else {
            if (stars[i].voiceActors[0].name.first === null) {
              starring.push(stars[i].voiceActors[0].name.last)
            }
          }
          starring.push(stars[i].voiceActors[0].name.last + ', ' + stars[i].voiceActors[0].name.first)
        }
      }
      return starring
    }
  }

  const setTags = (tags) => {
    if (tags.length === 0) {
      return []
    }
    let tagList = []
    for (let i = 0; i < tags.length && i < 6; i++) {
      if (tags[i].name != null) {
        tagList.push(tags[i].name)
      }
    }
    return tagList
  }

  const setScore = (score) => {
    if (score === null) {
      return 'Reviews unavailable'
    } else {
      return (score + '%')
    }
  }

  const setLength = (data) => {
    console.log(data)
    if (data.episodes === 1) {
      return {label: 'Duration:', length: data.duration}
    } else {
      return {label: 'Episodes:', length: data.episodes}
    }
  }

  const data = props.data,
        image = (data.coverImage.large 
                || data.coverImage.extraLarge 
                || data.coverImage.medium),
        genres = (data.genres || []),
        studios = setStudios(data.studios.edges),
        adult = (data.isAdult || false),
        score = setScore(data.averageScore),
        description = setDescription(data.description),
        stars = setStars(data.characters.edges),
        tags = setTags(data.tags),
        length = setLength(data)

  return (
    <Grid templateColumns='auto 1fr' gap={4}>
      <GridItem>
        <Image 
          src={image}
          alt='anime-poster'
          w='215px' h='280px'
          shadow='0px 0px 10px black'
          borderRadius='3xl'
        />
        {
          adult &&
         <Text 
           position='absolute' 
           mt='-28px' ml='0px' 
           bg='red' 
           w='fit-content' 
           p='2px 10px' 
           borderRadius='3xl'
           borderTopLeftRadius='none'
           borderBottomEndRadius='none'
           fontWeight='bold'
           shadow='0px 0px 10px black'
         >
           ADULT 18+
         </Text>}
      </GridItem>
      <Box 
        bg='grey.800' 
        px='10px'
        borderRadius='3xl'
        shadow='0px 0px 10px black'
      >
        <HStack wrap='wrap' justify='flex-start' mb='10px'>{
          genres.filter((genre, index) => index < 5).map((genre) => 
            <Text
              key={genre}
              bg='grey.700'
              p='3px 10px'
              borderRadius='2xl'
              shadow='0px 0px 10px black'
              my='10px'
            >
              {genre}
            </Text>
          )
        }</HStack>
        <Grid templateColumns='auto 1fr' gap={2}>
          <Text fontWeight='semibold'>{length.label}</Text>
          <Text>{length.length}</Text>
          <Text fontWeight='semibold'>Studios:</Text>
          <HStack wrap='wrap' justify='flex-start'>
            {
              studios.map((studio) => 
                <Text key={studio}>{studio}</Text>
              ) 
            }
          </HStack>
          <Text fontWeight='semibold'>Starring:</Text>
          <Stack>
            {
              stars.map((studio) => 
                <Text key={studio}>{studio}</Text>
              ) 
            }
          </Stack>
          <Text fontWeight='semibold'>Rating:</Text>
          <Text>{score}</Text>
        </Grid>
      </Box>
      <GridItem colSpan={2}>
        <HStack wrap='wrap' justify='space-evenly'>
          {
            tags.map((tag) =>
            <Text 
              key={tag}
              bg='secondaryBright'
              p='2px 4px'
              borderRadius='lg'
              color='black'
              shadow='0px 0px 10px black'
              my='10px'
            >
              {tag}
            </Text>
            )
          }
        </HStack>
      </GridItem>
      <GridItem colSpan={2}>
        <Heading fontSize='2xl' mb='5px'>Synopsis:</Heading>
        <Text>{description}</Text>
      </GridItem>
    </Grid>
  )
}
