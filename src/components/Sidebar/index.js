import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/cadfuncionario">Cad Funcionario</Link>
          </li>
          <li>
            <Link to="/cadencarregado">Cad Encarregado</Link>
          </li>

          <li>
            <Link to="/cadlinha">Cad Linha</Link>
          </li>

          <li>
            <Link to="/cadhotel">Cad Hotel</Link>
          </li>

          <li>
            <Link to="/cadloja">Cad Loja</Link>
          </li>

          <li>
            <Link to="/cadrestaurante">Cad Restaurante</Link>
          </li>

          <li>
            <Link to="/cadposto">Cad Posto</Link>
          </li>

          <li>
            <Link to="/produto">Cad Proprietário</Link>
          </li>

          <li>
            <Link to="/produto">Cad Veiculo</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Listagem</strong>
          </li>
          <li>
            <Link to="/">Funcionarios</Link>
          </li>

          <li>
            <Link to="/produto">Linha</Link>
          </li>

          <li>
            <Link to="/financeiro">Encarregado</Link>
          </li>
          <li>
            <Link to="/produto">Hotel</Link>
          </li>

          <li>
            <Link to="/produto">Loja</Link>
          </li>

          <li>
            <Link to="/produto">Posto</Link>
          </li>

          <li>
            <Link to="/produto">Restaurante</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Notas</strong>
          </li>
          <li>
            <Link to="/produto">Hotel</Link>
          </li>

          <li>
            <Link to="/produto">Loja</Link>
          </li>

          <li>
            <Link to="/produto">Posto</Link>
          </li>

          <li>
            <Link to="/produto">Restaurante</Link>
          </li>
        </Nav>
      </div>
      <Sair onClick={sair}>Sair</Sair>
    </Container>
  );
}
