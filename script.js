const quizData = [
  {
      question: "Qual foi o nome do primeiro computador do mundo?",
      options: ["ENIAC", "Apple I", "IBM 5150", "Altair 8800"],
      answer: "ENIAC"
  },
  {
      question: "Qual empresa desenvolveu o primeiro smartphone?",
      options: ["Apple", "Samsung", "Nokia", "BlackBerry"],
      answer: "Nokia"
  },
  {
    question: "Quem é considerado o pai da computação?",
    options: ["Alan Turing", "Steve Jobs", "Bill Gates", "Linus Torvalds"],
    answer: "Alan Turing"
  },
  {
    question: "Qual é a linguagem de programação mais popular?",
    options: ["Python", "JavaScript", "Java", "C++"],
    answer: "Python"
  },
  {
    question: "Qual é o sistema operacional mais utilizado em smartphones?",
    options: ["Android", "iOS", "Windows Phone", "BlackBerry OS"],
    answer: "Android"
  },
  {
    question: "Qual desses é um protocolo de transferência de dados?",
    options: ["TCP", "HTTP", "HTML", "CSS"],
    answer: "TCP"
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
      Swal.fire({
          icon: 'success',
          title: 'Resposta Correta!',
          text: 'Parabéns! Você acertou a resposta!',
          footer: `Motivo: ${currentQuestion.answer}`
      });
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

function proximaPergunta() {
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