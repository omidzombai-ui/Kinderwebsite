/* Mobiel menu, zoals op de homepage */
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Menu sluiten" : "Menu openen"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Menu openen");
            menuToggle.textContent = "☰";
            menuToggle.focus();
        }
    });
}

/* Adresvelden bij een echte kaart */
const bezorgopties = document.querySelectorAll(
    'input[name="bezorging"]'
);

const adresvelden = document.getElementById("adresvelden");

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

/* Formuliercontrole */
const formulier = document.getElementById("verjaardagsformulier");
const dagveld = document.getElementById("geboortedag");
const maandveld = document.getElementById("geboortemaand");
const melding = document.getElementById("formuliermelding");

if (formulier && dagveld && maandveld && melding) {
    function controleerDatum() {
        dagveld.setCustomValidity("");

        const dag = Number(dagveld.value);
        const maand = Number(maandveld.value);

        if (!dagveld.value || !maandveld.value) {
            return;
        }

        // 29 februari mag als jaarlijkse verjaardag gekozen worden.
        const dagenPerMaand = [
            31, 29, 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];

        const maximum = dagenPerMaand[maand - 1];

        if (
            !Number.isInteger(dag) ||
            !maximum ||
            dag < 1 ||
            dag > maximum
        ) {
            dagveld.setCustomValidity(
                "Kies een geldige dag voor de geselecteerde maand."
            );
        }
    }

    dagveld.addEventListener("input", controleerDatum);
    maandveld.addEventListener("change", controleerDatum);

    function wisMelding() {
        melding.textContent = "";
    }

    formulier.addEventListener("input", wisMelding);
    formulier.addEventListener("change", wisMelding);

    formulier.addEventListener("submit", function (event) {
        event.preventDefault();

        controleerDatum();

        if (!formulier.reportValidity()) {
            return;
        }

        const voornaamveld = document.getElementById("voornaam");

        if (!voornaamveld.value.trim()) {
            voornaamveld.setCustomValidity("Vul een voornaam in.");
            voornaamveld.reportValidity();
            return;
        }

        melding.textContent =
            "De test is gelukt! De verplichte velden zijn ingevuld " +
            "en de datum is geldig. Er is niets opgeslagen, " +
            "geen mail verstuurd en geen kaart aangevraagd.";
    });

    document.getElementById("voornaam").addEventListener(
        "input",
        function (event) {
            event.target.setCustomValidity("");
        }
    );

    controleerDatum();
}