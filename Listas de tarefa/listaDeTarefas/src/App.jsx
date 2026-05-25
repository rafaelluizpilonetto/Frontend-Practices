import './App.css'
import { useState } from 'react'
import { Search, User, Trash, SquarePen, RefreshCcw, Plus, ArrowRight, Pin, PinOff } from 'lucide-react'

function App() {

    const [tarefa, setTarefa] = useState('') //estado para armazenar a tarefa digitada no input

    const [tarefas, setTarefas] = useState([]) //estado para armazenar todas as tarefas adicionadas

    const [contadorId, setContadorId] = useState(0); //estado para gerar IDs únicos para as tarefas 

    const statusList = ["Pendente", "Em andamento", "Finalizada"]; //lista de status para as tarefas

    const [status, setStatus] = useState(statusList[0]); //estado para armazenar o status selecionado para a tarefa

    const responsavelList = ["Rafael", "Mayra", "Luis"] //lista de responsáveis para as tarefas

    const [fixa, setFixa] = useState(false); //estado para armazenar se a tarefa é fixa ou não

    const [modalEditAberto, setModalEditAberto] = useState(false);//estado para controlar a abertura do modal de edição

    const [tarefaSelecionada, setTarefaSelecionada] = useState(null); 

    const [novaDescricao, setNovaDescricao] = useState("");

    //create
    const adicionarTarefa = (event) => {

        event.preventDefault(); //impede o navegador de recarregar a página

        if (tarefa.trim() === "") return (
            alert("O campo de tarefa não pode estar vazio.")
        ); //verifica se o campo está vazio ou contém apenas espaços


        setTarefas([
            ...tarefas,

            {
                id: contadorId, //gera um id único
                ds_tarefa: tarefa, //texto da tarefa
                status: "Pendente", //status inicial
                responsavel: responsavelList["A definir"], //responsável inicial
                fixa: false
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
    const tarefasFinalizadas = tarefas.filter((tarefa) => tarefa.status === "Finalizada").length;
    const tarefasPendentes = tarefas.filter((tarefa) => tarefa.status === "Pendente").length;
    const tarefasEmAndamento = tarefas.filter((tarefa) => tarefa.status === "Em andamento").length;

    //funcão para atualizar o status da tarefa
    const atualizarStatus = (id) => {

        const novaTarefas = [...tarefas];

        const index = novaTarefas.findIndex(
            (tarefa) => tarefa.id === id
        );

        const statusAtual =
            novaTarefas[index].status;

        let novoStatus;

        if (statusAtual === "Pendente") {

            novoStatus = "Em andamento";

        } else if (
            statusAtual === "Em andamento"
        ) {

            novoStatus = "Finalizada";

        } else {

            novoStatus = "Pendente";
        }

        novaTarefas[index] = {
            ...novaTarefas[index],
            status: novoStatus
        };

        setTarefas(novaTarefas);
    };

    //função para definir o responsável por cada tarefa
    const definirResponsavel = (id) => {

        const opcoesResponsaveis = [responsavelList[0], responsavelList[1], responsavelList[2]];

        const [valor, setValor] = useState("");
        const [aberto, setAberto] = useState(false);

        const opcoesFiltradas = opcoesResponsaveis.filter((item) =>
            item.toLowerCase().includes(valor.toLowerCase())
        )
    };

    //função para fixar ou desafixar uma tarefa
    const tarefaFixa = (id) => {
        const novaTarefas = [...tarefas];

        const index = novaTarefas.findIndex(
            (tarefa) => tarefa.id === id
        );
        if (index !== -1) {
            novaTarefas[index] = {
                ...novaTarefas[index],
                fixa: !novaTarefas[index].fixa
            };
        }
        setTarefas(novaTarefas);
    };

    return (
        <div className="App">

            <nav className='top-navbar'>
                <h2>Gerenciador de tarefas</h2>
            </nav>

            <div className='top-container'>

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


            <div className='main-container'>

                <div className='forms'>

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

                        <button className='add-button' type="submit"><Plus size={16} className="icon-btns" /> Adicionar Tarefa</button>

                    </form>

                </div>


                <div className='task-list'>

                    <div className='task-header'>
                        <span>ID</span>
                        <span>Descrição</span>
                        <span>Status</span>
                        <span>Ações</span>
                        <span>Responsável</span>
                        <span>Fixa</span>
                    </div>

                    {tarefas.map((item) => (

                        <div className='task-row' key={item.id}>

                            <span>{item.id}</span>

                            <span className="task-description">
                                {item.ds_tarefa}
                            </span>

                            <span className={`status ${item.status}`}>
                                {item.status}
                            </span>

                            <div className='actions'>

                                <button
                                    className='edit-btn'
                                    onClick={() => {
                                        setModalEditAberto(true);
                                        setTarefaSelecionada(item);
                                        setNovaDescricao(item.ds_tarefa);
                                    }}
                                >
                                    <SquarePen size={16} />
                                </button>

                                <button
                                    className='remove-btn'
                                    onClick={() => removerTarefa(item.id)}
                                >
                                    <Trash size={16} />
                                </button>

                                <button
                                    className='status-btn'
                                    onClick={() => atualizarStatus(item.id)}
                                >
                                    <ArrowRight size={16} />
                                </button>

                            </div>

                            <span>

                                <label htmlFor="responsavel"></label>

                                <input list="responsaveis" id="responsavel" name="responsavel" />

                                <datalist id="responsaveis">
                                    {responsavelList.map((responsavel, index) => (
                                        <option key={index} value={responsavel} />
                                    ))}
                                </datalist>

                            </span>

                            <span>

                                <button
                                    onClick={() => tarefaFixa(item.id)}
                                    className='fixa-btn'
                                >
                                    {item.fixa
                                        ? <Pin size={16} className="icon-btns" />
                                        : <PinOff size={16} className="icon-btns" />
                                    }
                                </button>

                            </span>

                        </div>

                    ))}

                </div>
                {modalEditAberto && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>Editar tarefa</h2>

                            <input  
                                type="text"
                                value={novaDescricao}
                                onChange={(e) =>
                                    setNovaDescricao(e.target.value)
                                }
                            />
                            
                            <button
                                onClick={() => {

                                    atualizarTarefa(
                                        tarefaSelecionada.id,
                                        novaDescricao
                                    );

                                    setModalEditAberto(false);
                                }}
                            >
                                Salvar
                            </button>

                            <button onClick={() =>
                                setModalEditAberto(false)
                            }>
                                Fechar
                            </button>

                        </div>

                    </div>
                )}
                
            </div>

        </div>
    )
}

export default App