import React from "react";

import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaSafraArroz from "../../components/CadNotaSafraArroz";
import ListNotaSafraArroz from "../../components/ListNotaSafraArroz";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaSafraArroz {...props} />
        <br />
        <ListNotaSafraArroz {...props} />
      </Content>
    </Container>
  );
}
