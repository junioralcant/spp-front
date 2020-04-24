import React, { useEffect, useState } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import print from "print-js";

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
import { string } from "postcss-selector-parser";

export default function ListCaixa({ history }) {
  const [boxs, setBoxs] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [typePay, setTypePay] = useState("");

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
        `/caixas?gasto_com=${e.target.value}&tipo_pagamento=${typePay}&data_min=${dataMin}&data_max=${dataMax}`
      );
      setBoxs(response.data);
    } else {
      const response = await api.get("/caixas");
      setBoxs(response.data);
    }
  }

  async function filterNameNote(e) {
    if (e.target.value !== "" || dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/caixas?nome_nota=${e.target.value}&tipo_pagamento=${typePay}&data_min=${dataMin}&data_max=${dataMax}`
      );
      setBoxs(response.data);
    } else {
      const response = await api.get("/caixas");
      setBoxs(response.data);
    }
  }

  async function filterTypePay(e) {
    setTypePay(e.target.value);
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

  console.log(typePay);

  return (
    <>
      <SideBar />

      <Container>
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
              onChange={filterNameNote}
              type="text"
              name="nome"
              placeholder="Pesquisar tipo de despesa"
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

            <button
              onClick={() =>
                print({
                  printable: boxs,
                  properties: [
                    "nome",
                    { field: "nomeNota", displayName: "TipodeDespesa" },
                    "tipoDePagamento",
                    { field: "nomeLinha", displayName: "Linha" },
                    "tipoDeCompra",
                    "data",
                    { field: "total", displayName: "Total R$" }
                  ],
                  type: "json",
                  header: `<h3 class="custom-h3">SPP CONSTRUTORA <span>Total: ${valorTotal} R$</span> </h3>`,
                  style: ".custom-h3 { color: red; } span {color: #000}"
                })
              }
            >
              Imprimir
            </button>
          </Pesquisa>

          <Table>
            <table>
              <thead>
                <tr>
                  <th>Gasto Com</th>
                  <th>Tipo de Despesa</th>
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
                          (box.restaurante && box.restaurante.nome) ||
                          (box.funcionario && box.funcionario.nome)}
                      </td>
                      <td>{box.nomeNota}</td>
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
    </>
  );
}
