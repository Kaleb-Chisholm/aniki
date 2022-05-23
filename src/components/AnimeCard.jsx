import { GridItem, Center, Box, Image, Text } from '@chakra-ui/react'


export function AnimeCard(props) {

  const data = props.anime
  console.log(data)
  let title = data.title.english
  const startDate = title
  const imgURL = title
  const epCount = title

  

  // if (title.length > 30) {
  //   title = title.substring(0,30)
  //   title = title + " ..."
  // }

  return (
    <GridItem>
    <Center>
      <Box 
        bgColor='cardColor' 
        color='black' 
        p='10px' 
        borderRadius='sm'
      >
        {/* <Image 
          src={imgURL} 
          alt='anime-poster'
          border='2px solid black'
        /> */}
        <Text 
          fontSize='xl' 
          fontWeight='bold' 
          letterSpacing='-1.5px' 
          maxW='288px' 
          minH='60px'
        >
          {title}
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
