const bezorgopties = document.querySelectorAll(
    'input[name="bezorging"]'
);

const adresvelden = document.querySelector("#adresvelden");
const formulier = document.querySelector("#verjaardagsformulier");
const dagveld = document.querySelector("#geboortedag");
const maandveld = document.querySelector("#geboortemaand");
const melding = document.querySelector("#formuliermelding");

function werkAdresveldenBij() {
    const gekozenOptie = document.querySelector(
        'input[name="bezorging"]:checked'
    );

    if (!gekozenOptie || !adresvelden) {
        return;
    }

    const kiestKaart = gekozenOptie.value === "kaart";

    adresvelden.hidden = !kiestKaart;
    adresvelden.disabled = !kiestKaart;
}

bezorgopties.forEach(function (optie) {
    optie.addEventListener("change", werkAdresveldenBij);
});

werkAdresveldenBij();

function controleerDatum() {
    dagveld.setCustomValidity("");

    const dag = Number(dagveld.value);
    const maand = Number(maandveld.value);

    if (!dag || !maand) {
        return;
    }

    // Februari heeft hier 29 dagen, zodat 29 februari gekozen kan worden.
    const dagenPerMaand = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maximum = dagenPerMaand[maand - 1];

    if (!Number.isInteger(dag) || dag < 1 || dag > maximum) {
        dagveld.setCustomValidity(
            "Kies een geldige dag voor de geselecteerde maand."
        );
    }
}

dagveld.addEventListener("input", controleerDatum);
maandveld.addEventListener("change", controleerDatum);

formulier.addEventListener("input", function () {
    melding.textContent = "";
});

formulier.addEventListener("change", function () {
    melding.textContent = "";
});

formulier.addEventListener("submit", function (event) {
    event.preventDefault();

    controleerDatum();

    if (!formulier.reportValidity()) {
        return;
    }

    melding.textContent =
        "De test is gelukt! De verplichte velden zijn ingevuld " +
        "en de datum is geldig. Er is niets opgeslagen, " +
        "geen mail verstuurd en geen kaart aangevraagd.";
});

controleerDatum();