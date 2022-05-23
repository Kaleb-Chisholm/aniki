import { 
  Avatar, 
  Button, 
  Flex, 
  HStack, 
  Text, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Box
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BiChevronDown } from 'react-icons/bi'

const navbarData = [
  {
    title: 'Anime',
    options: ['Anime Search', 'Top Anime', 'Seasonal Anime'],
  },
  {
    title: 'Manga',
    options: ['Manga Search', 'Top Manga'],
  },
  {
    title: 'My Lists',
    options: ['Anime List', 'Manga List'],
  },
  {
    title: 'Community',
    options: ['My Friends', 'Forums'],
  },
]

export function Navbar() {

  return (
    <Flex 
      bg='primary' 
      borderRadius='lg' 
      justify='space-between'
      p='5px'
    >
      <Text fontSize='2xl' fontWeight='bold' color='gray.300' my='10px' ml='20px'>
        Aniki
      </Text>
      <HStack>
        <Button 
          key={'home'}
          as={Link} 
          to={'/'}
          variant='navbarbtn'
        >
          Home
        </Button>
        {
          navbarData.map((item) => (
            <Menu key={item.title} isLazy closeOnBlur>
              <MenuButton 
                as={Button} 
                variant='navbarbtn' 
                rightIcon={<BiChevronDown size='16pt'/>}
              >
                {item.title}
              </MenuButton>
              <MenuList bg='black'>
                {
                  item.options.map((option) => (
                    <MenuItem key={option}>{option}</MenuItem>
                  ))
                }
              </MenuList>
            </Menu>
          ))
        }
        
      </HStack>
      <Box>
        <Menu isLazy closeOnBlur>
          <MenuButton 
            as={Button} 
            variant='navbarbtn' 
            rightIcon={<BiChevronDown size='16pt'/>}
            my='5px'
          >
            Account
          </MenuButton>
          <MenuList bg='black'>
            <MenuItem>Account</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
        <Avatar 
          size='sm'
          m='10px'
        />
      </Box>
    </Flex>
  )
}