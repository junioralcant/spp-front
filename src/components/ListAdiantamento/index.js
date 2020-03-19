import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatToTimeZone } from "date-fns-timezone";
import "toastr/build/toastr.min.css";
import { IoIosTrash, IoMdCreate } from "react-icons/io";

import {
  Container as ContainerList,
  Table,
  Total,
  Pesquisa,
  Content as ContentList,
  Footer,
  Dados
} from "../../styles/list";
import api from "../../services/api";

export default function ListAdiantamento({ history, match }) {
  const [advances, setAdvances] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [advanceRest, setAdvancesRest] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [total, setTotal] = useState(false);

  useEffect(() => {
    async function loadAdvances(page = numberPage) {
      const response = await api.get(`/adiantamentos?page=${page}`);
      const { docs, ...restStores } = response.data;
      setAdvances(response.data.docs);
      setAdvancesRest(restStores);
    }

    loadAdvances();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/adiantamentos/${id}`);
    const response = await api.get("/adiantamentos");

    const { docs, ...restadvances } = response.data;
    setAdvances(docs);
    setAdvancesRest(restadvances);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/adiantamentos?nome_funcionario=${e.target.value}&limit_page=${advanceRest.total}`
      );
      const { docs, ...restStores } = response.data;
      setAdvances(response.data.docs);
      setAdvancesRest(restStores);
      setTotal(true);
    } else {
      const response = await api.get("/adiantamentos");
      const { docs, ...restStores } = response.data;
      setAdvances(response.data.docs);
      setAdvancesRest(restStores);
      setTotal(true);
    }
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/adiantamentos?data_min=${dataMin}&data_max=${dataMax}&limit_page=${advanceRest.total}`
      );
      const { docs, ...advanceRes } = response.data;
      setAdvances(docs);
      setAdvancesRest(advanceRes);
      setTotal(true);
    } else {
      const response = await api.get("/adiantamentos");
      const { docs, ...advanceRes } = response.data;
      setAdvances(docs);
      setAdvancesRest(advanceRes);
      setTotal(false);
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

  const valorTotal = advances.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === advanceRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <ContainerList>
      <ContentList>
        <h1>Adiantamentos</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por funcionario"
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
          {total === true && (
            <>
              <Total>
                <div>
                  <strong>
                    Quantidade:{" "}
                    <small className="total">{advanceRest.total}</small>
                  </strong>
                  <strong className="total">
                    Valor total:{" "}
                    <small className="total">{valorTotal} R$</small>
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
            </>
          )}
        </Pesquisa>
        <Table>
          <table>
            <thead>
              <tr>
                <th>Funcionario</th>
                <th>Linha</th>
                <th>Destino</th>
                <th>Data</th>
                <th>Tipo de Pagamento</th>
                <th>Valor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {advances.map(advace => {
                const dataAdvace = formatToTimeZone(advace.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={advace._id}>
                    <td>
                      {!advace.funcionario ? null : advace.funcionario.nome}
                    </td>
                    <td>{advace.linha}</td>
                    <td>{advace.destino}</td>
                    <td>{dataAdvace}</td>
                    <td>{advace.tipoDePagamento}</td>
                    <td>{advace.total} R$</td>

                    <td>
                      <Link to={`/adiantamento/${advace._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o adiantamento de(a)  ${
                                !advace.funcionario
                                  ? null
                                  : advace.funcionario.nome
                              }`
                            )
                          )
                            destroy(advace._id);
                        }}
                      >
                        <IoIosTrash />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Table>
        <Footer>
          <button onClick={pagePrevious}>Anterior</button>
          <Dados>
            <strong>
              Quantidade de Notas: <small>{advanceRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{advanceRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{advanceRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </ContentList>
    </ContainerList>
  );
}
