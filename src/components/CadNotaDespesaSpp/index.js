import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Form, Input, Select as SelectUnform } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { colorStyle } from "../../styles/select";
import { Container, ContentForm } from "../../styles/form";
import api from "../../services/api";

export default function CadNotaDespesaSpp({ history, match }) {
  const [data, setData] = useState({});
  const [whoBoughts, setWhoBoughts] = useState();
  const [stores, setStores] = useState();
  const [selectWhoBoughts, setSelectWhoBoughts] = useState();
  const [selectStores, setSelectStores] = useState("");

  useEffect(() => {
    async function loadWhoBoughts() {
      const response = await api.get("/funcionarios");
      setWhoBoughts(response.data.docs);
    }

    loadWhoBoughts();
  }, []);

  useEffect(() => {
    async function loadStore() {
      const response = await api.get("/lojas");
      setStores(response.data.docs);
    }

    loadStore();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.total ||
        !data.data ||
        !selectWhoBoughts ||
        !selectStores ||
        !data.tipoDePagamento
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.quemComprou = selectWhoBoughts;
          data.loja = selectStores;
          await api.postOrPut("/notasdespesasspps", match.params.id, data);
          toastr.success(`Gasto com desepsas cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.quemComprou = selectWhoBoughts;
        data.loja = selectStores;
        await api.postOrPut("/notasdespesasspps", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notadespesaspp");
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
        const response = await api.get(`/notasdespesasspps/${id}`);

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

  const optionsExistentsStores = data.loja != null && {
    id: data.loja._id,
    name: data.loja.nome
  };
  const optionsExistentsWhoBoughts = data.quemComprou != null && {
    id: data.quemComprou._id,
    name: data.quemComprou.nome
  };

  useEffect(() => {
    if (match.params.id) {
      setSelectStores(optionsExistentsStores.id);
      setWhoBought(optionsExistentsWhoBoughts.id);
    }
  }, [match.params, optionsExistentsStores.id, optionsExistentsWhoBoughts.id]);

  function setStore(value) {
    setSelectStores(value);
  }

  function setWhoBought(value) {
    setSelectWhoBoughts(value);
  }

  function canceled() {
    history.push("/notadespesaspp");
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
        <h1>Cadastro de Despesa com SPP Construtora</h1>
        <ContentForm>
          <div>
            <div className="select">
              <span>Loja *</span>
              <Select
                options={stores}
                placeholder={optionsExistentsStores.name}
                styles={colorStyle}
                getOptionLabel={loja => loja.nome}
                getOptionValue={loja => loja._id}
                onChange={value => setStore(value._id)}
              />
            </div>
            <div className="select">
              <span>Quem Comprou *</span>
              <Select
                options={whoBoughts}
                placeholder={optionsExistentsWhoBoughts.name}
                styles={colorStyle}
                getOptionLabel={inCharge => inCharge.nome}
                getOptionValue={inCharge => inCharge._id}
                onChange={value => setWhoBought(value._id)}
              />
            </div>
            <Input name="gastoCom" label="Gasto Com" />
            <Input name="tipoDeCompra" label="Tipo de Compra" />
          </div>

          <div>
            <SelectUnform
              name="tipoDePagamento"
              options={pagamento}
              value={data.tipoDePagamento}
              label="Tipo de Pagamento *"
            />
            <Input name="observacao" label="Observação" />
            <Input name="total" label="Total *" />
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
