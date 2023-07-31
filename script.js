function responder(resposta) {
    var botao = document.getElementById('button')
    if (resposta === 'c') {
      alert("Resposta correta! Parabéns!");
      document.getElementById('err').textContent = 'Resposta correta! Parabéns';
      botao.style.display = 'block';
    } else {
      alert("Resposta incorreta. Tente novamente!");
      document.getElementById('err').textContent = 'Resposta incorreta. Tente novamente';
    }
}

function proxPergunta() {
    
}
  