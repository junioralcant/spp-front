import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Form, Input, Select as SelectUnform } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { colorStyle } from "../../styles/select";
import { Container, ContentForm } from "../../styles/form";
import api from "../../services/api";

export default function CadAdiantamento({ history, match }) {
  const [data, setData] = useState({});
  const [whoBoughts, setWhoBoughts] = useState();
  const [lines, setLines] = useState();
  const [selectWhoBoughts, setSelectWhoBoughts] = useState();
  const [selectLine, setSelectLine] = useState("");

  useEffect(() => {
    async function loadWhoBoughts() {
      const response = await api.get("/funcionarios");
      setWhoBoughts(response.data.docs);
    }

    loadWhoBoughts();
  }, []);

  useEffect(() => {
    async function loadLine() {
      const response = await api.get("/linhas");
      setLines(response.data.docs);
    }

    loadLine();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.data ||
        !selectWhoBoughts ||
        !data.tipoDePagamento ||
        !data.total
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.funcionario = selectWhoBoughts;
          data.linha = selectLine;
          await api.postOrPut("/adiantamentos", match.params.id, data);
          toastr.success(`Adiantamento cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.funcionario = selectWhoBoughts;
        data.linha = selectLine;
        await api.postOrPut("/adiantamentos", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/adiantamento");
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
        const response = await api.get(`/adiantamentos/${id}`);

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
        const dataAdvance = formatToTimeZone(data.data, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        setData({
          ...data,
          data: dataAdvance
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.data, match.params.id]
  );

  const optionsExistentsLines = data != null && {
    id: data._id,
    name: data.linha
  };
  const optionsExistentsWhoBoughts = data.funcionario != null && {
    id: data.funcionario._id,
    name: data.funcionario.nome
  };

  useEffect(() => {
    if (match.params.id) {
      setSelectLine(optionsExistentsLines.linha);
      setWhoBought(optionsExistentsWhoBoughts.id);
    }
  }, [match.params, optionsExistentsLines.id, optionsExistentsWhoBoughts.id]);

  function setLine(value) {
    setSelectLine(value);
  }

  function setWhoBought(value) {
    setSelectWhoBoughts(value);
  }

  function canceled() {
    history.push("/adiantamento");
    setTimeout(() => history.go(0), 100);
  }

  const pagamento = [
    { id: "Avista", title: "Avista" },
    { id: "A prazo", title: "A prazo" },
    { id: "Transferência", title: "Transferência" }
  ];

  console.log(selectLine);

  return (
    <Container>
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Adiantamento</h1>
        <ContentForm>
          <div>
            <div className="select">
              <span>Funcionario*</span>
              <Select
                options={whoBoughts}
                placeholder={optionsExistentsWhoBoughts.name}
                styles={colorStyle}
                getOptionLabel={inCharge => inCharge.nome}
                getOptionValue={inCharge => inCharge._id}
                onChange={value => setWhoBought(value._id)}
              />
            </div>
            <div className="select">
              <span>Linha</span>
              <Select
                placeholder={optionsExistentsLines.name}
                options={lines}
                styles={colorStyle}
                getOptionLabel={line => line.nome}
                getOptionValue={line => line.nome}
                onChange={value => setLine(value.nome)}
              />
            </div>

            <Input name="destino" label="Destino" />
          </div>

          <div>
            <Input name="total" label="Valor *" />

            <SelectUnform
              name="tipoDePagamento"
              options={pagamento}
              value={data.tipoDePagamento}
              label="Tipo de Pagamento *"
            />
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
