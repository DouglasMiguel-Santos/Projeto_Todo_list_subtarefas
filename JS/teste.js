let listaCompleta = document.querySelector(".lista-completa");
let input = document.querySelector(".input-novatarefa");
let subtarefa = document.querySelector(".subtarefas");
let inputSubtarefas = document.querySelector(".input-subtarefas");
const btnCriarTarefa = document.querySelector(".btn-criarTarefa");
const tarefa = document.querySelector(".tarefa");
const btnDeletarTarefa = document.querySelector(".btn-deletar-tarefa");
const checkbox = document.querySelector(".checkbox");
const btnMostarSub = document.querySelector(".btn-mostrarSubtarefa");

let Lista = [];

btnCriarTarefa.addEventListener("click", AdicionarTarefa);

// Função para adicionar uma nova tarefa
function AdicionarTarefa(e) {
  e.preventDefault();

  if (input.value !== "") {
    Lista.push({
      tarefa: input.value,
      concluida: false,
      subtarefas: [],
    });

    input.value = "";
  } else {
    alert("Por favor, escreva uma nova tarefa");
  }

  adicionarItem();
}

// Função para mostrar a lista de tarefas na tela
function adicionarItem() {
  let novaTarefa = "";

  Lista.forEach((item, posicao) => {
    novaTarefa += `
        <li class="tarefa"} >
          <input onclick="concluirTarefa("${posicao}")" type="checkbox" class="checkbox"  />
          <p class="text-li">- ${item.tarefa}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="btn-editar"
            
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="btn-deletar-tarefa"
           onclick="deletarTarefa(${posicao})"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="btn-mostrarSubtarefa"
            onclick="mostrarSubtarefa(${posicao})"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
            />
          </svg>
 </li>
         <div id="container-subtarefas" class="hidden subtarefas  subtarefas-${posicao} ">
          <ul class="subtarefas">
            
            <li>
               <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="btn-esconderSubtarefa"
              onclick="esconderSubtarefa(${posicao})"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
              <input type="text" id="input-subtarefas" class="input-subtarefas" placeholder="subtarefas">
              <svg
                style="width: 20px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="btn-editarSubtarefa"
                id="btn-editarSubtarefa"
                onclick="criarSubtarefa(${posicao})"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </li>
          </ul>
       </div>
    `;
  });

  listaCompleta.innerHTML = novaTarefa;
  localStorage.setItem("lista", JSON.stringify(Lista));
}

// Função para criar uma nova subtarefa
function criarSubtarefa(posicao) {
  // Seleciona o input de subtarefas e o contêiner de subtarefas para a posição fornecida
  let inputSubtarefas = document.querySelector(
    `.subtarefas-${posicao} .input-subtarefas`
  );
  let subtarefaContainer = document.querySelector(`.subtarefas-${posicao}`);
  let novaSubtarefaTitulo = inputSubtarefas.value;

  if (novaSubtarefaTitulo.trim() !== "") {
    // Adiciona a nova subtarefa ao array de subtarefas da tarefa específica
    Lista[posicao].subtarefas.push({
      titulo: novaSubtarefaTitulo,
      concluida: false,
    });

    // Atualiza o HTML para mostrar a nova subtarefa na lista de subtarefas
    subtarefaContainer.innerHTML += `
      <li id="subLi" class="subtarefas-${posicao}">
        <input type="checkbox" class="sub-check" />
        <p>${novaSubtarefaTitulo}</p>
        <svg
          style="width: 20px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="btn-deletarSubtarefa"
          id="btn-deletarSubtarefa"
          onclick="deletarSubtarefa(${posicao}}, posiSub=${
      Lista[posicao].subtarefas.length - 1
    })"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </li>
    `;

    // Limpa o campo de input de subtarefas
    inputSubtarefas.value = "";

    // Salva a lista atualizada no localStorage
    localStorage.setItem("lista", JSON.stringify(Lista));
  } else {
    alert("Por favor, escreva uma subtarefa.");
  }
}

// Função para mostrar subtarefas
function mostrarSubtarefa(posicao) {
  let subtarefas = document.querySelector(`.subtarefas-${posicao}`);
  subtarefas.classList.remove("hidden");
}

// Função para esconder subtarefas
function esconderSubtarefa(posicao) {
  let subtarefas = document.querySelector(`.subtarefas-${posicao}`);
  subtarefas.classList.add("hidden");
}

//DELETAR UM ITEM DA LISTA
function deletarTarefa(posicao) {
  Lista.splice(posicao, 1);
  adicionarItem();
}

// //DELETAR subitarefa DA LISTA
// function deletarSubtarefa(posicao) {
//   Lista.splice(Lista[posicao].subtarefas.length - 1, 1);
//   adicionarItem();
// }
Lista.forEach((item, posicao) => {
  let posicaoSubtarefa = Lista[posicao].subtarefas.length - 1;

  function deletarSubtarefa(posicao, posicaoSubtarefa) {
    Lista.splice(posicaoSubtarefa, 1);
    Lista[posicao].subtarefas.splice(posicaoSubtarefa, 1);

    // // Função para deletar uma subtarefa específica da lista
    // function deletarSubtarefa(posicao, posicaoSubtarefa) {
    //   // Remove a subtarefa específica da lista de subtarefas da tarefa principal
    //   Lista[posicao].subtarefas.splice(posicaoSubtarefa, 1);

    // Atualiza a exibição das tarefas na tela
    adicionarItem();

    // Salva a lista atualizada no localStorage
    localStorage.setItem("lista", JSON.stringify(Lista));
  }
});

//pegando os dados do localStorage
function recarregartarefas() {
  const tarefasLocalstorage = localStorage.getItem("lista");
  if (tarefasLocalstorage) {
    Lista = JSON.parse(tarefasLocalstorage);
  }
  adicionarItem();
}
recarregartarefas();
