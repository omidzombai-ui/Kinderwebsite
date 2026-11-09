
// WURZELPOST JAVASCRIPT

const animalCards = document.querySelectorAll(".animal-card");
const chosenAnimal = document.getElementById("chosenAnimal");
const postForm = document.getElementById("postForm");
const postResult = document.getElementById("postResult");

// Dier kiezen door op een kaart te klikken
animalCards.forEach((card) => {
    card.addEventListener("click", () => {
        const animal = card.dataset.animal;

        chosenAnimal.value = animal;

        updateSelectedAnimal(animal);

        document.querySelector(".letter-section")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    });
});

// Geselecteerd dier zichtbaar maken
function updateSelectedAnimal(animal) {
    animalCards.forEach((card) => {
        const selected = card.dataset.animal === animal;

        card.classList.toggle("selected", selected);
        card.setAttribute("aria-pressed", String(selected));
    });
}

// Ook bij kiezen via het keuzemenu
chosenAnimal.addEventListener("change", () => {
    updateSelectedAnimal(chosenAnimal.value);
});

// Brief bekijken
postForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!postForm.reportValidity()) {
        return;
    }

    const name = document.getElementById("childName")
        .value.trim();

    const animal = chosenAnimal.value;

    const message = document.getElementById("message")
        .value.trim();

    if (!name || !animal || !message) {
        alert("Vul eerst alle velden in!");
        return;
    }

    const animalNames = {
        Sam: "Sam de eekhoorn 🐿️",
        Bram: "Bram de beer 🐻",
        Luna: "Luna het konijntje 🐰"
    };

    // Oude inhoud verwijderen
    postResult.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = "💌 Jouw Wurzelbrief";

    const greeting = document.createElement("p");
    greeting.textContent = `Lieve ${animalNames[animal]},`;

    const letterText = document.createElement("p");
    letterText.textContent = message;
    letterText.style.whiteSpace = "pre-wrap";

    const signature = document.createElement("p");
    signature.textContent = `Groetjes van ${name} 🌸`;

    const note = document.createElement("p");
    note.textContent =
        "Dit is een voorbeeld van jouw brief. " +
        "De brief is nog niet echt verstuurd.";

    postResult.append(
        title,
        greeting,
        letterText,
        signature,
        note
    );

    postResult.hidden = false;

    postResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
