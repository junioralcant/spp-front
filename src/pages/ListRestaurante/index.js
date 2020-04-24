import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosTrash, IoMdCreate, IoMdAddCircleOutline } from "react-icons/io";

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

export default function ListRestaurante({ history }) {
  const [restaurants, setRestaurants] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [restaurantsRest, setRestaurantsRest] = useState([]);

  useEffect(() => {
    async function loadRestaurants(page = numberPage) {
      const response = await api.get(`/restaurantes?page=${page}`);
      const { docs, ...restRestaurants } = response.data;

      setRestaurants(docs);
      setRestaurantsRest(restRestaurants);
    }

    loadRestaurants();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/restaurantes/${id}`);
    const response = await api.get("/restaurantes");

    const { docs, ...restRestaurants } = response.data;
    setRestaurants(docs);
    setRestaurantsRest(restRestaurants);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/restaurantes?nome=${e.target.value}`);
      setRestaurants(response.data.docs);
    } else {
      const response = await api.get("/restaurantes");
      setRestaurants(response.data.docs);
    }
  }

  async function filterCnpjCpf(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/restaurantes?cnpj_cpf=${e.target.value}`
      );
      setRestaurants(response.data.docs);
    } else {
      const response = await api.get("/restaurantes");
      setRestaurants(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === restaurantsRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <>
      <SideBar />

      <Container>
        <Content>
          <h1>Restaurantes</h1>
          <Pesquisa>
            <input
              onChange={filterName}
              type="text"
              name="nome"
              placeholder="Pesquisar por nome"
            />

            <input
              onChange={filterCnpjCpf}
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
                  <th>CNPJ/CPF</th>
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
                {restaurants.map(restaurant => {
                  return (
                    <tr key={restaurant._id}>
                      <td>{restaurant.nome}</td>
                      <td>{restaurant.proprietario}</td>
                      <td>{restaurant.cnpj}</td>
                      <td>{restaurant.cep}</td>
                      <td>{restaurant.estado}</td>
                      <td>{restaurant.cidade}</td>
                      <td>{restaurant.bairro}</td>
                      <td>{restaurant.endereco}</td>
                      <td>{restaurant.numeroCasa}</td>
                      <td>{restaurant.telefone}</td>
                      <td>{restaurant.whatsapp}</td>
                      <td>
                        <Link to={`/cadrestaurante/${restaurant._id}`}>
                          <IoMdCreate />
                        </Link>
                        <Link to={`/detailsrestaurante/${restaurant._id}`}>
                          <IoMdAddCircleOutline />
                        </Link>
                        <Link
                          to="#"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Deseja excluir o(a) ${restaurant.nome}`
                              )
                            )
                              destroy(restaurant._id);
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
                Quantidade de Restaurantes:{" "}
                <small>{restaurantsRest.total}</small>
              </strong>
              <strong>
                Número de páginas: <small>{restaurantsRest.pages}</small>
              </strong>
              <strong>
                Página atual: <small>{restaurantsRest.page}</small>
              </strong>
            </Dados>
            <button onClick={pageNext}>Próximo</button>
          </Footer>
        </Content>
      </Container>
    </>
  );
}
