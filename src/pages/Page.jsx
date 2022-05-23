import { Box } from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'

export function Page({children}) {
  return (
    <Box p='15px' h='100vh'>
      <Navbar/>
        {children}
  </Box>
  )
}
