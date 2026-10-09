import { createTheme } from '@mantine/core';

export default createTheme({
  defaultRadius: 'sm',
  primaryColor: 'primary',
  // ci-dessous le theme de couleurs utilisé par mantine
  // les variables css utilisent les mêmes couleurs redéclarées dans _mantine.scss
  // je n'ai pas réussi à factoriser les couleurs dans un fichier unique
  colors: {
    // 10 nuances pour chaque couleur
    // n°7 : couleur principale
    // n°8 : couleur utilisée quand hover button

    // Mantine expects 10 valid shades per color token.
    // The app only uses a few custom tokens, so we define every shade to
    // avoid broken CSS variables in Mantine 9.
    'white': ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
    'primary': [
      '#fff7db',
      '#ffefc0',
      '#ffe8a5',
      '#ffe18b',
      '#fed970',
      '#fcd456',
      '#fbda8d',
      '#f7cf6d',
      '#f0c24f',
      '#e8b63a',
    ],
    'bg': [
      '#3a416f',
      '#353c68',
      '#303761',
      '#2b325a',
      '#293159',
      '#272d52',
      '#293159',
      '#232946',
      '#1f233b',
      '#1a1d31',
    ],
    'links': [
      '#f4f5ff',
      '#edf0ff',
      '#e8ebff',
      '#e5e6ff',
      '#dfe2ff',
      '#d7dbff',
      '#e5e6ff',
      '#ccd1ff',
      '#bcc3ff',
      '#acb4ff',
    ],
    'ocean-blue': [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885',
    ],
  },
  fontSizes: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.3rem',
    xl: '1.5rem',
  },
  lineHeights: {
    xs: '1.2',
    sm: '1.3',
    md: '1.4',
    lg: '1.5',
    xl: '1.6',
  },
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
        lineHeight: '1.5',
        fontWeight: '500',
      },
      h2: {
        fontSize: '1.5rem',
        lineHeight: '1.6',
        fontWeight: '500',
      },
    },
  },
});
