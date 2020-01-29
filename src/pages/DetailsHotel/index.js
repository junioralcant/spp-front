import React, { useState, useEffect } from "react";

import { Container, Content, Dados, Details, Button } from "./styles";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function DetailsHotel({ match, history }) {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    async function loadHotel() {
      const { id } = match.params;
      const response = await api.get(`/hotels/${id}`);

      setHotel(response.data);
    }

    if (match.params.id) {
      loadHotel();
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
                Nome: <small>{hotel.nome}</small>
              </li>
              <li>
                Proprietário: <small>{hotel.proprietario}</small>
              </li>
              <li>
                CPF/CNPJ: <small>{hotel.cnpj}</small>
              </li>
              <li>
                Telefone: <small>{hotel.telefone}</small>
              </li>
              <li>
                Whatsapp: <small>{hotel.whatsapp}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong>Endereço</strong>
            </header>
            <ul>
              <li>
                Estado: <small>{hotel.estado}</small>
              </li>
              <li>
                Cidade: <small>{hotel.cidade}</small>
              </li>
              <li>
                Bairro: <small>{hotel.bairro}</small>
              </li>
              <li>
                Rua: <small>{hotel.endereco}</small>
              </li>

              <li>
                Número: <small>{hotel.numeroCasa}</small>
              </li>
              <li>
                CEP: <small>{hotel.cep}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong> Dados Bancários</strong>
            </header>
            <ul>
              <li>
                Banco: <small>{hotel.banco}</small>
              </li>
              <li>
                Agência : <small>{hotel.agenciaBancaria}</small>
              </li>
              <li>
                Conta: <small>{hotel.contaBancaria}</small>
              </li>
              <li>
                Tipo de Conta: <small>{hotel.tipoConta}</small>
              </li>
            </ul>
          </Details>
        </Dados>
        <div>
          <Button
            onClick={() => {
              history.push("/hotel");
            }}
          >
            Voltar
          </Button>
        </div>
      </Content>
    </Container>
  );
}
