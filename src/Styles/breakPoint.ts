/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSObject, Interpolation, css } from 'styled-components';

// Interpolation型のジェネリクスで、propsの型を指定する
export const breakpoint = {
  base: (base: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<any>[]): Interpolation<any> => css`
    ${css(base, ...interpolations)}
  `,
  sm: (sm: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<any>[]): Interpolation<any> => css`
    @media (min-width: 640px) {
      ${css(sm, ...interpolations)}
    }
  `,
  md: (md: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<any>[]): Interpolation<any> => css`
    @media (min-width: 768px) {
      ${css(md, ...interpolations)}
    }
  `,
  lg: (lg: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<any>[]): Interpolation<any> => css`
    @media (min-width: 1024px) {
      ${css(lg, ...interpolations)}
    }
  `,
  xl: (xl: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<any>[]): Interpolation<any> => css`
    @media (min-width: 1280px) {
      ${css(xl, ...interpolations)}
    }
  `,
};
