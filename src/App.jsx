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

  // Estado da janela modal de inserção de dados
  const [modalIncluir, setModalIncluir] = useState(false);

  // Cria o estado candidatoSelecionado
  const [cadastroSelecionado, setCadastroSelecionado] = useState(
    {
      idCadastro: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
      sexo: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      cidade: '',
      estado: '',
      email: '',
      telefone: '',
      celular: '',
      celularWhats: '',
      profissao: '', //
      empresa: '',
      salario: '',
      empregoAtual: '',
      pretencaoMinima: '',
      pretencaoMaxima: '',
      habilidades: ''
    })

  // Estado da janela para saber se deve fechar ou abrir 
  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  // handleChange para guardar os dados do candidato
  // que será informado nos inputs
  // e o setCandidatoSelecionado para atualizar o estado
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setCadastroSelecionado({
      ...cadastroSelecionado,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value // Tratativa para componentes que são checkbox)
    });
    console.log(cadastroSelecionado);
  }

  // Requisição Get com o axios
  const getCandidatos = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        console.log(error);
      });
  }

  // Requisição Post com o axios
  const postCandidato = async () => {
    delete cadastroSelecionado.idCadastro;
    cadastroSelecionado.salario = parseFloat(cadastroSelecionado.salario);
    cadastroSelecionado.pretencaoMinima = parseFloat(cadastroSelecionado.pretencaoMinima);
    cadastroSelecionado.pretencaoMaxima = parseFloat(cadastroSelecionado.pretencaoMaxima);
    await axios.post(baseUrl, cadastroSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
  }

  // useEffect lida com efeitos colaterais
  useEffect(() => {
    getCandidatos();
  })

  return (
    <>
      <br />
      <h3>Jobby Demo 01</h3>
      <header id='HeaderId'>
        <img id='AddCadastroLogo' src={logoCadastro} alt='Cadastro' />
        <button className='btn btn-success' onClick={() => abrirFecharModalIncluir()}>Incluir Novo Candidato</button>
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

      {/* Janela modal para cadastro de um candidato */}
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Cadastrar um candidato</ModalHeader>
        <ModalBody className='form-group'>
          <div className='form-group'>
            <label>Nome</label>
            <br />
            <input type='text' className='form-control' name='nome' onChange={handleChange}></input>
            <label>CPF</label>
            <br />
            <input type='number' className='form-control' name='cpf' onChange={handleChange}></input>
            <label>Data Nascimento</label>
            <br />
            <input type='text' className='form-control' name='dataNascimento' onChange={handleChange}></input>
            <label>Sexo</label>
            <br />
            <input type='text' size="1" className='form-control' name='sexo' onChange={handleChange}></input>
            <label>Logradouro</label>
            <br />
            <input type='text' className='form-control' name='logradouro' onChange={handleChange}></input>
            <label>Numero</label>
            <br />
            <input type='number' className='form-control' name='numero' onChange={handleChange}></input>
            <label>Bairro</label>
            <br />
            <input type='text' className='form-control' name='bairro' onChange={handleChange}></input>
            <label>Complemento</label>
            <br />
            <input type='text' className='form-control' name='complemento' onChange={handleChange}></input>
            <label>Cidade</label>
            <br />
            <input type='text' className='form-control' name='cidade' onChange={handleChange}></input>
            <label>Estado</label>
            <br />
            <input type='text' size="2" min="2" max="2" className='form-control' name='estado' onChange={handleChange}></input>
            <label>E-mail</label>
            <br />
            <input type='email' className='form-control' name='email' onChange={handleChange}></input>
            <label>Telefone</label>
            <br />
            <input type='tel' className='form-control' name='telefone' onChange={handleChange}></input>
            <label>Celular</label>
            <br />
            <input type='tel' className='form-control' name='celular' onChange={handleChange}></input>
            <label>WhatsApp?&nbsp;</label>
            <input type='checkbox' className='form-check-input' name='celularWhats' onChange={handleChange}></input>
            <br />
            <br />
            <label>Profissão</label>
            <br />
            <input type='text' className='form-control' name='profissao' onChange={handleChange}></input>
            <label>Empresa</label>
            <br />
            <input type='text' className='form-control' name='empresa' onChange={handleChange}></input>
            <label>Salário</label>
            <br />
            <input type='number' className='form-control' name='salario' onChange={handleChange}></input>
            <label>Emprego Atual?&nbsp;</label>
            <input type='checkbox' className='form-check-input' name='empregoAtual' onChange={handleChange}></input>
            <br />
            <br />
            <label>Pretenção Salarial Mínima</label>
            <br />
            <input type='number' className='form-control' name='pretencaoMinima' onChange={handleChange}></input>
            <label>Pretenção Salarial Máxima</label>
            <br />
            <input type='number' className='form-control' name='pretencaoMaxima' onChange={handleChange}></input>
            <label>Habilidades</label>
            <br />
            <input type='text' className='form-control' name='habilidades' onChange={handleChange}></input>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-primary m-1' onClick={() => postCandidato()} >Incluir</button>
          <button className='btn btn-danger m-1' onClick={() => abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>

    </>
  )
}

export default App
