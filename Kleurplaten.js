
const birthdayForm = document.getElementById("birthdayForm");

const naamInput = document.getElementById("naam");
const datumInput = document.getElementById("datum");
const dierInput = document.getElementById("dier");
const wensInput = document.getElementById("wens");

const birthdayMessage = document.getElementById("birthdayMessage");
const previewText = document.getElementById("previewText");

// Persoonlijke voorbeeldtekst aanpassen tijdens het invullen
function updatePreview() {
    const naam = naamInput.value.trim();
    const dier = dierInput.value;

    if (naam && dier) {
        previewText.textContent =
            `Hoera ${naam}! ${dier} kijkt ernaar uit om jouw verjaardag te vieren! 🎉`;
    } else if (naam) {
        previewText.textContent =
            `Wat gezellig ${naam}! De Wurzels wensen jou alvast een fijne verjaardag!`;
    } else {
        previewText.textContent =
            "Vul je naam in en de Wurzels maken een persoonlijke verjaardagswens!";
    }
}

naamInput.addEventListener("input", updatePreview);
dierInput.addEventListener("change", updatePreview);

// Verjaardagsformulier
birthdayForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!birthdayForm.reportValidity()) {
        return;
    }

    const naam = naamInput.value.trim();
    const datum = new Date(datumInput.value + "T12:00:00");
    const dier = dierInput.value;
    const wens = wensInput.value.trim();

    const datumTekst = datum.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    birthdayMessage.textContent =
        `🎉 Hoera ${naam}! ${dier} wenst jou een hele fijne verjaardag op ${datumTekst}! 💚` +
        (wens ? ` Jouw verjaardagswens: ${wens}` : "");

    previewText.textContent =
        `🎂 Gefeliciteerd ${naam}! ${dier} wenst jou een fantastische verjaardag! 🎈`;

    birthdayForm.reset();
});
