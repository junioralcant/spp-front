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

export default function ListNotaLoja({ history, match }) {
  const [storesNotes, setStoresNotes] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [storesNotesRest, setStoresNotesRest] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [total, setTotal] = useState(false);

  useEffect(() => {
    async function loadStoresNotes(page = numberPage) {
      const response = await api.get(`/notaslojas?page=${page}`);
      const { docs, ...restStores } = response.data;
      setStoresNotes(response.data.docs);
      setStoresNotesRest(restStores);
    }

    loadStoresNotes();
  }, [numberPage]);

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notaslojas?nome=${e.target.value}&limit_page=${storesNotesRest.total}`
      );
      const { docs, ...restStores } = response.data;
      setStoresNotes(response.data.docs);
      setStoresNotesRest(restStores);
      setTotal(true);
    } else {
      const response = await api.get("/notaslojas");
      const { docs, ...restStores } = response.data;
      setStoresNotes(response.data.docs);
      setStoresNotesRest(restStores);
      setTotal(true);
    }
  }

  async function destroy(id) {
    await api.delete(`/notaslojas/${id}`);
    const response = await api.get("/notaslojas");

    const { docs, ...reststoresNotes } = response.data;
    setStoresNotes(docs);
    setStoresNotesRest(reststoresNotes);
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/notaslojas?data_min=${dataMin}&data_max=${dataMax}&limit_page=${storesNotesRest.total}`
      );
      const { docs, ...notesStoresRest } = response.data;
      setStoresNotes(docs);
      setStoresNotesRest(notesStoresRest);
      setTotal(true);
    } else {
      const response = await api.get("/notaslojas");
      const { docs, ...notesStoresRest } = response.data;
      setStoresNotes(docs);
      setStoresNotesRest(notesStoresRest);
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
  const valorTotal = storesNotes.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === storesNotesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <ContainerList>
      <ContentList>
        <h1>Notas Lojas</h1>
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
                    <small className="total">{storesNotesRest.total}</small>
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
                <th>Loja</th>
                <th>Encarregado</th>
                <th>Data</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {storesNotes.map(note => {
                const dataNote = formatToTimeZone(note.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={note._id}>
                    <td>{!note.loja ? null : note.loja.nome}</td>
                    <td>{!note.encarregado ? null : note.encarregado.nome}</td>
                    <td>{dataNote}</td>
                    <td>{note.total} R$</td>
                    <td>
                      <Link to={`/notaloja/${note._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o(a) Nota  ${
                                !note.loja ? null : note.loja.nome
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
              Quantidade de Notas: <small>{storesNotesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{storesNotesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{storesNotesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </ContentList>
    </ContainerList>
  );
}
