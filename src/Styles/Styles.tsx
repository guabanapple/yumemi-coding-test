import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
        background: #fffff9;
    }
`;

export const StyledList = styled.li`
  list-style: none;
  display: inline-block;
  padding: 8px;
`;

export const StyledHeader = styled.h2`
  margin: 0;
  text-align: center;
  color: #ff7300;
  padding: 0.25em;
  border-top: solid 2px #ff7300;
  background: -webkit-repeating-linear-gradient(-45deg, #fff5df, #fff5df 4px, #ffe4b1 3px, #ffe4b1 8px);
  background: repeating-linear-gradient(-45deg, #fff5df, #fff5df 4px, #ffe4b1 3px, #ffe4b1 8px);
`;

export const StyledResultArea = styled.div<{ width: string; height: string; color?: string }>`
  // レスポンシブのthemeに合わせる
  max-width: ${({ width }) => width};
  height: ${({ height }) => height};
  line-height: ${({ height }) => height};
  margin: 16px auto;
  text-align: center;
  background: ${({ color }) => color || 'transparent'};
  opacity: 0.6;
  border-radius: 16px;
  font-weight: bold;
`;

export const StyledWaitingArea = styled.div<{ width: string; height: string }>`
  // レスポンシブのthemeに合わせる
  max-width: ${({ width }) => width};
  height: ${({ height }) => height};
  line-height: ${({ height }) => height};
  margin: 16px auto;
  text-align: center;
  border: 2px dashed #ff7300;
  opacity: 0.6;
  border-radius: 16px;
  font-weight: bold;
`;

export const JustCentering = styled.div`
  display: flex;
  justify-content: center;
`;
