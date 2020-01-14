import React from "react";
import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaRestaurante from "../../components/CadNotaRestaurante";
import ListNotaRestaurante from "../../components/ListNotaRestaurante";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaRestaurante {...props} />
        <br />
        <ListNotaRestaurante {...props} />
      </Content>
    </Container>
  );
}
