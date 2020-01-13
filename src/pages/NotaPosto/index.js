import React from "react";
import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";
import CadNotaPosto from "../../components/CadNotaPosto";
import ListNotaPosto from "../../components/ListNotaPosto";

export default function NotaHotel({ ...props }) {
  return (
    <Container>
      <Sidebar />
      <Content>
        <CadNotaPosto {...props} />
        <br />
        <ListNotaPosto {...props} />
      </Content>
    </Container>
  );
}
