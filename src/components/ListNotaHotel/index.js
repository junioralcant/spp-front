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

export default function ListNotaHotel({ history, match }) {
  const [hotelsNotes, setHotelsNotes] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [hotelsNotesRest, setHotelsNotesRest] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [total, setTotal] = useState(false);

  useEffect(() => {
    async function loadHotelsNotes(page = numberPage) {
      const response = await api.get(`/notashotels?page=${page}`);
      const { docs, ...restHotels } = response.data;
      setHotelsNotes(response.data.docs);
      setHotelsNotesRest(restHotels);
    }

    loadHotelsNotes();
  }, [numberPage]);

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notashotels?nome=${e.target.value}&limit_page=${hotelsNotesRest.total}`
      );
      const { docs, ...restHotels } = response.data;
      setHotelsNotes(response.data.docs);
      setHotelsNotesRest(restHotels);
      setTotal(true);
    } else {
      const response = await api.get("/notashotels");
      const { docs, ...restHotels } = response.data;
      setHotelsNotes(response.data.docs);
      setHotelsNotesRest(restHotels);
      setTotal(false);
    }
  }

  async function filterNameLine(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notashotels?nome_linha=${e.target.value}&limit_page=${hotelsNotesRest.total}`
      );
      const { docs, ...restHotels } = response.data;
      setHotelsNotes(response.data.docs);
      setHotelsNotesRest(restHotels);
      setTotal(true);
    } else {
      const response = await api.get("/notashotels");
      const { docs, ...restHotels } = response.data;
      setHotelsNotes(response.data.docs);
      setHotelsNotesRest(restHotels);
      setTotal(false);
    }
  }

  async function destroy(id) {
    await api.delete(`/notashotels/${id}`);
    const response = await api.get("/notashotels");

    const { docs, ...restHotelsNotes } = response.data;
    setHotelsNotes(docs);
    setHotelsNotesRest(restHotelsNotes);
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/notashotels?data_min=${dataMin}&data_max=${dataMax}&limit_page=${hotelsNotesRest.total}`
      );
      const { docs, ...noteHotelRest } = response.data;
      setHotelsNotes(docs);
      setHotelsNotesRest(noteHotelRest);
      setTotal(true);
    } else {
      const response = await api.get("/notashotels");
      const { docs, ...noteHotelRest } = response.data;
      setHotelsNotes(docs);
      setHotelsNotesRest(noteHotelRest);
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
  const valorTotal = hotelsNotes.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === hotelsNotesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <ContainerList>
      <ContentList>
        <h1>Notas Hotels</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome"
          />
          <input
            onChange={filterNameLine}
            type="text"
            name="nomelinha"
            placeholder="Pesquisar por nome linha"
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
                    <small className="total">{hotelsNotesRest.total}</small>
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
                <th>Hotel</th>
                <th>Linha</th>
                <th>Encarregado</th>
                <th>Data</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {hotelsNotes.map(note => {
                const dataNote = formatToTimeZone(note.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={note._id}>
                    <td>{!note.hotel ? null : note.hotel.nome}</td>
                    <td>{!note.linha ? null : note.linha.nome}</td>
                    <td>{!note.encarregado ? null : note.encarregado.nome}</td>
                    <td>{dataNote}</td>
                    <td>{note.valorUnitario} R$</td>
                    <td>{note.quantidade}</td>
                    <td>{note.total} R$</td>
                    <td>
                      <Link to={`/notahotel/${note._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o(a) ${
                                !note.hotel ? null : note.hotel.nome
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
              Quantidade de Notas: <small>{hotelsNotesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{hotelsNotesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{hotelsNotesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </ContentList>
    </ContainerList>
  );
}
