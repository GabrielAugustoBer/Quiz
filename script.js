const quizData = [
  {
      question: "Qual foi o nome do primeiro computador do mundo?",
      options: ["ENIAC", "Apple I", "IBM 5150", "Altair 8800"],
      answer: "ENIAC",
      explanationText: "O primeiro computador do mundo foi o ENIAC (Electronic Numerical Integrator and Computer), criado em 1945.",
      explanationImage: "url_da_imagem1.jpg"
  },
  {
      question: "Qual empresa desenvolveu o sistema operacional Windows?",
      options: ["Apple", "Microsoft", "IBM", "Google"],
      answer: "Microsoft",
      explanationText: "O sistema operacional Windows foi desenvolvido pela Microsoft.",
      explanationImage: "url_da_imagem2.jpg"
  },
  // Adicione mais perguntas aqui...
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
  const urlAtual = window.location.href = './Login/index.html';
  const urlComPontuacao = urlAtual + '?score=' + score;
  urlInput.value = urlComPontuacao;
}

function copiarLink() {
  urlInput.select();
  document.execCommand('copy');
  alert('Link copiado para a área de transferência!');
}

carregarPergunta();