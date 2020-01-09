import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaHotel from "../../components/CadNotaHotel";
import ListNotaHotel from "../../components/ListNotaHotel";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaHotel {...props} />
        <br />
        <ListNotaHotel {...props} />
      </Content>
    </Container>
  );
}
