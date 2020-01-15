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

export default function ListNotaRestaurante({ history, match }) {
  const [restaurantsNotes, setRestaurantsNotes] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [restaurantsNotesRest, setRestaurantsNotesRest] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [total, setTotal] = useState(false);

  useEffect(() => {
    async function loadRestaurantsNotes(page = numberPage) {
      const response = await api.get(`/notasrestaurantes?page=${page}`);
      const { docs, ...restRestaurants } = response.data;
      setRestaurantsNotes(response.data.docs);
      setRestaurantsNotesRest(restRestaurants);
    }

    loadRestaurantsNotes();
  }, [numberPage]);

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notasrestaurantes?nome=${e.target.value}&limit_page=${restaurantsNotesRest.total}`
      );
      const { docs, ...restRestaurants } = response.data;
      setRestaurantsNotes(response.data.docs);
      setRestaurantsNotesRest(restRestaurants);
      setTotal(true);
    } else {
      const response = await api.get("/notasrestaurantes");
      const { docs, ...restRestaurants } = response.data;
      setRestaurantsNotes(response.data.docs);
      setRestaurantsNotesRest(restRestaurants);
      setTotal(false);
    }
  }

  async function destroy(id) {
    await api.delete(`/notasrestaurantes/${id}`);
    const response = await api.get("/notasrestaurantes");

    const { docs, ...restrestaurantsNotes } = response.data;
    setRestaurantsNotes(docs);
    setRestaurantsNotesRest(restrestaurantsNotes);
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/notasrestaurantes?data_min=${dataMin}&data_max=${dataMax}&limit_page=${restaurantsNotesRest.total}`
      );
      const { docs, ...noteRestaurantRest } = response.data;
      setRestaurantsNotes(docs);
      setRestaurantsNotesRest(noteRestaurantRest);
      setTotal(true);
    } else {
      const response = await api.get("/notasrestaurantes");
      const { docs, ...noteRestaurantRest } = response.data;
      setRestaurantsNotes(docs);
      setRestaurantsNotesRest(noteRestaurantRest);
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
  const valorTotal = restaurantsNotes.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === restaurantsNotesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <ContainerList>
      <ContentList>
        <h1>Notas Restaurantes</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome"
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
                    <small className="total">
                      {restaurantsNotesRest.total}
                    </small>
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
                <th>Restaurante</th>
                <th>Encarregado</th>
                <th>Data</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {restaurantsNotes.map(note => {
                const dataNote = formatToTimeZone(note.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={note._id}>
                    <td>{!note.restaurante ? null : note.restaurante.nome}</td>
                    <td>{!note.encarregado ? null : note.encarregado.nome}</td>
                    <td>{dataNote}</td>
                    <td>{note.valorUnitario} R$</td>
                    <td>{note.quantidade}</td>
                    <td>{note.total} R$</td>
                    <td>
                      <Link to={`/notarestaurante/${note._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o(a) ${
                                !note.restaurante ? null : note.restaurante.nome
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
              Quantidade de Notas: <small>{restaurantsNotesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{restaurantsNotesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{restaurantsNotesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </ContentList>
    </ContainerList>
  );
}
