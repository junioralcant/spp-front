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

export default function ListHotel({ history }) {
  const [hotels, setHotels] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [hotelsRest, setHotelsRest] = useState([]);

  useEffect(() => {
    async function loadHotels(page = numberPage) {
      const response = await api.get(`/hotels?page=${page}`);
      const { docs, ...restEmployee } = response.data;

      setHotels(docs);
      setHotelsRest(restEmployee);
    }

    loadHotels();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/hotels/${id}`);
    const response = await api.get("/hotels");

    const { docs, ...restHotel } = response.data;
    setHotels(docs);
    setHotelsRest(restHotel);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/hotels?nome=${e.target.value}`);
      setHotels(response.data.docs);
    } else {
      const response = await api.get("/hotels");
      setHotels(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === hotelsRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Hotels</h1>
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
              {hotels.map(hotel => {
                return (
                  <tr key={hotel._id}>
                    <td>{hotel.nome}</td>
                    <td>{hotel.proprietario}</td>
                    <td>{hotel.cnpj}</td>
                    <td>{hotel.cep}</td>
                    <td>{hotel.estado}</td>
                    <td>{hotel.cidade}</td>
                    <td>{hotel.bairro}</td>
                    <td>{hotel.endereco}</td>
                    <td>{hotel.numeroCasa}</td>
                    <td>{hotel.telefone}</td>
                    <td>{hotel.whatsapp}</td>
                    <td>
                      <Link to={`/cadhotel/${hotel._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(`Deseja excluir o(a) ${hotel.nome}`)
                          )
                            destroy(hotel._id);
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
              Quantidade de Funcionários: <small>{hotelsRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{hotelsRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{hotelsRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </Content>
    </Container>
  );
}
