import { Center, Text } from "@chakra-ui/react";

export function NoResults() {
  return (
    <Center pt='10vh'>
      <Text fontSize='3xl' color='grey.300' textAlign='center'>
        Please interact with the above options for results
      </Text>
    </Center>
  )
}
