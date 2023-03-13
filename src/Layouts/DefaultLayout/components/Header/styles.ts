import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const PageInfo = styled.div<{ darkBackground?: boolean }>`
  padding: 1.5rem 2rem;
  font-size: 2rem;
  font-weight: 700;

  ${(props) =>
    props.darkBackground
      ? css`
          background: ${props.theme.darkBackground};
        `
      : ""}

  display: flex;
  align-items: center;

  span {
    margin-left: 0.625rem;
  }
`;

export const UserInfo = styled.div`
  padding: 0.75rem 2rem;
  background: ${(props) => props.theme.darkBackground};

  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.blue};
    margin-right: 0.75rem;
  }

  span {
    margin-right: 3rem;
    font-weight: 700;
    font-size: 1.25rem;
  }

  svg {
    color: #575656;
    font-size: 2rem;
  }
`;
