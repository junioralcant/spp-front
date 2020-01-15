import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;

  button {
    margin-left: 32%;
    height: 35px;
    width: 100px;
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
`;
