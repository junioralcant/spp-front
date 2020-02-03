import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaDespesaFuncionario from "../../components/CadNotaDespesaFuncionario";
import ListNotaDespesaFuncionario from "../../components/ListNotaDespesaFuncionario";

export default function NotaDespesaFuncionario({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaDespesaFuncionario {...props} />
        <br />
        <ListNotaDespesaFuncionario {...props} />
      </Content>
    </Container>
  );
}
