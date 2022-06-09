/** 
 * FILE: SingleManga.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/08/2022
 * 
 * PURPOSE: Function component for the content of the modal popup
 *          shown when a MangaCard is clicked.
 * 
 * PROPS:
 *   manga - The manga data.
*/

// ------------------------------- IMPORTS ------------------------------------
import {
  Box,
  Grid, 
  GridItem, 
  Heading, 
  HStack,
  Image,
  Text,
} from '@chakra-ui/react'

// ------------------------------ FUNCTION ------------------------------------
export function SingleManga(props) {

  // Check data + set the manga description
  const setDescription = (description) => {
    if (description != null && !(/^\s*$/.test(description))) {
      return ((description).replaceAll('<br>', ''))
    } else {
      return 'No description available'
    }
  }
  
  // Check data + set the staff of the manga
  const setStaff = (creator) => {
    if (creator.length === 0) {
      return [{role: 'Staff unavailable', name: ''}]
    } else {
      if (creator[0].node.name === null) {
        return 'Creator unavailable'
      } else {
        if (creator[0].node.name.full === null) {
          if (creator[0].node.name.last === null) {
            if (creator[0].node.name.first != null) {
              return creator[0].node.name.first
            }
          } else {
            if (creator[0].node.name.first === null) {
              return creator[0].node.name.last
            }
          }
        } else {
          return creator[0].node.name.full
        }
      }
    }
  }

  // Check data + set the tags of the manga
  const setTags = (tags) => {
    if (tags.length === 0) {
      return []
    }
    let tagList = []
    for (let i = 0; i < tags.length && i < 8; i++) {
      if (tags[i].name != null) {
        tagList.push(tags[i].name)
      }
    }
    return tagList
  }

  // Check data + set the score of the manga
  const setScore = (score) => {
    if (score === null) {
      return 'Reviews unavailable'
    } else {
      return (score + '%')
    }
  }

  // Manga data
  const data = props.data,
        image = (data.coverImage.large 
                || data.coverImage.extraLarge 
                || data.coverImage.medium),
        genres = (data.genres || []),
        adult = (data.isAdult || false),
        score = setScore(data.averageScore),
        description = setDescription(data.description),
        creator = setStaff(data.staff.edges),
        volumes = (data.volumes || 'Unavailable'),
        chapters = (data.chapters || 'Unavailable'),
        tags = setTags(data.tags)

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
          </Text>
        }
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
          <Text fontWeight='semibold'>Creator:</Text>
          <Text>{creator}</Text>
          <Text fontWeight='semibold'>Volumes:</Text>
          <Text>{volumes}</Text>
          <Text fontWeight='semibold'>Chapters:</Text>
          <Text>{chapters}</Text>
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
