// app.ts
import { Dragon } from "./Dragon";
import { addDragon, loadFromStorage, deleteDragon, saveToStorage } from "./Storage";

// Select form and container elements
const form = document.getElementById("char-form") as HTMLFormElement;
const charactersDiv = document.getElementById("characters") as HTMLDivElement;

// Load dragons on startup
window.addEventListener("DOMContentLoaded", displayDragons);

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = form.elements.namedItem("name") as HTMLInputElement;
  const typeInput = form.elements.namedItem("type") as HTMLInputElement;
  const ageInput = form.elements.namedItem("age") as HTMLInputElement;
  const elementInput = form.elements.namedItem("element") as HTMLInputElement;
  const abilitiesInput = form.elements.namedItem("abilites") as HTMLInputElement; // note: matches your HTML typo

  // Get values
  const name = nameInput.value.trim();
  const type = typeInput.value.trim();
  const age = Number(ageInput.value);
  const element = elementInput.value.trim();
  const abilities = abilitiesInput.value.trim();

  if (!name || !type || !element || isNaN(age)) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  // Create a new Dragon
  const dragon = new Dragon(name, type, age, element, abilities);

  // Save to storage
  addDragon(dragon);

  // Clear form and re-render list
  form.reset();
  displayDragons();
});

// Display dragons in grid
function displayDragons(): void {
  const dragons = loadFromStorage();
  charactersDiv.innerHTML = "";

  if (dragons.length === 0) {
    charactersDiv.innerHTML = "<p>No dragons yet. Create one!</p>";
    return;
  }

  dragons.forEach((dragon) => {
    const card = document.createElement("div");
    card.className = "character card";
    card.innerHTML = `
      <h3>${dragon.name}</h3>
      <p><strong>Type:</strong> ${dragon.type}</p>
      <p><strong>Age:</strong> ${dragon.age}</p>
      <p><strong>Element:</strong> ${dragon.element}</p>
      <p><strong>Abilities:</strong> ${dragon.abilities}</p>
      <button data-id="${dragon.id}" class="delete-btn">Delete</button>
    `;
    charactersDiv.appendChild(card);
  });

  // Add delete button handlers
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = (e.target as HTMLButtonElement).dataset.id!;
      deleteDragon(id);
      displayDragons();
    });
  });
}
