import styled, { createGlobalStyle } from 'styled-components';
import { mediaQuery } from './sizeConst';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
    }
    ul {
        padding: 0;
        margin: 0;
        padding-inline-start: 0;
        padding-inline-end: 0;
        margin-block-start: 0;
        margin-block-end: 0;
    }
    section + section {
        margin-top: 16px;
    }
    .recharts-legend-wrapper {
      left: 0 !important;
      top: 0 !important;
    }
`;

export const StyledList = styled.li<{ fontSize: string }>`
  list-style: none;
  display: inline-block;
  ${mediaQuery.lg} {
    padding: 8px 16px;
    font-size: 1.1em;
  }
  ${mediaQuery.md} {
    padding: 8px 16px;
    font-size: 1.1em;
  }
  ${mediaQuery.sm} {
    padding: 8px;
    font-size: ${({ fontSize }) => fontSize};
  }
  ${mediaQuery.xs} {
    padding: 4px;
    font-size: 1em;
  }
`;

export const StyledHeader = styled.h2`
  margin: 0;
  text-align: center;
  color: #ff7300;
  padding: 0.25em;
  border-top: solid 2px #ff7300;
  background: -webkit-repeating-linear-gradient(-45deg, #fff5df, #fff5df 4px, #ffe4b1 3px, #ffe4b1 8px);
  background: repeating-linear-gradient(-45deg, #fff5df, #fff5df 4px, #ffe4b1 3px, #ffe4b1 8px);

  ${mediaQuery.lg} {
    padding: 16px;
  }
  ${mediaQuery.md} {
    padding: 16px;
  }
  ${mediaQuery.sm} {
    padding: 8px;
  }
  ${mediaQuery.xs} {
    padding: 8px;
  }
`;

export const StyledResultArea = styled.div`
  width: 90%;
  margin: 16px auto;
  text-align: center;
  background: #ff7300;
  opacity: 0.6;
  border-radius: 16px;
  font-weight: bold;

  ${mediaQuery.lg} {
    height: 300px;
    line-height: 300px;
  }
  ${mediaQuery.md} {
    height: 300px;
    line-height: 300px;
  }
  ${mediaQuery.sm} {
    height: 200px;
    line-height: 200px;
  }
  ${mediaQuery.xs} {
    height: 150px;
    line-height: 150px;
  }
`;

export const StyledWaitingArea = styled.div`
  max-width: 700px;
  height: 400px;
  line-height: 400px;
  margin: 16px auto;
  text-align: center;
  border: 2px dashed #ff7300;
  opacity: 0.6;
  border-radius: 16px;
  font-weight: bold;
`;

export const StyledCenteringBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px auto;
  width: 90%;
`;

export const StyleCheckBoxList = styled.ul`
  margin: 16px auto;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  width: 90%;
`;

export const StyledPullDown = styled.select`
  display: inline-block;
  width: 100%;
  height: 24px;
  text-align: center;
`;
