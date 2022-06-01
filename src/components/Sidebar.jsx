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
  IoCalendarOutline, 
  IoBookOutline, 
  IoTvOutline,
  IoPeopleOutline,
  IoInformationCircleOutline,
  IoHomeOutline
} from 'react-icons/io5'

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
      {name: 'Seasonal Anime', path: 'seasonal-anime', icon: IoCalendarOutline},
    ],
  },
  {
    title: 'Manga',
    options: [
      {name: 'Manga Search', path: 'manga-search', icon: IoSearchSharp}, 
      {name: 'Top Manga', path: 'top-manga', icon: IoTrendingUpSharp}, 
    ],
  },
  // I PLAN ON ADDING THESE
  // {
  //   title: 'My Lists',
  //   options: [
  //     {name: 'Anime List', path: 'anime-list', icon: IoTvOutline}, 
  //     {name: 'Manga List', path: 'manga-list', icon: IoBookOutline}, 
  //   ],
  // },
  // {
  //   title: 'Community',
  //   options: [
  //     {name: 'My Friends', path: 'my-friends', icon: IoPeopleOutline}, 
  //     {name: 'Forum', path: 'forum', icon: IoInformationCircleOutline}, 
  //   ],
  // },
]

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
        size='full'>
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


const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      p='15px'
      {...rest}
    >
      <Box 
        bg='primaryColor' 
        h='full' 
        overflowY='auto'
        borderRadius='2xl'
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
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {
          SidebarItems.map((item) => (
            <>
              <Text 
                key={item.title}
                ml='30px'
                mt='15px'
                color='#FFF07C'
                fontWeight='bold'
              >
                {item.title}
              </Text>
              {
                item.options.map((option) => (
                  <NavItem key={option.name} icon={option.icon} path={option.path}>
                    {option.name}
                  </NavItem>
                ))
              }
            </>
          ))
        }
      </Box>
    </Box>
  )
}

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
        {icon && (
          <Icon
            mr='4'
            fontSize='18'
            _groupHover={{
              textShadow: '0 0 5px white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
  )
}

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



// import { Avatar, Box, Button, Center, Grid, GridItem, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
// import { IoGrid, IoChevronBackOutline, IoSettings } from 'react-icons/io5'
// import { Link } from 'react-router-dom'
// const sidebar = [
//   {
//     title: 'Anime',
//     options: [
//       {name: 'Anime Search', path: 'anime-search'}, 
//       {name: 'Top Anime', path: 'top-anime'}, 
//       {name: 'Seasonal Anime', path: 'seasonal-anime'},
//     ],
//   },
//   {
//     title: 'Manga',
//     options: [
//       {name: 'Manga Search', path: 'manga-search'}, 
//       {name: 'Top Manga', path: 'top-manga'}, 
//     ],
//   },
//   {
//     title: 'My Lists',
//     options: [
//       {name: 'Anime List', path: 'anime-list'}, 
//       {name: 'Manga List', path: 'manga-list'}, 
//     ],
//   },
//   {
//     title: 'Community',
//     options: [
//       {name: 'My Friends', path: 'my-friends'}, 
//       {name: 'Forum', path: 'forum'}, 
//     ],
//   },
// ]

// export function Sidebar() {
//   return (
//     <Grid templateColumns='auto 1fr' templateRows='auto 1fr' m='20px'>
//       <GridItem 
//         bg='headerColor' 
//         borderTopRadius='2xl' 
//         borderLeftRadius='2xl' 
//         w='60px' h='60px'
//       >
//         logo
//       </GridItem>
//       <GridItem bg='headerColor'>
//         <HStack 
//           justify='space-between' 
//           pl='5px' 
//           borderBottomLeftRadius='3xl' 
//           bg='primaryBg' 
//           h='60px'
//         >
//           <Text 
//             fontSize='3xl' 
//             fontWeight='bold'
//             color='gray.300'
//             // m='10px'
//             textAlign='center'
//             w='full'
//           >
//             Aniki
//           </Text>
//           {/* <Button p='0px' borderRadius='2xl'>
//             <IoChevronBackOutline color='black' size='18pt' />        
//           </Button> */}
//         </HStack>
//       </GridItem>
//       <GridItem bg='headerColor'>
//         <Stack 
//           h='100%' w='60px' 
//           justify='space-between' 
//           borderTopEndRadius='3xl' 
//           bg='primaryBg'
//           p='10px'
//         >
//           <Button p='0px' borderRadius='2xl' variant='navbarbtn'>
//             <IoGrid size='16pt' />        
//           </Button>
//           <Stack pb='15px'>
//             <Button p='0px' borderRadius='2xl' variant='navbarbtn'>
//               <IoSettings size='16pt' />        
//             </Button>
//             <Menu>
//               <MenuButton
//                 as={Button}
//                 rounded={'full'}
//                 variant={'link'}
//                 cursor={'pointer'}
//                 minW={0}
//               >
//                 <Avatar
//                   size={'sm'}
//                   src={'https://avatars.dicebear.com/api/male/username.svg'}
//                 />
//               </MenuButton>
//               <MenuList alignItems={'center'} bg='menuColor'>
//                 <br />
//                 <Center>
//                   <Avatar
//                     size={'2xl'}
//                     src={'https://avatars.dicebear.com/api/male/username.svg'}
//                   />
//                 </Center>
//                 <br />
//                 <Center>
//                   <p>Username</p>
//                 </Center>
//                 <br />
//                 <MenuDivider />
//                 <MenuItem m='5px' w='80%' _focus={{bg: 'none', color: 'black'}}>
//                   Account Settings
//                 </MenuItem>
//                 <MenuItem m='5px' w='80%' _focus={{bg: 'none', color: 'black'}}>
//                   Logout
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//           </Stack>
//         </Stack>
//       </GridItem>
//       <GridItem>
//         <Stack 
//           bg='headerColor'
//           borderRadius='2xl'
//           borderTopLeftRadius='none'
//           h='100%'
//           p='20px'
//         >
//           {
//             sidebar.map((item) => (
//               <>
//                 <Text color='black' key={item.title}>{item.title}</Text>
//                 {
//                   item.options.map((option) => (
//                     <Button 
//                       as={Link} 
//                       to={`/${option.path}`} 
//                       key={option.path}
//                       w='80%'
//                       _focus={{bg: 'none', color: 'black'}}
//                       variant='navbarbtn'
//                     >
//                       {option.name}
//                     </Button>
//                   ))
//                 }
//               </>
//             ))
//           }
//         </Stack>
//       </GridItem>
//     </Grid>
//   )
// }
