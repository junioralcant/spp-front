import React, { useEffect, useState } from "react";
import { formatToTimeZone } from "date-fns-timezone";

import api from "../../services/api";
import SideBar from "../../components/Sidebar";
import {
  Container,
  Table,
  Total,
  Pesquisa,
  Content,
  Footer,
  Dados
} from "../../styles/list";

export default function ListCaixa({ history }) {
  const [boxs, setBoxs] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");

  useEffect(() => {
    async function loadBoxs() {
      const response = await api.get(`/caixas`);

      setBoxs(response.data);
    }

    loadBoxs();
  }, []);

  async function filterName(e) {
    if (e.target.value !== "" || dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/caixas?gasto_com=${e.target.value}&data_min=${dataMin}&data_max=${dataMax}`
      );
      setBoxs(response.data);
    } else {
      const response = await api.get("/caixas");
      setBoxs(response.data);
    }
  }

  async function filterTypePay(e) {
    if (e.target.value !== "" || dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/caixas?tipo_pagamento=${e.target.value}&data_min=${dataMin}&data_max=${dataMax}`
      );
      setBoxs(response.data);
    } else {
      const response = await api.get("/caixas");
      setBoxs(response.data);
    }
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/caixas?data_min=${dataMin}&data_max=${dataMax}`
      );
      setBoxs(response.data);
    } else {
      const response = await api.get("/notaslojas");
      setBoxs(response.data);
    }
  }
  function filterDataMin(e) {
    if (e.target.value !== "") {
      setDataMin(e.target.value);
    } else {
      setDataMin("");
    }
  }

  function filterDataMax(e) {
    if (e.target.value !== "") {
      setDataMax(e.target.value);
    } else {
      setDataMax("");
    }
  }

  const valorTotal = boxs.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  console.log(boxs);

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Caixa</h1>

        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar gasto com"
          />

          <input
            onChange={filterTypePay}
            type="text"
            name="nome"
            placeholder="Pesquisar tipo de pagamento"
          />

          <input
            type="date"
            name="dataInicio"
            placeholder="Data início"
            onChange={filterDataMin}
          />
          <input
            type="date"
            name="dataFim"
            placeholder="Data fim"
            onChange={filterDataMax}
          />
          <button onClick={filterData}>Pequisar</button>

          <Total>
            <div>
              <strong>
                Quantidade: <small className="total">{boxs.length}</small>
              </strong>
              <strong className="total">
                Valor total: <small className="total">{valorTotal} R$</small>
              </strong>
            </div>
          </Total>
          <button
            onClick={() => {
              history.go(0);
            }}
          >
            Atualizar
          </button>
        </Pesquisa>
        <Table>
          <table>
            <thead>
              <tr>
                <th>Gasto Com</th>
                <th>Data</th>
                <th>Tipo de Pagamento</th>
                <th>Linha</th>
                <th>Tipo de compra</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {boxs.map(box => {
                const dataBox = formatToTimeZone(box.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });
                return (
                  <tr key={box._id}>
                    <td>
                      {(box.loja && box.loja.nome) ||
                        (box.posto && box.posto.nome) ||
                        (box.hotel && box.hotel.nome) ||
                        (box.restaurante && box.restaurante.nome)}
                    </td>
                    <td>{dataBox}</td>
                    <td>{box.tipoDePagamento}</td>
                    <td>{!box.linha ? null : box.linha.nome}</td>
                    <td>{box.tipoDeCompra}</td>
                    <td>{box.total} R$</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Table>
        <Footer>
          <Dados>
            <strong>
              Quantidade de Registro: <small>{boxs.length}</small>
            </strong>
          </Dados>
        </Footer>
      </Content>
    </Container>
  );
}
