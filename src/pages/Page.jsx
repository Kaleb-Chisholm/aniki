import { Box, Grid, Stack, Text } from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export function Page({children}) {
  return (
      <Sidebar>{children}</Sidebar>
  )
}
