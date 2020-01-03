import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  h1 {
    font-size: 15pt;
    margin: 20px 125px;
  }

  form {
    div.buttons {
      display: flex;
      align-items: center;
      button {
        margin: 20px 126px;
        height: 44px;
        width: 120px;
        font-size: 18px;
        background: #7289da;
        border-radius: 3px;
        transition: background-color 0.15s ease;
        border: 0;
        color: #fff;
        font-size: 12px;
        padding: 0 10px;
        text-transform: uppercase;
        font-weight: 700;

        &:hover {
          background: #5f73bc;
        }
      }

      button.canceled {
        background: #ff6d6d;
      }
    }
  }
`;

export const ContentForm = styled.div`
  display: flex;
  justify-content: center;
  width: 150vh;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 100px;

    > input {
      height: 40px;
      width: 50vh;
      padding: 10px;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      background-color: rgba(0, 0, 0, 0.1);
      color: #f6f6f6;
      margin-top: 8px;
      transition: border 0.15s ease;
      font-size: 16px;
      &:focus {
        border-color: #7289da;
      }
    }
  }

  div.select {
    span {
      margin-bottom: 7px;
    }
  }
`;
