// ISO 3166-1
// https://developer.themoviedb.org/reference/configuration-countries

enum countries_fr {
  AD = 'Andorre',
  AL = 'Albanie',
  AR = 'Argentine',
  AT = 'Autriche',
  AU = 'Australie',
  BA = 'Bosnie-Herzégovine',
  BD = 'Bangladesh',
  BE = 'Belgique',
  BG = 'Bulgarie',
  BR = 'Brésil',
  CA = 'Canada',
  CH = 'Suisse',
  CN = 'Chine',
  CY = 'Chypre',
  CZ = 'République tchèque',
  DE = 'Allemagne',
  DK = 'Danemark',
  DO = 'République dominicaine',
  DZ = 'Algérie',
  EE = 'Estonie',
  EG = 'Égypte',
  ES = 'Espagne',
  FI = 'Finlande',
  FR = 'France',
  GB = 'Royaume-Uni',
  GE = 'Géorgie',
  GR = 'Grèce',
  HK = 'Hong Kong',
  HR = 'Croatie',
  HU = 'Hongrie',
  ID = 'Indonésie',
  IE = 'Irlande',
  IL = 'Israël',
  IN = 'Inde',
  IS = 'Islande',
  IT = 'Italie',
  JP = 'Japon',
  KR = 'Corée du Sud',
  LI = 'Liechtenstein',
  LT = 'Lituanie',
  LU = 'Luxembourg',
  LV = 'Lettonie',
  MA = 'Maroc',
  ME = 'Monténégro',
  MK = 'Macédoine du Nord',
  MN = 'Mongolie',
  MT = 'Malte',
  MX = 'Mexique',
  MY = 'Malaisie',
  NG = 'Nigéria',
  NL = 'Pays-Bas',
  NO = 'Norvège',
  PE = 'Pérou',
  PH = 'Philippines',
  PK = 'Pakistan',
  PL = 'Pologne',
  PT = 'Portugal',
  RO = 'Roumanie',
  RS = 'Serbie',
  RU = 'Russie',
  SA = 'Arabie saoudite',
  SE = 'Suède',
  SI = 'Slovénie',
  SK = 'Slovaquie',
  TH = 'Thaïlande',
  TR = 'Turquie',
  TW = 'Taïwan',
  US = 'États-Unis',
  VE = 'Venezuela',
  ZA = 'Afrique du Sud',
}

export type CountryKey = keyof typeof countries_fr;

export default countries_fr;
