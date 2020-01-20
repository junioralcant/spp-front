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

export default function ListNotaPosto({ history, match }) {
  const [gasStations, setGasStations] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [gasStationsRest, setGasStationsRest] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [total, setTotal] = useState(false);

  useEffect(() => {
    async function loadGasStations(page = numberPage) {
      const response = await api.get(`/notaspostos?page=${page}`);
      const { docs, ...restGasStation } = response.data;
      setGasStations(response.data.docs);
      setGasStationsRest(restGasStation);
    }

    loadGasStations();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/notaspostos/${id}`);
    const response = await api.get("/notaspostos");

    const { docs, ...restgasStations } = response.data;
    setGasStations(docs);
    setGasStationsRest(restgasStations);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notaspostos?nome=${e.target.value}&limit_page=${gasStationsRest.total}`
      );
      const { docs, ...restGasStation } = response.data;
      setGasStations(response.data.docs);
      setGasStationsRest(restGasStation);
      setTotal(true);
    } else {
      const response = await api.get("/notaspostos");
      const { docs, ...restGasStation } = response.data;
      setGasStations(response.data.docs);
      setGasStationsRest(restGasStation);
      setTotal(false);
    }
  }

  async function filterNameDriver(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notaspostos?nome_motorista=${e.target.value}&limit_page=${gasStationsRest.total}`
      );
      const { docs, ...restGasStation } = response.data;
      setGasStations(response.data.docs);
      setGasStationsRest(restGasStation);
    } else {
      const response = await api.get("/notaspostos");
      const { docs, ...restGasStation } = response.data;
      setGasStations(response.data.docs);
      setGasStationsRest(restGasStation);
    }
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/notaspostos?data_min=${dataMin}&data_max=${dataMax}&limit_page=${gasStationsRest.total}`
      );
      const { docs, ...notesGasStationsRest } = response.data;
      setGasStations(docs);
      setGasStationsRest(notesGasStationsRest);
      setTotal(true);
    } else {
      const response = await api.get("/notaspostos");
      const { docs, ...notesGasStationsRest } = response.data;
      setGasStations(docs);
      setGasStationsRest(notesGasStationsRest);
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

  // Soma os valores de todos os pedidos
  const valorTotal = gasStations.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === gasStationsRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <ContainerList>
      <ContentList>
        <h1>Notas Posto</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome posto"
          />
          <input
            onChange={filterNameDriver}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome motorista"
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
                    <small className="total">{gasStationsRest.total}</small>
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
                <th>Posto</th>
                <th>Motorista</th>
                <th>Placa do Veículo</th>
                <th>Número de Ordem</th>
                <th>Data</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Tipo de Pagamento</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {gasStations.map(note => {
                const dataNote = formatToTimeZone(note.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={note._id}>
                    <td>{!note.posto ? null : note.posto.nome}</td>
                    <td>{!note.motorista ? null : note.motorista.nome}</td>
                    <td>{!note.veiculo ? null : note.veiculo.placa}</td>
                    <td>{note.numeroDaOrdem}</td>
                    <td>{dataNote}</td>
                    <td>{note.valorUnitario} R$</td>
                    <td>{note.quantidade}</td>
                    <td>{note.tipoDePagamento}</td>
                    <td>{note.total} R$</td>
                    <td>
                      <Link to={`/notaposto/${note._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o(a) Nota  ${
                                !note.posto ? null : note.posto.nome
                              }`
                            )
                          )
                            destroy(note._id);
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
              Quantidade de Notas: <small>{gasStationsRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{gasStationsRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{gasStationsRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </ContentList>
    </ContainerList>
  );
}
