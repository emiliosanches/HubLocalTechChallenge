import styled from "styled-components";

export const AuthLayoutContainer = styled.main`
  display: flex;
  height: 100%;
  background: ${(props) => props.theme.backgroundWhite};

  section {
    flex: 1;
  }
`;

export const Hero = styled.section`
  background: ${(props) => props.theme.blue};

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  div {
    background: ${(props) => props.theme.green};
    padding: 1.5rem 4rem;

    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 2rem;
      line-height: 100%;
      color: white;
      margin-bottom: 0.75rem;
    }

    p {
      text-align: center;
      font-size: 1rem;
      line-height: 125%;
      color: white;
    }
  }
`;
