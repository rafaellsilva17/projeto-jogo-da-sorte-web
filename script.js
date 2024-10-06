const buttons = document.querySelectorAll('.btn');
const triesNumberSpan = document.getElementById('tries-number');
let tries = 0;
let winningNumber = Math.floor(Math.random() * 5) + 1;

function showModal(title, message, reset = false) {
  const modalHTML = `
    <div class="modal fade" id="resultModal" tabindex="-1" aria-labelledby="resultModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resultModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="color: ${title === 'Você Acertou!' ? 'green' : 'red'};">
            ${message}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModalButton">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = new bootstrap.Modal(document.getElementById('resultModal'));
  modal.show();
  document.getElementById('resultModal').addEventListener('hidden.bs.modal', function () {
    this.remove();
    if (reset) resetGame();
  });
}

function resetGame() {
  tries = 0;
  winningNumber = Math.floor(Math.random() * 5) + 1;
  triesNumberSpan.textContent = tries;
  buttons.forEach(button => {
    button.disabled = false;
    button.classList.remove('btn-success', 'btn-danger');
    button.classList.add('btn-primary');
  });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = parseInt(button.textContent);
    tries++;
    triesNumberSpan.textContent = tries;

    if (buttonValue === winningNumber) {
      button.classList.remove('btn-primary');
      button.classList.add('btn-success');
      showModal('Você Acertou!', `Parabéns! O botão correto é o ${winningNumber}`, true);
      disableButtons();
    } else {
      button.classList.remove('btn-primary');
      button.classList.add('btn-danger');
      button.disabled = true;

      if (tries >= 3) {
        showModal('Fim do Jogo!', `Você usou todas as tentativas! O botão correto era o ${winningNumber}`, true);
        disableButtons();
      } else {
        showModal('Você Errou!', `O botão ${buttonValue} não é o correto. Tente novamente!`);
      }
    }
  });
});

function disableButtons() {
  buttons.forEach(button => {
    button.disabled = true;
  });
}
