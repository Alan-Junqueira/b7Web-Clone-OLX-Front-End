import styled from 'styled-components';

export const PageArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background-color: #FFF;
  padding: 15px;
  border-radius: 10px; 

  .formContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 300px;
    background-color: #9bb83c;
    box-shadow: 1px 1px 0.3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    form {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 15px;

      label {
        font-size: 14px;
      }

      input {
        margin-bottom: 10px;
        height: 30px;
        border: 0;
        border-radius: 5px;
        outline: 0;
        font-size: 15px;
        color: #000;
        padding: 0 10px;
      }

      .wrongPassword {
        margin: 0;
        margin-bottom: 5px;
        padding: 0;
        font-size: 14px;
        color: red;


      }

      button {
        background-color: #0089ff;
        border: 0;
        outline: 0;
        padding: 5px 10px;
        border-radius: 4px;
        color: #fff;
        font-size: 15px;
        cursor: pointer;

        &:hover {
          background-color: #006fce;
        }
      }
    }
  }

  .adsContainer {
    flex: 1;
  }
`;