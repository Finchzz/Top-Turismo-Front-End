const body = document.body;
const dropdownButton = document.getElementById("temaMenu");

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    dropdownButton.classList.remove("btn-light");
    dropdownButton.classList.add("btn-dark");
    dropdownButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    dropdownButton.classList.remove("btn-dark");
    dropdownButton.classList.add("btn-light");
    dropdownButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
    localStorage.setItem("theme", "light");
  }
}

const form = document.getElementById("reservaForm");
const btnConfirmar = document.getElementById("btnConfirmar");
const resultado = document.getElementById("resultado");
const resumo = document.getElementById("resumo");
const novaReserva = document.getElementById("novaReserva");

function calcularTotal(distancia, passageiros, assento) {
  let precoBase = distancia * 0.8 * passageiros;
  let adicional = 0;

  if (assento === "VIP") adicional = 150 * passageiros;
  if (assento === "Executiva") adicional = 300 * passageiros;

  return precoBase + adicional;
}
btnConfirmar.addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const destinoSelect = document.getElementById("destino");
  const destino = destinoSelect.value;
  const distancia = destinoSelect.selectedOptions[0]?.dataset.distancia;
  const passageiros = parseInt(document.getElementById("passageiros").value);
  const assento = document.getElementById("assento").value;

  if (!nome || !destino || !passageiros || !assento) {
    alert("Por favor, preencha todos os campos corretamente!");
    form.reset();
    return;
  }
  if (passageiros > 9) {
    alert(`Não é possível adicionar mais de 9 passageiros.`);
    return;
  }
  
  const total = calcularTotal(Number(distancia), passageiros, assento);
  const valorFormatado = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  form.classList.add("d-none");
  resultado.classList.remove("d-none");
  resumo.innerHTML = `
    <p> Sua reserva para <b>${destino}</b> foi confirmada.</p>
    <p> Distância: <b>${distancia} km</b></p>
    <p> Passageiros: <b>${passageiros}</b></p>
    <p> Tipo de assento: <b>${assento}</b></p>
    <p>Valor total: <b>${valorFormatado}</b></p>
  `;
});

novaReserva.addEventListener("click", () => {
  form.reset();
  form.classList.remove("d-none");
  resultado.classList.add("d-none");
});