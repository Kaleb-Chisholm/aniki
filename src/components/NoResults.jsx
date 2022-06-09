/** 
 * FILE: NoResults.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/08/2022
 * 
 * PURPOSE: Function component to display that there are no results yet, prior
 *          the user searching.
*/

// ------------------------------- IMPORTS ------------------------------------
import { Center, Text } from "@chakra-ui/react";

// ------------------------------ FUNCTION ------------------------------------
export function NoResults() {
  return (
    <Center pt='10vh'>
      <Text fontSize='3xl' color='grey.300' textAlign='center'>
        Please interact with the above options for results
      </Text>
    </Center>
  )
}
