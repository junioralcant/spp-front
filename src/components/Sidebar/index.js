import React from "react";
import { Link } from "react-router-dom";
//import { logout } from "../../services/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { Container, Sair, Nav } from "./styles";

export default function Sidebar() {
  function sair() {
    window.location.href = "/signin";
    //logout();
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          SPP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/adiantamento">
                Adiantamento
              </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Caixa <span className="sr-only">(current)</span>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cadastro
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/cadfuncionario" className="dropdown-item">
                  Funcionario
                </Link>
                <Link to="/cadlinha" className="dropdown-item">
                  Linha
                </Link>
                <Link to="/cadhotel" className="dropdown-item">
                  Hotel
                </Link>
                <Link to="/cadloja" className="dropdown-item">
                  Loja
                </Link>
                <Link to="/cadrestaurante" className="dropdown-item">
                  Restaurante
                </Link>
                <Link to="/cadposto" className="dropdown-item">
                  Posto
                </Link>
                <Link to="/cadveiculo" className="dropdown-item">
                  Veículo
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Conta Caixa
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/notafazenda" className="dropdown-item">
                  Fazenda
                </Link>
                <Link to="/notasafraarroz" className="dropdown-item">
                  Safra Arroz
                </Link>
                <Link to="/notadespesadiversa" className="dropdown-item">
                  Despesas Diversas
                </Link>
                <Link to="/notadespesaroco" className="dropdown-item">
                  Despesas Roço
                </Link>
                <Link to="/notadespesafuncionario" className="dropdown-item">
                  Despesas Funcionário
                </Link>
                <Link to="/notadespesaspp" className="dropdown-item">
                  Despesa Spp
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/"
              >
                Listagem
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/funcionario" className="dropdown-item">
                  Funcionario
                </Link>
                <Link to="/linha" className="dropdown-item">
                  Linha
                </Link>
                <Link to="/hotel" className="dropdown-item">
                  Hotel
                </Link>
                <Link to="/loja" className="dropdown-item">
                  Loja
                </Link>
                <Link to="/restaurante" className="dropdown-item">
                  Restaurante
                </Link>
                <Link to="/posto" className="dropdown-item">
                  Posto
                </Link>
                <Link to="/veiculo" className="dropdown-item">
                  Veículo
                </Link>
                <Link to="/proprietario" className="dropdown-item">
                  Proprietários
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/"
              >
                Fornecedores
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/notahotel" className="dropdown-item">
                  Hotel
                </Link>
                <Link to="/notaloja" className="dropdown-item">
                  Loja
                </Link>
                <Link to="/notarestaurante" className="dropdown-item">
                  Restaurante
                </Link>
                <Link to="/notaposto" className="dropdown-item">
                  Posto
                </Link>
              </div>
            </li>
          </ul>
          <button className="btn btn btn-danger my-2 my-sm-0" onClick={sair}>
            Sair
          </button>
        </div>
      </nav>
    </>
  );
}
