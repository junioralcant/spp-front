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

export default function ListNotaFazenda({ history, match }) {
  const [ranchNotes, setRanchNotes] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [ranchNotesRest, setRanchNotesRest] = useState([]);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [total, setTotal] = useState(false);

  useEffect(() => {
    async function loadRanchNotes(page = numberPage) {
      const response = await api.get(`/notasfazendas?page=${page}`);
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
    }

    loadRanchNotes();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/notasfazendas/${id}`);
    const response = await api.get("/notasfazendas");

    const { docs, ...restranchNotes } = response.data;
    setRanchNotes(docs);
    setRanchNotesRest(restranchNotes);
  }

  async function filterWhoBought(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notasfazendas?nome_quem_comprou=${e.target.value}&limit_page=${ranchNotesRest.total}`
      );
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
      setTotal(true);
    } else {
      const response = await api.get("/notasfazendas");
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
      setTotal(false);
    }
  }

  async function filterExpenseOn(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notasfazendas?gastocom=${e.target.value}&limit_page=${ranchNotesRest.total}`
      );
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
      setTotal(true);
    } else {
      const response = await api.get("/notasfazendas");
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
      setTotal(false);
    }
  }

  async function filterNameStore(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/notasfazendas?nome_loja=${e.target.value}&limit_page=${ranchNotesRest.total}`
      );
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
      setTotal(true);
    } else {
      const response = await api.get("/notasfazendas");
      const { docs, ...restStores } = response.data;
      setRanchNotes(response.data.docs);
      setRanchNotesRest(restStores);
      setTotal(false);
    }
  }

  async function filterData() {
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/notasfazendas?data_min=${dataMin}&data_max=${dataMax}&limit_page=${ranchNotesRest.total}`
      );
      const { docs, ...notesStoresRest } = response.data;
      setRanchNotes(docs);
      setRanchNotesRest(notesStoresRest);
      setTotal(true);
    } else {
      const response = await api.get("/notasfazendas");
      const { docs, ...notesStoresRest } = response.data;
      setRanchNotes(docs);
      setRanchNotesRest(notesStoresRest);
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
  const valorTotal = ranchNotes.reduce(
    (valorTotal, valor) => valorTotal + valor.total,
    0
  );

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === ranchNotesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <ContainerList>
      <ContentList>
        <h1>Gastos Fazenda</h1>
        <Pesquisa>
          <input
            onChange={filterWhoBought}
            type="text"
            name="nome"
            placeholder="Pesquisar por comprador"
          />
          <input
            onChange={filterNameStore}
            type="text"
            name="nome_linha"
            placeholder="Pesquisar por nome loja"
          />
          <input
            onChange={filterExpenseOn}
            type="text"
            name="nome_linha"
            placeholder="Pesquisar por gasto"
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
                    <small className="total">{ranchNotesRest.total}</small>
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
                <th>Quem Comprou</th>
                <th>Gasto Com</th>
                <th>Tipo de Compra</th>
                <th>Tipo de Pagamento</th>
                <th>Observação</th>
                <th>Data</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {ranchNotes.map(note => {
                const dataNote = formatToTimeZone(note.data, "DD-MM-YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={note._id}>
                    <td>{!note.loja ? null : note.loja.nome}</td>
                    <td>{!note.quemComprou ? null : note.quemComprou.nome}</td>
                    <td>{note.gastoCom}</td>
                    <td>{note.tipoDeCompra}</td>
                    <td>{note.tipoDePagamento}</td>
                    <td>{note.observacao}</td>
                    <td>{dataNote}</td>
                    <td>{note.total} R$</td>
                    <td>
                      <Link to={`/notafazenda/${note._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir gasto com o(a)  ${
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
              Quantidade de Notas: <small>{ranchNotesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{ranchNotesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{ranchNotesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </ContentList>
    </ContainerList>
  );
}
