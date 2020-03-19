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
            <strong>Caixa</strong>
          </li>
          <li>
            <Link to="/">Caixa</Link>
          </li>
        </Nav>
        <Nav>
          <li>
            <strong>Cadastro</strong>
          </li>
          <li>
            <Link to="/cadfuncionario">Cad Funcionario</Link>
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
            <Link to="/cadveiculo">Cad Veiculo</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Listagem</strong>
          </li>
          <li>
            <Link to="/funcionario">Funcionarios</Link>
          </li>

          <li>
            <Link to="/linha">Linhas</Link>
          </li>

          <li>
            <Link to="/hotel">Hotels</Link>
          </li>

          <li>
            <Link to="/loja">Lojas</Link>
          </li>

          <li>
            <Link to="/posto">Postos</Link>
          </li>

          <li>
            <Link to="/restaurante">Restaurantes</Link>
          </li>

          <li>
            <Link to="/proprietario">Proprietários</Link>
          </li>

          <li>
            <Link to="/veiculo">Veículos</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Adiantamento</strong>
          </li>
          <li>
            <Link to="/adiantamento">Adiantamento</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Fornecedores</strong>
          </li>
          <li>
            <Link to="/notahotel">Hotel</Link>
          </li>

          <li>
            <Link to="/notaloja">Loja</Link>
          </li>

          <li>
            <Link to="/notaposto">Posto</Link>
          </li>

          <li>
            <Link to="/notarestaurante">Restaurante</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <strong>Conta Caixa</strong>
          </li>
          <li>
            <Link to="/notafazenda">Fazenda</Link>
          </li>
          <li>
            <Link to="/notasafraarroz">Safra Arroz</Link>
          </li>
          <li>
            <Link to="/notadespesadiversa">Despesas Diversas</Link>
          </li>
          <li>
            <Link to="/notadespesaroco">Despesas Roço</Link>
          </li>
          <li>
            <Link to="/notadespesafuncionario">Despesas Funcionário</Link>
          </li>
          <li>
            <Link to="/notadespesaspp">Despesas Spp</Link>
          </li>
        </Nav>
      </div>
      <Sair onClick={sair}>Sair</Sair>
    </Container>
  );
}
