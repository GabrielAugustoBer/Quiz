
document.getElementById('name').addEventListener('input', function() {
    var input = this.value;
    var err = document.getElementById('err');
    var btn = document.getElementById('btn');

if (input === '') {
    err.textContent = 'Insira seu nome';
    btn.style.display = 'none';
} else {
    err.textContent = '';
    btn.style.display = 'block';
}
});

document.getElementById('btn').addEventListener('click', function() {
    var input = document.getElementById('name').value;

if (input !== '') {
    // Armazenar o nome no local storage
    localStorage.setItem('userName', input);
    window.location.href = 'perguntas.html';
    }
  });