// bibliotecas e códigos de terceiros
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

// object {}
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}

// lista, array, vetor []
let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-07-09 12:00"),
    finalizada: false
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-07-09 16:00"),
    finalizada: false
  },
]

// atividades = []

// arrow function
const criarItemDeAtividade = (atividade) => {

  let input = `
  <input 
  onchange="concluirAtividade(event)"
  value="${atividade.data}"
  type="checkbox" 
  `

  if (atividade.finalizada) {
    input += 'checked'
  }

  input += '>'

  const formatar = formatador(atividade.data);

  return `
    <div>
      ${input}
      <span>${atividade.nome}</span>
      <time>${formatar.dia.semana.longo}, 
      dia ${formatar.dia.numerico}
      de ${formatar.mes} 
      às ${formatar.hora}h </time>
    </div>
    `
}


const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  // verificar se a minha lista está vazia
  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
  event.preventDefault() //desativando o evento padrão do botão para que ele salve apenas quando o user clicar no botão
  const dadosDoFormulario = new FormData(event.target)

  //coletando os dados inseridos pelo usário (nome da atividade, data e hora)
  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`

  // organizando os dados dentro da variável para salvar a nova atividade
  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }


//verificando se a atividade já existe na lista
  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  //se atividade existe retorna alerta de 'Dia/hora não disponíveis'
  if (atividadeExiste) {
    return alert('Dia/Hora não disponível')
  }

  //se não, a lista é atualizada com a nova atividade
  atividades = [novaAtividade, ...atividades]
  atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
  const dias = [
    '2024-02-28',
    '2024-02-29',
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
  ]

  let diasSelecao = ''

  //para cada dia de dias voltar a data no formato 'DD de nome_mes'
  for (let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de 
    ${formatar.mes}
    `
    diasSelecao += `
    <option value="${dia}">${diaFormatado}</option>
    `
  }

  //alterando o html para aparecer as opções de dias acima
  document
    .querySelector('select[name="dia"]')
    .innerHTML = diasSelecao

}
criarDiasSelecao()


const criarHorasSelecao = () => {
  let horasDisponiveis = ''


  //definindo as horas entre 6h00 até 23:30, usando i como variável
  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0') //adicionando '0' na frente do número que não for em dois
    horasDisponiveis += `
    <option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `
    <option value="${hora}:30">${hora}:30</option>`
  }

  //alterando o HTML para aparecer as opções de horas definidas
  document
    .querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
}
criarHorasSelecao()

//criando o evento de 'checked' da caixa de seleção das atividades
const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  // usar o '!' simboliza 'negação' (se atividade NÃO for verdadeira...)
  if(!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}