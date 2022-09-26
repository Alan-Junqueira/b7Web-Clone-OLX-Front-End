import styled from "styled-components";

export const HeaderArea = styled.div`
background-color: #FFF;
height: 60px;
border-bottom: 1px solid #CCC;

.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
}

a {
  text-decoration: none;
}

.logo {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  .logo-1, .logo-2, .logo-3 {
    font-size: 27px;
    font-weight: bold;
  }

  .logo-1 {
    color: #FF0000;
  }

  .logo-2 {
    color: #00FF00;
  }

  .logo-3 {
    color: #0000FF;
  }
}
nav {
  padding-block: 10px;

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  ul {
    display: flex;
    align-items: center;
    height: 40px;
    gap: 40px;
  }

  li {

    a, button {
      border: 0;
      background: none;
      cursor: pointer;
      outline: 0;

      color: black;
      font-size: 14px;

      &:hover {
        color: #999
      }

      &.button {
        background-color: #FF8100;
        border-radius: 4px;
        color: #FFF;
        padding: 5px 10px;

        &:hover {
          background-color: #E57706
        }
      }
    }
  }
}

@media(max-width: 768px) {
  height: auto;
  
  .container {
    flex-direction: column;
  }

  .logo {
    justify-content: center;
    margin: 20px 0;
  }

  nav ul {
    flex-direction: column;
    height: auto;

    li: {
      margin: 10px 20px
    }
  }
}
`