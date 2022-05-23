import { Center, Heading, Stack, Text } from "@chakra-ui/react"
import { SearchForm } from '../components/SearchForm'
export function Landing() {
  return (
    <Center>
      <Stack mt='50px'>
        <Heading as='h1' fontSize='6xl' textAlign='center'>
          Welcome to <span className='textPop'>Aniki</span>
        </Heading>
        <Heading as='h2' fontSize='3xl' pt='10px' textAlign='center'>
          The Anime Wiki
        </Heading>
        <Text textAlign='center'>
          Your stop for everything anime and manga
        </Text>
        <SearchForm />
      </Stack>
    </Center>
  )
}
