import { createTheme } from '@mantine/core';

export default createTheme({
  primaryColor: 'primary',
  // ci-dessous le theme de couleurs utilisé par mantine
  // les variables css utilisent les mêmes couleurs redéclarées dans _mantine.scss
  // je n'ai pas réussi à factoriser les couleurs dans un fichier unique
  colors: {
    // 10 nuances pour chaque couleur
    'white': ['', '', '', '', '', '', '#fff', '', '', ''],
    'primary': ['', '', '', '', '', '', '#fbda8d', '', '', ''],
    'bg': ['', '', '', '', '', '', '#293159', '', '', ''],
    'links': ['', '', '', '', '', '', '#e5e6ff', '', '', ''],
    // exemple avec ocean blue
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
