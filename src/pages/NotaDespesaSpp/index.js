import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaDespesaSpp from "../../components/CadNotaDespesaSpp";
import ListNotaDespesaSpp from "../../components/ListNotaDespesaSpp";

export default function NotaDespesaSpp({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaDespesaSpp {...props} />
        <br />
        <ListNotaDespesaSpp {...props} />
      </Content>
    </Container>
  );
}
