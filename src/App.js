
/*importando uma biblioteca de ícones */
/* "<FiSearch size={25} color="#FFF"/>" --> usando a imagem de ícone de pesquisa(lupinha) */
import { useState } from 'react';
import { FiSearch} from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {
  
  /*"input"-> nome desse estado(valor desse estado) */
  /*"setInput"-> a função para trocar o valor desse estado(passar um valor novo para esse estado) */
  /*"TESTE 123"-> valor inicial padrão */
  /*" "-> trocamos o valor de cima para começar vazio*/
  const [input,setInput] = useState('')
  
  /*"{}" -> é um objeto vazio */
  const [cep,setCep] = useState({});
  
  /*"async" -> fazendo a função ser assícrona*/
  async function handleSearch(){
    // 01310930/json/

    if(input === ''){
      alert("Preencha algum cep!");
      return;
    }
    /*"try" ->o que voce quer fazer mas pode dar errado */
    /*"catch"-> se der errado ai vai rodar esse catch*/
    try{
      /*"await"-> esperar a requisição */
      /*"get" -> trazer as informações*/
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Ops! erro ao buscar");
      /* fazendo o valor do input ser vazio denovo */
      setInput("")

    }
  }
    
  

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        /*'onChange'-> salva o valor dentro do input */
        /*ele recebe uma função */
        /*"e.target.value" -> pega o valor que o usuario digitou no input */
        /*"e" -> é só uma variavel 'simbolizando' o input */
        /*com isso ele pega o valor do input e coloca nouseState*/
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      
      {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
      )}
      
    </div>
  );
}

export default App;
