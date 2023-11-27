import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaginaInicial.css";

export default function PaginaAgendamentos() {

  const [agendamentos, setAgendamentos] = useState([]);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = () => {
    axios
      .get("http://localhost:3000/appointments")
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch((error) => {
        console.log("Erro ao carregar a lista de agendamentos", error);
      });
  };

  function agendarConsulta() {
    const novoAgendamento = { data, hora, paciente, medico };
    axios
      .post("http://localhost:3000/appointments", novoAgendamento)
      .then((response) => {
        if (response.status === 201) {
          fetchAgendamentos();
          setData("");
          setHora("");
          setPaciente("");
          setMedico("");
        } else {
          console.error("Erro ao agendar consulta", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao agendar consulta", error);
      });
  }

  function cancelarAgendamento(id) {
    axios
      .delete(`http://localhost:3000/appointments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchAgendamentos();
        } else {
          console.error("Erro ao cancelar agendamento", response.data);
        }
      });
  }

  return (
    <div className="container">
      <h1>Agendamento de Consultas</h1>
      <div className="inputs">
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
        <input type="text" value={paciente} onChange={(e) => setPaciente(e.target.value)} placeholder="Nome do Paciente" />
        <input type="text" value={medico} onChange={(e) => setMedico(e.target.value)} placeholder="Nome do Médico" />
      </div>
      <button className="botaoAdicionar" onClick={agendarConsulta}>
        Agendar Consulta
      </button>

      <h3>Consultas Agendadas</h3>
      <ul>
        {agendamentos.map((agendamento, index) => (
          <li key={index}>
            <span>{agendamento.data} - {agendamento.hora} - {agendamento.paciente} com {agendamento.medico}</span>
            <button onClick={() => cancelarAgendamento(agendamento.id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
