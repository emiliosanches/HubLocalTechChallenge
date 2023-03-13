import styled, { css } from "styled-components";

export const CompaniesListPageContainer = styled.main`
  background: ${(props) => props.theme.backgroundWhite};
  flex: 1;
  padding: 2.875rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NoCompaniesMessage = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  text-align: center;
  line-height: 108%;
  margin-bottom: 2.25rem;
`;

export const NewCompanyButton = styled.button<{ size: "big" | "default" }>`
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
