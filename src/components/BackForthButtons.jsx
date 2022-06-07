import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'


export function BackForthButtons(props) {
  return (
    <HStack justify='space-between'>
      <Box>
        {
          props.hasPrev ? (
            <Button 
              variant='backForthBtn' 
              onClick={props.goBackPage}
            >
              <IoArrowBackSharp />
            </Button>
          ) :
          (
            <Button 
              variant='backForthBtnDim' 
              onClick={props.goBackPage}
            >
              <IoArrowBackSharp />
            </Button>
          )
        }
      </Box>
      <Text
        fontWeight='semibold'
        pt='10px'
      >
        Page: {props.pageNum}
      </Text>
      <Box>
        {
          props.hasNext ? (
            <Button 
              variant='backForthBtn' 
              onClick={props.goNextPage}
            >
              <IoArrowForwardSharp />
            </Button>
          ) :
          (
            <Button 
              variant='backForthBtnDim' 
              onClick={props.goNextPage}
            >
              <IoArrowForwardSharp />
            </Button>
          )
        }
      </Box>
    </HStack>
  )
}
