
document.getElementById('name').addEventListener('input', function() {
    var input = this.value;
    var btn = document.getElementById('btn');

if (input === '') {
    trocarPlaceholder();
    btn.style.display = 'none';
} else {
    btn.style.display = 'block';
}
});
  

function trocarPlaceholder() {
    var inputElement = document.getElementById("name");
    if (inputElement) {
      inputElement.placeholder = "Insira um nome válido";
    }
}

document.getElementById('btn').addEventListener('click', function() {
    var input = document.getElementById('name').value;

if (input !== '') {
    localStorage.setItem('userName', input);
    window.location.href = './../perguntas.html';
    }
  });