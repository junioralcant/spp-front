import React, { useState, useEffect } from "react";

import { Container, Content, Dados, Details, Button } from "./styles";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function DetailsPosto({ match, history }) {
  const [posto, setPosto] = useState([]);

  useEffect(() => {
    async function loadPosto() {
      const { id } = match.params;
      const response = await api.get(`/postos/${id}`);

      setPosto(response.data);
    }

    if (match.params.id) {
      loadPosto();
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
                Nome: <small>{posto.nome}</small>
              </li>
              <li>
                CPF/CNPJ: <small>{posto.cnpj}</small>
              </li>
              <li>
                Telefone: <small>{posto.telefone}</small>
              </li>
              <li>
                Whatsapp: <small>{posto.whatsapp}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong>Endereço</strong>
            </header>
            <ul>
              <li>
                Estado: <small>{posto.estado}</small>
              </li>
              <li>
                Cidade: <small>{posto.cidade}</small>
              </li>
              <li>
                Bairro: <small>{posto.bairro}</small>
              </li>
              <li>
                Rua: <small>{posto.endereco}</small>
              </li>

              <li>
                Número: <small>{posto.numeroCasa}</small>
              </li>
              <li>
                CEP: <small>{posto.cep}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong> Dados Bancários</strong>
            </header>
            <ul>
              <li>
                Banco: <small>{posto.banco}</small>
              </li>
              <li>
                Agência : <small>{posto.agenciaBancaria}</small>
              </li>
              <li>
                Conta: <small>{posto.contaBancaria}</small>
              </li>
              <li>
                Tipo de Conta: <small>{posto.tipoConta}</small>
              </li>
            </ul>
          </Details>
        </Dados>
        <div>
          <Button
            onClick={() => {
              history.push("/posto");
            }}
          >
            Voltar
          </Button>
        </div>
      </Content>
    </Container>
  );
}
