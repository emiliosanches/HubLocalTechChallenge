import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const PageInfo = styled.div<{ variant?: "clickable" | "default" }>`
  padding: 1.5rem 2rem;
  font-weight: 700;

  ${(props) =>
    props.variant === "clickable"
      ? css`
          background: ${props.theme.darkBackground};
        `
      : ""}

  display: flex;
  align-items: center;

  svg {
    font-size: 2rem;
  }

  span {
    ${(props) =>
      props.variant === "clickable"
        ? css`
            font-size: 1.5rem;
            margin-left: 0.75rem;
            margin-right: 1rem;
          `
        : css`
            font-size: 1.875rem;
            margin-left: 0.625rem;
          `}
  }
`;

export const UserInfo = styled.button`
  padding: 0.75rem 2rem;
  background: ${(props) => props.theme.darkBackground};
  outline: none;
  border: none;

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
