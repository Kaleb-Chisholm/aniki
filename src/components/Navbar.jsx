import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Center,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'


const navbarData = [
  {
    title: 'Anime',
    options: [
      {name: 'Anime Search', path: 'anime-search'}, 
      {name: 'Top Anime', path: 'top-anime'}, 
      {name: 'Seasonal Anime', path: 'seasonal-anime'},
    ],
  },
  {
    title: 'Manga',
    options: [
      {name: 'Manga Search', path: 'manga-search'}, 
      {name: 'Top Manga', path: 'top-manga'}, 
    ],
  },
  {
    title: 'My Lists',
    options: [
      {name: 'Anime List', path: 'anime-list'}, 
      {name: 'Manga List', path: 'manga-list'}, 
    ],
  },
  {
    title: 'Community',
    options: [
      {name: 'My Friends', path: 'my-friends'}, 
      {name: 'Forum', path: 'forum'}, 
    ],
  },
]

const NavLink = (item) => {
  return (
    <Menu key={item.children.title} isLazy closeOnBlur>
      <MenuButton 
        as={Button} 
        variant='navbarbtn' 
        rightIcon={<BiChevronDown size='16pt'/>}
        w='fit-content'
      >
        {item.children.title}
      </MenuButton>
      <MenuList bg='menuColor'>
        {
          item.children.options.map((option) => (
            <MenuItem 
              as={Link} 
              to={`/${option.path}`} 
              key={option.path}
              m='5px'
              w='80%'
              _focus={{bg: 'none', color: 'black'}}
            >
              {option.name}
            </MenuItem>
          ))
        }
      </MenuList>
    </Menu>
  )
}

export function Navbar() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg='headerColor' px='10px' borderRadius='lg'>
      <Flex alignItems='center' justifyContent='space-between'>
        <IconButton
          size='md'
          variant='navbarbtn'
          icon={isOpen ? <BiChevronUp size='24pt'/> : <BiChevronDown size='24pt'/>}
          aria-label='Open Menu'
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Text 
            fontSize='3xl' 
            fontWeight='bold' 
            color='gray.300'
          >
            Aniki
          </Text>
          <HStack
            as={'nav'}
            display={{ base: 'none', md: 'flex' }}
          >
            <Button 
              key={'home'}
              as={Link} 
              to={'/'}
              variant='navbarbtn'
              w='fit-content'
              ml='20px'
            >
              Home
            </Button>
            {
              navbarData.map((item) => (
                <NavLink key={item.title}>{item}</NavLink>
              ))
            }
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={'sm'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </MenuButton>
            <MenuList alignItems={'center'} bg='menuColor'>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem
                m='5px'
                w='80%'
                _focus={{bg: 'none', color: 'black'}}
              >
                Account Settings
              </MenuItem>
              <MenuItem
                m='5px'
                w='80%'
                _focus={{bg: 'none', color: 'black'}}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <Button 
              key={'home'}
              as={Link} 
              to={'/'}
              variant='navbarbtn'
              w='fit-content'
            >
              Home
            </Button>
            {
              navbarData.map((item) => (
                <NavLink key={item.title}>{item}</NavLink>
              ))
            }
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
