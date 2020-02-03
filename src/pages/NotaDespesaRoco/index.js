import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaDespesaRoco from "../../components/CadNotaDespesaRoco";
import ListNotaDespesaRoco from "../../components/ListNotaDespesaRoco";

export default function NotaDespesaRoco({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaDespesaRoco {...props} />
        <br />
        <ListNotaDespesaRoco {...props} />
      </Content>
    </Container>
  );
}
