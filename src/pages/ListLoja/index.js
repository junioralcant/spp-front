import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosTrash, IoMdCreate } from "react-icons/io";

import api from "../../services/api";
import SideBar from "../../components/Sidebar";
import {
  Container,
  Table,
  Pesquisa,
  Content,
  Footer,
  Dados
} from "../../styles/list";

export default function ListLoja({ history }) {
  const [stores, setStores] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [storesRest, setStoresRest] = useState([]);

  useEffect(() => {
    async function loadLines(page = numberPage) {
      const response = await api.get(`/lojas?page=${page}`);
      const { docs, ...restStore } = response.data;

      setStores(docs);
      setStoresRest(restStore);
    }

    loadLines();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/lojas/${id}`);
    const response = await api.get("/lojas");

    const { docs, ...restStore } = response.data;
    setStores(docs);
    setStoresRest(restStore);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/lojas?nome=${e.target.value}`);
      setStores(response.data.docs);
    } else {
      const response = await api.get("/lojas");
      setStores(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === storesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Lojas</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome"
          />
        </Pesquisa>
        <Table>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Proprietário</th>
                <th>CNPJ</th>
                <th>CEP</th>
                <th>Estado</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Endereço</th>
                <th>Número do Estabelecimento</th>
                <th>Telefone</th>
                <th>Whatsapp</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => {
                return (
                  <tr key={store._id}>
                    <td>{store.nome}</td>
                    <td>{store.proprietario}</td>
                    <td>{store.cnpj}</td>
                    <td>{store.cep}</td>
                    <td>{store.estado}</td>
                    <td>{store.cidade}</td>
                    <td>{store.bairro}</td>
                    <td>{store.endereco}</td>
                    <td>{store.numeroCasa}</td>
                    <td>{store.telefone}</td>
                    <td>{store.whatsapp}</td>
                    <td>
                      <Link to={`/cadloja/${store._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(`Deseja excluir o(a) ${store.nome}`)
                          )
                            destroy(store._id);
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
              Quantidade de Funcionários: <small>{storesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{storesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{storesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </Content>
    </Container>
  );
}
