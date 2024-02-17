const mediaDeclaration = '@media screen and';
const breakPoint = {
  xs: 480,
  sm: 768,
  md: 1024,
};
export const mediaQuery = {
  xs: `${mediaDeclaration} (max-width: ${breakPoint.xs}px)`,
  sm: `${mediaDeclaration} (max-width: ${breakPoint.sm}px)`,
  md: `${mediaDeclaration} (max-width: ${breakPoint.md}px)`,
  lg: `${mediaDeclaration} (min-width: ${breakPoint.md}px)`,
};
