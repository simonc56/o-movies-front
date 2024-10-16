// ISO 639-1
// https://developer.themoviedb.org/reference/configuration-languages

enum languages_fr {
  ar = 'Arabe',
  bg = 'Bulgare',
  bn = 'Bengali',
  cn = 'Cantonais',
  cs = 'Tchèque',
  da = 'Danois',
  de = 'Allemand',
  el = 'Grec',
  en = 'Anglais',
  es = 'Espagnol',
  et = 'Estonien',
  fa = 'Persan',
  fi = 'Finlandais',
  fr = 'Français',
  he = 'Hébreu',
  hi = 'Hindi',
  hr = 'Croate',
  hu = 'Hongrois',
  id = 'Indonésien',
  is = 'Islandais',
  it = 'Italien',
  ja = 'Japonais',
  jv = 'Javanais',
  kn = 'Kannada',
  ka = 'Géorgien',
  ko = 'Coréen',
  lt = 'Lituanien',
  lv = 'Letton',
  ml = 'Malayalam',
  mn = 'Mongol',
  mr = 'Marathi',
  ms = 'Malais',
  nl = 'Néerlandais',
  no = 'Norvégien',
  pa = 'Pendjabi',
  pl = 'Polonais',
  pt = 'Portugais',
  ro = 'Roumain',
  ru = 'Russe',
  sk = 'Slovaque',
  sl = 'Slovène',
  sq = 'Albanais',
  sr = 'Serbe',
  sv = 'Suédois',
  sw = 'Swahili',
  ta = 'Tamoul',
  th = 'Thaï',
  tl = 'Tagalog',
  tr = 'Turc',
  uk = 'Ukrainien',
  ur = 'Ourdou',
  vi = 'Vietnamien',
  zh = 'Chinois',
  xx = 'Pas de langage',
}

export type LanguageKey = keyof typeof languages_fr;

export default languages_fr;
