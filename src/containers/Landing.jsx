import { Center, Stack, Text } from "@chakra-ui/react"
export function Landing() {
  return (
    <Center>
      <Stack mt='50px'>
        <Text as='h1' fontSize='6xl' fontWeight='bold' textAlign='center'>
          Welcome to <span className='textPop'>Aniki</span>
        </Text>
        <Text as='h1' fontSize='3xl' fontWeight='bold' textAlign='center'>
          The Anime Wiki
        </Text>
        <Text textAlign='center'>
          Your stop for everything anime and manga
        </Text>
      </Stack>
    </Center>
  )
}
