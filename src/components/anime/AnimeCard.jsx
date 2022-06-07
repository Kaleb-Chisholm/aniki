import {
  Tooltip, 
  Image, 
  Text,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Heading,
  ModalCloseButton
} from '@chakra-ui/react'
import { SingleAnime } from './SingleAnime'


export function AnimeCard(props) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const data = props.anime,
        year = (data.seasonYear || ''),
        image = (data.coverImage.large 
                || data.coverImage.extraLarge 
                || data.coverImage.medium),
        adult = (data.isAdult || false)
  
  let title = (data.title.english || data.title.romaji)
  let fullTitle = title
  if (title.length >= 30) {
    title = `${title.substring(0,30)}...`
  }

  return (
    <>
    <Grid
      transitionDuration='0.5s'
      cursor='pointer'
      _hover={{
        transform:'scale(1.05)',
        cursor: 'hand'
      }}
      onClick={onOpen}
      w='fit-content'
      borderRadius='3xl'
    >
      <GridItem>
        <Image 
          src={image}
          alt='anime-poster'
          w='215px' h='280px'
          shadow='0px 0px 10px black'
          filter={adult && 'blur(5px)'}
        />
        {
          adult &&
          <Text 
            position='absolute' 
            mt='-140px' ml='55px' 
            bg='red' 
            w='fit-content' 
            p='2px 10px' 
            borderRadius='3xl'
            fontWeight='bold'
            shadow='0px 0px 10px black'
          >
            ADULT 18+
          </Text>
        }
      </GridItem>
      <GridItem>
        <Tooltip 
          label={fullTitle} 
          placement='top-start' 
          bg='boxGradient' 
          maxW='215px'
        >
          <Text
            fontSize='lg'
            fontWeight='bold'
            letterSpacing='tighter'
            w='215px' h='60px'
          >
            {title.toUpperCase()}
            {' '}
            <span className='showDate'>{year}</span>
          </Text>
        </Tooltip>
      </GridItem>
    </Grid>
    <Modal 
      preserveScrollBarGap isOpen={isOpen} 
      onClose={onClose} 
      scrollBehavior='outside' 
      size='xl'
      autoFocus={false}
      >
      <ModalOverlay />
      <ModalContent 
        bg='boxGradient'
        borderRadius='3xl'
      >
        <ModalHeader>
          <Heading fontSize='3xl'>
            {fullTitle.toUpperCase()}
            {' '}
            <span className='showDateLarge'>{year}</span>
          </Heading>
        </ModalHeader>
        <ModalBody>
          <SingleAnime data={data}/>
        </ModalBody>
        <ModalFooter>
          <Button variant='modalClose' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
    // <Grid 
    //   bg='cardColor' 
    //   maxW='fit-content' 
    //   borderRadius='lg' 
    //   shadow='2px 2px 5px #101010'
    // >
    //   <GridItem h='315px'>
    //     <CircularProgress 
    //       value={score} 
    //       capIsRound 
    //       size='40px'
    //       w='40px'
    //       thickness='10px'
    //       color={ratingColor}
    //       position='absolute'
    //       mt='20px' ml='220px'
    //       borderRadius='full'
    //       trackColor='black'
    //       bg='white'
    //       opacity='70%'
    //     >
    //       <CircularProgressLabel 
    //         fontWeight='bold' 
    //         fontSize='xs' 
    //         color='black'
    //       >
    //         {score}%
    //       </CircularProgressLabel>
    //     </CircularProgress>
    //     <Image 
    //       src={image}
    //       alt='anime-poster'
    //       border='2px solid black'
    //       h='300px' w='260px'
    //       borderRadius='lg'
    //     />
    //   </GridItem>
    //   <Tooltip label={fullTitle} placement='top-start' bg='red' maxW='250px'>
    //     <Text 
    //       fontSize='xl' 
    //       color='black' 
    //       fontWeight='bold' 
    //       letterSpacing='-1.5px' 
    //       w='250px' h='60px' 
    //       mx='15px'
    //     >
    //       {title.toUpperCase()}
    //       <span className='showDate'>{year}</span>
    //     </Text>
    //   </Tooltip>
    //   {
    //     adult &&
    //     <Text 
    //       position='absolute' 
    //       mt='-33px' ml='5px' 
    //       bg='red.400' 
    //       w='fit-content' 
    //       p='2px 5px' 
    //       borderRadius='lg'
    //       opacity='75%'
    //       fontWeight='bold'
    //     >
    //       NSFW
    //     </Text>
    //   }
    //   <HStack wrap='wrap' m='10px' h='70px' justify='center'>{
    //     genres.map((genre) => 
    //       <Text
    //         key={genre}
    //         bg='white'
    //         p='2px 5px'
    //         m='5px'
    //         borderRadius='lg'
    //         shadow='2px 2px 5px #949494'
    //         color='black'
    //       >
    //         {genre}
    //       </Text>
    //     )
    //   }</HStack>
    // </Grid>
    // <Grid 
    //   bgColor='cardColor'
    //   color='black'
    //   borderRadius='lg'
    //   templateColumns='auto 1fr'
    //   gap={2}
    //   p='20px'
    // >
    //   <Box>
    //     <Image 
    //       src={image}
    //       alt='anime-poster'
    //       border='2px solid black'
    //       h='300px' w='250px'
    //       borderRadius='lg'
    //     />
    //     {
    //       adult &&
    //       <Text 
    //         position='absolute' 
    //         mt='-33px' ml='5px' 
    //         bg='red.400' 
    //         w='fit-content' 
    //         p='2px 5px' 
    //         borderRadius='lg'
    //         opacity='75%'
    //         fontWeight='bold'
    //       >
    //         NSFW
    //       </Text>
    //     }
    //   </Box>
    //   <Stack justify='space-between' h='full'>
    //     <Box>
    //       <Text fontSize='xl' fontWeight='bold' letterSpacing='-1.5px'>
    //         {title.toUpperCase()}
    //         <span className='showDate'>{year}</span>
    //       </Text>
    //       <HStack wrap='wrap'>{
    //         genres.map((genre) => 
    //           <Text
    //             key={genre}
    //             bg='white'
    //             p='2px 5px'
    //             my='5px' ml='0px !important' mr='5px !important'
    //             borderRadius='lg'
    //             shadow='2px 2px 5px #949494'
    //           >
    //             {genre}
    //           </Text>
    //         )
    //       }</HStack>
    //       <Grid templateColumns='auto 1fr' columnGap={2}>
    //         <Text fontWeight='semibold' mt='5px'>{length.label}</Text>
    //         <Text mt='5px'>{length.len}</Text>
    //         <Text fontWeight='semibold' mt='5px'>STUDIOS:</Text>
    //         <Box w='full'>{ 
    //           studios.map((studio) => 
    //             <Text mt='5px' key={studio}>{studio}</Text>
    //           ) 
    //         }</Box>
    //         <Text fontWeight='semibold' mt='30px'>RATING:</Text>
    //         <CircularProgress 
    //           value={score} 
    //           capIsRound 
    //           size='60px' 
    //           mt='10px'
    //           w='60px'
    //           thickness='10px'
    //           color={ratingColor}
    //         >
    //           <CircularProgressLabel>{score}%</CircularProgressLabel>
    //         </CircularProgress>
    //       </Grid>
    //     </Box>
    //   </Stack>
    // </Grid>
  )
}


// const setStudios = (studio) => {
//   if (studio.length === 0) {
//     return ['Unavailable']
//   } else {
//     let studios = []
//     for (let i = 0; i < studio.length && i < 3; i++) {
//       studios.push(studio[i].node.name)
//     }
//     return studios
//   }
// }

// const setLength = (length) => {
//   if (length.episodes === 1) {
//     return ({label: 'DURATION:', len: length.duration + ' mins'})
//   } else {
//     return ({label: 'EPISODES:', len: length.episodes})
//   }
// }