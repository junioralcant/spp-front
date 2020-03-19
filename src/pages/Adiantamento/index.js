import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadAdiantamento from "../../components/CadAdiantamento";
import ListAdiantamento from "../../components/ListAdiantamento";

export default function Adiantamento({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadAdiantamento {...props} />
        <br />
        <ListAdiantamento {...props} />
      </Content>
    </Container>
  );
}
