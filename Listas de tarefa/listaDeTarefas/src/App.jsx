import './App.css'
import { useState } from 'react'

function App() {

    const [tarefa, setTarefa] = useState('') //estado para armazenar a tarefa digitada no input

    const [tarefas, setTarefas] = useState([]) //estado para armazenar todas as tarefas adicionadas

    const [contadorId, setContadorId] = useState(0); //estado para gerar IDs únicos para as tarefas 

    const statusList = ["pendente", "em andamento", "finalizada"]; //lista de status para as tarefas

    const [status, setStatus] = useState(statusList[0]); //estado para armazenar o status selecionado para a tarefa

    //create
    const adicionarTarefa = (event) => {

        event.preventDefault(); //impede o navegador de recarregar a página

        if (tarefa.trim() === "") return; //verifica se o campo está vazio ou contém apenas espaços


        setTarefas([
            ...tarefas,

            {
                id: contadorId, //gera um id único
                ds_tarefa: tarefa, //texto da tarefa
                status: "pendente" //status inicial
            }
        ])


        setTarefa(""); //limpa o input após adicionar a tarefa
        setContadorId(contadorId + 1); //incrementa o contador de ID para a próxima tarefa
    }
    //update
    const atualizarTarefa = (id, novaTarefa) => {

        if (!novaTarefa || novaTarefa.trim() === "") return;


        const novaTarefas = [...tarefas]; //cria uma cópia do array original de tarefas


        const index = novaTarefas.findIndex(
            (tarefa) => tarefa.id === id
        ); //encontra o índice da tarefa com o id informado


        if (index !== -1) {

            novaTarefas[index] = {
                ...novaTarefas[index],
                ds_tarefa: novaTarefa
            }; //atualiza a tarefa no índice encontrado
        }


        setTarefas(novaTarefas); //atualiza o estado com a nova lista de tarefas
    }
    //delete
    const removerTarefa = (id) => {

        const novaTarefas = [...tarefas]; //cria uma cópia do array original de tarefas


        const index = novaTarefas.findIndex(
            (tarefa) => tarefa.id === id
        ); //encontra o índice da tarefa com o id informado


        if (index !== -1) {

            novaTarefas.splice(index, 1); //remove a tarefa do array
        }


        setTarefas(novaTarefas); //atualiza o estado com a nova lista de tarefas
    }

    const totalTarefas = tarefas.length;

    const tarefasFinalizadas = tarefas.filter((tarefa) => tarefa.status === "finalizada").length;

    const tarefasPendentes = tarefas.filter((tarefa) => tarefa.status === "pendente").length;

    const tarefasEmAndamento = tarefas.filter((tarefa) => tarefa.status === "em andamento").length;

    //funcão para atualizar o status da tarefa
    const atualizarStatus = (id) => {

    const novaTarefas = [...tarefas];

    const index = novaTarefas.findIndex(
        (tarefa) => tarefa.id === id
    );

    const statusAtual =
        novaTarefas[index].status;

    let novoStatus;

    if (statusAtual === "pendente") {

        novoStatus = "em andamento";

    } else if (
        statusAtual === "em andamento"
    ) {

        novoStatus = "finalizada";

    } else {

        novoStatus = "pendente";
    }

    novaTarefas[index] = {
        ...novaTarefas[index],
        status: novoStatus
    };

    setTarefas(novaTarefas);
    };
         

    return (

        <div className="App">

            <nav className='top-navbar'> {/* barra de navegação superior */}
                <h2>Lista de Tarefas</h2>
            </nav>

            <div className='top-container'> {/* container do topo */}

                <div className='cards'>

                    <div className='card'>
                        <p className='card_title'>Total: <span className='card_number'>{totalTarefas}</span></p>
                    </div>

                    <div className='card'>
                        <p className='card_title'>Finalizadas: <span className='card_number'>{tarefasFinalizadas}</span></p>
                    </div>

                    <div className='card'>
                        <p className='card_title'>Pendentes: <span className='card_number'>{tarefasPendentes}</span></p>
                    </div>

                    <div className='card'>
                        <p className='card_title'>Em andamento: <span className='card_number'>{tarefasEmAndamento}</span></p>
                    </div>

                </div>

            </div>


            <div className='main-container'> {/* container principal */}

                <div className='forms'> {/* formulário para adicionar tarefas */}

                    <form onSubmit={adicionarTarefa}>

                        <input
                            type="text"
                            id="pesquisa"
                            placeholder="Adicione uma tarefa"
                            className='search-bar'
                            value={tarefa} //valor atual do input
                            onChange={(event) =>
                                setTarefa(event.target.value)
                            } //atualiza o estado conforme o usuário digita
                        />

                        <button className='add-button' type="submit">Adicionar Tarefa</button>

                    </form>

                </div>


                <div className='task-list'> {/* lista de tarefas */}

                    <div className='id-collumn'>

                        <h3>ID</h3>

                        <ul>
                            {tarefas.map((item) => ( //percorre o array de tarefas

                                <li key={item.id}> {/* cada tarefa recebe uma chave única */}

                                    {item.id} {/* exibe o ID da tarefa */}

                                </li>
                        
                            ))}

                        </ul>

                    </div>


                    <div className='ds-collumn'>
                        
                        <h3>Descrição</h3>

                        <ul>

                            {tarefas.map((item) => ( //percorre o array de tarefas

                                <li key={item.id}> {/* cada tarefa recebe uma chave única */}
                                    {item.ds_tarefa}


                                    <button onClick={() => atualizarTarefa(item.id, prompt("Atualize a tarefa:"))}>Editar</button> {/* botão para editar a tarefa */}

                                    <button onClick={() => removerTarefa(item.id)}>Remover</button> {/* botão para remover a tarefa */}

                                </li>

                            ))}

                        </ul>

                    </div>

                    <div className='status-collumn'>
                        
                        <h3>Status</h3>

                        <ul>

                            {tarefas.map((item) => ( 

                                <li key={item.id}>
                                    {item.status}

                                    <button onClick={() => atualizarStatus(item.id)}>Atualizar Status</button>

                                </li>

                            ))}

                        </ul>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default App