import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaFazenda from "../../components/CadNotaFazenda";
import ListNotaFazenda from "../../components/ListNotaFazenda";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaFazenda {...props} />
        <br />
        <ListNotaFazenda {...props} />
      </Content>
    </Container>
  );
}
