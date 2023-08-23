const quizData = [
  {
    question: "Qual foi o nome do primeiro computador do mundo?",
    options: ["ENIAC", "Apple I", "IBM 5150", "Altair 8800"],
    answer: "ENIAC",
    explanationText: "O primeiro computador do mundo foi o ENIAC (Electronic Numerical Integrator and Computer), criado em 1945.",
    explanationImage: "./assets/foto_eniac.png"
    },
  {
      question: "Qual empresa desenvolveu o sistema operacional Windows?",
      options: ["Apple", "Microsoft", "IBM", "Google"],
      answer: "Microsoft",
      explanationText: "O sistema operacional Windows foi desenvolvido pela Microsoft.",
      explanationImage: "url_da_imagem2.jpg"
    },
  {
      question: "Qual linguagem de programação é frequentemente usada para desenvolvimento web?",
      options: ["Java", "Python", "Ruby", "HTML/CSS"],
      answer: "HTML/CSS",
      explanationText: "HTML (Hypertext Markup Language) e CSS (Cascading Style Sheets) são linguagens essenciais para o desenvolvimento de páginas web, permitindo a criação e o estilo de conteúdo online.",
      explanationImage: "./assets/html_css_code.png"
    },
  {
      question: "O que representa a sigla 'URL' na internet?",
      options: ["Universal Routing Language", "Unified Resource Locator", "Ultimate Reference Link", "User Review Link"],
      answer: "Unified Resource Locator",
      explanationText: "A sigla 'URL' significa Unified Resource Locator (Localizador Uniforme de Recursos), sendo a referência que permite a identificação e acesso a recursos na internet, como websites e arquivos.",
      explanationImage: "./assets/url_structure.png"
    },
  {
      question: "Qual tecnologia é fundamental para a criação de redes locais sem fio?",
      options: ["Bluetooth", "NFC", "4G", "Wi-Fi"],
      answer: "Wi-Fi",
      explanationText: "A tecnologia Wi-Fi é essencial para a criação de redes locais sem fio, permitindo a conexão de dispositivos à internet e entre si em ambientes como residências, escritórios e espaços públicos.",
      explanationImage: "./assets/wifi_symbol.png"
    },    
  {
      question: "Qual é a função principal de um sistema operacional em um computador?",
      options: ["Navegar na internet", "Executar aplicativos", "Fazer ligações telefônicas", "Gerenciar recursos do sistema"],
      answer: "Gerenciar recursos do sistema",
      explanationText: "Um sistema operacional é responsável por gerenciar recursos como memória, processamento e dispositivos de entrada/saída, garantindo a operação eficiente e a interação entre hardware e software em um computador.",
      explanationImage: "./assets/os_interface.png"
    },
  {
    question: "O que é criptografia?",
    options: ["Um tipo de dispositivo de comunicação sem fio", "Um método de compactação de arquivos", "Um sistema de autenticação biométrica", "Um processo de transformar dados em formato ilegível para proteção"],
    answer: "Um processo de transformar dados em formato ilegível para proteção",
    explanationText: "A criptografia é o processo de transformar dados em um formato ilegível chamado de texto cifrado, para proteger a confidencialidade e a segurança das informações durante a transmissão e armazenamento."
    },
  {
    question: "O que é phishing?",
    options: ["Uma técnica de melhoramento de qualidade de imagem", "Um tipo de ataque cibernético que visa roubar informações pessoais", "Um protocolo de comunicação de rede", "Uma linguagem de programação para desenvolvimento web"],
    answer: "Um tipo de ataque cibernético que visa roubar informações pessoais",
    explanationText: "Phishing é uma forma de ataque cibernético em que os criminosos se passam por entidades confiáveis para enganar os usuários e obter informações sensíveis, como senhas e detalhes financeiros."
    },
  {
      question: "O que é 5G?",
      options: ["Um formato de arquivo de imagem", "Um modelo de laptop desenvolvido pela Microsoft", "A quinta geração de padrões de rede móvel", "Um software de edição de vídeo avançado"],
      answer: "A quinta geração de padrões de rede móvel",
      explanationText: "O 5G é a quinta geração de padrões de rede móvel, oferecendo velocidades de internet significativamente mais rápidas, maior capacidade de conexão de dispositivos e menor latência em comparação com as gerações anteriores, como o 4G."
    },
];

const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const errContainer = document.getElementById('err');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const urlInput = document.getElementById('url');

let currentQuestionIndex = 0;
let score = 0;
let selectedDifficulty = null;

// Event listeners para os botões de dificuldade
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

easyButton.addEventListener('click', () => setDifficulty('fácil'));
mediumButton.addEventListener('click', () => setDifficulty('médio'));
hardButton.addEventListener('click', () => setDifficulty('difícil'));

function setDifficulty(difficulty) {
  selectedDifficulty = difficulty;
  currentQuestionIndex = 0;
  score = 0;
  carregarPergunta();
}

function filtrarPerguntasPorDificuldade() {
  if (selectedDifficulty) {
    return quizData.filter(question => question.dificuldade === selectedDifficulty);
  } else {
    return quizData;
  }
}

function carregarPergunta() {
  const perguntasFiltradas = filtrarPerguntasPorDificuldade();

  if (currentQuestionIndex >= perguntasFiltradas.length) {
    mostrarResultado();
    return;
  }

  const currentQuestion = perguntasFiltradas[currentQuestionIndex];
  questionContainer.textContent = `Pergunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("button");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => responder(option, index));
    optionsContainer.appendChild(optionElement);
  });

  errContainer.textContent = "";
  submitButton.style.display = "none";
}


function responder(resposta, index) {
  const currentQuestion = quizData[currentQuestionIndex];

  if (resposta === currentQuestion.answer) {
      score++;

      const popup = document.getElementById('custom-popup');
      const popupContent = document.getElementById('custom-popup-content');
      const explanationText = document.getElementById('explanation-text');
      const explanationImage = document.getElementById('explanation-image');

      explanationText.textContent = currentQuestion.explanationText;
      explanationImage.src = currentQuestion.explanationImage;
      popup.style.display = 'flex';
  } else {
      errContainer.textContent = `Resposta incorreta! A resposta correta era: ${currentQuestion.answer}`;
  }

  const buttons = document.querySelectorAll("#options button");
  buttons.forEach((button, i) => {
      button.disabled = true;
      if (i === index) {
          button.classList.add('selecionado');
      }
  });

  submitButton.style.display = "block";
}

function fecharPopup() {
  const popup = document.getElementById('custom-popup');
  popup.style.display = 'none';
}

function proximaPergunta() {
  const popup = document.getElementById('custom-popup');
  popup.style.display = 'none';

  currentQuestionIndex++;
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove('selecionado');
  });

  carregarPergunta();
}

function mostrarResultado() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  scoreSpan.textContent = score + " de " + quizData.length + " perguntas.";

  const urlAtual = window.location.href = '../Login/index.html';
  const urlComPontuacao = urlAtual + '?score=' + score;
  urlInput.value = urlComPontuacao;
}

function copiarLink() {
  urlInput.select();
  document.execCommand('copy');
  alert('Link copiado para a área de transferência!');
}

carregarPergunta();
