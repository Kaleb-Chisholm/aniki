import { extendTheme, textDecoration } from '@chakra-ui/react'

export const myTheme = extendTheme ({
  colors: {
    primary: '#403D58',
  },
  styles: {
    global: () => ({
      body: {
        bg: '#CAD2C5',
        color: 'white',
      },
    })
  },
  components: {
    Button: {
      variants: {
        'navbarbtn': {
          fontWeight: 'normal',
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