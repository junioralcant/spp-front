import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Dados = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-between;
  margin: 2%;
`;

export const Details = styled.div`
  width: 250px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin: 10px 10px;

  display: flex;
  flex-direction: column;

  header {
    background: #7289da;
    color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      font-size: 15px;
    }

    small {
      font-size: 14px;
      color: #fff;
    }
  }

  ul {
    list-style: none;
    flex-direction: row;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 17px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export const Button = styled.button`
  margin: 1% 3%;
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
`;
