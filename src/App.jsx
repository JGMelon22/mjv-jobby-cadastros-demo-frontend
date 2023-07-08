import './App.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import logoCadastro from './assets/cadastro.png'


function App() {

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
          {/*TODO*/}
        </tbody>
      </table>
    </>
  )
}

export default App
