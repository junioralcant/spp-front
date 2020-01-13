import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaLoja from "../../components/CadNotaLoja";
import ListNotaLoja from "../../components/ListNotaLoja";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaLoja {...props} />
        <br />
        <ListNotaLoja {...props} />
      </Content>
    </Container>
  );
}
