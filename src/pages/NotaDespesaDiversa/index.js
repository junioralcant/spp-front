import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaDespesaDiversa from "../../components/CadNotaDespesaDiversa";
import ListNotaDespesaDiversa from "../../components/ListNotaDespesaDiversa";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaDespesaDiversa {...props} />
        <br />
        <ListNotaDespesaDiversa {...props} />
      </Content>
    </Container>
  );
}
