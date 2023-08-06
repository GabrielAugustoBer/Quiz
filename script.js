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
      question: "O que é Internet das Coisas (IoT)?",
      options: ["Um tipo de conexão de Internet extremamente rápida.", " A interconexão de dispositivos físicos com a Internet.", "Um programa de edição de documentos e planilhas.", " Uma rede de comunicação exclusiva para dispositivos móveis."],
      answer: "A interconexão de dispositivos físicos com a Internet.",
      explanationText: "A Internet das Coisas (IoT) refere-se à conexão de dispositivos físicos (como eletrodomésticos, veículos, sensores industriais, entre outros) à Internet. Isso permite que esses dispositivos coletem e troquem dados, realizem tarefas e se comuniquem entre si, possibilitando maior automação e controle remoto de várias funcionalidades.",
      explanationImage: ""
    },
  {
      question: " O que é inteligência artificial?",
      options: ["Um software usado para editar imagens e vídeos.", "Um campo da ciência da computação que estuda a forma como os computadores funcionam.", " Uma tecnologia que permite que os computadores aprendam com experiências anteriores e tomem decisões inteligentes.", " Um tipo de tela de alta resolução utilizada em dispositivos móveis."],
      answer: "Uma tecnologia que permite que os computadores aprendam com experiências anteriores e tomem decisões inteligentes.",
      explanationText: "A inteligência artificial (IA) é um campo da ciência da computação que se concentra no desenvolvimento de sistemas e máquinas capazes de realizar tarefas que normalmente exigiriam inteligência humana. Essas tarefas incluem aprendizado, raciocínio, reconhecimento de padrões, resolução de problemas e tomada de decisões. A IA pode ser aplicada em diversas áreas, como chatbots, carros autônomos, assistentes virtuais e análise de dados.",
      explanationImage: ""
    },
  {
      question: " O que é computação em nuvem?",
      options: ["Um tipo de computador com hardware de alto desempenho.", "Um sistema operacional desenvolvido pela Microsoft.", "Uma forma de fornecer serviços de computação pela Internet, sob demanda.", "Um tipo de armazenamento offline para proteger dados confidenciais."],
      answer: "Uma forma de fornecer serviços de computação pela Internet, sob demanda.",
      explanationText: "A computação em nuvem é um modelo de prestação de serviços de computação pela Internet, onde recursos como armazenamento, servidores, redes e aplicativos são disponibilizados de forma sob demanda. Os usuários podem acessar esses recursos remotamente, pagando apenas pelo que utilizam, sem a necessidade de possuir infraestrutura física local.",
      explanationImage: ""
    },
  {
    question: "O que é aprendizado de máquina (machine learning)?",
    options: ["Um conjunto de instruções utilizadas para programar computadores.", " Uma técnica de desenvolvimento de software para criar interfaces de usuário.", " Um campo da inteligência artificial que permite que computadores aprendam a partir de dados e melhorem suas próprias habilidades.", "Uma tecnologia que permite que dispositivos se conectem à Internet sem fio."],
    answer: " Um campo da inteligência artificial que permite que computadores aprendam a partir de dados e melhorem suas próprias habilidades.",
    explanationText: "Aprendizado de máquina (machine learning) é um subcampo da inteligência artificial que envolve o desenvolvimento de algoritmos e técnicas que permitem que os computadores aprendam a partir de dados e melhorem seu desempenho em tarefas específicas sem serem explicitamente programados para isso. Esses algoritmos utilizam padrões e informações nos dados para fazer previsões ou tomar decisões.",
    explanationImage: ""
    },
  {
      question: " O que é 5G?",
      options: ["A quinta geração de processadores para computadores.", "Um sistema operacional para smartphones.", " Um padrão de rede de comunicação móvel que oferece velocidades de Internet mais rápidas e maior capacidade de conexão.", " Um tipo de dispositivo de realidade virtual avançado."],
      answer: "Um padrão de rede de comunicação móvel que oferece velocidades de Internet mais rápidas e maior capacidade de conexão.",
      explanationText: " 5G é a quinta geração de padrões de rede de comunicação móvel. Essa tecnologia oferece velocidades de Internet significativamente mais rápidas em comparação com as gerações anteriores, como o 4G, bem como maior capacidade de conexão para suportar um número maior de dispositivos conectados simultaneamente. O 5G é fundamental para possibilitar o desenvolvimento de tecnologias como carros autônomos, internet das coisas em larga escala e comunicações avançadas.",
      explanationImage: ""
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

function carregarPergunta() {
  if (currentQuestionIndex >= quizData.length) {
      mostrarResultado();
      return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
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

      // Exibir pop-up com o motivo da resposta correta
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

  const urlAtual = window.location.href;
  const urlComPontuacao = urlAtual + '?score=' + score;
  urlInput.value = urlComPontuacao;
}

function copiarLink() {
  urlInput.select();
  document.execCommand('copy');
  alert('Link copiado para a área de transferência!');
}

carregarPergunta();