import React, { useState, useEffect } from "react";

import { Container, Content, Dados, Details, Button } from "./styles";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function DetailsRestaurante({ match, history }) {
  const [restaurante, setRestaurante] = useState([]);

  useEffect(() => {
    async function loadRestaurante() {
      const { id } = match.params;
      const response = await api.get(`/restaurantes/${id}`);

      setRestaurante(response.data);
    }

    if (match.params.id) {
      loadRestaurante();
    }
  }, [match.params]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Dados>
          <Details>
            <header>
              <strong>Dados Pessoas</strong>
            </header>
            <ul>
              <li>
                Nome: <small>{restaurante.nome}</small>
              </li>
              <li>
                Proprietário: <small>{restaurante.proprietario}</small>
              </li>
              <li>
                CPF/CNPJ: <small>{restaurante.cnpj}</small>
              </li>
              <li>
                Telefone: <small>{restaurante.telefone}</small>
              </li>
              <li>
                Whatsapp: <small>{restaurante.whatsapp}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong>Endereço</strong>
            </header>
            <ul>
              <li>
                Estado: <small>{restaurante.estado}</small>
              </li>
              <li>
                Cidade: <small>{restaurante.cidade}</small>
              </li>
              <li>
                Bairro: <small>{restaurante.bairro}</small>
              </li>
              <li>
                Rua: <small>{restaurante.endereco}</small>
              </li>

              <li>
                Número: <small>{restaurante.numeroCasa}</small>
              </li>
              <li>
                CEP: <small>{restaurante.cep}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong> Dados Bancários</strong>
            </header>
            <ul>
              <li>
                Banco: <small>{restaurante.banco}</small>
              </li>
              <li>
                Agência : <small>{restaurante.contaBancaria}</small>
              </li>
              <li>
                Conta: <small>{restaurante.contaBancaria}</small>
              </li>
              <li>
                Tipo de Conta: <small>{restaurante.tipoConta}</small>
              </li>
            </ul>
          </Details>
        </Dados>
        <div>
          <Button
            onClick={() => {
              history.push("/restaurante");
            }}
          >
            Voltar
          </Button>
        </div>
      </Content>
    </Container>
  );
}
