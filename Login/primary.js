document.addEventListener('DOMContentLoaded', function() {
    var select = document.getElementById('selectDificulty');
    var nameInput = document.getElementById('name');
    var err = document.getElementById('err');
    var submitButton = document.getElementById('submitButton');

    function updateButtonVisibility() {
        var selectedValue = select.value;
        var inputValue = nameInput.value;

        if (selectedValue !== '' && inputValue !== '') {
            submitButton.style.display = 'block';
        } else {
            submitButton.style.display = 'none';
        }

        // Armazenar a opção selecionada no localStorage
        localStorage.setItem('selectedOption', selectedValue);
    }

    // Carregar opção anteriormente selecionada (se houver) do localStorage
    var storedOption = localStorage.getItem('selectedOption');
    if (storedOption) {
        select.value = storedOption;
    }

    select.addEventListener('change', updateButtonVisibility);
    nameInput.addEventListener('input', function() {
        var input = this.value;

        if (input === '') {
            err.textContent = 'Insira seu nome';
            submitButton.style.display = 'none';
        } else {
            err.textContent = '';
            updateButtonVisibility(); // Chama a função para atualizar o botão junto com o nome
        }
    });

    submitButton.addEventListener('click', function() {
        var input = nameInput.value;

        if (input !== '') {
            // Armazenar o nome no localStorage
            localStorage.setItem('userName', input);
            window.location.href = '../quiz/perguntas.html';
        }
    });
});