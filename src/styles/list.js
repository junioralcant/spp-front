import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  h1 {
    font-size: 19pt;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #63f5b0;
  border-radius: 3px;
  padding: 10px;
  margin-left: 1%;
  margin-bottom: 1%;
  align-items: center;

  strong {
    display: flex;
    justify-content: space-between;
    color: #000;
    align-items: center;

    small {
      background: #353940;
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      border-radius: 3px;
      padding: 2px;
      margin-left: 5px;
      margin-top: 2px;
    }
  }

  strong.total {
    padding: 5px;
    margin-top: 2px;
    border-radius: 3px;
    background: #353940;
    color: #fff;
    align-items: center;

    small.total {
      color: #fff;
      border: none;
    }
  }
`;

export const Pesquisa = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  input {
    height: 40px;
    margin: 10px 10px;
    padding: 0 20px;
    border: 0;
    background: #fff;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
  }
  button {
    margin: 10px 0;
    margin-left: 10px;
    height: 40px;
    font-size: 12px;
    font-weight: bold;
    background: #7289da;
    border-radius: 3px;
    border: 0;
    color: #fff;
    padding: 0 10px;
    text-transform: uppercase;
    transition: background-color 0.15s ease;
    &:hover {
      background: #5f73bc;
    }
  }
`;

export const Table = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 20px;
  max-width: 99%;

  table {
    max-width: 100%;
    thead {
      background: #7289da;
      th {
        padding: 10px;
        margin-top: 20px;
        border-radius: 3px;
        border-bottom: 2px solid #fff;
        text-align: center;
      }
    }
    tbody {
      tr: nth-child(even) {
        background: rgba(0, 0, 0, 0.2);
      }
      tr {
        td {
          padding: 8px;
          border-radius: 3px;
          text-align: center;
          button {
            margin-left: 10px;
            margin-bottom: 2px;
            font-weight: 200 !important;
          }
          a {
            color: #fff;
            font-size: 18px;
            &:hover {
              color: #cecece;
            }
          }
        }
      }
    }
  }
`;

export const Footer = styled.div`
  width: 600px;
  justify-content: space-around;
  margin: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  button {
    margin: 10px 0;
    height: 35px;
    font-size: 12px;
    background: #7289da;
    border-radius: 3px;
    border: 0;
    color: #fff;
    padding: 0 10px;
    text-transform: uppercase;
    transition: background-color 0.15s ease;
    &:hover {
      background: #5f73bc;
    }
  }
`;

export const Dados = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 10px;
  strong {
    display: flex;
    justify-content: space-between;
    color: #fff;
    small {
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      border: 1px solid #fff;
      border-radius: 3px;
      padding: 2px;
      margin-left: 5px;
      margin-top: 2px;
    }
  }
`;
