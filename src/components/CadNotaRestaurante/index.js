import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Form, Input, Select as SelectUnform } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { colorStyle } from "../../styles/select";
import { Container, ContentForm } from "../../styles/form";
import api from "../../services/api";

export default function CadNotaRestaurante({ history, match }) {
  const [data, setData] = useState({});
  const [inCharges, setInCharges] = useState();
  const [restaurants, setRestaurants] = useState();
  const [lines, setLines] = useState();
  const [selectInCharges, setSelectInCharge] = useState();
  const [selectLines, setSelectLines] = useState();
  const [selectRestaurant, setSelectRestaurant] = useState("");

  useEffect(() => {
    async function loadInCharges() {
      const response = await api.get("/funcionarios");
      setInCharges(response.data.docs);
    }

    loadInCharges();
  }, []);

  useEffect(() => {
    async function loadRestautant() {
      const response = await api.get("/restaurantes");
      setRestaurants(response.data.docs);
    }

    loadRestautant();
  }, []);

  useEffect(() => {
    async function loadLines() {
      const response = await api.get("/linhas");
      setLines(response.data.docs);
    }

    loadLines();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.valorUnitario ||
        !data.quantidade ||
        !selectInCharges ||
        !selectRestaurant ||
        !data.tipoDePagamento
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.encarregado = selectInCharges;
          data.restaurante = selectRestaurant;
          data.linha = selectLines;
          await api.postOrPut("/notasrestaurantes", match.params.id, data);
          toastr.success(`Nota Loja cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.encarregado = selectInCharges;
        data.restaurante = selectRestaurant;
        data.linha = selectLines;
        await api.postOrPut("/notasrestaurantes", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notarestaurante");
        setTimeout(() => history.go(0), 1000);
      } catch (error) {
        toastr.error(error.response.data.error);
      }
    }
  }

  //update
  useEffect(() => {
    async function loadData() {
      if (match.params.id) {
        const { id } = match.params;
        const response = await api.get(`/notasrestaurantes/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  useEffect(
    () => {
      if (match.params.id) {
        const dataNote = formatToTimeZone(data.data, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        setData({
          ...data,
          data: dataNote
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.data, match.params.id]
  );

  const optionsExistentsRestaurants = data.restaurante != null && {
    id: data.restaurante._id,
    name: data.restaurante.nome
  };
  const optionsExistentsInCharges = data.encarregado != null && {
    id: data.encarregado._id,
    name: data.encarregado.nome
  };
  const optionsExistentsLines = data.linha != null && {
    id: data.linha._id,
    name: data.linha.nome
  };

  useEffect(() => {
    if (match.params.id) {
      setSelectRestaurant(optionsExistentsRestaurants.id);
      setSelectInCharge(optionsExistentsInCharges.id);
      setSelectLines(optionsExistentsLines.id);
    }
  }, [
    match.params,
    optionsExistentsRestaurants.id,
    optionsExistentsInCharges.id,
    optionsExistentsLines.id
  ]);

  function setRestaurant(value) {
    setSelectRestaurant(value);
  }

  function setInCharge(value) {
    setSelectInCharge(value);
  }

  function setLine(value) {
    setSelectLines(value);
  }

  function canceled() {
    history.push("/notarestaurante");
    setTimeout(() => history.go(0), 100);
  }

  const pagamento = [
    { id: "Avista", title: "Avista" },
    { id: "A prazo", title: "A prazo" },
    { id: "Transferência", title: "Transferência" }
  ];

  return (
    <Container>
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Nota Restaurante</h1>
        <ContentForm>
          <div>
            <div className="select">
              <span>Restaurante *</span>
              <Select
                options={restaurants}
                placeholder={optionsExistentsRestaurants.name}
                styles={colorStyle}
                getOptionLabel={restaurant => restaurant.nome}
                getOptionValue={restaurant => restaurant._id}
                onChange={value => setRestaurant(value._id)}
              />
            </div>
            <div className="select">
              <span>Encarregado *</span>
              <Select
                options={inCharges}
                placeholder={optionsExistentsInCharges.name}
                styles={colorStyle}
                getOptionLabel={inCharge => inCharge.nome}
                getOptionValue={inCharge => inCharge._id}
                onChange={value => setInCharge(value._id)}
              />
            </div>
            <div className="select">
              <span>Linha *</span>
              <Select
                options={lines}
                placeholder={optionsExistentsLines.name}
                styles={colorStyle}
                getOptionLabel={line => line.nome}
                getOptionValue={line => line._id}
                onChange={value => setLine(value._id)}
              />
            </div>
            <SelectUnform
              name="tipoDePagamento"
              options={pagamento}
              value={data.tipoDePagamento}
              label="Tipo de Pagamento *"
            />
          </div>

          <div>
            <Input name="valorUnitario" label="Valor Unitário *" />
            <Input name="quantidade" label="Quantidade *" />
            <Input type="date" name="data" label="Data *" />
          </div>
        </ContentForm>
        <div className="buttons">
          <button type="submit">Salvar</button>
          {match.params.id && (
            <button onClick={canceled} className="canceled" type="button">
              Cancelar
            </button>
          )}
        </div>
      </Form>
    </Container>
  );
}
