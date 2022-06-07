import { Button, Grid, GridItem, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { SingleManga } from "./SingleManga"

export function MangaCard(props) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const data = props.manga,
        year = (data.startDate.year || ''),
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
            mt='-140px' ml='60px' 
            bg='red' 
            w='fit-content' 
            p='2px 5px' 
            borderRadius='lg'
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
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <SingleManga data={data}/>
        </ModalBody>
        <ModalFooter>
        <Button variant='modalClose' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}
