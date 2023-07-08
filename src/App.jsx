import './App.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {

  // URL base
  const baseUrl = "http://localhost:8080/cadastros";

  // useState para tratar a mudança de estado feito na aplicação
  const [data, setData] = useState([]);

  // Requisição Get com o axios
  const getCandidatos = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        console.log(error);
      });
  }

  // useEffect lida com efeitos colaterais
  useEffect(() => {
    getCandidatos();
  })

  return (
    <>
      <br />
      <h3>Cadastro de Candidatos</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro' />
        <button className='btn btn-success'>Incluir Novo Candidato</button>
      </header>
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Data Nascimento</th>
            <th>Sexo</th>
            <th>Estado</th>
            <th>Profissão</th>
            <th>Operação</th> {/* Incluir botão de detalhes do candidato p/ listar todas as suas informações */}
          </tr>
        </thead>
        <tbody>
          {data.map((cadastro, index) =>
            <tr key={index}>
              <td>{cadastro.idCadastro}</td>
              <td>{cadastro.nome}</td>
              <td>{cadastro.cpf}</td>
              <td>{cadastro.dataNascimento}</td>
              <td>{cadastro.sexo}</td>
              <td>{cadastro.estado}</td>
              <td>{cadastro.profissao}</td>
              <td className='btn-group'>
                <button className='btn btn-info text-white rounded m-1'>Detalhes</button>
                <button className='btn btn-primary rounded m-1'>Editar</button>
                <button className='btn btn-danger rounded m-1'>Deletar</button>
              </td>
            </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default App
