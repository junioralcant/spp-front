import React from "react";
//import { logout } from "../../services/auth";
import { Container, Sair, Nav } from "./styles";

export default function Sidebar() {
  function sair() {
    window.location.href = "/signin";
    //logout();
  }
  return (
    <Container>
      <div>
        <Nav>
          <li>
            <strong>Cadastro</strong>
          </li>
          <li>
            <a href="/">Cad Funcionario</a>
          </li>
          <li>
            <a href="/financeiro">Cad Encarregado</a>
          </li>

          <li>
            <a href="/produto">Cad Linha</a>
          </li>

          <li>
            <a href="/produto">Cad Hotel</a>
          </li>

          <li>
            <a href="/produto">Cad Loja</a>
          </li>

          <li>
            <a href="/produto">Cad Restaurante</a>
          </li>

          <li>
            <a href="/produto">Cad Posto</a>
          </li>

          <li>
            <a href="/produto">Cad Proprietário</a>
          </li>

          <li>
            <a href="/produto">Cad Veiculo</a>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Listagem</strong>
          </li>
          <li>
            <a href="/">Funcionarios</a>
          </li>

          <li>
            <a href="/produto">Linha</a>
          </li>

          <li>
            <a href="/financeiro">Encarregado</a>
          </li>
          <li>
            <a href="/produto">Hotel</a>
          </li>

          <li>
            <a href="/produto">Loja</a>
          </li>

          <li>
            <a href="/produto">Posto</a>
          </li>

          <li>
            <a href="/produto">Restaurante</a>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Notas</strong>
          </li>
          <li>
            <a href="/produto">Hotel</a>
          </li>

          <li>
            <a href="/produto">Loja</a>
          </li>

          <li>
            <a href="/produto">Posto</a>
          </li>

          <li>
            <a href="/produto">Restaurante</a>
          </li>
        </Nav>
      </div>
      <Sair onClick={sair}>Sair</Sair>
    </Container>
  );
}
