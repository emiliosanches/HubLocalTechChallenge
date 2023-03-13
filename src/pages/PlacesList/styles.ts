import styled, { css } from "styled-components";

export const PlacesListPageContainer = styled.main`
  background: ${(props) => props.theme.backgroundWhite};
  flex: 1;
  padding: 1.5rem 2.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    align-self: flex-start;
    display: flex;
    align-items: center;

    color: ${(props) => props.theme.textLight};
    font-weight: 500;
    text-decoration: none;
    font-size: 1.125rem;
    margin-bottom: 0.75rem;

    svg {
      margin-right: 0.25rem;
    }
  }
`;

export const NoPlacesMessage = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  text-align: center;
  line-height: 108%;
  margin-bottom: 2.25rem;
`;

export const NewPlaceButton = styled.button<{ size: "big" | "default" }>`
  background: ${(props) => props.theme.blue};
  border-radius: 4px;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.75rem 2rem;
  font-size: 1.25rem;

  ${(props) =>
    props.size === "big"
      ? css`
          padding: 1rem 2.75rem;
          font-size: 1.5rem;
        `
      : ""}
`;
