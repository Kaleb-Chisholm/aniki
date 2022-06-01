import { extendTheme, textDecoration } from '@chakra-ui/react'

export const myTheme = extendTheme ({
  colors: {
    primaryColor: 'linear-gradient(-45deg, #29282A, #515053)',
    primaryShadow: '#4B494D',
    menuColor: '#8D78F7',
    cardColor: '#EDEADF',
    textHoverColor: '#F39B6D',
    primaryBg: '#29282A',
  },
  styles: {
    global: () => ({
      body: {
        bg: '#29282A',
        color: 'white',
      },
    })
  },
  components: {
    Button: {
      variants: {
        'navbarbtn': {
          fontWeight: 'normal',
          color: 'white',
          bg: 'none',
          px: '10px',
          _hover: {
            bg: 'none',
            color: 'red',
          }
        },
      },
    },
    MenuItem: {
      baseStyle: {
      }
    }
  },
})