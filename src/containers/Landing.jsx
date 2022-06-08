import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'

export function Landing() {

  const gradient = keyframes`{
    0% { background-position: 0 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }`

  const AnimatedGradientText = styled.p`
    background-color: #FFFFFF;
    animation: ${gradient} 5s ease-in-out infinite;
    background: linear-gradient(to right, #BB90FB, #CFB5F7, #20DDCB, #97DBD5);
    background-size: 300%;
    font-size: 72pt;
    font-weight: bold;
    text-align: center;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
  `

  return (
    <Center>
      <Stack mt='50px'>
        <AnimatedGradientText>
            Welcome to Aniki
        </AnimatedGradientText>
        <Text fontSize='5xl' fontWeight='bold' textAlign='center'>
          The Anime Wiki
        </Text>
        <Text fontSize='3xl' textAlign='center'>
          Browse countless anime and manga!
        </Text>
      </Stack>
    </Center>
  )
}