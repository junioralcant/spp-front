import React, { useState, useEffect } from "react";

import { Container, Content, Dados, Details, Button } from "./styles";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function DetailsProprietario({ match, history }) {
  const [proprietario, setProprietario] = useState([]);

  useEffect(() => {
    async function loadProprietario() {
      const { id } = match.params;
      const response = await api.get(`/proprietarios/${id}`);

      setProprietario(response.data);
    }

    if (match.params.id) {
      loadProprietario();
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
                Nome: <small>{proprietario.nome}</small>
              </li>
              <li>
                Proprietário: <small>{proprietario.proprietario}</small>
              </li>
              <li>
                CPF/CNPJ: <small>{proprietario.cnpj}</small>
              </li>
              <li>
                Telefone: <small>{proprietario.telefone}</small>
              </li>
              <li>
                Whatsapp: <small>{proprietario.whatsapp}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong>Endereço</strong>
            </header>
            <ul>
              <li>
                Estado: <small>{proprietario.estado}</small>
              </li>
              <li>
                Cidade: <small>{proprietario.cidade}</small>
              </li>
              <li>
                Bairro: <small>{proprietario.bairro}</small>
              </li>
              <li>
                Rua: <small>{proprietario.endereco}</small>
              </li>

              <li>
                Número: <small>{proprietario.numeroCasa}</small>
              </li>
              <li>
                CEP: <small>{proprietario.cep}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong> Dados Bancários</strong>
            </header>
            <ul>
              <li>
                Banco: <small>{proprietario.banco}</small>
              </li>
              <li>
                Agência : <small>{proprietario.agenciaBancaria}</small>
              </li>
              <li>
                Conta: <small>{proprietario.contaBancaria}</small>
              </li>
              <li>
                Tipo de Conta: <small>{proprietario.tipoConta}</small>
              </li>
            </ul>
          </Details>
        </Dados>
        <div>
          <Button
            onClick={() => {
              history.push("/proprietario");
            }}
          >
            Voltar
          </Button>
        </div>
      </Content>
    </Container>
  );
}
