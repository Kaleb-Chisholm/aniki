/** 
 * FILE: Sidebar.jsx
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/08/2022
 * 
 * PURPOSE: Function component for the sidebar used in site navigation
 * 
 * PROPS:
 *   { children } - Any components being displayed along side the sidebar
*/

// ------------------------------- IMPORTS ------------------------------------
import { Link } from 'react-router-dom'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { 
  IoMenuSharp, 
  IoSearchSharp, 
  IoTrendingUpSharp,
  IoHomeOutline
} from 'react-icons/io5'

// List of items for the sidebar.
const SidebarItems = [
  {
    title: 'Menu',
    options: [
      {name: 'Home', path: '', icon: IoHomeOutline},
    ],
  },
  {
    title: 'Anime',
    options: [
      {name: 'Anime Search', path: 'anime-search', icon: IoSearchSharp}, 
      {name: 'Top Anime', path: 'top-anime', icon: IoTrendingUpSharp},
    ],
  },
  {
    title: 'Manga',
    options: [
      {name: 'Manga Search', path: 'manga-search', icon: IoSearchSharp}, 
      {name: 'Top Manga', path: 'top-manga', icon: IoTrendingUpSharp}, 
    ],
  },
]

// ------------------------------ FUNCTION ------------------------------------
export function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  )
}

// Content of the sidebar.
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Box 
        bg='grey.800' 
        h='full' 
        overflowY='auto'
        shadow='0px 0px 10px black'
      >
        <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
          <Text 
            fontSize='2xl' 
            fontFamily='monospace' 
            fontWeight='bold'
          >
            Aniki
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose}/>
        </Flex>
        {
          SidebarItems.map((item) => (
            <Box key={item.title}>
              <Text 
                key={item.title}
                ml='30px'
                mt='15px'
                color='primaryBright'
                fontWeight='bold'
                letterSpacing='wide'
              >
                {item.title}
              </Text>
              {
                item.options.map((option) => (
                  <NavItem 
                    key={option.name} 
                    icon={option.icon} 
                    path={option.path}
                  >
                    {option.name}
                  </NavItem>
                ))
              }
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

// NavItem for the sidebar/mobilenav
const NavItem = ({ icon, children, path }) => {
  return (
      <Flex
        as={Link}
        to={`/${path}`} 
        key={path}
        align='center'
        p='2'
        mx='20px'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          textShadow: '0 0 10px white'
        }}
      >
        {
          icon && (
            <Icon
              mr='4'
              fontSize='18'
              _groupHover={{
                textShadow: '0 0 5px white',
              }}
              as={icon}
            />
          )
        }
        {children}
      </Flex>
  )
}

// "Sidebar" (MobileNav) for mobile displays
const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg='headerColor'
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<IoMenuSharp size='24'/>}
      />

      <Text fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold'>
        Aniki
      </Text>
    </Flex>
  )
}