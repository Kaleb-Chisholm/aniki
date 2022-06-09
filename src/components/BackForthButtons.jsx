/** 
 * FILE: BackForthButtons.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/08/2022
 * 
 * PURPOSE: Function component for the back and forward buttons for a 
 *          page of results.
 * 
 * PROPS:
 *   hasPrev - Boolean value for if a previous page exists.
 *   hasNext - Boolean value for if a next page exists.
 *   pageNum - The number of the current page.
 *   goBackPage - const to move to prev page.
 *   goNextPage - const to move to next page.
*/

// ------------------------------- IMPORTS ------------------------------------
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'

// ------------------------------ FUNCTION ------------------------------------
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
          ) : (
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
