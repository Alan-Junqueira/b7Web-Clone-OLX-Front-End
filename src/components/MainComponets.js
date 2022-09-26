import styled from "styled-components";

export const Template = styled.div``

export const PageContainer = styled.div`
  max-width: 1024px;
  margin: auto;
  padding: 0 3rem;

  @media(max-width: 768px) {
    padding: 0 1rem;

  }
`

export const PageTitle = styled.h1`
  font-size: 27px;
  
`

export const PageBody = styled.div``


export const ErrorMessage = styled.div`
  margin: 10px 0;
  background-color: #FFCACA;
  color: #000;
  border: 2px solid #FF0000;
  padding: 10px;
`