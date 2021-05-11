import { ThemeOverride } from '@chakra-ui/react';

type GlobalStyles = Pick<ThemeOverride, 'styles'>;

export default {
  styles: {
    global: {
      'html, body, #__next': {
        height: '100vh',
      },
      body: {
        paddingTop: 16,
        '@media (min-width: 768px)': {
          paddingTop: 0,
          overflowY: 'hidden',
        },
      },
      h1: {
        fontWeight: 500,
        marginBottom: '0.5em',
      },
      p: {
        marginBottom: '1em',
      },
    },
  },
} as GlobalStyles;
