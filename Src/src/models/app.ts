import { Dragon } from "./Dragon.js";
import { Storage } from "./Storage.js";

const form = document.getElementById("dragon-form") as HTMLFormElement;
const charactersDiv = document.getElementById("characters") as HTMLDivElement;

// Load saved dragons when the page starts
document.addEventListener("DOMContentLoaded", () => {
  const dragons = Storage.load();
  dragons.forEach(displayDragon);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name") as HTMLInputElement;
  const typeInput = document.getElementById("type") as HTMLInputElement;
  const ageInput = document.getElementById("age") as HTMLInputElement;
  const elementInput = document.getElementById("element") as HTMLInputElement;
  const abilitiesInput = document.getElementById("abilities") as HTMLInputElement;

  const name = nameInput.value.trim();
  const type = typeInput.value.trim();
  const age = parseInt(ageInput.value);
  const element = elementInput.value.trim();
  const abilities = abilitiesInput.value.trim();

  if (!name || !type || !element) {
    alert("Please fill in all required fields!");
    return;
  }

  const dragon = new Dragon(Date.now(), name, type, age, element, abilities);
  Storage.save(dragon);
  displayDragon(dragon);

  form.reset();
});

function displayDragon(dragon: Dragon) {
  const card = document.createElement("div");
  card.classList.add("dragon-card");
  card.innerHTML = `
    <h3>${dragon.name}</h3>
    <p><strong>Type:</strong> ${dragon.type}</p>
    <p><strong>Age:</strong> ${dragon.age}</p>
    <p><strong>Element:</strong> ${dragon.element}</p>
    <p><strong>Abilities:</strong> ${dragon.abilities}</p>
    <button data-id="${dragon.id}" class="delete-btn">Delete</button>
  `;

  // delete functionality
  const deleteBtn = card.querySelector(".delete-btn") as HTMLButtonElement;
  deleteBtn.addEventListener("click", () => {
    Storage.delete(dragon.id);
    card.remove();
  });

  charactersDiv.appendChild(card);
}
